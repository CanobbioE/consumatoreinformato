import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';
import {compose} from 'redux';
import {Launcher} from 'react-chat-window';
// import RequireAuth from '../containers/RequireAuth';
import {
	sendMessage,
	readMessage,
	getAllMessages,
	getNewMessages,
	systemMessage,
	fetchUserData,
} from '../actions';
import {getUser} from '../utils/Common';

const Chat = props => {
	if (!getUser()) return null;
	// window.setInterval(props.getNewMessages, 10000);
	const [open, setOpen] = useState(false);
	// TODO: this better
	useEffect(() => {
		getAllMessages();
		fetchUserData(props.chat.receiver);
	}, []);

	const handleMessageSent = async m => {
		await props.sendMessage(props.chat.receiver, m.data.text, new Date());
	};

	const handleFile = () => {
		props.systemMessage(
			"MESSAGGIO AUTOMATICO:\nL'invio di documenti è disabilitato, " +
				"usare l'apposita sezione nell'area personale",
		);
	};

	const handleClick = () => {
		setOpen(!open);
		const lastMessage =
			props.chat.rawMessageList.length &&
			props.chat.rawMessageList[props.chat.rawMessageList.length - 1];
		if (!lastMessage) return;
		// TODO: fix this
		props.readMessage(lastMessage.sender.id, lastMessage.date);
	};

	return (
		<Launcher
			agentProfile={{
				teamName:
					(props.chat.receiverInfo && props.chat.receiverInfo) ||
					'Nessun utente selezionato',
				imageUrl:
					'https://upload.wikimedia.org/wikipedia/commons/thumb/b/bd/Ic_account_circle_48px.svg/72px-Ic_account_circle_48px.svg.png',
			}}
			isOpen={open}
			showEmoji={false}
			onFilesSelected={handleFile}
			handleClick={handleClick}
			messageList={props.chat.messageList}
			newMessagesCount={props.chat.new}
			onMessageWasSent={handleMessageSent}
		/>
	);
};

function mapStateToProps({chat}) {
	return {chat};
}

const composedComponent = compose(
	// RequireAuth,
	connect(
		mapStateToProps,
		{
			sendMessage,
			readMessage,
			getAllMessages,
			getNewMessages,
			systemMessage,
			fetchUserData,
		},
	),
);

export default composedComponent(Chat);
