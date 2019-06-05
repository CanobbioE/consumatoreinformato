import React from 'react';
import {connect} from 'react-redux';
import {withStyles} from '@material-ui/core/styles';
import {AppBar, Toolbar, Typography, Button} from '@material-ui/core';
import {Link} from 'react-router-dom';
import Globals from '../config/Globals';
import {logout} from '../actions';
import Bell from './Bell';
import {isAdmin, lastPayment} from '../utils/Common';

const styles = {
	root: {
		flexGrow: 1,
		marginBottom: '10px',
	},
	grow: {
		flexGrow: 1,
	},
	menuButton: {
		right: '24px',
		position: 'absolute',
		display: 'flex',
	},
};
function NavBar(props) {
	const {classes} = props;

	const logBtn =
		props.loginForm.token === '' ? (
			<Button component={Link} to={Globals.routes.login} color="inherit">
				Accedi
			</Button>
		) : (
			<Button
				component={Link}
				to={Globals.routes.login}
				onClick={props.logout}
				color="inherit">
				Esci
			</Button>
		);
	console.log(props);

	const bell =
		props.loginForm.token !== '' && !isAdmin(props.loginForm.user) ? (
			<Bell lastPayment={lastPayment(props.loginForm.user)} />
		) : null;

	return (
		<div className={classes.root}>
			<AppBar position="static" color="primary">
				<Toolbar>
					<Typography variant="h6" color="inherit">
						<Button component={Link} to={Globals.routes.home} color="inherit">
							Home
						</Button>

						{props.loginForm.token === '' && (
							<Button
								component={Link}
								to={Globals.routes.iscrizione}
								color="inherit">
								Iscrizione
							</Button>
						)}
						<Button component={Link} to={Globals.routes.about} color="inherit">
							Chi siamo
						</Button>
						<Button
							component={Link}
							to={Globals.routes.contatti}
							color="inherit">
							Contatti
						</Button>

						{props.loginForm.token !== '' &&
							props.loginForm.user &&
							!isAdmin(props.loginForm.user) && (
								<Button
									component={Link}
									to={Globals.routes.personal}
									color="inherit">
									Area Pesonale
								</Button>
							)}
						{isAdmin(props.loginForm.user) && (
							<Button
								component={Link}
								to={Globals.routes.admin}
								color="inherit">
								Amministrazione
							</Button>
						)}
					</Typography>

					<div className={classes.menuButton}>
						{bell}
						{logBtn}
					</div>
				</Toolbar>
			</AppBar>
		</div>
	);
}

function mapStateToProps({loginForm}) {
	return {loginForm};
}

const composedComponent = connect(
	mapStateToProps,
	{
		logout,
	},
);

export default withStyles(styles)(composedComponent(NavBar));
