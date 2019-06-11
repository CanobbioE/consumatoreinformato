import axios from 'axios';
import Globals from '../config/Globals';
import {
	FILE_UPLOAD_LOADING,
	FILE_UPLOAD_FAIL,
	FILE_UPLOAD_SUCCESS,
	FILE_ALL_LOADING,
	FILE_ALL_FAIL,
	FILE_ALL_SUCCESS,
	FILE_USER_LOADING,
	FILE_USER_FAIL,
	FILE_USER_SUCCESS,
} from '../utils/Types';

export const uploadFile = file => async dispatch => {
	dispatch({
		type: FILE_UPLOAD_LOADING,
	});
	try {
		const formData = new FormData();
		formData.append('file', file);
		const response = await axios.post(
			Globals.baseURL + Globals.API.files.upload,
			formData,
			{
				headers: {
					Authorization: `Bearer ${localStorage.getItem('token')}`,
					'Content-Type': 'multipart/form-data',
				},
			},
		);
		dispatch({
			type: FILE_UPLOAD_SUCCESS,
			payload: response.data,
		});
	} catch (e) {
		console.log(e);
		dispatch({
			type: FILE_UPLOAD_FAIL,
			payload: e.response.data,
		});
	}
};

export const listAllFiles = () => async dispatch => {
	dispatch({
		type: FILE_ALL_LOADING,
	});
	try {
		const response = await axios.get(Globals.baseURL + Globals.API.files.all, {
			headers: {Authorization: `Bearer ${localStorage.getItem('token')}`},
		});
		dispatch({
			type: FILE_ALL_SUCCESS,
			payload: response.data,
		});
	} catch (e) {
		console.log(e);
		dispatch({
			type: FILE_ALL_FAIL,
			payload: e.response.data,
		});
	}
};

export const listAllFilesByUser = userID => async dispatch => {
	dispatch({
		type: FILE_USER_LOADING,
	});
	try {
		const response = await axios.get(
			`${Globals.baseURL}${Globals.API.files.allByUser}/${userID}`,
			{
				headers: {Authorization: `Bearer ${localStorage.getItem('token')}`},
			},
		);
		dispatch({
			type: FILE_USER_SUCCESS,
			payload: response.data,
		});
	} catch (e) {
		console.log(e);
		dispatch({
			type: FILE_USER_FAIL,
			payload: e.response.data,
		});
	}
};
