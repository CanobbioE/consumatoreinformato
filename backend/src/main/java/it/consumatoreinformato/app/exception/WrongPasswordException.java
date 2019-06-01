package it.consumatoreinformato.app.exception;

import it.consumatoreinformato.app.exception.handling.HandledException;
import it.consumatoreinformato.app.exception.handling.InternalErrorCode;
import org.springframework.http.HttpStatus;

public class WrongPasswordException extends HandledException {

	public WrongPasswordException() {
		super(HttpStatus.UNAUTHORIZED, InternalErrorCode.WRONG_PASSWORD);
	}

}
