import React from 'react';
import {withStyles} from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';

const styles = {
	media: {
		height: 140,
	},
	card: {
		height: '100%',
	},
};

function AboutCard(props) {
	const {classes} = props;
	return (
		<Card raised elevation={2} className={classes.card}>
			<CardActionArea>
				<CardMedia
					className={classes.media}
					image={props.image}
					title={props.city}
				/>
				<CardContent>
					<Typography gutterBottom variant="h5" component="h2">
						{props.city}
					</Typography>
					{props.resp && (
						<Typography component="p">
							<b>Responsabile:</b> {props.resp}
						</Typography>
					)}
					{props.addr && (
						<Typography component="p">
							<b>Indirizzo:</b> {props.addr}
						</Typography>
					)}
					{props.mail && (
						<Typography component="p">
							<b>E-mail:</b> {props.mail}
						</Typography>
					)}
					{props.tel && (
						<Typography component="p">
							<b>Telefono:</b> {props.tel}
						</Typography>
					)}
					{props.fax && (
						<Typography component="p">
							<b>Fax:</b> {props.fax}
						</Typography>
					)}
				</CardContent>
			</CardActionArea>
		</Card>
	);
}

export default withStyles(styles)(AboutCard);
