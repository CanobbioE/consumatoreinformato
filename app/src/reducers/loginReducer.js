import {
	LOGIN_POST_FAIL,
	LOGIN_POST_SUCCESS,
	LOGIN_POST_LOADING,
	LOGIN_GET_FAIL,
	LOGIN_GET_SUCCESS,
	LOGIN_GET_LOADING,
	LOGOUT_SUCCESS,
} from '../utils/Types';
import {getUser} from '../utils/Common';

const INITIAL_STATE = {
	loading: false,
	error: '',
	user: getUser(),
	token: localStorage.getItem('token') || '',
};

export default (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case LOGIN_POST_FAIL:
			return {...state, error: action.payload, loading: false};
		case LOGIN_POST_SUCCESS:
			return {...state, error: '', loading: false, token: action.payload};
		case LOGIN_POST_LOADING:
			return {...state, loading: true};
		case LOGIN_GET_FAIL:
			return {...state, loading: false, error: action.payload};
		case LOGIN_GET_SUCCESS:
			return {...state, loading: false, user: action.payload};
		case LOGIN_GET_LOADING:
			return {...state, loading: true};
		case LOGOUT_SUCCESS:
			return {...state, loading: false, error: '', user: null, token: ''};
		default:
			return state;
	}
};
