Date.daysBetween = (d1, d2) => {
	const one_day = 1000 * 60 * 60 * 24;
	const difference_ms = d1.getTime() - d2.getTime();
	return Math.round(difference_ms / one_day);
};

/*
 * User structure:
 * id: 0
 * birthday: ""
 * birthplace: ""
 * codiceFiscale: ""
 * email: ""
 * homeAddress: ""
 * name: ""
 * payments: [{...}]
 * roles: []
 * surname: ""
 * telephoneNumber: ""
 * uploads: [{...}]
 */
export const getUser = () => {
	const su = localStorage.getItem('user');
	if (su) return JSON.parse(su);
	return null;
};

export const isAdmin = user => {
	return (
		user && user.roles && user.roles.length && user.roles.includes('ROLE_ADMIN')
	);
};

export const lastPayment = user => {
	if (!user || !user.payments || !user.payments.length)
		return new Date('1994-03-23');
	return user.payments[user.payments.length - 1];
};

export const capitalize = s => {
	return `${s.substr(0, 1).toUpperCase()}${s.substr(1)}`;
};
