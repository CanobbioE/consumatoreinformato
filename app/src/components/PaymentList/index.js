import React from 'react';
import {withStyles} from '@material-ui/core/styles';
import {
	Grid,
	Paper,
	ListItem,
	List,
	ListItemText,
	Divider,
	Typography,
} from '@material-ui/core/';
import './PaymentList.css';

const styles = theme => ({
	title: {
		marginTop: theme.spacing.unit * 2,
	},
	grid: {
		marginBot: theme.spacing.unit * 2,
	},
});

function PaymentList(props) {
	const {classes} = props;
	const items = props.items.map((item, i) => (
		<Grid item key={i}>
			<ListItem>
				<ListItemText
					secondary={`${item.amount / 100} €`}
					primary={item.date}
				/>
			</ListItem>
			{i !== props.items.length - 1 && <Divider />}
		</Grid>
	));
	return (
		<Paper>
			<Grid
				className={classes.grid}
				item
				container
				xs={10}
				spacing={16}
				justify="center">
				<Grid item xs={10}>
					<Typography variant="h4" className={classes.title}>
						I tuoi pagamenti
					</Typography>
				</Grid>
				<Grid item xs={10}>
					<List className="scrollbar">{items}</List>
				</Grid>
			</Grid>
		</Paper>
	);
}

export default withStyles(styles)(PaymentList);
