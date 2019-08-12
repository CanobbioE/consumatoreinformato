import React, {useState} from 'react';
import {
	Grid,
	Step,
	StepLabel,
	Button,
	Paper,
	Stepper,
	Typography,
} from '@material-ui/core';
import {withStyles} from '@material-ui/core/styles';
import LoadingIcon from './LoadingIcon';

const styles = theme => ({
	button: {
		marginRight: theme.spacing.unit,
	},
	title: {
		marginTop: theme.spacing.unit * 2,
		marginBottom: theme.spacing.unit,
	},
	steps: {
		[theme.breakpoints.down('md')]: {
			display: 'none',
		},
	},
	error: {
		marginTop: theme.spacing.unit * 2,
	},
});

const FormStepper = props => {
	const {classes} = props;
	const [activeStep, setActiveStep] = useState(0);

	const next = () => {
		if (!props.error && activeStep + 1 < props.steps.length) {
			props.setTouched(activeStep + 1, false);
			setActiveStep(activeStep + 1);
		}
	};

	const back = () => {
		if (activeStep - 1 >= 0) setActiveStep(activeStep - 1);
	};

	const labels = props.stepsLabels.map((label, i) => (
		<Step key={i}>
			<StepLabel> {label} </StepLabel>
		</Step>
	));

	const shouldDisable = () => {
		if (!props.touched[activeStep]) return true;
		const err = props.stepValidators[activeStep]();
		return Boolean(err);
	};

	const nextButton =
		activeStep === props.steps.length - 1 ? (
			<Button
				variant="contained"
				color="primary"
				type="submit"
				className={classes.button}>
				Iscriviti
			</Button>
		) : (
			<Button
				variant="contained"
				color="primary"
				onClick={next}
				disabled={shouldDisable() && !props.skippable}
				className={classes.button}>
				Avanti
			</Button>
		);
	const content = (
		<Grid
			item
			container
			xs={12}
			justify="center"
			spacing={40}
			direction="column"
			alignItems="center">
			{props.title && (
				<Grid item xs={10}>
					<Typography variant="h4" className={classes.title}>
						{props.title}
					</Typography>
				</Grid>
			)}
			<Grid item xs={10}>
				<Stepper className={classes.steps} activeStep={activeStep}>
					{labels}
				</Stepper>
			</Grid>
			<Grid item xs={10}>
				<LoadingIcon show={props.loading} />
				{!props.loading && props.steps[activeStep]}
			</Grid>
			<Grid item xs={10}>
				<Button
					disabled={activeStep === 0}
					onClick={back}
					className={classes.button}>
					Indietro
				</Button>
				{nextButton}
				<Typography variant="caption" color="error" className={classes.error}>
					{props.error}
				</Typography>
			</Grid>
		</Grid>
	);

	return (
		<form onSubmit={props.onSubmit}>
			{props.disablePaper ? content : <Paper> {content} </Paper>}
		</form>
	);
};

export default withStyles(styles)(FormStepper);
