import React from 'react';
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
import {completaIscrizione} from '../actions';
import {connect} from 'react-redux';
import {withStyles} from '@material-ui/core/styles';
import Globals from '../config/Globals';
import LoadingIcon from '../components/LoadingIcon';

const styles = theme => ({
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
	const amount = 2000;
	const name = 'Iscrizione annuale';
	const desc = 'Iscrizione per 12 mesi al sito';
	const handleToken = async tkn => {
		if (props.iscrForm.fields) {
			await props.completaIscrizione(tkn, props.iscrForm.fields);
			props.history.push(Globals.routes.login);
			return;
		}
		await props.pay(tkn, props.loginForm.user.email);
		// TODO: redirect to payment success page
		props.history.push(Globals.routes.home);
	};
	return (
		<Grid item container justify="center" spacing={0}>
			<Grid item xs={6} style={{marginTop: '24px'}}>
				<Paper>
					<Grid item container xs={12} justify="center" spacing={40}>
						<Grid item xs={10}>
							<Typography variant="h5">Pagamento</Typography>
						</Grid>
						<LoadingIcon show={props.iscrForm.loading} />
						{!props.iscrForm.loading && (
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
							/>
						</Grid>
					</Grid>
				</Paper>
			</Grid>
		</Grid>
	);
}

function mapStateToProps({iscrForm}) {
	return {iscrForm};
}
const composedComponent = connect(
	mapStateToProps,
	{
		completaIscrizione,
	},
);

export default withStyles(styles)(composedComponent(Payment));
