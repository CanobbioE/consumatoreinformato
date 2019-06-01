package it.consumatoreinformato.app.exception.handling;

import lombok.Getter;
import lombok.Setter;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.AuthenticationException;

import java.util.HashMap;
import java.util.Map;

@Getter
@Setter
public class HandledAuthorizationException extends AuthenticationException implements IHandledException {

    HttpStatus responseStatus;
    InternalErrorCode errorCode;
    Map<String, Object> errorParams = new HashMap<>();

    public HandledAuthorizationException(HttpStatus responseStatus, InternalErrorCode errorCode) {
        super("Authorization Exception");
        this.responseStatus = responseStatus;
        this.errorCode = errorCode;
    }

    protected void addParam(String paramName, Object paramValue) {
        this.errorParams.put(paramName, paramValue);
    }

}
