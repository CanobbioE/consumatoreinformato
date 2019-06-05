import axios from 'axios';
import {
	ISCR_POST_FAIL,
	ISCR_POST_SUCCESS,
	ISCR_POST_LOADING,
	ISCR_FIELDS,
} from '../utils/Types';
import Globals from '../config/Globals';

export const iscrizione = fields => {
	return {
		type: ISCR_FIELDS,
		payload: fields,
	};
};

export const completaIscrizione = (tkn, fields) => async dispatch => {
	dispatch({
		type: ISCR_POST_LOADING,
	});
	try {
		const registrationDTO = {
			name: fields.name,
			surname: fields.surname,
			birthday: fields.date,
			birthplace: fields.luogo,
			codiceFiscale: fields.cf,
			homeAddress: fields.res,
			email: fields.mail,
			telephoneNumber: fields.tel,
			password: fields.pwd,
			stripeToken: tkn.id,
		};

		await axios.post(Globals.baseURL + Globals.API.register, registrationDTO);
		dispatch({
			type: ISCR_POST_SUCCESS,
		});
	} catch (e) {
		console.log(e);
		dispatch({
			type: ISCR_POST_FAIL,
			payload: e.response.data,
		});
	}
};
