package it.consumatoreinformato.app.exception.handling;

public enum InternalErrorCode {
    UNKNOWN,
    EMAIL_ALREADY_REGISTERED,
    NOT_AUTHENTICATED,
    USER_NOT_FOUND,
    WRONG_PASSWORD,
    INVALID_TOKEN,
    CONSTRAINT_VIOLATION,
    INVALID_FIELD_IN_DTO,
    PAYMENT_FAILED
}
