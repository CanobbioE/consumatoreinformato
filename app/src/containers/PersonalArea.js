import React, {useEffect} from 'react';
import {connect} from 'react-redux';
import {compose} from 'redux';
import {Grid} from '@material-ui/core/';
import {withStyles} from '@material-ui/core/styles';
import {fetchCurrentUserData} from '../actions';
import RequireAuth from './RequireAuth';
import UploadFile from '../components/UploadFile';
import PaymentList from '../components/PaymentList';
// import Globals from '../config/Globals';

const styles = theme => ({
	clearBg: {
		marginTop: '62px',
	},
});

// Pay!
function Personal(props) {
	const {classes} = props;
	useEffect(() => {
		props.fetchCurrentUserData();
	}, []);
	return (
		<Grid item container spacing={0} justify="center">
			<Grid item container xs={10} spacing={16} justify="center">
				<Grid item xs={7} className={classes.clearBg}>
					<UploadFile />
				</Grid>

				<Grid item xs={5} className={classes.clearBg}>
					{props.loginForm.user && (
						<PaymentList items={props.loginForm.user.payments} />
					)}
				</Grid>
			</Grid>
		</Grid>
	);
}

function mapStateToProps({loginForm}) {
	return {loginForm};
}

const composedComponent = compose(
	RequireAuth,
	connect(
		mapStateToProps,
		{
			fetchCurrentUserData,
		},
	),
);

export default withStyles(styles)(composedComponent(Personal));
