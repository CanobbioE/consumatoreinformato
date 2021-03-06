import React from 'react';
import {connect} from 'react-redux';
import {withStyles} from '@material-ui/core/styles';
import {AppBar, Toolbar, Typography, Button} from '@material-ui/core';
import {Link} from 'react-router-dom';
import Globals from '../config/Globals';
import {logout, setTimer} from '../actions';
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
	const handleLogout = () => {
		props.logout();
		window.clearInterval(props.chat.intervalID);
		props.setTimer(false);
	};

	const logBtn =
		props.loginForm.token === '' ? (
			<Button component={Link} to={Globals.routes.login} color="inherit">
				Accedi
			</Button>
		) : (
			<Button
				component={Link}
				to={Globals.routes.login}
				onClick={handleLogout}
				color="inherit">
				Esci
			</Button>
		);

	const bell =
		props.loginForm.token !== '' && !isAdmin(props.loginForm.user) ? (
			<Bell lastPayment={lastPayment(props.loginForm.user)} />
		) : (
			<Bell newMessages={props.chat.newMessagesList} />
		);

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
						<Button
							color="inherit"
							onClick={() =>
								window.open('http://www.consumatoreinformato.blogspot.com')
							}>
							Blog
						</Button>
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

function mapStateToProps({loginForm, chat}) {
	return {loginForm, chat};
}

const composedComponent = connect(
	mapStateToProps,
	{
		logout,
		setTimer,
	},
);

export default withStyles(styles)(composedComponent(NavBar));
