import React from 'react';
import {withStyles} from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const styles = theme => ({
	root: {
		width: '100%',
		marginTop: theme.spacing.unit * 8,
		overflowX: 'auto',
	},
	table: {
		minWidth: 650,
	},
});

function DocsTable(props) {
	const {classes} = props;

	const rows = props.rows.map(row =>
		Object.keys(row).map((key, i) => (
			<TableCell key={i} component={i === 0 ? 'th' : ''} scope="row">
				{row[key]}
			</TableCell>
		)),
	);
	const labels = props.labels.map(label => (
		<TableCell key={label}>{label}</TableCell>
	));

	return (
		<Paper className={classes.root}>
			<Table className={classes.table}>
				<TableHead>
					<TableRow>{labels}</TableRow>
				</TableHead>
				<TableBody>
					{rows.map((row, i) => (
						<TableRow key={i}>{row}</TableRow>
					))}
				</TableBody>
			</Table>
		</Paper>
	);
}

export default withStyles(styles)(DocsTable);
