package it.consumatoreinformato.app.service;

import it.consumatoreinformato.app.dto.messages.requests.ReadMessageDto;
import it.consumatoreinformato.app.dto.messages.requests.SendMessageDto;
import it.consumatoreinformato.app.dto.messages.responses.MessageDto;
import it.consumatoreinformato.app.dto.messages.responses.MessageReceivedDto;
import it.consumatoreinformato.app.dto.messages.responses.MessageSentDto;
import it.consumatoreinformato.app.exception.UserNotFoundException;
import it.consumatoreinformato.app.model.entities.User;

import java.util.List;

public interface MessageService {
    MessageSentDto send(User sender, SendMessageDto sendMessageDto) throws UserNotFoundException;

    List<MessageReceivedDto> unreads(User receiver);

    List<MessageDto> all(Long user1);

    void read(User receiver, ReadMessageDto readMessageDto);
}

