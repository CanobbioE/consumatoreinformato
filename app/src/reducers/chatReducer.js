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
} from '../utils/Types';
import parseError from '../utils/Errors';
import {getUser} from '../utils/Common';

// TODO: add "CHAT_RECEIVER_SELECTED" for admin only
const INITIAL_STATE = {
	messageList: [],
	rawMessageList: [],
	new: 0,
	error: '',
	sender: getUser() && getUser().id,
	receiver: 100002,
	receiverInfo: 'Consumatore Informato',
};

export default (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case CHAT_GET_ALL_SUCCESS:
			return {
				...state,
				rawMessageList: [...state.rawMessageList, ...action.payload],
				messageList: [
					...state.messageList,
					...messageAdapter(action.payload, state.sender),
				],
			};
		case CHAT_GET_ALL_FAIL:
			return {...state, error: parseError(action.payload)};
		case CHAT_GET_NEW_SUCCESS:
			if (action.payload.length === state.new) return {...state};
			return {
				...state,
				new: action.payload.length,
				rawMessageList: [...state.rawMessageList, ...action.payload],
				messageList: [
					...state.messageList,
					...messageAdapter(action.payload, state.sender),
				],
			};
		case CHAT_GET_NEW_FAIL:
			return {...state, error: parseError(action.payload)};
		case CHAT_POST_SUCCESS:
			return {
				...state,
				rawMessageList: [...state.rawMessageList, action.payload],
				messageList: [
					...state.messageList,
					...messageAdapter([action.payload], state.sender),
				],
			};
		case CHAT_POST_FAIL:
			return {...state, error: parseError(action.payload)};
		case CHAT_READ_FAIL:
			return {...state, error: parseError(action.payload)};
		case CHAT_READ_SUCCESS:
			return {...state, new: 0};
		case CHAT_SYSTEM_MESSAGE:
			return {...state, messageList: [...state.messageList, action.payload]};
		case USER_GET_SUCCESS:
			return {
				...state,
				receiverInfo: `${action.payload.name} ${action.payload.surname}`,
			};
		case USER_GET_FAIL:
			return {...state, error: parseError(action.payload)};
		default:
			return {...state};
	}
};

const messageAdapter = (messageList, sender) => {
	return (
		(messageList &&
			messageList.length &&
			messageList.map(m => ({
				author: m.sender.id === sender ? 'me' : 'them',
				type: 'text',
				data: {
					text: m.content,
				},
			}))) ||
		[]
	);
};
