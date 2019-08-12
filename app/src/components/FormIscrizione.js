import React, {useState} from 'react';
import {TextField, Grid, Checkbox} from '@material-ui/core';
import FormStepper from './FormStepper';
import MyDatePicker from './MyDatePicker';
import gdpr from '../utils/gdpr';

export default function FormIscrizione(props) {
	const [name, setName] = useState('');
	const [surname, setSurname] = useState('');
	const [date, setDate] = useState(new Date());
	const [luogo, setLuogo] = useState('');
	const [cf, setCF] = useState('');
	const [res, setRes] = useState('');
	const [cap, setCap] = useState('');
	const [com, setCom] = useState('');
	const [mail, setMail] = useState('');
	const [confMail, setConfMail] = useState('');
	const [tel, setTel] = useState('');
	const [pwd, setPwd] = useState('');
	const [confPwd, setConfPwd] = useState('');
	const [error, setError] = useState(null);
	const [touched, setTouched] = useState([false, false, false, false]);
	const [gdprAccepted, setGdpr] = useState(false);

	const handleSubmit = event => {
		event.preventDefault();
		props.onSubmit({
			name,
			surname,
			date,
			luogo,
			cf,
			res,
			mail,
			tel,
			pwd,
		});
	};

	const handleChange = (event, fx, verifier = null, step) => {
		setTouchedEnch(step, true);
		const val = event.target.value;
		fx(val);
		if (verifier) {
			const err = verifier(val);
			setError(err);
		}
	};

	const handleCheck = (fx, step, verifier = null) => e => {
		setTouchedEnch(step, true);
		const val = e.target.checked;
		fx(val);
		if (verifier) {
			const err = verifier(val);
			setError(err);
		}
	};

	const checkConfMail = s =>
		s !== mail ? 'Gli indirizzi e-mail non corrispondono' : null;
	const checkTel = s =>
		s === '' ? 'Inserisci un numero di telefono valido' : null;
	const checkConfPwd = s =>
		s !== pwd ? 'Le password non corrispondono' : null;
	const checkLuogo = s => (s === '' ? 'Inserisci un luogo di nascita' : null);
	const checkRes = s => (s === '' ? 'Inserisci una residenza valida' : null);
	const checkSurname = s => (s === '' ? 'Inserisci il tuo cognome' : null);
	const checkCom = s => (s === '' ? 'Inserisci un comune italiano' : null);
	const checkPwd = s => (s.length < 6 ? 'Password troppo corta' : null);
	const checkName = s => (s === '' ? 'Inserisci il tuo nome' : null);
	const checkDate = s => {
		if (
			s === null ||
			s.valueOf() >= new Date().valueOf() ||
			new Date().getFullYear() - s.getFullYear() <= 10
		)
			return 'Inserisci una data di nascita corretta';
	};
	const checkMail = s => {
		const re = /^([a-zA-Z0-9_\-.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
		if (!re.test(s)) return 'Indirizzo e-mail non valido';
		return null;
	};

	const checkCF = s => {
		const re = /^[A-Za-z]{6}[0-9]{2}[A-Za-z]{1}[0-9]{2}[A-Za-z]{1}[0-9]{3}[A-Za-z]{1}$/;
		if (!re.test(s)) return 'Codice fiscale non valido';
		return null;
	};

	const checkCAP = s =>
		s.length !== 5 || parseInt(s) > 98200 || parseInt(s) < 0
			? 'Inserisci un CAP valido'
			: null;

	const setTelEnch = s => {
		const re = /\d/;
		if (re.test(s.charAt(s.length - 1))) setTel(s);
		if (s.charAt(s.length - 1) === '') setTel(s);
	};

	const setCFEnch = s => setCF(s.toUpperCase());

	const setCapEnch = s => {
		const re = /\d/;
		if (re.test(s.charAt(s.length - 1))) setCap(s);
		if (s.charAt(s.length - 1) === '') setCap(s);
	};

	const steps = [
		<Grid item container xs={12} justify="center" spacing={8}>
			<Grid item xs={12} style={{overflowY: 'scroll', maxHeight: '50vh'}}>
				{gdpr()}
				<Checkbox
					checked={gdprAccepted}
					onChange={handleCheck(setGdpr, 0)}
					value="gdpr"
					color="primary"
				/>
				Confermo di aver letto e compreso l'informativa.
			</Grid>
		</Grid>,
		<Grid item container xs={12} justify="center" spacing={8}>
			<Grid item xs={7}>
				<TextField
					id={'name'}
					fullWidth
					required={!props.skippable}
					label={'Nome'}
					value={name}
					type="text"
					onChange={e => handleChange(e, setName, checkName, 1)}
					margin="dense"
					variant="outlined"
				/>
			</Grid>

			<Grid item xs={7}>
				<TextField
					fullWidth
					required={!props.skippable}
					id={'surname'}
					variant="outlined"
					label={'Cognome'}
					value={surname}
					type="text"
					onChange={e => handleChange(e, setSurname, checkSurname, 1)}
					margin="dense"
				/>
			</Grid>
			<Grid item xs={7}>
				<MyDatePicker
					label={'Data di nascita'}
					value={date}
					onChange={e => handleChange(e, setDate, checkDate, 1)}
				/>
			</Grid>
			<Grid item xs={7}>
				<TextField
					required={!props.skippable}
					fullWidth
					id={'place'}
					label={'Luogo di nascita'}
					value={luogo}
					onChange={e => handleChange(e, setLuogo, checkLuogo, 1)}
					variant="outlined"
					margin="dense"
				/>
			</Grid>
			<Grid item xs={7}>
				<TextField
					required={!props.skippable}
					fullWidth
					variant="outlined"
					id={'cf'}
					label={'Codice fiscale'}
					value={cf}
					type="text"
					onChange={e => handleChange(e, setCFEnch, checkCF, 1)}
					margin="dense"
				/>
			</Grid>
		</Grid>,
		<Grid item container xs={12} justify="center" spacing={8}>
			<Grid item xs={5}>
				<TextField
					required={!props.skippable}
					fullWidth
					variant="outlined"
					id={'home'}
					label={'Indirizzo di residenza'}
					value={res}
					type="text"
					onChange={e => handleChange(e, setRes, checkRes, 2)}
					margin="dense"
				/>
			</Grid>
			<Grid item xs={2}>
				<TextField
					required={!props.skippable}
					fullWidth
					variant="outlined"
					id={'cap'}
					label={'C.A.P.'}
					value={cap}
					type="text"
					onChange={e => handleChange(e, setCapEnch, checkCAP, 2)}
					margin="dense"
				/>
			</Grid>
			<Grid item xs={7}>
				<TextField
					required={!props.skippable}
					fullWidth
					variant="outlined"
					id={'com'}
					label={'Comune di residenza'}
					value={com}
					type="text"
					onChange={e => handleChange(e, setCom, checkCom, 2)}
					margin="dense"
				/>
			</Grid>
			<Grid item xs={7}>
				<TextField
					required
					fullWidth
					variant="outlined"
					id={'email'}
					label={'Indirizzo e-mail'}
					value={mail}
					type="email"
					onChange={e => handleChange(e, setMail, checkMail, 2)}
					margin="dense"
				/>
			</Grid>
			<Grid item xs={7}>
				<TextField
					required
					fullWidth
					variant="outlined"
					id={'confmail'}
					label={'Conferma eindirizzo e-mail'}
					value={confMail}
					type="email"
					onChange={e => handleChange(e, setConfMail, checkConfMail, 2)}
					margin="dense"
				/>
			</Grid>
			<Grid item xs={7}>
				<TextField
					required={!props.skippable}
					fullWidth
					variant="outlined"
					id={'tel'}
					label={'Numero di telefono'}
					value={tel}
					type="text"
					onChange={e => handleChange(e, setTelEnch, checkTel, 2)}
					margin="dense"
				/>
			</Grid>
		</Grid>,
		<Grid item container xs={12} justify="center" spacing={8}>
			<Grid item xs={7}>
				<TextField
					required
					fullWidth
					variant="outlined"
					id={'pwd'}
					label={'Password'}
					value={pwd}
					type="password"
					onChange={e => handleChange(e, setPwd, checkPwd, 3)}
					margin="dense"
				/>
			</Grid>
			<Grid item xs={7}>
				<TextField
					required
					fullWidth
					id={'confpwd'}
					label={'Conferma la password'}
					variant="outlined"
					value={confPwd}
					type="password"
					onChange={e => handleChange(e, setConfPwd, checkConfPwd, 3)}
					margin="dense"
				/>
			</Grid>
		</Grid>,
	];

	const setTouchedEnch = (i, v) => {
		const tmp = [...touched];
		tmp[i] = v;
		setTouched(tmp);
	};
	const stepsLabels = ['Privacy', 'Dati anagrafici', 'Contatti', 'Credenziali'];

	const stepValidators = [
		() => !gdprAccepted,
		() =>
			checkName(name) ||
			checkSurname(surname) ||
			checkDate(date) ||
			checkLuogo(luogo) ||
			checkCF(cf) ||
			null,
		() =>
			checkRes(res) ||
			checkCAP(cap) ||
			checkCom(com) ||
			checkMail(mail) ||
			checkConfMail(confMail) ||
			checkTel(tel) ||
			null,
		() => checkPwd(pwd) || checkConfPwd(confPwd) || null,
	];

	return (
		<FormStepper
			disablePaper={props.disablePaper}
			skippable={props.skippable}
			loading={props.loading}
			steps={steps}
			stepsLabels={stepsLabels}
			onSubmit={handleSubmit}
			error={error}
			stepValidators={stepValidators}
			setTouched={setTouchedEnch}
			touched={touched}
			title={props.title}
		/>
	);
}
