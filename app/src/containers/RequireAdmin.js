import React, {useEffect} from 'react';
import Globals from '../config/Globals';
import {connect} from 'react-redux';
import {isAdmin} from '../utils/Common';

export default ChildComponent => {
	const ComposedComponent = props => {
		useEffect(() => {
			shouldNavigateAway();
		}, []);

		const shouldNavigateAway = () => {
			if (!isAdmin(props.user)) {
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
