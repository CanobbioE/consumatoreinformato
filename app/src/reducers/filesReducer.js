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
import parseError from '../utils/Errors';
import {capitalize} from '../utils/Common';

const INITIAL_STATE = {
	error: '',
	loading: false,
	rows2: [],
	success: false,
	fileDownload: null,
	labels2: ['Documento', 'Utente', 'Data', 'Download'],
};

export default (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case FILE_UPLOAD_LOADING:
			return {...state, loading: true, error: '', success: false};
		case FILE_UPLOAD_FAIL:
			return {...state, loading: false, error: parseError(action.payload)};
		case FILE_UPLOAD_SUCCESS:
			return {
				...state,
				success: true,
				loading: false,
			};

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
			return {
				...state,
				rows2: createRows(action.payload),
				success: true,
				loading: false,
			};

		case FILE_USER_LOADING:
			return {...state, loading: true, error: ''};
		case FILE_USER_FAIL:
			return {
				...state,
				loading: false,
				error: parseError(action.payload),
			};
		case FILE_USER_SUCCESS:
			return {
				...state,
				rows2: createRows(action.payload),
				loading: false,
			};

		default:
			return {...state};
	}
};

function createRows(files) {
	return files.map(file => ({
		fileName: file.fileName,
		uploader: `${capitalize(file.uploader.name)} ${capitalize(
			file.uploader.surname,
		)}`,
		date: file.date,
		download: file.filePath,
	}));
}
