import React, {useEffect} from 'react';
import {connect} from 'react-redux';
import {compose} from 'redux';
import {Grid, Typography, Button} from '@material-ui/core/';
import {withStyles} from '@material-ui/core/styles';
import {fetchAllUsersData, listAllFiles} from '../actions';
import RequireAdmin from './RequireAdmin';
import DocsTable from '../components/DocsTable';
import bgHome from '../assets/images/bg/bg-home.jpg';
// import Globals from '../config/Globals';

const styles = theme => ({
	bg: {
		backgroundImage: `url(${bgHome})`,
		filter: 'blur(8px)',
		width: '100%',
		' -webkit-filter': 'blur(8px)',
		backgroundPosition: 'center',
		backgroundRepeat: 'no-repeat',
		backgroundSize: 'cover',
		height: '0',
		paddingTop: '145vh',
	},
	clearBg: {
		marginTop: '62px',
		position: 'absolute',
		width: '100%',
	},
	title: {
		textShadow: '2px 2px 24px #fff',
	},
});

function Admin(props) {
	const {classes} = props;
	useEffect(() => {
		props.fetchAllUsersData();
		props.listAllFiles();
	}, []);

	const filesRows = props.files.rows2.map(file => ({
		...file,
		download: (
			<Button
				color="primary"
				variant="contained"
				size="small"
				href={file.download}>
				Scarica
			</Button>
		),
	}));
	return (
		<Grid item container spacing={0} justify="center">
			<div className={classes.bg} />
			<Grid item xs={10} className={classes.clearBg}>
				<Grid item container xs={12} justify="center" spacing={40}>
					<Grid item xs={10}>
						<Typography variant="h4" className={classes.title}>
							Utenti e Documenti
						</Typography>
					</Grid>
					<Grid item xs={10}>
						<DocsTable rows={props.admin.rows} labels={props.admin.labels1} />
					</Grid>
					<Grid item xs={10}>
						<DocsTable
							rows={filesRows.reverse()}
							labels={props.files.labels2}
						/>
					</Grid>
				</Grid>
			</Grid>
		</Grid>
	);
}

function mapStateToProps({admin, files}) {
	return {admin, files};
}

const composedComponent = compose(
	RequireAdmin,
	connect(
		mapStateToProps,
		{
			fetchAllUsersData,
			listAllFiles,
		},
	),
);

export default withStyles(styles)(composedComponent(Admin));
