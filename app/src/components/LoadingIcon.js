import React from 'react';
import {withStyles} from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';

const styles = theme => ({
	progress: {
		margin: theme.spacing.unit * 2,
	},
	root: {
		marginLeft: '50%',
	},
});

function LoadingIcon(props) {
	const {classes} = props;
	return props.show ? (
		<div className={classes.root}>
			<CircularProgress className={classes.progress} />
		</div>
	) : null;
}

export default withStyles(styles)(LoadingIcon);
