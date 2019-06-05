import React from 'react';
import {connect} from 'react-redux';
import FormLogin from '../components/FormLogin';
import {Grid} from '@material-ui/core/';
import {login, fetchCurrentUserData} from '../actions';
import Globals from '../config/Globals';
import {withStyles} from '@material-ui/core/styles';
import bgLogin from '../assets/images/bg/bg-login.jpeg';

const styles = theme => ({
	bg: {
		backgroundImage: `url(${bgLogin})`,
		filter: 'blur(8px)',
		width: '100%',
		' -webkit-filter': 'blur(8px)',
		backgroundPosition: 'center',
		backgroundRepeat: 'no-repeat',
		backgroundSize: 'cover',
		height: '0',
		paddingTop: '100vh',
	},
	clearBg: {
		marginTop: '42px',
		position: 'absolute',
		width: '100%',
	},
});

function Login(props) {
	const handleSubmit = async (mail, pwd) => {
		let err = await props.login(mail, pwd);
		if (err) return;
		err = await props.fetchCurrentUserData();
		if (err) return;
		props.history.push(Globals.routes.home);
	};
	const {classes} = props;
	return (
		<Grid item container spacing={0} justify="center">
			<div className={classes.bg} />
			<Grid item xs={4} className={classes.clearBg}>
				<FormLogin
					onSubmit={handleSubmit}
					loading={props.loginForm.loading}
					error={props.loginForm.error}
				/>
			</Grid>
		</Grid>
	);
}

function mapStateToProps({loginForm}) {
	return {loginForm};
}

const composedComponent = connect(
	mapStateToProps,
	{
		login,
		fetchCurrentUserData,
	},
);

export default withStyles(styles)(composedComponent(Login));
