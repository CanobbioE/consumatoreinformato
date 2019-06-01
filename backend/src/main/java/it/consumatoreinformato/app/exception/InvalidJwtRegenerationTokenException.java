package it.consumatoreinformato.app.exception;

import it.consumatoreinformato.app.exception.handling.HandledException;
import it.consumatoreinformato.app.exception.handling.InternalErrorCode;
import org.springframework.http.HttpStatus;

public class InvalidJwtRegenerationTokenException extends HandledException {
    public InvalidJwtRegenerationTokenException() {
        super(HttpStatus.UNAUTHORIZED, InternalErrorCode.INVALID_TOKEN);
    }
}