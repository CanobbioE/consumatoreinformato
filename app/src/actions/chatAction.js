import {
	CHAT_GET_ALL_SUCCESS,
	CHAT_GET_ALL_FAIL,
	CHAT_GET_NEW_SUCCESS,
	CHAT_GET_NEW_FAIL,
	CHAT_POST_SUCCESS,
	CHAT_POST_FAIL,
	CHAT_READ_FAIL,
	CHAT_READ_SUCCESS,
	CHAT_SYSTEM_MESSAGE,
	USER_GET_SUCCESS,
	USER_GET_FAIL,
} from '../utils/Types';
import Globals from '../config/Globals';
import axios from 'axios';

export const sendMessage = (receiver, content, date) => async dispatch => {
	try {
		const response = await axios.post(
			Globals.baseURL + Globals.API.messages.send,
			{receiver, content, date},
			{
				headers: {
					Authorization: `Bearer ${localStorage.getItem('token')}`,
				},
			},
		);
		dispatch({
			type: CHAT_POST_SUCCESS,
			payload: response.data,
		});
	} catch (e) {
		console.log(e);
		dispatch({
			type: CHAT_POST_FAIL,
			payload: e.response.data,
		});
	}
};

export const getAllMessages = () => async dispatch => {
	try {
		const response = await axios.get(
			Globals.baseURL + Globals.API.messages.all,
			{
				headers: {
					Authorization: `Bearer ${localStorage.getItem('token')}`,
				},
			},
		);
		dispatch({
			type: CHAT_GET_ALL_SUCCESS,
			payload: response.data,
		});
	} catch (e) {
		console.log(e);
		dispatch({
			type: CHAT_GET_ALL_FAIL,
			payload: e.response.data,
		});
	}
};

export const getNewMessages = () => async dispatch => {
	try {
		const response = await axios.get(
			Globals.baseURL + Globals.API.messages.new,
			{
				headers: {
					Authorization: `Bearer ${localStorage.getItem('token')}`,
				},
			},
		);
		dispatch({
			type: CHAT_GET_NEW_SUCCESS,
			payload: response.data,
		});
	} catch (e) {
		console.log(e);
		dispatch({
			type: CHAT_GET_NEW_FAIL,
			payload: e.response.data,
		});
	}
};

export const readMessage = (sender, date) => async dispatch => {
	console.log('reading');
	try {
		await axios.post(
			Globals.baseURL + Globals.API.messages.read,
			{sender, date},
			{
				headers: {
					Authorization: `Bearer ${localStorage.getItem('token')}`,
				},
			},
		);
		dispatch({
			type: CHAT_READ_SUCCESS,
		});
	} catch (e) {
		console.log(e);
		dispatch({
			type: CHAT_READ_FAIL,
			payload: e.response.data,
		});
	}
};

export const systemMessage = message => dispatch => {
	dispatch({
		type: CHAT_SYSTEM_MESSAGE,
		payload: {
			author: 'them',
			type: 'text',
			data: {
				text: message,
			},
		},
	});
};

export const fetchUserData = id => async dispatch => {
	try {
		const response = await axios.get(
			`${Globals.baseURL}${Globals.API.userData.details}/${id}`,
			{
				headers: {
					Authorization: `Bearer ${localStorage.getItem('token')}`,
				},
			},
		);
		dispatch({
			type: USER_GET_SUCCESS,
			payload: response.data,
		});
	} catch (e) {
		console.log(e);
		dispatch({
			type: USER_GET_FAIL,
			payload: e.response.data,
		});
	}
};
