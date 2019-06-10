package it.consumatoreinformato.app.service;


import com.stripe.Stripe;
import com.stripe.exception.StripeException;
import com.stripe.model.Charge;
import it.consumatoreinformato.app.dto.payments.responses.PaymentStatusDto;
import it.consumatoreinformato.app.exception.PaymentFailedException;
import it.consumatoreinformato.app.model.entities.Payment;
import it.consumatoreinformato.app.model.entities.User;
import it.consumatoreinformato.app.repository.PaymentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.HashMap;
import java.util.Map;

@Component
public class PaymentServiceImpl implements PaymentService {

    @Value("${stripe.secret.key}")
    private String apiSecret;
    private PaymentRepository paymentRepository;

    @Autowired
    public PaymentServiceImpl(PaymentRepository paymentRepository) {
        this.paymentRepository = paymentRepository;
        Stripe.apiKey = apiSecret;
    }

    /**
     * Creates a Charge for the transaction identified by the given token
     *
     * @param email where to send the receipt
     * @param token transaction's identifier
     * @return a Charge object with the transaction information
     * @throws StripeException
     */
    public Charge chargeCreditCard(String email, String token) throws StripeException {
        Stripe.apiKey = apiSecret;
        Map<String, Object> chargeParams = new HashMap<String, Object>();
        Integer amount = 20 * 100;

        chargeParams.put("amount", amount);
        chargeParams.put("currency", "eur");
        chargeParams.put("source", token);
        chargeParams.put("description", "Iscrizione annuale al sito ConsumatoreInformato.it");
        chargeParams.put("receipt_email", email);

        return Charge.create(chargeParams);
    }

    /**
     * Creates a Charge for a one time transaction made by a registered user
     * @param payer The user paying
     * @param token Transaction's identifier
     * @return The payment status
     * @throws PaymentFailedException
     * @throws StripeException
     */
    public PaymentStatusDto pay(User payer, String token) throws PaymentFailedException, StripeException {
        Charge charge = chargeCreditCard(payer.getEmail(), token);
        if (!charge.getPaid()) throw new PaymentFailedException((charge.getStatus()));

        paymentRepository.save(
                Payment.builder()
                        .amount(new BigDecimal(charge.getAmount()))
                        .date(LocalDate.now())
                        .payer(payer)
                        .build());

        return PaymentStatusDto.builder().paid(charge.getPaid()).build();
    }
}
