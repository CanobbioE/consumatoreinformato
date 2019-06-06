import React, {useState} from 'react';

import {withStyles} from '@material-ui/core/styles';
import classnames from 'classnames';
import Card from '@material-ui/core/Card';
import {
	CardHeader,
	CardMedia,
	CardContent,
	CardActions,
	Collapse,
	IconButton,
	Typography,
} from '@material-ui/core';
import red from '@material-ui/core/colors/red';
import {ExpandMore} from '@material-ui/icons';
import {Edit} from '@material-ui/icons';

const styles = theme => ({
	card: {
		marginBottom: '10px',
	},
	media: {
		height: 0,
		paddingTop: '23.17%', // 16:9
	},
	actions: {
		display: 'flex',
	},
	expand: {
		transform: 'rotate(0deg)',
		marginLeft: 'auto',
		transition: theme.transitions.create('transform', {
			duration: theme.transitions.duration.shortest,
		}),
	},
	expandOpen: {
		transform: 'rotate(180deg)',
	},
	avatar: {
		backgroundColor: red[500],
	},
});

const Article = props => {
	const [expanded, setExpanded] = useState(false);

	const handleExp = () => {
		setExpanded(!expanded);
	};

	const {classes} = props;
	const actions = props.canEdit ? (
		<IconButton onClick={props.onEdit}>
			<Edit />
		</IconButton>
	) : null;

	const content = props.content.split('\n').map((line, i) => (
		<Typography key={i} paragraph>
			{line}
		</Typography>
	));

	return (
		<Card className={classes.card} raised elevation={2}>
			<CardHeader action={actions} title={props.title} subheader={props.date} />
			<CardMedia
				className={classes.media}
				image={props.img}
				title={props.title}
			/>
			<CardContent>
				<Typography component="p">
					{props.content.split('.')[0] + '...'}
				</Typography>
			</CardContent>
			<CardActions className={classes.actions} disableActionSpacing>
				<IconButton
					className={classnames(classes.expand, {
						[classes.expandOpen]: expanded,
					})}
					onClick={handleExp}
					aria-expanded={expanded}
					aria-label="Espandi">
					<ExpandMore />
				</IconButton>
			</CardActions>
			<Collapse in={expanded} timeout="auto" unmountOnExit>
				<CardContent>{content}</CardContent>
			</Collapse>
		</Card>
	);
};

export default withStyles(styles)(Article);
