import React, {useState} from 'react';
import LoadingIcon from './LoadingIcon';
import {Grid, TextField, Button, Paper, Typography} from '@material-ui/core/';
import {withStyles} from '@material-ui/core/styles';
const styles = theme => ({
	submit: {
		marginTop: theme.spacing.unit * 3,
		marginBottom: theme.spacing.unit * 3,
	},
	loading: {
		marginRight: '67px',
	},
	title: {
		marginTop: theme.spacing.unit * 2,
		marginBottom: theme.spacing.unit * 2,
	},
});

const FormChangePassword = props => {
	const {classes} = props;
	const [pwd, setPwd] = useState('');
	const [confpwd, setConfpwd] = useState('');

	const handleChange = fx => e => {
		const val = e.target.value;
		fx(val);
	};

	const handleSubmit = e => {
		e.preventDefault();
		props.onSubmit(pwd, confpwd);
	};

	return (
		<form onSubmit={handleSubmit}>
			<Paper>
				<Grid
					container
					spacing={8}
					justify="center"
					alignItems="center"
					direction="column">
					<Grid item xs={12} className={classes.loading}>
						<LoadingIcon show={props.loading} />
					</Grid>
					<Grid item xs={10}>
						<Typography variant="h4" align="center" className={classes.title}>
							Cambia password
						</Typography>
					</Grid>

					{!props.changed && (
						<Grid item xs={10}>
							<TextField
								id={'pwd'}
								required
								fullWidth
								label={'Nuova password'}
								value={pwd}
								type="password"
								onChange={handleChange(setPwd)}
								margin="dense"
								variant="outlined"
							/>
						</Grid>
					)}
					{!props.changed && (
						<Grid item xs={10}>
							<TextField
								id={'cpwd'}
								required
								fullWidth
								label={'Conferma password'}
								value={confpwd}
								type="password"
								onChange={handleChange(setConfpwd)}
								margin="dense"
								variant="outlined"
							/>
						</Grid>
					)}

					<Grid item xs={10}>
						{props.changed && (
							<Typography align="center" variant="body2">
								Password cambiata con successo!
							</Typography>
						)}

						<Typography color="error" align="center">
							{pwd !== confpwd && 'Le due password devono combaciare'}
							{props.error}
						</Typography>
					</Grid>

					<Grid item xs={10}>
						{!props.changed && (
							<Button
								type="submit"
								variant="contained"
								color="primary"
								disabled={pwd === '' || pwd !== confpwd}
								className={classes.submit}>
								Modifica
							</Button>
						)}
					</Grid>
				</Grid>
			</Paper>
		</form>
	);
};

export default withStyles(styles)(FormChangePassword);
