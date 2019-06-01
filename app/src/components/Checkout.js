import React from 'react';
import StripeCheckout from 'react-stripe-checkout';
import Globals from '../config/Globals';

const Checkout = props => (
	<StripeCheckout
		name={props.name}
		description={props.desc}
		amount={props.amount}
		currency={'EUR'}
		token={props.onToken}
		stripeKey={Globals.stripeKey}
		label={`Paga ${props.amount / 100} € con carta`}
	/>
);

export default Checkout;
