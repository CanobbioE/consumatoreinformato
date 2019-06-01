import React from 'react';
import {connect} from 'react-redux';
import {compose} from 'redux';
import {Grid, Paper} from '@material-ui/core/';
import {withStyles} from '@material-ui/core/styles';
import {fetchUserData} from '../actions';
import RequireAdmin from './RequireAdmin';
import DocsTable from '../components/DocsTable';
import {labels, rows} from '../utils/mock';
// import Globals from '../config/Globals';

const styles = theme => ({});

function Admin(props) {
	// const {classes} = props;
	return (
		<Grid item container spacing={0} justify="center">
			<Grid item xs={10}>
				<Paper>
					<DocsTable rows={rows} labels={labels} />
				</Paper>
			</Grid>
		</Grid>
	);
}

function mapStateToProps() {
	return {};
}

const composedComponent = compose(
	RequireAdmin,
	connect(
		mapStateToProps,
		{
			fetchUserData,
		},
	),
);

export default withStyles(styles)(composedComponent(Admin));
