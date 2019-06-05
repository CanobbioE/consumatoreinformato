import React, {useEffect, useState} from 'react';
import {connect} from 'react-redux';
import {Grid, Fab, Collapse, Typography} from '@material-ui/core/';
import AddIcon from '@material-ui/icons/Add';
import Article from '../components/Article';
import {fetchArticles, patchArticle, postArticle} from '../actions';
import {withStyles} from '@material-ui/core/styles';
import LoadingIcon from '../components/LoadingIcon';
import FormArticle from '../components/FormArticle';
import {isAdmin} from '../utils/Common';

const styles = theme => ({
	clearBg: {
		marginTop: '42px',
	},
	fab: {
		marginLeft: '47%',
	},
	article: {
		marginBottom: '2000px',
	},
});

function Home(props) {
	useEffect(() => {
		props.fetchArticles();
	}, []);
	const [toEdit, setToEdit] = useState(-1);
	const [adding, setAdding] = useState(false);
	const {classes} = props;
	const user = props.loginForm.user;

	const handleEditSubmit = (title, image, content) => async e => {
		e.preventDefault();
		await props.patchArticle(title, image, content, toEdit);
		setToEdit(-1);
		props.fetchArticles();
	};
	const handleAddSubmit = (title, image, content) => async e => {
		e.preventDefault();
		await props.postArticle(title, image, content);
		setAdding(false);
		props.fetchArticles();
	};

	const articles = props.home.articles.map(a => (
		<Grid key={a.id} item xs={12}>
			{a.id === toEdit ? (
				<FormArticle
					img={a.id % 12}
					title={a.title}
					content={a.content}
					onSubmit={handleEditSubmit}
					tags={a.tags}
					onClose={() => setToEdit(-1)}
				/>
			) : (
				<Article
					img={a.id % 12}
					title={a.title}
					content={a.content}
					date={a.date}
					tags={a.tags}
					canComment={props.loginForm.token !== ''}
					canEdit={isAdmin(user)}
					onEdit={() => setToEdit(a.id)}
				/>
			)}
		</Grid>
	));

	const message = (
		<Grid item xs={12}>
			<Typography align="center" color="error" variant="body1">
				Non sono stati ancora caricati articoli.
			</Typography>
		</Grid>
	);

	return (
		<Grid item container spacing={0} justify="center">
			<Grid
				item
				container
				justify="center"
				spacing={24}
				xs={10}
				className={classes.clearBg}>
				{isAdmin(user) && !adding && !props.home.loading && (
					<Grid item xs={12}>
						<Fab
							className={classes.fab}
							color="primary"
							aria-label="Add"
							onClick={() => setAdding(true)}>
							<AddIcon />
						</Fab>
					</Grid>
				)}

				<Grid item xs={12}>
					<Collapse in={adding} unmountOnExit transition="auto">
						<FormArticle
							img=""
							title=""
							content=""
							onSubmit={handleAddSubmit}
							tags={[]}
							onClose={() => setAdding(false)}
						/>
					</Collapse>
					<LoadingIcon show={props.home.loading} />
				</Grid>
				{!props.home.loading && articles.reverse()}
				{!articles.length && !props.home.loading && message}
			</Grid>
		</Grid>
	);
}

function mapStateToProps({loginForm, home}) {
	return {loginForm, home};
}

const composedComponent = connect(
	mapStateToProps,
	{fetchArticles, patchArticle, postArticle},
);

export default withStyles(styles)(composedComponent(Home));
