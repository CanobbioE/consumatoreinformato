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
import Globals from '../config/Globals';
import axios from 'axios';

export const fetchArticles = () => async dispatch => {
	dispatch({
		type: ARTICLE_GET_LOADING,
	});
	try {
		// todo axios get
		const response = await axios.get(
			Globals.baseURL + Globals.API.articles.getAll,
		);
		dispatch({
			type: ARTICLE_GET_SUCCESS,
			payload: response.data,
		});
	} catch (e) {
		console.log(e);
		dispatch({
			type: ARTICLE_GET_FAIL,
			payload: e.response.data,
		});
	}
};

export const postArticle = (title, image, content) => async dispatch => {
	dispatch({
		type: ARTICLE_POST_LOADING,
	});
	try {
		await axios.post(
			Globals.baseURL + Globals.API.articles.post,
			{title, image, content},
			{
				headers: {
					Authorization: `Bearer ${localStorage.getItem('token')}`,
				},
			},
		);
		dispatch({
			type: ARTICLE_POST_SUCCESS,
		});
	} catch (e) {
		console.log(e);
		dispatch({
			type: ARTICLE_POST_FAIL,
			payload: e.response.data,
		});
	}
};

export const patchArticle = (title, image, content, id) => async dispatch => {
	dispatch({
		type: ARTICLE_PATCH_LOADING,
	});
	try {
		await axios.patch(
			Globals.baseURL + Globals.API.articles.edit,
			{id, title, content, image},
			{
				headers: {
					Authorization: `Bearer ${localStorage.getItem('token')}`,
				},
			},
		);
		dispatch({
			type: ARTICLE_PATCH_SUCCESS,
		});
	} catch (e) {
		console.log(e);
		dispatch({
			type: ARTICLE_PATCH_FAIL,
			payload: e.response.data,
		});
	}
};
