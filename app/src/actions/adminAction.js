import {
	ADMIN_GET_USERS_SUCCESS,
	ADMIN_GET_USERS_FAIL,
	ADMIN_GET_USERS_LOADING,
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
