import React, {useEffect} from 'react';
import Globals from '../config/Globals';
import {connect} from 'react-redux';

export default ChildComponent => {
	const ComposedComponent = props => {
		useEffect(() => {
			shouldNavigateAway();
		}, []);

		const shouldNavigateAway = () => {
			if (
				!props.auth ||
				!props.user ||
				Date.daysBetween(new Date(), new Date(props.user.lastPayment)) > 365
			) {
				props.history.push(Globals.routes.home);
			}
		};

		return <ChildComponent {...props} />;
	};
	function mapStateToProps(state) {
		return {
			auth: state.loginForm.token,
			user: state.loginForm.user,
		};
	}
	return connect(mapStateToProps)(ComposedComponent);
};
