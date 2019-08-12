import React from 'react';
import {withStyles} from '@material-ui/core/styles';
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableRow,
	Paper,
	Button,
} from '@material-ui/core';

const styles = theme => ({
	root: {
		width: '100%',
		marginTop: theme.spacing.unit * 8,
		overflowX: 'auto',
		maxHeight: '350px',
	},
	table: {
		minWidth: 650,
	},
	scrollable: {
		overflowY: 'scroll',
	},
});

function DocsTable(props) {
	const {classes} = props;

	const rows = props.rows.map(row =>
		Object.keys(row).map((key, i) => (
			<TableCell key={i} component={i === 0 ? 'th' : ''} scope="row">
				{key !== 'btn' ? (
					row[key]
				) : (
					<Button
						onClick={() => props.onClick(row.id)}
						size="small"
						variant="outlined">
						{row[key]}
					</Button>
				)}
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
				<TableBody className={classes.scrollable}>
					{rows.map((row, i) => (
						<TableRow key={i}>{row}</TableRow>
					))}
				</TableBody>
			</Table>
		</Paper>
	);
}

export default withStyles(styles)(DocsTable);
