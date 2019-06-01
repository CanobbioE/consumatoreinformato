package it.consumatoreinformato.app.exception;


import it.consumatoreinformato.app.exception.handling.HandledException;
import it.consumatoreinformato.app.exception.handling.InternalErrorCode;
import org.springframework.http.HttpStatus;

public class EmailAlreadyRegisteredException extends HandledException {

    private EmailAlreadyRegisteredException() {
        super(HttpStatus.CONFLICT, InternalErrorCode.EMAIL_ALREADY_REGISTERED);
    }

    public EmailAlreadyRegisteredException(String email) {
        this();
        this.addParam("email", email);
    }

}
