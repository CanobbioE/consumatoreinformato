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
import parseError from '../utils/Errors';

const INITIAL_STATE = {
	error: '',
	loading: false,
	files: [],
	success: false,
	fileDownload: null,
};

export default (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case FILE_UPLOAD_LOADING:
			return {...state, loading: true, error: '', success: false};
		case FILE_UPLOAD_FAIL:
			return {...state, loading: false, error: parseError(action.payload)};
		case FILE_UPLOAD_SUCCESS:
			return {...state, success: true};

		case FILE_DOWNLOAD_LOADING:
			return {...state, loading: true, error: '', success: false};
		case FILE_DOWNLOAD_FAIL:
			return {
				...state,
				loading: false,
				error: parseError(action.payload),
				success: false,
			};
		case FILE_DOWNLOAD_SUCCESS:
			return {...state, fileDownload: action.payload, success: true};

		case FILE_ALL_LOADING:
			return {...state, loading: true, error: '', success: false};
		case FILE_ALL_FAIL:
			return {
				...state,
				loading: false,
				error: parseError(action.payload),
				success: false,
			};
		case FILE_ALL_SUCCESS:
			return {...state, files: [...state.files, action.payload], success: true};

		default:
			return {...state};
	}
};
