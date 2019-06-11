export default class Globals {
	static port = '8080';
	static baseURL = `${window.location.protocol}//${window.location.hostname}:${
		Globals.port
	}/app-service`;

	static stripeKey = 'pk_test_8UVonGHHfGmbESE24HpuSo6z';

	// All the APIs endpoints
	static API = {
		login: '/users/login',
		refreshJWT: '/users/regenerate-token',
		register: '/users/register',
		payment: '/payments/pay',
		userData: {
			current: '/users/current',
			all: '/users/all',
		},
		articles: {
			getAll: '/articles/all',
			edit: '/articles/edit',
			post: '/articles/create',
		},
		files: {
			upload: '/files/upload',
			all: '/files/all',
			allByUser: '/files/all-by-user',
			download: '/files/download',
		},
	};

	// All the routes in this app
	static routes = {
		home: '/',
		about: '/chi-siamo',
		contatti: '/contatti',
		iscrizione: '/iscrizione',
		login: '/login',
		payment: '/pagamento',
		personal: '/area-personale',
		admin: '/amministrazione/',
		collabs: '/collaboratori',
		gdpr: '/privacy',
		paymentSuccess: '/pagamento/successo',
	};
}
