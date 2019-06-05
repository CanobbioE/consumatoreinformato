import React, {useState} from 'react';
import NotificationsIcon from '@material-ui/icons/Notifications';
import {IconButton, Badge, Slide, Snackbar, Button} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import {Link} from 'react-router-dom';
import Globals from '../config/Globals';

export default function(props) {
	const [open, setOpen] = useState(null);

	const renderMessage = () => {
		const today = new Date();
		const lastPay = new Date(props.lastPayment);
		var daysSinceLastPay = Date.daysBetween(today, lastPay);
		if (daysSinceLastPay > 365) {
			const x = daysSinceLastPay - 365;
			return `La tua iscrizione è scaduta da ${x} giorn${
				x > 1 || x === 0 ? 'i' : 'o'
			}`;
		}
		const twoWeeksFromNow = new Date(
			today.getFullYear(),
			today.getMonth(),
			today.getDate() + 14,
		);
		daysSinceLastPay = Date.daysBetween(twoWeeksFromNow, lastPay);
		if (daysSinceLastPay >= 365) {
			const x = 14 - (daysSinceLastPay - 365);
			return `La tua iscrizione ${
				x === 0 ? 'scade oggi' : `scadrà tra ${x} giorn${x > 1 ? 'i' : 'o'}`
			}`;
		}
		return null;
	};

	const handleClick = event => {
		if (!renderMessage()) return;
		setOpen(!open);
	};

	const Transition = props => <Slide {...props} direction="left" />;

	const message = (
		<span id="message-id">
			{renderMessage()} -
			<Button
				component={Link}
				to={Globals.routes.payment}
				color="primary"
				size="small">
				Clicca qui per pagare ora
			</Button>
		</span>
	);

	return (
		<div>
			<IconButton color="inherit" onClick={handleClick}>
				<Badge badgeContent={renderMessage() ? 1 : null} color="secondary">
					<NotificationsIcon />
				</Badge>
			</IconButton>

			<Snackbar
				anchorOrigin={{
					vertical: 'top',
					horizontal: 'center',
				}}
				open={open}
				onClose={() => setOpen(false)}
				ContentProps={{
					'aria-describedby': 'message-id',
				}}
				TransitionComponent={Transition}
				message={message}
				action={[
					<IconButton
						key="close"
						aria-label="Close"
						color="inherit"
						onClick={() => setOpen(false)}>
						<CloseIcon />
					</IconButton>,
				]}
			/>
		</div>
	);
}
