import React from 'react';
import {
	Dialog,
	DialogContent,
	DialogContentText,
	Slide,
} from '@material-ui/core/';

const Transition = React.forwardRef(function Transition(props, ref) {
	return <Slide direction="up" ref={ref} {...props} />;
});

export default function BasicDialog(props) {
	return (
		<Dialog
			TransitionComponent={Transition}
			fullWidth={props.fullWidth}
			fullScreen={props.fullScreen}
			onClose={props.onClose}
			aria-labelledby="simple-dialog-title"
			open={props.open}>
			{props.title}
			<DialogContent>
				{props.text && (
					<DialogContentText id="alert-dialog-description">
						{props.text}
					</DialogContentText>
				)}
				{props.children}
			</DialogContent>

			{props.actions}
		</Dialog>
	);
}
