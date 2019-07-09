import React, {useState} from 'react';
import {withStyles} from '@material-ui/core/styles';
import {Grid, Paper, Input, Typography, Button} from '@material-ui/core/';
import LoadingIcon from './LoadingIcon';

const styles = theme => ({
	title: {
		marginTop: theme.spacing.unit * 2,
		height: 'auto',
	},
	submit: {
		heigth: 'auto',
	},
});

function UploadFile(props) {
	const {classes} = props;
	const [file, setFile] = useState(null);
	const [fileValue, setFileValue] = useState('');
	const handleFileChage = e => {
		e.preventDefault();
		setFile(e.target.files[0]);
		setFileValue(e.target.value);
	};
	const handleSubmit = async e => {
		e.preventDefault();
		setFileValue('');
		await props.onSubmit(file);
		setFile(null);
	};
	return (
		<Paper>
			<form onSubmit={handleSubmit}>
				<Grid item container xs={10} spacing={16} justify="center">
					<Grid item xs={10}>
						<Typography variant="h4" className={classes.title}>
							Carica un documento
						</Typography>
					</Grid>

					<Grid item xs={10}>
						<LoadingIcon show={props.loading} />
						{!props.loading && (
							<Input
								className={classes.submit}
								value={fileValue}
								type="file"
								label="Documento"
								disableUnderline
								required
								onChange={handleFileChage}
							/>
						)}
					</Grid>

					<Grid item container xs={12} justify="flex-end">
						<Grid item xs={7}>
							{props.success && (
								<Typography color="primary" variant="body2">
									Caricamento avvenuto con successo!
								</Typography>
							)}
						</Grid>
						<Grid item xs={2}>
							<Button
								type="submit"
								variant="contained"
								color="primary"
								disabled={!file}
								className={classes.submit}>
								Carica
							</Button>
						</Grid>
					</Grid>
				</Grid>
			</form>
		</Paper>
	);
}

export default withStyles(styles)(UploadFile);
