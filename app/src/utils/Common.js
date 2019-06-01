Date.daysBetween = (d1, d2) => {
	const one_day = 1000 * 60 * 60 * 24;
	const difference_ms = d1.getTime() - d2.getTime();
	return Math.round(difference_ms / one_day);
};

export const getUser = () => {
	const su = localStorage.getItem('user');
	if (su) return JSON.parse(su);
	return null;
};
