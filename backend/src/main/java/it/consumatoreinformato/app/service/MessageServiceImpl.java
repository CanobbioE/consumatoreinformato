package it.consumatoreinformato.app.service;


import it.consumatoreinformato.app.dto.messages.requests.ReadMessageDto;
import it.consumatoreinformato.app.dto.messages.requests.SendMessageDto;
import it.consumatoreinformato.app.dto.messages.responses.MessageDto;
import it.consumatoreinformato.app.dto.messages.responses.MessageReceivedDto;
import it.consumatoreinformato.app.dto.messages.responses.MessageSentDto;
import it.consumatoreinformato.app.exception.MessageNotFoundException;
import it.consumatoreinformato.app.exception.UserNotFoundException;
import it.consumatoreinformato.app.model.entities.Message;
import it.consumatoreinformato.app.model.entities.User;
import it.consumatoreinformato.app.repository.MessageRepository;
import it.consumatoreinformato.app.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.stream.Collectors;

@Component
public class MessageServiceImpl implements MessageService {

    private final MessageRepository messageRepository;
    private final UserRepository userRepository;

    @Autowired
    public MessageServiceImpl(MessageRepository messageRepository, UserRepository userRepository) {
        this.messageRepository = messageRepository;
        this.userRepository = userRepository;
    }

    /**
     * Sends a message from a user to another one
     *
     * @param sender         the user sending the message
     * @param sendMessageDto the message to be sent
     * @return the sent message
     * @throws UserNotFoundException if the receiver does not exists
     */
    public MessageSentDto send(User sender, SendMessageDto sendMessageDto) throws UserNotFoundException {
        Message message = Message.fromDto(sendMessageDto);
        message.setReceiver(userRepository.findById(sendMessageDto.getReceiver()).orElseThrow(
                () -> new UserNotFoundException(sendMessageDto.getReceiver()))
        );
        message.setSender(sender);
        message.setRead(false);
        return MessageSentDto.fromModel(messageRepository.save(message));
    }

    /**
     * Retrieve all the new messages for a given user
     *
     * @param receiver the user that received new messages
     * @return a list of messages that had the field "read" set to false
     */
    public List<MessageReceivedDto> unreads(User receiver) {
        return messageRepository.findAllByReceiverIdAndRead(receiver.getId(), false)
                .stream()
                .map(MessageReceivedDto::fromModel)
                .collect(Collectors.toList());
    }

    /**
     * Retrieve all the messages sent/received by the logged user
     *
     * @param user1 one of the two ends of the communication
     * @return a list of all the messages from/to the logged user
     */
    public List<MessageDto> all(Long user1) {
        // First we take all the messages received or sent by the logged in user
        return messageRepository.findTop1000ByReceiverIdOrSenderIdOrderByDateTime(user1, user1)
                .stream()
                .map(MessageDto::fromModel)
                .collect(Collectors.toList());
    }

    /**
     * Marks all the messages previous to the specified one as read
     *
     * @param readMessageDto a DTO with the details to identify a message to be read
     */
    public void read(User receiver, ReadMessageDto readMessageDto) {
        messageRepository.findByReceiverIdAndSenderIdAndDateTimeBeforeAndRead(
                receiver.getId(),
                readMessageDto.getSender(),
                readMessageDto.getDateTime(),
                false)
                .forEach(m -> {
                 m.setRead(true);
                 messageRepository.save(m);
                });
        //.orElseThrow( () -> new MessageNotFoundException( userRepository.findById(readMessageDto.getSender()), userRepository.findById(receiver.getId()), readMessageDto.getDate() ));
    }
}
