import {
	ADMIN_GET_USERS_SUCCESS,
	ADMIN_GET_USERS_FAIL,
	ADMIN_GET_USERS_LOADING,
} from '../utils/Types';
import {getUser, capitalize} from '../utils/Common';
import parseError from '../utils/Errors';

const INITIAL_STATE = {
	loading: false,
	error: '',
	rows: [],
	labels1: ['ID', 'Nome', 'Cognome', 'E-mail', 'Ultimo pagamento', 'Chat'],
};

export default (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case ADMIN_GET_USERS_SUCCESS:
			return {
				...state,
				rows: createRows(action.payload, state),
				loading: false,
			};
		case ADMIN_GET_USERS_FAIL:
			return {...state, error: parseError(action.payload), loading: false};
		case ADMIN_GET_USERS_LOADING:
			return {...state, loading: true};
		default:
			return {...state};
	}
};

function createRows(users, state) {
	const rows = [];
	users.forEach(user => {
		if (user.email !== getUser().email)
			rows.push({
				id: user.id,
				name: capitalize(user.name),
				surname: capitalize(user.surname),
				email: user.email,
				lastPayDate:
					user.payments && user.payments.length
						? user.payments[user.payments.length - 1].date
						: [],
				btn: state.new
					? `Contatta (nuovi messaggi: ${state.new[user.id]})`
					: 'Contatta',
			});
	});
	return rows;
}
