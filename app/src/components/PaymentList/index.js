import React from 'react';
import {Link} from 'react-router-dom';
import {withStyles} from '@material-ui/core/styles';
import {
	Grid,
	Paper,
	ListItem,
	List,
	ListItemText,
	Divider,
	Typography,
	Button,
} from '@material-ui/core/';
import Globals from '../../config/Globals';
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
	const scrollable = items.length >= 5 ? 'scrollbar' : '';
	return (
		<Paper>
			<Grid
				className={classes.grid}
				item
				container
				xs={12}
				spacing={16}
				justify="center">
				<Grid item xs={10}>
					<Typography variant="h4" className={classes.title}>
						I tuoi pagamenti
					</Typography>
				</Grid>
				<Grid item xs={10}>
					<List className={scrollable}>{items}</List>
				</Grid>
				<Grid item container xs={12} justify="flex-end">
					<Button
						component={Link}
						to={Globals.routes.payment}
						color="primary"
						variant="contained">
						Paga ora
					</Button>
				</Grid>
			</Grid>
		</Paper>
	);
}

export default withStyles(styles)(PaymentList);
