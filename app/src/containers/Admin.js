import React, {useEffect, useState} from 'react';
import {connect} from 'react-redux';
import {compose} from 'redux';
import {
	Grid,
	Typography,
	Button,
	Fab,
	DialogActions,
	DialogTitle,
	IconButton,
} from '@material-ui/core/';
import {withStyles} from '@material-ui/core/styles';
import AddIcon from '@material-ui/icons/Add';
import CloseIcon from '@material-ui/icons/Close';
import {
	fetchAllUsersData,
	listAllFiles,
	setReceiver,
	fetchUserData,
	toggleChatOpen,
	getAllMessages,
	forceRegister,
} from '../actions';

import BasicDialog from '../components/BasicDialog';
import FormIscrizione from '../components/FormIscrizione.js';
import RequireAdmin from './RequireAdmin';
import DocsTable from '../components/DocsTable';
import bgHome from '../assets/images/bg/bg-home.jpg';
import Globals from '../config/Globals';

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
		marginTop: '42px',
		position: 'absolute',
		width: '100%',
	},
	exitBtn: {
		marginRight: '30px',
		marginBottom: '30px',
	},
	title: {
		textShadow: '2px 2px 24px #fff',
	},
	fab: {
		marginTop: '20px',
		marginLeft: '47%',
	},
	closeButton: {
		position: 'absolute',
		right: '30px',
		top: '30px',
		color: theme.palette.grey[500],
	},
});

function Admin(props) {
	const {classes} = props;
	const [open, setOpen] = useState(false);
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

	const handleSubmit = async fields => {
		await props.forceRegister(fields);
		if (props.iscrForm.error) return;
		setOpen(false);
		props.history.push(Globals.routes.admin);
	};

	const handleClick = receiver => {
		props.setReceiver(receiver);
		props.fetchUserData(receiver);
		props.getAllMessages(receiver);
		props.toggleChatOpen(true);
	};

	const dialogActions = (
		<DialogActions>
			<Button
				className={classes.exitBtn}
				onClick={() => setOpen(false)}
				color="primary"
				variant="outlined">
				Chiudi
			</Button>
		</DialogActions>
	);

	const dialogTitle = (
		<DialogTitle disableTypography className={classes.root}>
			<Typography variant="h4" className={classes.title}>
				Crea un nuovo utente
			</Typography>
			<IconButton
				aria-label="close"
				className={classes.closeButton}
				onClick={() => setOpen(false)}>
				<CloseIcon />
			</IconButton>
		</DialogTitle>
	);

	return (
		<Grid item container spacing={0} justify="center">
			<div className={classes.bg} />
			<Grid item container xs={10} spacing={40} className={classes.clearBg}>
				<Grid item container xs={12} justify="center">
					<Grid item xs={12}>
						<Typography variant="h4" className={classes.title}>
							Utenti e Documenti
						</Typography>
					</Grid>
					<Grid item xs={12}>
						<DocsTable
							onClick={handleClick}
							rows={props.admin.rows}
							labels={props.admin.labels1}
						/>
					</Grid>
					<Grid item xs={12}>
						<Fab
							color="primary"
							aria-label="add"
							onClick={() => setOpen(true)}
							className={classes.fab}>
							<AddIcon />
						</Fab>
					</Grid>
					<Grid item xs={12}>
						<DocsTable
							rows={filesRows.reverse()}
							labels={props.files.labels2}
						/>
					</Grid>
				</Grid>
				<BasicDialog
					title={dialogTitle}
					disableTypography
					open={open}
					onClose={() => setOpen(false)}
					fullScreen
					actions={dialogActions}>
					<FormIscrizione
						disablePaper
						skippable
						loading={props.iscrForm.loading}
						onSubmit={handleSubmit}
					/>
				</BasicDialog>
			</Grid>
		</Grid>
	);
}

function mapStateToProps({admin, files, iscrForm}) {
	return {admin, files, iscrForm};
}

const composedComponent = compose(
	RequireAdmin,
	connect(
		mapStateToProps,
		{
			fetchAllUsersData,
			listAllFiles,
			setReceiver,
			fetchUserData,
			toggleChatOpen,
			getAllMessages,
			forceRegister,
		},
	),
);

export default withStyles(styles)(composedComponent(Admin));
