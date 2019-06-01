package it.consumatoreinformato.app.exception.handling;

import lombok.Getter;
import lombok.Setter;
import org.springframework.http.HttpStatus;

import java.util.HashMap;
import java.util.Map;

@Getter
@Setter
public class HandledException extends Exception implements IHandledException{

    HttpStatus responseStatus;
    InternalErrorCode errorCode;
    Map<String, Object> errorParams = new HashMap<>();

    public HandledException(HttpStatus responseStatus, InternalErrorCode errorCode) {
        super();
        this.responseStatus = responseStatus;
        this.errorCode = errorCode;
    }

    protected void addParam(String paramName, Object paramValue) {
        this.errorParams.put(paramName, paramValue);
    }

}
