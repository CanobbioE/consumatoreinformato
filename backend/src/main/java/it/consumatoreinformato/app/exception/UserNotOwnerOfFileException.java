package it.consumatoreinformato.app.exception;


import it.consumatoreinformato.app.exception.handling.HandledException;
import it.consumatoreinformato.app.exception.handling.InternalErrorCode;
import org.springframework.http.HttpStatus;

public class UserNotOwnerOfFileException extends HandledException {

    private UserNotOwnerOfFileException() {
        super(HttpStatus.BAD_REQUEST, InternalErrorCode.USER_NOT_OWNER);
    }

    public UserNotOwnerOfFileException(Long userID, String filename) {
        this();
        this.addParam("user", userID);
        this.addParam("filename", filename);
    }

}
