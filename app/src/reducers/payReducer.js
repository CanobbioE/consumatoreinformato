import {
	PAY_POST_LOADING,
	PAY_POST_FAIL,
	PAY_POST_SUCCESS,
} from '../utils/Types';
import parseError from '../utils/Errors';

const INITIAL_STATE = {
	loading: false,
	error: '',
};

export default (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case PAY_POST_LOADING:
			return {...state, loading: true};
		case PAY_POST_FAIL:
			return {...state, loading: false, error: parseError(action.payload)};
		case PAY_POST_SUCCESS:
			return {...state, loading: false, error: ''};
		default:
			return {...state};
	}
};
