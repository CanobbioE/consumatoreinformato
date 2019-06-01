import 'date-fns';
import itLocale from 'date-fns/locale/it';
import React from 'react';
import Grid from '@material-ui/core/Grid';
import {withStyles} from '@material-ui/core/styles';
import DateFnsUtils from '@date-io/date-fns';
import {MuiPickersUtilsProvider, DatePicker} from 'material-ui-pickers';

const styles = {
	grid: {
		width: '60%',
	},
};

const MyDatePicker = props => {
	const {classes} = props;

	const handleChange = date => {
		props.onChange({target: {value: date}});
	};

	return (
		<MuiPickersUtilsProvider utils={DateFnsUtils} locale={itLocale}>
			<Grid container className={classes.grid} justify="space-around">
				<DatePicker
					margin="dense"
					label={props.label}
					value={props.value}
					onChange={handleChange}
					disableFuture
					openTo="year"
					format="dd/MM/yyyy"
					views={['year', 'month', 'day']}
				/>
			</Grid>
		</MuiPickersUtilsProvider>
	);
};

export default withStyles(styles)(MyDatePicker);
