package it.consumatoreinformato.app.exception;


import it.consumatoreinformato.app.exception.handling.HandledException;
import it.consumatoreinformato.app.exception.handling.InternalErrorCode;
import org.springframework.http.HttpStatus;

public class NotAuthenticatedException extends HandledException {

	public NotAuthenticatedException() {
		super(HttpStatus.UNAUTHORIZED, InternalErrorCode.NOT_AUTHENTICATED);
	}

}
