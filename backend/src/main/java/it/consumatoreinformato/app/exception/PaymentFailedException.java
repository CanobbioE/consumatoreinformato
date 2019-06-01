package it.consumatoreinformato.app.exception;


import it.consumatoreinformato.app.exception.handling.HandledException;
import it.consumatoreinformato.app.exception.handling.InternalErrorCode;
import org.springframework.http.HttpStatus;

public class PaymentFailedException extends HandledException {

    private PaymentFailedException() {
        super(HttpStatus.BAD_REQUEST, InternalErrorCode.PAYMENT_FAILED);
    }

    public PaymentFailedException(String status) {
        this();
        this.addParam("status", status);
    }

}
