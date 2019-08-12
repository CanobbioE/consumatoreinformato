import React from 'react';
import {connect} from 'react-redux';
import {Grid} from '@material-ui/core/';
import {withStyles} from '@material-ui/core/styles';
import bgCont from '../assets/images/bg/bg-cont.jpeg';
import FormChangePassword from '../components/FormChangePassword';
import Globals from '../config/Globals';
import {sleep} from '../utils/Common.js';

import {changePwd} from '../actions';

const styles = theme => ({
	bg: {
		backgroundImage: `url(${bgCont})`,
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
	submit: {
		marginTop: theme.spacing.unit * 3,
		marginBottom: theme.spacing.unit * 3,
	},
});
const ChangePassword = props => {
	const {classes} = props;
	const handleSubmit = async (pwd, confpwd) => {
		await props.changePwd(pwd, confpwd);
		await sleep(800);
		props.history.push(Globals.routes.home);
	};

	return (
		<Grid item container spacing={0} justify="center">
			<div className={classes.bg} />
			<Grid item xs={4} className={classes.clearBg}>
				<FormChangePassword
					onSubmit={handleSubmit}
					loading={props.loginForm.loading}
					error={props.loginForm.error}
					changed={props.loginForm.changed}
				/>
			</Grid>
		</Grid>
	);
};

function mapStateToProps({loginForm}) {
	return {loginForm};
}

const composedComponent = connect(
	mapStateToProps,
	{
		changePwd,
	},
);
export default withStyles(styles)(composedComponent(ChangePassword));
