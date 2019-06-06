import {
	ADMIN_GET_USERS_SUCCESS,
	ADMIN_GET_USERS_FAIL,
	ADMIN_GET_USERS_LOADING,
} from '../utils/Types';
import {getUser} from '../utils/Common';
import parseError from '../utils/Errors';

const INITIAL_STATE = {
	loading: false,
	error: '',
	rows: [],
	labels: ['ID', 'Nome', 'Cognome', 'Ultimo pagamento'],
};

export default (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case ADMIN_GET_USERS_SUCCESS:
			return {...state, rows: createRows(action.payload), loading: false};
		case ADMIN_GET_USERS_FAIL:
			return {...state, error: parseError(action.payload), loading: false};
		case ADMIN_GET_USERS_LOADING:
			return {...state, loading: true};
		default:
			return {...state};
	}
};

function createRows(users) {
	return users.map(
		user =>
			user.email !== getUser().email && {
				id: user.id,
				name: user.name,
				surname: user.surname,
				lastPayDate: user.payments[user.payments.length - 1].date,
			},
	);
}
