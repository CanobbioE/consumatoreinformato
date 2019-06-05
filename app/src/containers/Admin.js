import React, {useEffect} from 'react';
import {connect} from 'react-redux';
import {compose} from 'redux';
import {Grid, Paper} from '@material-ui/core/';
import {withStyles} from '@material-ui/core/styles';
import {fetchAllUsersData} from '../actions';
import RequireAdmin from './RequireAdmin';
import DocsTable from '../components/DocsTable';
// import Globals from '../config/Globals';

const styles = theme => ({});

function Admin(props) {
	// const {classes} = props;
	useEffect(() => {
		props.fetchAllUsersData();
	}, []);
	return (
		<Grid item container spacing={0} justify="center">
			<Grid item xs={10}>
				<Paper>
					<DocsTable rows={props.admin.rows} labels={props.admin.labels} />
				</Paper>
			</Grid>
		</Grid>
	);
}

function mapStateToProps({admin}) {
	return {admin};
}

const composedComponent = compose(
	RequireAdmin,
	connect(
		mapStateToProps,
		{
			fetchAllUsersData,
		},
	),
);

export default withStyles(styles)(composedComponent(Admin));
