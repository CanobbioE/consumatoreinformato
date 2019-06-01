export function sleep(ms) {
	return new Promise(resolve => setTimeout(resolve, ms));
}

export const lorem = `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?
`;

export const articles = [
	{
		id: 0,
		title: 'Titolo articolo',
		content: lorem,
		date: new Date().toLocaleDateString(),
		tags: ['finanza', 'risparmi', 'banca'],
	},
	{
		id: 1,
		title: 'Titolo articolo',
		content: lorem,
		date: new Date().toLocaleDateString(),
		tags: ['finanza', 'risparmi', 'banca'],
	},
	{
		id: 2,
		title: 'Titolo articolo',
		content: lorem,
		date: new Date().toLocaleDateString(),
		tags: ['finanza', 'risparmi', 'banca'],
	},
	{
		id: 5,
		title: 'Titolo articolo',
		content: lorem,
		date: new Date().toLocaleDateString(),
		tags: ['finanza', 'risparmi', 'banca'],
	},
	{
		id: 3,
		title: 'Titolo articolo',
		content: lorem,
		date: new Date().toLocaleDateString(),
		tags: ['finanza', 'risparmi', 'banca'],
	},
	{
		id: 4,
		title: 'Titolo articolo',
		content: lorem,
		date: new Date().toLocaleDateString(),
		tags: ['finanza', 'risparmi', 'banca'],
	},
];

const files = [
	{
		name: 'file1.pdf',
		uploaded: new Date(),
	},
	{
		name: 'file2.pdf',
		uploaded: new Date(),
	},
	{
		name: 'file3.pdf',
		uploaded: new Date(),
	},
];

const payms = [
	{
		date: new Date().toLocaleString(),
		amount: 2000,
	},
	{
		date: new Date().toLocaleString(),
		amount: 2000,
	},
	{
		date: new Date().toLocaleString(),
		amount: 2000,
	},
];

export const rows = [
	{
		id: 1,
		date: new Date().toLocaleDateString(),
		client: 'Gino Maurino',
		state: 'Aperto',
	},
	{
		id: 2,
		date: new Date().toLocaleDateString(),
		client: 'Gino Pino',
		state: 'Aperto',
	},
	{
		id: 3,
		date: new Date().toLocaleDateString(),
		client: 'Mauro Maurino',
		state: 'Chiuso',
	},
	{
		id: 4,
		date: new Date().toLocaleDateString(),
		client: 'Pino Maurino',
		state: 'Aperto',
	},
];

export const labels = ['ID', 'Data', 'Cliente', 'Stato'];

export const users = {
	'a@a.com': {
		name: 'gino',
		surname: 'pino',
		role: 'admin',
		lastPayment: new Date('2018-05-25'),
		payments: payms,
		files: files,
		email: 'a@a.com',
	},
	'b@b.com': {
		name: 'tino',
		surname: 'mino',
		role: 'user',
		lastPayment: new Date('2018-05-25'),
		payments: payms,
		files: files,
		email: 'b@b.com',
	},
	'c@c.com': {
		name: 'beppe',
		surname: 'peppe',
		role: 'user',
		lastPayment: new Date(),
		payments: payms,
		files: files,
		email: 'c@c.com',
	},
};
