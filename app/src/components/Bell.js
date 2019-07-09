import React, {useState} from 'react';
import NotificationsIcon from '@material-ui/icons/Notifications';
import {IconButton, Badge, Slide, Snackbar, Button} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import {Link} from 'react-router-dom';
import Globals from '../config/Globals';

export default function(props) {
	const [open, setOpen] = useState(null);

	const renderMessage = type => {
		switch (type) {
			case 'payment':
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
			case 'message':
				if (!props.newMessages) return null;
				const keys = Object.keys(props.newMessages);
				var count = 0;
				keys.forEach(key => (count += props.newMessages[key].length));
				const from = keys.map(k => `${k}\n`);
				const message = `Hai ${count} nuov${count > 1 ? 'i' : 'o'} messagg${
					count > 1 ? 'i' : 'io'
				} da:
            ${from}
            `;

				return keys && count > 0 ? message : null;
			default:
				return null;
		}
	};

	const handleClick = event => {
		if (!renderMessage('payment') && !renderMessage('message')) return;
		setOpen(!open);
	};

	const Transition = props => <Slide {...props} direction="left" />;

	const message = props.newMessages ? (
		<span id="message-id">{renderMessage('message')}</span>
	) : (
		<span id="message-id">
			{renderMessage('payment')} -
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
				<Badge
					badgeContent={
						renderMessage('message') || renderMessage('payment') ? 1 : null
					}
					color="secondary">
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
