import axios from 'axios';
import Globals from '../config/Globals';
import {
	FILE_UPLOAD_LOADING,
	FILE_UPLOAD_FAIL,
	FILE_UPLOAD_SUCCESS,
	FILE_DOWNLOAD_LOADING,
	FILE_DOWNLOAD_FAIL,
	FILE_DOWNLOAD_SUCCESS,
	FILE_ALL_LOADING,
	FILE_ALL_FAIL,
	FILE_ALL_SUCCESS,
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

export const downloadFile = fileName => async dispatch => {
	dispatch({
		type: FILE_DOWNLOAD_LOADING,
	});
	try {
		const response = await axios.get(
			`${Globals.baseURL}${Globals.API.files.download}?fileName=${fileName}`,
			{
				headers: {Authorization: `Bearer ${localStorage.getItem('token')}`},
			},
		);
		console.log(response.data);
		dispatch({
			type: FILE_DOWNLOAD_SUCCESS,
			payload: response,
		});
	} catch (e) {
		console.log(e);
		dispatch({
			type: FILE_DOWNLOAD_FAIL,
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
		console.log(response.data);
		dispatch({
			type: FILE_ALL_SUCCESS,
			payload: response,
		});
	} catch (e) {
		console.log(e);
		dispatch({
			type: FILE_ALL_FAIL,
			payload: e.response.data,
		});
	}
};
