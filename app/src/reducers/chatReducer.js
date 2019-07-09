import {
	CHAT_SYSTEM_MESSAGE,
	CHAT_GET_ALL_SUCCESS,
	CHAT_GET_ALL_FAIL,
	CHAT_GET_NEW_SUCCESS,
	CHAT_GET_NEW_FAIL,
	CHAT_POST_SUCCESS,
	CHAT_POST_FAIL,
	CHAT_READ_FAIL,
	CHAT_READ_SUCCESS,
	USER_GET_SUCCESS,
	USER_GET_FAIL,
	CHAT_TIMER_SET,
	CHAT_SET_RECEIVER,
	CHAT_TOGGLE_OPEN,
} from '../utils/Types';
import parseError from '../utils/Errors';
import {getUser} from '../utils/Common';

const INITIAL_STATE = {
	messageList: [],
	rawMessageList: {},
	newMessagesList: {},
	error: '',
	sender: getUser() && getUser().id,
	receiver: 100002,
	receiverInfo: 'Consumatore Informato',
	timerSet: false,
	chatOpen: false,
};

export default (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case CHAT_TIMER_SET:
			return {...state, timerSet: true};
		case CHAT_GET_ALL_SUCCESS:
			return getAll(action.payload, state);
		case CHAT_GET_ALL_FAIL:
			return {...state, error: parseError(action.payload)};
		case CHAT_GET_NEW_SUCCESS:
			return getNew(action.payload, state);
		case CHAT_GET_NEW_FAIL:
			return {...state, error: parseError(action.payload)};
		case CHAT_POST_SUCCESS:
			return post(action.payload, state);
		case CHAT_POST_FAIL:
			return {...state, error: parseError(action.payload)};
		case CHAT_READ_FAIL:
			return {...state, error: parseError(action.payload)};
		case CHAT_READ_SUCCESS:
			return read(action.payload, state);
		case CHAT_SYSTEM_MESSAGE:
			return {...state, messageList: [...state.messageList, action.payload]};
		case USER_GET_SUCCESS:
			return {
				...state,
				receiverInfo: `${action.payload.name} ${action.payload.surname}`,
			};
		case USER_GET_FAIL:
			return {...state, error: parseError(action.payload)};
		case CHAT_SET_RECEIVER:
			return setReceiver(action.payload, state);
		case CHAT_TOGGLE_OPEN:
			return {...state, chatOpen: action.payload || !state.chatOpen};
		default:
			return {...state};
	}
};

// From BE I receive a list: [{sender, content, dateTime, id}]
// I want to:
// 1 - Check if we received anything
// 2 - Check if what we received is actually new:
//    a - Remove whatever is sent from us
//    b - Remove whatever is already present in the rawMessageList
//    c - Return whatever is left
// 3 - Add the new messages to the rawMessageList[state.receiver]
// 4 - Clean the newMessagesList[state.receiver]
// 5 - Add the new messages to the newMessagesList[state.receiver]
// 6 - Add the parsed messages to the messageList
const getNew = (list, state) => {
	const newState = {...state};
	if (!list || !list.length) return newState;
	if (!state.rawMessageList[state.receiver]) {
		newState.rawMessageList[state.receiver] = [];
	}
	const receiver = list.map(m =>
		m.sender.id !== state.sender ? m.sender.id : m.receiver.id,
	)[0];
	const rawIDs = newState.rawMessageList[receiver].map(m => m.id);
	const allNewRawMessages = list.filter(m => !rawIDs.includes(m.id));
	const onlyTheirsNewRawMessages = list.filter(
		m => m.sender.id !== state.sender && !rawIDs.includes(m.id),
	);

	newState.rawMessageList[receiver] = [
		...state.rawMessageList[receiver],
		...allNewRawMessages,
	];

	if (!newState.newMessagesList[receiver]) {
		newState.newMessagesList[receiver] = [];
	}
	newState.newMessagesList[receiver] = [
		...newState.newMessagesList[receiver].filter(m => m.read === false),
		...onlyTheirsNewRawMessages,
	];

	newState.messageList = [
		...newState.messageList,
		...messageAdapter(allNewRawMessages, state.sender),
	];

	return newState;
};

// We call this when chat is initialized.
// From BE I receive a list: [{receiver, sender, content, dateTime, read, id}]
// I want to:
// 1 - Divide messages in a map:
//   a - For each message m:
//    a1 - Wherever m.sender.id != state.sender put m in raw[m.sender.id]
//    a2 - Wherever m.receiver != state.sender put m in ram[m.receiver.id]
//   b - return the map
// 2 - Put the map in rawMessageList
// 3 - Put the parsed rawMessageList[state.receiver] in messageList
const getAll = (list, state) => {
	const newState = {...state};
	newState.messageList = [];
	if (!list || !list.length) return newState;
	const raw = {};
	list.forEach(m => {
		if (m.sender.id !== state.sender) {
			if (!raw[m.sender.id]) raw[m.sender.id] = [];
			raw[m.sender.id] = [...raw[m.sender.id], m];
		} else if (m.receiver !== state.sender) {
			if (!raw[m.receiver.id]) raw[m.receiver.id] = [];
			raw[m.receiver.id] = [...raw[m.receiver.id], m];
		}
	});

	newState.rawMessageList = {...raw};
	newState.messageList = messageAdapter(
		newState.rawMessageList[state.receiver],
		state.sender,
	);
	return newState;
};

// We call this when a message is sent.
// From BE I receive an object: {sender, content, dateTime, id}
// I want to:
// 1 - Push the new message m into rawMessageList[m.receiver]
// 2 - Push parsed m into messageList
const post = (obj, state) => {
	const newState = {...state};
	if (!obj) return newState;
	if (!newState.rawMessageList[obj.receiver]) {
		newState.rawMessageList[obj.receiver] = [];
	}
	newState.rawMessageList[obj.receiver] = [
		...newState.rawMessageList[obj.receiver],
		obj,
	];
	newState.messageList = [
		...newState.messageList,
		...messageAdapter([obj], state.sender),
	];

	return newState;
};

// This is called everytime the chat gets toggled
// From the BE I receive nothing.
// I want to:
// 1 - For every message m in the rawMessageList[state.receiver]:
//    a - if m.receiver != state.sender set m.read=true
//    b - if m is in newMessagesList[state.receiver] remove it from the list
const read = (m, state) => {
	const newState = {...state};
	newState.rawMessageList[state.receiver].foEach(m => {
		if (m.receiver.id !== state.sender) m.read = true;
		newState.newMessagesList = newState.newMessagesList.filter(
			n => n.id !== m.id,
		);
	});

	return newState;
};

const setReceiver = (receiver, state) => {
	const newState = {...state, messageList: []};
	newState.receiver = receiver;
	if (!newState.rawMessageList[receiver])
		newState.rawMessageList[receiver] = [];
	newState.messageList = messageAdapter(
		newState.rawMessageList[receiver],
		state.sender,
	);

	return newState;
};
const messageAdapter = (raw, sender) => {
	if (!raw) return [];
	return raw.map(m => ({
		author: m.sender.id === sender ? 'me' : 'them',
		type: 'text',
		data: {
			text: m.content,
		},
	}));
};
