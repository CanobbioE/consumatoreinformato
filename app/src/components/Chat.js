import React, {useEffect} from 'react';
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
	toggleChatOpen,
	setTimer,
	setChatIntervalID,
} from '../actions';
import {getUser} from '../utils/Common';

const Chat = props => {
	if (!getUser()) return null;
	useEffect(() => {
		props.getAllMessages();
		props.fetchUserData(props.chat.receiver);
		if (!props.chat.timerSet) {
			props.setTimer(true);
			props.setChatIntervalID(window.setInterval(props.getNewMessages, 5000));
		}
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
		props.toggleChatOpen(!props.chat.chatOpen);
		const lastMessage =
			props.chat.rawMessageList.length &&
			props.chat.rawMessageList[props.chat.rawMessageList.length - 1];
		if (!lastMessage) return;
		props.readMessage(lastMessage.sender.id, new Date());
	};

	const count = props.chat.newMessagesList[props.chat.receiver]
		? props.chat.newMessagesList[props.chat.receiver].length
		: 0;

	return (
		<Launcher
			agentProfile={{
				teamName:
					(props.chat.receiverInfo && props.chat.receiverInfo) ||
					'Nessun utente selezionato',
				imageUrl:
					'https://upload.wikimedia.org/wikipedia/commons/thumb/b/bd/Ic_account_circle_48px.svg/72px-Ic_account_circle_48px.svg.png',
			}}
			isOpen={props.chat.chatOpen}
			showEmoji={false}
			onFilesSelected={handleFile}
			handleClick={handleClick}
			messageList={props.chat.messageList}
			mute
			newMessagesCount={count}
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
			setTimer,
			systemMessage,
			fetchUserData,
			toggleChatOpen,
			setChatIntervalID,
		},
	),
);

export default composedComponent(Chat);
