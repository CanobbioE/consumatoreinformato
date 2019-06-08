package it.consumatoreinformato.app.exception;


import it.consumatoreinformato.app.exception.handling.HandledException;
import it.consumatoreinformato.app.exception.handling.InternalErrorCode;
import org.springframework.http.HttpStatus;

public class FileStorageException extends HandledException {

    private FileStorageException() {
        super(HttpStatus.INTERNAL_SERVER_ERROR, InternalErrorCode.UPLOAD_FAILED);
    }

    public FileStorageException(String filename, Exception ex) {
        this();
        this.addParam("filename", filename);
        this.addParam("exception", ex);
    }

}
