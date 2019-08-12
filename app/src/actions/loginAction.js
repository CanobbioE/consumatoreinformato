import {
	LOGIN_POST_FAIL,
	LOGIN_POST_SUCCESS,
	LOGIN_POST_LOADING,
	LOGIN_GET_FAIL,
	LOGIN_GET_SUCCESS,
	LOGIN_GET_LOADING,
	LOGOUT_SUCCESS,
	CHANGE_PWD_LOADING,
	CHANGE_PWD_FAIL,
	CHANGE_PWD_SUCCESS,
} from '../utils/Types';
import axios from 'axios';
import Globals from '../config/Globals';

export const login = (email, password) => async dispatch => {
	dispatch({
		type: LOGIN_POST_LOADING,
	});
	try {
		const response = await axios.post(Globals.baseURL + Globals.API.login, {
			email,
			password,
		});
		localStorage.setItem('token', response.data.token);
		dispatch({
			type: LOGIN_POST_SUCCESS,
			payload: response.data.token,
		});
		return null;
	} catch (e) {
		console.log(e);
		dispatch({
			type: LOGIN_POST_FAIL,
			payload: e.response.data,
		});
		return e;
	}
};

export const fetchCurrentUserData = () => async dispatch => {
	dispatch({
		type: LOGIN_GET_LOADING,
	});
	try {
		const response = await axios.get(
			Globals.baseURL + Globals.API.userData.current,
			{
				headers: {Authorization: `Bearer ${localStorage.getItem('token')}`},
			},
		);
		localStorage.setItem('user', JSON.stringify(response.data));
		dispatch({
			type: LOGIN_GET_SUCCESS,
			payload: response.data,
		});
		return null;
	} catch (e) {
		console.log(e);
		dispatch({
			type: LOGIN_GET_FAIL,
			payload: e.response.data,
		});
		return e;
	}
};

export const logout = () => {
	localStorage.removeItem('token');
	localStorage.removeItem('user');
	return {
		type: LOGOUT_SUCCESS,
	};
};

export const changePwd = (pwd, confpwd) => async dispatch => {
	try {
		dispatch({
			type: CHANGE_PWD_LOADING,
		});
		const response = await axios.post(
			Globals.baseURL + Globals.API.changePassword,
			{
				password: pwd,
			},
			{
				headers: {Authorization: `Bearer ${localStorage.getItem('token')}`},
			},
		);
		dispatch({
			type: CHANGE_PWD_SUCCESS,
			payload: response.data,
		});
	} catch (e) {
		console.log(e);
		dispatch({
			type: CHANGE_PWD_FAIL,
			payload: e.response.data,
		});
	}
};
