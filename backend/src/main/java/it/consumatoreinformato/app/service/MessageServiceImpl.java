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
        List<MessageReceivedDto> messageReceivedDtos = messageRepository.findAllByReceiverIdAndRead(receiver.getId(), false)
                .stream()
                .map(MessageReceivedDto::fromModel)
                .collect(Collectors.toList());
        return messageReceivedDtos;
    }

    /**
     * Retrieve all the messages received by the user
     *
     * @param receiver the receiver of the messages
     * @return a list of all the messages with the same receiver
     */
    public List<MessageDto> all(User receiver) {
        return messageRepository.findAllByReceiverId(receiver.getId())
                .stream()
                .map(MessageDto::fromModel)
                .collect(Collectors.toList());
    }

    /**
     * Marks a message as read
     *
     * @param readMessageDto a DTO with the details to identify a message to be read
     * @throws MessageNotFoundException if the message cannot be found
     */
    public void read(User receiver, ReadMessageDto readMessageDto) throws MessageNotFoundException {
        // TODO: maybe find all before date and set them all to read = true
        Message message = messageRepository.findByReceiverIdAndSenderIdAndDateAndRead(
                receiver.getId(),
                readMessageDto.getSender(),
                readMessageDto.getDate(),
                false).orElseThrow(
                () -> new MessageNotFoundException(
                        userRepository.findById(readMessageDto.getSender()),
                        userRepository.findById(receiver.getId()),
                        readMessageDto.getDate()
                ));
        message.setRead(true);
        messageRepository.save(message);
    }
}
