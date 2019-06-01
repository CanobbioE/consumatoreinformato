package it.consumatoreinformato.app.exception.handling;

import org.springframework.http.HttpStatus;

import java.util.Map;

public interface IHandledException {
    InternalErrorCode getErrorCode();
    Map<String, Object> getErrorParams();
    HttpStatus getResponseStatus();
}
