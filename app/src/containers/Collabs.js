import React from 'react';
import {withStyles} from '@material-ui/core/styles';
import {Grid, Typography, Paper} from '@material-ui/core/';
import bgCollabs from '../assets/images/bg/bg-collabs.jpg';
import adalesia from '../assets/images/collabs/adalesia.JPG';
import agit from '../assets/images/collabs/agit.jpg';
import AGLP from '../assets/images/collabs/AGLP.JPG';
import dolconc from '../assets/images/collabs/dolconc.jpg';
import ecomotori from '../assets/images/collabs/ecomotori.png';
import ELPIS from '../assets/images/collabs/ELPIS.png';
import hearthlogo from '../assets/images/collabs/hearthlogo.jpg';
import simocal from '../assets/images/collabs/simocal.jpg';
import trentinblu from '../assets/images/collabs/trentinblu.jpg';

const styles = theme => ({
	bg: {
		backgroundImage: `url(${bgCollabs})`,
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
	title: {
		textShadow: '2px 2px 24px #000',
	},
	list: {
		listStyle: 'none',
		margin: theme.spacing.unit * 2,
	},
	img: {
		height: '5em',
		margin: '10px',
		display: 'inline-block',
	},
});

const Collabs = props => {
	const {classes} = props;
	return (
		<Grid item container spacing={0} justify="center">
			<div className={classes.bg} />
			<Grid item xs={10} className={classes.clearBg}>
				<Grid item container xs={12} justify="center" spacing={40}>
					<Grid item xs={10}>
						<Typography variant="h4" className={classes.title}>
							Consumatore Informato collabora con:
						</Typography>
					</Grid>
					<Grid item xs={10} className={classes.list}>
						<Paper className={classes.list}>
							<br />
							<Grid container className={classes.list}>
								<Grid item>
									<img src={agit} alt="agit" className={classes.img} />
								</Grid>

								<Grid item>
									<img src={ELPIS} alt="agit" className={classes.img} />
								</Grid>

								<Grid item>
									<img src={simocal} alt="agit" className={classes.img} />
								</Grid>

								<Grid item>
									<img src={AGLP} alt="agit" className={classes.img} />
								</Grid>

								<Grid item>
									<img src={hearthlogo} alt="agit" className={classes.img} />
								</Grid>
								<Grid item>
									<img src={adalesia} alt="agit" className={classes.img} />
								</Grid>
								<Grid item>
									<img src={ecomotori} alt="agit" className={classes.img} />
								</Grid>
								<Grid item>
									<img src={dolconc} alt="agit" className={classes.img} />
								</Grid>
								<Grid item>
									<img src={trentinblu} alt="agit" className={classes.img} />
								</Grid>
							</Grid>
							<br />
						</Paper>
					</Grid>
				</Grid>
			</Grid>
		</Grid>
	);
};
export default withStyles(styles)(Collabs);
