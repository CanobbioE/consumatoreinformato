import React, {useEffect} from 'react';
import Globals from '../config/Globals';
import {connect} from 'react-redux';

export default ChildComponent => {
	const ComposedComponent = props => {
		useEffect(() => {
			shouldNavigateAway();
		}, []);

		const shouldNavigateAway = () => {
			if (!props.user || props.user.role !== 'admin') {
				props.history.push(Globals.routes.home);
			}
		};

		return <ChildComponent {...props} />;
	};
	function mapStateToProps(state) {
		return {
			user: state.loginForm.user,
		};
	}
	return connect(mapStateToProps)(ComposedComponent);
};
