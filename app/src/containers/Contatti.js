import React from 'react';
import {Grid, Typography} from '@material-ui/core/';
import mapTO from '../assets/images/maps/mapTO.jpg';
import mapGE from '../assets/images/maps/mapGE.jpg';
import mapCN from '../assets/images/maps/mapCN.jpg';
import mapMI from '../assets/images/maps/mapMI.jpg';
import mapRM from '../assets/images/maps/mapRM.jpg';
import mapTN from '../assets/images/maps/mapTN.jpg';
import ContactCard from '../components/ContactCard';
import {withStyles} from '@material-ui/core/styles';
import bgCont from '../assets/images/bg/bg-cont.jpeg';

const styles = theme => ({
	bg: {
		backgroundImage: `url(${bgCont})`,
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
	title: {
		textShadow: '2px 2px 24px #000',
	},
});
const sedi = [
	{
		city: 'Torino',
		img: mapTO,
		resp: 'Avv. Marco Berté',
		addr: 'Corso Francia, 43 - Torino',
		mail: 'torino@consumatoreinformato.it',
		tel: '0110438066',
		fax: '0110438066',
		map: 'https://goo.gl/maps/VgtibhjTnGXh8CDy7',
	},
	{
		city: 'Milano',
		resp: 'Avv. Marco Berté',
		img: mapMI,
		addr: 'Via Compagnoni, 4 - Milano',
		mail: 'milano@consumatoreinformato.it',
		tel: '0280887408',
		map: 'https://goo.gl/maps/aRetUWbZciGZBmys8',
	},
	{
		city: 'Roma',
		img: mapRM,
		addr: 'Via Bafile, 2 - Roma',
		mail: 'roma@consumatoreinformato.it',
		tel: '0692915650',
		map: 'https://goo.gl/maps/JrkptodqVnE9vxek7',
	},
	{
		city: 'Trento',
		img: mapTN,
		resp: 'Dr. Silvio Cornella',
		addr: 'Via Santa Croce, 10 - Trento',
		tel: '3313960694',
		mail: 'trento@consumatoreinformato.it',
		map: 'https://goo.gl/maps/THdDyfvNG15ZpLF49',
	},
	{
		city: 'Cuneo',
		addr: 'Piazza Maggiore, 3 - Mondovì (Cuneo)',
		mail: 'cuneo@consumatoreinformato.it',
		tel: '0174670617',
		img: mapCN,
		map: 'https://goo.gl/maps/tXR86futpRiCvEGJA',
	},
	{
		city: 'Genova',
		addr: 'Via della Libertà, 13 - Rapallo (Genova)',
		mail: 'genova@consumatoreinformato.it',
		img: mapGE,
		map: 'https://goo.gl/maps/bHpgjEx7bdopbSyJ8',
	},
];

function Contatti(props) {
	const {classes} = props;
	const content = sedi.map(s => (
		<Grid key={s.city} item xs={4}>
			<ContactCard
				image={s.img}
				city={s.city}
				resp={s.resp}
				addr={s.addr}
				mail={s.mail}
				tel={s.tel}
				fax={s.fax}
				mapLink={s.map}
			/>
		</Grid>
	));

	return (
		<Grid item container spacing={0} justify="center">
			<div className={classes.bg} />
			<Grid
				container
				xs={10}
				spacing={40}
				className={classes.clearBg}
				justify="center">
				<Grid item xs={12}>
					<Typography variant="h4" className={classes.title}>
						Le nostre sedi
					</Typography>
				</Grid>
				<Grid item spacing={40} container xs={12} alignItems="stretch">
					{content}
				</Grid>
			</Grid>
		</Grid>
	);
}

export default withStyles(styles)(Contatti);
