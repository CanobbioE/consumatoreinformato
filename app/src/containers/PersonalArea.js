import React, {useEffect} from 'react';
import {connect} from 'react-redux';
import {compose} from 'redux';
import {Grid, Button} from '@material-ui/core/';
import {withStyles} from '@material-ui/core/styles';
import {fetchCurrentUserData, uploadFile, listAllFilesByUser} from '../actions';
import RequireAuth from './RequireAuth';
import UploadFile from '../components/UploadFile';
import PaymentList from '../components/PaymentList';
import DocsTable from '../components/DocsTable';
import bgHome from '../assets/images/bg/bg-home.jpg';
import {getUser} from '../utils/Common';
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
});

function Personal(props) {
	const {classes} = props;
	useEffect(() => {
		props.fetchCurrentUserData();
		props.listAllFilesByUser(getUser().id);
	}, []);

	const handleSubmit = async file => {
		await props.uploadFile(file);
		await props.listAllFilesByUser(getUser().id);
	};

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
				<Grid item container xs={12} spacing={16} justify="center">
					<Grid item xs={7}>
						<UploadFile
							success={props.files.success}
							loading={props.files.loading}
							onSubmit={handleSubmit}
						/>
					</Grid>

					<Grid item xs={5}>
						{props.loginForm.user && (
							<PaymentList items={props.loginForm.user.payments.reverse()} />
						)}
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

function mapStateToProps({loginForm, files}) {
	return {loginForm, files};
}

const composedComponent = compose(
	RequireAuth,
	connect(
		mapStateToProps,
		{
			fetchCurrentUserData,
			uploadFile,
			listAllFilesByUser,
		},
	),
);

export default withStyles(styles)(composedComponent(Personal));
