package it.consumatoreinformato.app.exception;


import it.consumatoreinformato.app.exception.handling.HandledException;
import it.consumatoreinformato.app.exception.handling.InternalErrorCode;
import it.consumatoreinformato.app.model.entities.User;
import org.springframework.http.HttpStatus;

import java.time.LocalDate;
import java.util.Optional;

public class MessageNotFoundException extends HandledException {

    private MessageNotFoundException() {
        super(HttpStatus.BAD_REQUEST, InternalErrorCode.MESSAGE_NOT_FOUND);
    }

    public MessageNotFoundException(Optional<User> sender, Optional<User> receiver, LocalDate date) {
        this();
        this.addParam("sender", sender.orElse(null));
        this.addParam("receiver", receiver.orElse(null));
        this.addParam("date", date);
    }

}
