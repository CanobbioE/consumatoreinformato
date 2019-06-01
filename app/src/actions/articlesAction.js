import {articles, sleep} from '../utils/mock';
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

export const fetchArticles = () => async dispatch => {
	dispatch({
		type: ARTICLE_GET_LOADING,
	});
	try {
		// todo axios get
		const response = articles;
		await sleep(900);
		dispatch({
			type: ARTICLE_GET_SUCCESS,
			payload: response,
		});
	} catch (e) {
		console.log(e);
		dispatch({
			type: ARTICLE_GET_FAIL,
			payload: e,
		});
	}
};

export const postArticle = (title, image, content) => async dispatch => {
	dispatch({
		type: ARTICLE_POST_LOADING,
	});
	try {
		// todo axios post
		await sleep(900);
		dispatch({
			type: ARTICLE_POST_SUCCESS,
		});
	} catch (e) {
		console.log(e);
		dispatch({
			type: ARTICLE_POST_FAIL,
			payload: e,
		});
	}
};

export const patchArticle = (title, image, content, id) => async dispatch => {
	dispatch({
		type: ARTICLE_PATCH_LOADING,
	});
	try {
		// todo axios post
		console.log('posting', title, image, content, id);
		await sleep(900);
		dispatch({
			type: ARTICLE_PATCH_SUCCESS,
		});
	} catch (e) {
		console.log(e);
		dispatch({
			type: ARTICLE_PATCH_FAIL,
			payload: e,
		});
	}
};
