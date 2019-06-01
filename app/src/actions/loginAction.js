import {
	LOGIN_POST_FAIL,
	LOGIN_POST_SUCCESS,
	LOGIN_POST_LOADING,
	LOGIN_GET_FAIL,
	LOGIN_GET_SUCCESS,
	LOGIN_GET_LOADING,
	LOGOUT_SUCCESS,
} from '../utils/Types';
import {sleep, users} from '../utils/mock';

export const login = (email, password) => async dispatch => {
	dispatch({
		type: LOGIN_POST_LOADING,
	});
	try {
		await sleep(900);
		const response = 'header.payload.signature';
		// todo: axios post
		localStorage.setItem('token', response);
		dispatch({
			type: LOGIN_POST_SUCCESS,
			payload: response,
		});
	} catch (e) {
		console.log(e);
		dispatch({
			type: LOGIN_POST_FAIL,
			payload: e,
		});
	}
};

export const fetchUserData = email => async dispatch => {
	dispatch({
		type: LOGIN_GET_LOADING,
	});
	try {
		await sleep(900);
		console.log(email);
		// todo: axios post
		const response = users[email];
		localStorage.setItem('user', JSON.stringify(response));
		dispatch({
			type: LOGIN_GET_SUCCESS,
			payload: response,
		});
	} catch (e) {
		console.log(e);
		dispatch({
			type: LOGIN_GET_FAIL,
			payload: e,
		});
	}
};

export const logout = () => {
	localStorage.removeItem('token');
	localStorage.removeItem('user');
	return {
		type: LOGOUT_SUCCESS,
	};
};
