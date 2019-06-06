import {
	ARTICLE_GET_LOADING,
	ARTICLE_GET_FAIL,
	ARTICLE_GET_SUCCESS,
	ARTICLE_POST_LOADING,
	ARTICLE_POST_FAIL,
	ARTICLE_POST_SUCCESS,
	ARTICLE_PATCH_LOADING,
	ARTICLE_PATCH_FAIL,
	ARTICLE_PATCH_SUCCESS,
} from '../utils/Types';
import parseError from '../utils/Errors';

const INITIAL_STATE = {
	loading: false,
	error: '',
	articles: [],
};

export default (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case ARTICLE_GET_LOADING:
			return {...state, error: '', loading: true};
		case ARTICLE_GET_FAIL:
			return {...state, error: parseError(action.payload), loading: false};
		case ARTICLE_GET_SUCCESS:
			return {...state, loading: false, articles: action.payload};

		case ARTICLE_POST_LOADING:
			return {...state, error: '', loading: true};
		case ARTICLE_POST_FAIL:
			return {...state, error: parseError(action.payload), loading: false};
		case ARTICLE_POST_SUCCESS:
			return {...state, loading: false};

		case ARTICLE_PATCH_LOADING:
			return {...state, error: '', loading: true};
		case ARTICLE_PATCH_FAIL:
			return {...state, error: parseError(action.payload), loading: false};
		case ARTICLE_PATCH_SUCCESS:
			return {...state, loading: false};
		default:
			return state;
	}
};
