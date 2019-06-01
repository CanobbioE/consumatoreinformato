package it.consumatoreinformato.app.exception.handling;

import it.consumatoreinformato.app.dto.ErrorDto;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

import javax.validation.ConstraintViolationException;
import java.util.HashMap;

@ControllerAdvice
@SuppressWarnings("unused")
public class GlobalExceptionHandler extends ResponseEntityExceptionHandler {

    private static final Logger LOG = LoggerFactory.getLogger(GlobalExceptionHandler.class);

//    FIXME not working
    @ExceptionHandler(value = HandledAuthorizationException.class)
    protected ResponseEntity<ErrorDto> handle(HandledAuthorizationException ex) {
        LOG.error(ex.getMessage(), ex);
        return new ResponseEntity<>(
                ErrorDto
                        .builder()
                        .code(ex.getErrorCode())
                        .params(ex.getErrorParams())
                        .build(),
                ex.getResponseStatus());
    }

    @ExceptionHandler(value = HandledException.class)
    protected ResponseEntity<ErrorDto> handle(HandledException ex) {
        LOG.error(ex.getMessage(), ex);
        return new ResponseEntity<>(
                ErrorDto
                        .builder()
                        .code(ex.getErrorCode())
                        .params(ex.getErrorParams())
                        .build(),
                ex.getResponseStatus());
    }

    @ExceptionHandler(value = ConstraintViolationException.class)
    protected ResponseEntity<ErrorDto> handle(ConstraintViolationException ex) {
        LOG.error(ex.getMessage(), ex);
        HashMap<String, Object> errorParams = new HashMap<>();
        ex
                .getConstraintViolations()
                .forEach(cv -> errorParams.put(cv.getPropertyPath().toString(), cv.getMessage()));

        return new ResponseEntity<>(
                ErrorDto
                        .builder()
                        .code(InternalErrorCode.CONSTRAINT_VIOLATION)
                        .params(errorParams)
                        .build(),
                HttpStatus.BAD_REQUEST);
    }

    @Override
    protected ResponseEntity<Object> handleMethodArgumentNotValid(MethodArgumentNotValidException ex, HttpHeaders headers, HttpStatus status, WebRequest request) {
        LOG.error(ex.getMessage(), ex);
        HashMap<String, Object> errorParams = new HashMap<>();
        ex
                .getBindingResult()
                .getFieldErrors()
                .forEach(f -> errorParams.put(f.getField(), f.getDefaultMessage()));

        return new ResponseEntity<>(
                ErrorDto
                        .builder()
                        .code(InternalErrorCode.INVALID_FIELD_IN_DTO)
                        .params(errorParams)
                        .build(),
                HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(value = Exception.class)
    protected ResponseEntity<ErrorDto> handle(Exception ex) {
        LOG.error(ex.getMessage(), ex);
        return new ResponseEntity<>(
                ErrorDto
                        .builder()
                        .code(InternalErrorCode.UNKNOWN)
                        .build(),
                HttpStatus.INTERNAL_SERVER_ERROR);
    }
}
