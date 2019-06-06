import React from 'react';
import {withStyles} from '@material-ui/core/styles';
import {Grid, Typography, Paper} from '@material-ui/core/';
import bgPrivacy from '../assets/images/bg/bg-privacy.jpeg';
import gdpr from '../utils/gdpr';

const styles = theme => ({
	bg: {
		backgroundImage: `url(${bgPrivacy})`,
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
		textShadow: '2px 2px 24px #fff',
	},
	list: {
		margin: theme.spacing.unit * 2,
		padding: theme.spacing.unit * 8,
	},
});

const Privacy = props => {
	const {classes} = props;
	return (
		<Grid item container spacing={0} justify="center">
			<div className={classes.bg} />
			<Grid item xs={10} className={classes.clearBg}>
				<Grid item container xs={12} justify="center" spacing={40}>
					<Grid item xs={10}>
						<Typography variant="h4" className={classes.title}>
							Informativa sulla privacy
						</Typography>
					</Grid>
					<Grid item xs={10} className={classes.list}>
						<Paper
							className={classes.list}
							style={{overflowY: 'scroll', maxHeight: '75vh'}}>
							{gdpr()}
						</Paper>
					</Grid>
				</Grid>
			</Grid>
		</Grid>
	);
};
export default withStyles(styles)(Privacy);
