import axios from 'axios';
import Globals from '../config/Globals';

export const pay = (tkn, email) => async dispatch => {
	try {
		await axios.POST(Globals.baseURL + Globals.API.payment, {stripeToken: tkn});
	} catch (e) {
		console.log(e);
	}
};
