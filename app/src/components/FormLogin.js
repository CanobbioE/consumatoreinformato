import React, {useState} from 'react';
import {
	TextField,
	Paper,
	Grid,
	Typography,
	Button,
	Avatar,
} from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import withStyles from '@material-ui/core/styles/withStyles';
import LoadingIcon from './LoadingIcon';

const styles = theme => ({
	avatar: {
		marginTop: '24px',
		margin: theme.spacing.unit,
		backgroundColor: theme.palette.secondary.main,
	},
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

function FormLogin(props) {
	const {classes} = props;
	const [mail, setMail] = useState('');
	const [pwd, setPwd] = useState('');

	const handleChange = (event, fx) => {
		const val = event.target.value;
		fx(val);
	};

	const handleSubmit = event => {
		event.preventDefault();
		props.onSubmit(mail, pwd);
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
					{!props.loading && (
						<Avatar className={classes.avatar}>
							<LockOutlinedIcon />
						</Avatar>
					)}
					<Grid item xs={10}>
						<Typography variant="h4" align="center" className={classes.title}>
							Accedi
						</Typography>
					</Grid>

					<Grid item xs={10}>
						<TextField
							id={'name'}
							required
							fullWidth
							label={'E-mail'}
							value={mail}
							type="mail"
							onChange={e => handleChange(e, setMail)}
							margin="dense"
							variant="outlined"
						/>
					</Grid>
					<Grid item xs={10}>
						<TextField
							id={'pwd'}
							fullWidth
							required
							label={'Password'}
							value={pwd}
							type="password"
							onChange={e => handleChange(e, setPwd)}
							margin="dense"
							variant="outlined"
						/>
					</Grid>
					{props.error && (
						<Grid item xs={10}>
							<Typography color="error" align="center">
								{props.error}
							</Typography>
						</Grid>
					)}

					<Grid item xs={10}>
						<Button
							type="submit"
							variant="contained"
							color="primary"
							disabled={mail === '' || pwd === ''}
							className={classes.submit}>
							Accedi
						</Button>
					</Grid>
				</Grid>
			</Paper>
		</form>
	);
}

export default withStyles(styles)(FormLogin);
