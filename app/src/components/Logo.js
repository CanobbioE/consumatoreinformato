import React from 'react';
import {Card} from '@material-ui/core';
import {properties} from '../config/Properties';
import {withStyles} from '@material-ui/core/styles';

const styles = theme => ({
	gridList: {
		height: 100,
	},
	card: {
		maxWidth: '100%',
	},
	media: {
		height: '10%',
		paddingTop: '10%', // 16:9
		backgroundImage: `url(${properties.logo})`,
		backgroundRepeat: 'no-repeat',
		backgroundSize: 'contain',
		backgroundPosition: 'center',
	},
});
function Logo(props) {
	const {classes} = props;
	return (
		<Card className={classes.card}>
			<div className={classes.media} title="logo" />
		</Card>
	);
}

export default withStyles(styles)(Logo);
