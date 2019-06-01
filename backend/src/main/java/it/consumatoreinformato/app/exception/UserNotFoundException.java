package it.consumatoreinformato.app.exception;

import it.consumatoreinformato.app.exception.handling.HandledException;
import it.consumatoreinformato.app.exception.handling.InternalErrorCode;
import org.springframework.http.HttpStatus;

public class UserNotFoundException extends HandledException {

    private UserNotFoundException() {
        super(HttpStatus.NOT_FOUND, InternalErrorCode.USER_NOT_FOUND);
    }

    public UserNotFoundException(Object identifier) {
        this();
        this.addParam("identifier", identifier);
    }

}
