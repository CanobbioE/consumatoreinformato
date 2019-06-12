package it.consumatoreinformato.app.exception;


import it.consumatoreinformato.app.exception.handling.HandledException;
import it.consumatoreinformato.app.exception.handling.InternalErrorCode;
import org.springframework.http.HttpStatus;

public class InvalidFileNameException extends HandledException {

    private InvalidFileNameException() {
        super(HttpStatus.BAD_REQUEST, InternalErrorCode.INVALID_FILENAME);
    }

    public InvalidFileNameException(String filename) {
        this();
        this.addParam("filename", filename);
    }

}
