import {
	ADMIN_GET_USERS_SUCCESS,
	ADMIN_GET_USERS_FAIL,
	ADMIN_GET_USERS_LOADING,
	ISCR_POST_FAIL,
	ISCR_POST_SUCCESS,
	ISCR_POST_LOADING,
} from '../utils/Types';
import Globals from '../config/Globals';
import axios from 'axios';

export const fetchAllUsersData = () => async dispatch => {
	dispatch({
		type: ADMIN_GET_USERS_LOADING,
	});
	try {
		const response = await axios.get(
			Globals.baseURL + Globals.API.userData.all,
			{headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}},
		);
		dispatch({
			type: ADMIN_GET_USERS_SUCCESS,
			payload: response.data,
		});
	} catch (e) {
		console.log(e);
		dispatch({
			type: ADMIN_GET_USERS_FAIL,
			payload: e.response.data,
		});
	}
};

export const forceRegister = fields => async dispatch => {
	dispatch({
		type: ISCR_POST_LOADING,
	});
	try {
		const registrationDTO = {
			name: fields.name,
			surname: fields.surname,
			birthday: fields.date,
			birthplace: fields.luogo,
			codiceFiscale: fields.cf,
			homeAddress: fields.res,
			email: fields.mail,
			telephoneNumber: fields.tel,
			password: fields.pwd,
		};

		await axios.post(
			Globals.baseURL + Globals.API.forceRegister,
			registrationDTO,
			{headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}},
		);

		dispatch({
			type: ISCR_POST_SUCCESS,
		});
		return null;
	} catch (e) {
		console.log(e);
		dispatch({
			type: ISCR_POST_FAIL,
			payload: e.response.data,
		});
	}
};
