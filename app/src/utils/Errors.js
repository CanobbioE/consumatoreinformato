export default error => {
	const code = error.code;
	const params = Object.values(error.params);
	return (
		{
			EMAIL_ALREADY_REGISTERED: `L'e-mail ${
				params.length ? params[0] : ''
			} è già in uso`,
			INVALID_TOKEN: 'Operazione non autorizzata',
			NOT_AUTHENTICATED: 'Non sei autenticato',
			PAYMENT_FAILED: `Pagamento fallito (status: ${
				params.length ? params[0] : ''
			}`,
			USER_NOT_FOUND: `Utente ${params[0]} non trovato`,
			WRONG_PASSWORD: `Password non corretta`,
		}[code] || 'Si è verificato un errore inaspettato'
	);
};
