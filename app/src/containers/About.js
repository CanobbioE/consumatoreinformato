import React from 'react';
import {Grid, Typography, Paper} from '@material-ui/core/';
import {lorem} from '../utils/lorem';
import {withStyles} from '@material-ui/core/styles';
import bgHome from '../assets/images/bg/bg-home.jpg';

const styles = theme => ({
	bg: {
		backgroundImage: `url(${bgHome})`,
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
});

function About(props) {
	const {classes} = props;
	const content = lorem.split('\n').map((line, i) => (
		<Typography key={i} paragraph>
			{line}
		</Typography>
	));
	return (
		<Grid item container spacing={0} justify="center">
			<div className={classes.bg} />
			<Grid item xs={10} className={classes.clearBg}>
				<Paper>
					<Grid item container xs={12} justify="center" spacing={40}>
						<Grid item xs={10}>
							<Typography variant="h4">Chi siamo</Typography>
						</Grid>
						<Grid item xs={10}>
							{content}
						</Grid>
					</Grid>
				</Paper>
			</Grid>
		</Grid>
	);
}

export default withStyles(styles)(About);
