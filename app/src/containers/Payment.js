import React, {useState} from 'react';
import Checkout from '../components/Checkout';
import {
	Grid,
	Paper,
	Typography,
	List,
	ListItem,
	ListItemText,
	Divider,
} from '@material-ui/core/';
import {completaIscrizione, pay} from '../actions';
import {connect} from 'react-redux';
import {withStyles} from '@material-ui/core/styles';
import Globals from '../config/Globals';
import LoadingIcon from '../components/LoadingIcon';
import bgPay from '../assets/images/bg/bg-pay.jpeg';

const styles = theme => ({
	bg: {
		backgroundImage: `url(${bgPay})`,
		filter: 'blur(8px)',
		width: '100%',
		' -webkit-filter': 'blur(8px)',
		backgroundPosition: 'center',
		backgroundRepeat: 'no-repeat',
		backgroundSize: 'cover',
		height: '0',
		paddingTop: '145vh',
	},
	clearBg: {
		marginTop: '62px',
		position: 'absolute',
		width: '100%',
	},

	listItem: {
		padding: `${theme.spacing.unit}px 0`,
	},
	total: {
		fontWeight: '700',
	},
	title: {
		marginTop: theme.spacing.unit * 2,
	},
});

function Payment(props) {
	const {classes} = props;
	const [loading, setLoading] = useState(false);
	const amount = 2000;
	const name = 'Iscrizione annuale';
	const desc = 'Iscrizione per 12 mesi al sito';
	const handleToken = async tkn => {
		if (Object.keys(props.iscrForm.fields).length) {
			const err = await props.completaIscrizione(tkn, props.iscrForm.fields);
			if (err === null) props.history.push(Globals.routes.login);
			return;
		}
		const err = await props.pay(tkn, props.loginForm.user.email);
		if (err === null) props.history.push(Globals.routes.paymentSuccess);
	};

	const error = props.payment.error || props.iscrForm.error;
	return (
		<Grid item container justify="center" spacing={0}>
			<div className={classes.bg} />
			<Grid item xs={6} className={classes.clearBg}>
				<Paper>
					<Grid item container xs={12} justify="center" spacing={40}>
						<Grid item xs={10}>
							<Typography variant="h5">Pagamento</Typography>
						</Grid>
						<Grid item xs={10}>
							<LoadingIcon show={props.iscrForm.loading || loading} />
							{error && (
								<Typography color="error" variant="body1">
									{error}
								</Typography>
							)}
							<Typography variant="subtitle1">
								I pagamenti prima della scadenza dell'iscrizione avranno
								validità dal giorno della scadenza e non dal giorno del
								pagamento.
							</Typography>
						</Grid>
						{!props.iscrForm.loading && !loading && !error && (
							<Grid item xs={9}>
								<Typography variant="h6" gutterBottom>
									Riepilogo:
								</Typography>
								<List disablePadding>
									<ListItem className={classes.listItem}>
										<ListItemText primary={name} secondary={desc} />
										<Typography variant="body2">{amount / 100} €</Typography>
									</ListItem>
									<Divider />
									<ListItem className={classes.listItem}>
										<ListItemText primary="Totale" />
										<Typography variant="subtitle1" className={classes.total}>
											{amount / 100} €
										</Typography>
									</ListItem>
								</List>
							</Grid>
						)}
						<Grid item container xs={9} justify="flex-end">
							<Checkout
								amount={amount}
								desc={desc}
								name={name}
								onToken={handleToken}
								onOpen={() => setLoading(true)}
							/>
						</Grid>
					</Grid>
				</Paper>
			</Grid>
		</Grid>
	);
}

function mapStateToProps({iscrForm, payment, loginForm}) {
	return {iscrForm, payment, loginForm};
}
const composedComponent = connect(
	mapStateToProps,
	{
		pay,
		completaIscrizione,
	},
);

export default withStyles(styles)(composedComponent(Payment));
