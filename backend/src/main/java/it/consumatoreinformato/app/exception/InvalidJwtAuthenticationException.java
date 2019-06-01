package it.consumatoreinformato.app.exception;


import it.consumatoreinformato.app.exception.handling.HandledAuthorizationException;
import it.consumatoreinformato.app.exception.handling.InternalErrorCode;
import org.springframework.http.HttpStatus;

public class InvalidJwtAuthenticationException extends HandledAuthorizationException {
    public InvalidJwtAuthenticationException() {
        super(HttpStatus.UNAUTHORIZED, InternalErrorCode.INVALID_TOKEN);
    }
}