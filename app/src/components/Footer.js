import React from 'react';
import {withStyles} from '@material-ui/core/styles';
import {Grid, Button} from '@material-ui/core';
import {Link} from 'react-router-dom';
import Globals from '../config/Globals';

const styles = theme => ({
	footer: {
		backgroundColor: theme.palette.secondary.main,
		marginTop: theme.spacing.unit * 8,
		position: 'fixed',
		bottom: 0,
		width: '100%',
	},
});

const Footer = props => {
	const {classes} = props;
	return (
		<footer className={classes.footer}>
			<Grid container justify="center" alignItems="center" direction="column">
				<Grid item xs={10}>
					<Button component={Link} to={Globals.routes.contatti} color="inherit">
						Sedi
					</Button>
					|
					<Button component={Link} to={Globals.routes.collabs} color="inherit">
						Collaboratori
					</Button>
					|
					<Button component={Link} to={Globals.routes.gdpr} color="inherit">
						Informativa Privacy
					</Button>
				</Grid>
			</Grid>
		</footer>
	);
};

export default withStyles(styles)(Footer);
