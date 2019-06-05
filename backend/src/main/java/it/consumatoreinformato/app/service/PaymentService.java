package it.consumatoreinformato.app.service;

import com.stripe.exception.StripeException;
import com.stripe.model.Charge;
import it.consumatoreinformato.app.dto.payments.responses.PaymentStatusDto;
import it.consumatoreinformato.app.exception.*;
import it.consumatoreinformato.app.model.entities.User;

public interface PaymentService {
    Charge chargeCreditCard(String email, String token) throws StripeException;
    PaymentStatusDto pay(User payer, String token) throws StripeException, PaymentFailedException;
}

