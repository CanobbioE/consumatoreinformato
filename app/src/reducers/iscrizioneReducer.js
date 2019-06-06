import {
	ISCR_POST_FAIL,
	ISCR_POST_SUCCESS,
	ISCR_POST_LOADING,
	ISCR_FIELDS,
} from '../utils/Types';
import parseError from '../utils/Errors';

const INITIAL_STATE = {
	loading: false,
	error: '',
	fields: {},
};

export default (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case ISCR_POST_FAIL:
			return {...state, error: parseError(action.payload), loading: false};
		case ISCR_FIELDS:
			return {...state, loading: false, fields: {...action.payload}};
		case ISCR_POST_SUCCESS:
			return {...state, error: '', loading: false};
		case ISCR_POST_LOADING:
			return {...state, error: '', loading: true};
		default:
			return state;
	}
};
