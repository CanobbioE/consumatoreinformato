import React from 'react';
import {withStyles} from '@material-ui/core/styles';
import {Grid, Typography, Paper} from '@material-ui/core/';
import bgPay from '../assets/images/bg/bg-pay.jpeg';
import done from '../assets/images/done.png';

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
	title: {
		textShadow: '2px 2px 24px #000',
	},
	image: {
		paddingLeft: '47%',
		height: '100px',
	},
});

const PaymentSuccess = props => {
	const {classes} = props;
	return (
		<Grid item container spacing={0} justify="center">
			<div className={classes.bg} />
			<Grid item xs={10} className={classes.clearBg}>
				<Paper>
					<Grid item container xs={12} justify="center" spacing={40}>
						<Grid item xs={10}>
							<Typography align="center" variant="h5">
								Pagamento avvenuto con successo, grazie e buona navigazione.
							</Typography>
						</Grid>
						<Grid item xs={10}>
							<img src={done} alt="done" className={classes.image} />
						</Grid>
					</Grid>
				</Paper>
			</Grid>
		</Grid>
	);
};

export default withStyles(styles)(PaymentSuccess);
