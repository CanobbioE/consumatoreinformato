import React from 'react';
import {withStyles} from '@material-ui/core/styles';
import {connect} from 'react-redux';
import {Grid} from '@material-ui/core/';
import FormIscrizione from '../components/FormIscrizione';
import {iscrizione, completaIscrizione} from '../actions';
import Globals from '../config/Globals';
import bgIscr from '../assets/images/bg/bg-iscr.jpg';

const styles = theme => ({
	bg: {
		backgroundImage: `url(${bgIscr})`,
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

function Iscrizione(props) {
	const {classes} = props;
	const handleSubmit = async fields => {
		await props.iscrizione(fields);
		if (props.iscrForm.error) return;
		props.history.push(Globals.routes.payment);
	};
	return (
		<Grid item container spacing={0} justify="center">
			<div className={classes.bg} />
			<Grid item xs={6} className={classes.clearBg}>
				<FormIscrizione
					title="Iscrizione"
					loading={props.iscrForm.loading}
					onSubmit={handleSubmit}
				/>
			</Grid>
		</Grid>
	);
}

function mapStateToProps({iscrForm}) {
	return {iscrForm};
}

const composedComponent = connect(
	mapStateToProps,
	{
		completaIscrizione,
		iscrizione,
	},
);

export default withStyles(styles)(composedComponent(Iscrizione));
