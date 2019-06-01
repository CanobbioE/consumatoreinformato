import React, {useState} from 'react';
import {withStyles} from '@material-ui/core/styles';
import {Grid, Paper, Input, Typography, Button} from '@material-ui/core/';

const styles = theme => ({
	title: {
		marginTop: theme.spacing.unit * 2,
	},
});

function UploadFile(props) {
	const {classes} = props;
	const [file, setFile] = useState(null);
	const handleChange = fx => e => {
		e.preventDefault();
		fx(e.target.value);
	};
	return (
		<Paper>
			<form onSubmit={props.onSubmit}>
				<Grid item container xs={10} spacing={16} justify="center">
					<Grid item xs={10}>
						<Typography variant="h4" className={classes.title}>
							Carica un documento
						</Typography>
					</Grid>
					<Grid item xs={10}>
						<Input
							type="file"
							label="Documento"
							disableUnderline
							required
							onChange={handleChange(setFile)}
						/>
					</Grid>
					<Grid item xs={10}>
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
			</form>
		</Paper>
	);
}

export default withStyles(styles)(UploadFile);
