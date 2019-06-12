package it.consumatoreinformato.app.exception;


import it.consumatoreinformato.app.exception.handling.HandledException;
import it.consumatoreinformato.app.exception.handling.InternalErrorCode;
import org.springframework.http.HttpStatus;

public class FileNotFoundException extends HandledException {

    private FileNotFoundException() {
        super(HttpStatus.NOT_FOUND, InternalErrorCode.FILE_NOT_FOUND);
    }

    public FileNotFoundException(String filename, Exception ex) {
        this();
        this.addParam("filename", filename);
        this.addParam("exception", ex);
    }

    public FileNotFoundException(String filename) {
        this();
        this.addParam("filename", filename);
    }

}
