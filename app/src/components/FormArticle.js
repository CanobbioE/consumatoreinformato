import React, {useState} from 'react';
import CloseIcon from '@material-ui/icons/Close';
import {withStyles} from '@material-ui/core/styles';
import {
	Card,
	CardHeader,
	TextField,
	CardContent,
	CardActions,
	Button,
	IconButton,
} from '@material-ui/core';

const styles = theme => ({
	card: {
		marginBottom: '10px',
	},
	actions: {
		display: 'flex',
	},
});

const FormArticle = props => {
	const {classes} = props;
	const [title, setTitle] = useState(props.title);
	const [image, setImage] = useState(props.img);
	const [content, setContent] = useState(props.content);

	const handleChange = fx => e => {
		fx(e.target.value);
	};

	const actions = (
		<IconButton onClick={props.onClose}>
			<CloseIcon className={classes.icon} />
		</IconButton>
	);
	return (
		<Card className={classes.card} raised elevation={2}>
			<form onSubmit={props.onSubmit(title, image, content)}>
				<CardHeader
					action={actions}
					title={
						<TextField
							value={title}
							label="Titolo"
							fullWidth
							onChange={handleChange(setTitle)}
						/>
					}
					subheader={new Date().toLocaleDateString()}
				/>
				<CardContent>
					<TextField
						label="Immagine"
						value={image}
						fullWidth
						onChange={handleChange(setImage)}
					/>
				</CardContent>
				<CardContent>
					<TextField
						label="Testo"
						value={content}
						multiline={true}
						rows={2}
						fullWidth
						rowsMax={25}
						onChange={handleChange(setContent)}
					/>
				</CardContent>
				<CardActions>
					<Button type="submit" variant="contained" color="primary">
						Salva
					</Button>
					<Button onClick={props.onClose} variant="contained" color="primary">
						Annulla
					</Button>
				</CardActions>
			</form>
		</Card>
	);
};

export default withStyles(styles)(FormArticle);
