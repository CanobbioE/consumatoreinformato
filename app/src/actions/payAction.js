import axios from 'axios';
import Globals from '../config/Globals';
import {
	PAY_POST_LOADING,
	PAY_POST_FAIL,
	PAY_POST_SUCCESS,
} from '../utils/Types';

export const pay = (tkn, email) => async dispatch => {
	dispatch({
		type: PAY_POST_LOADING,
	});
	try {
		await axios.POST(Globals.baseURL + Globals.API.payment, {stripeToken: tkn});
		dispatch({
			type: PAY_POST_SUCCESS,
		});
		return null;
	} catch (e) {
		console.log(e);
		dispatch({
			type: PAY_POST_FAIL,
			payload: e.response.data,
		});
		return e.response.data;
	}
};
