package it.consumatoreinformato.app.rest;

import io.swagger.annotations.ApiImplicitParam;
import io.swagger.annotations.ApiOperation;
import it.consumatoreinformato.app.dto.messages.requests.ReadMessageDto;
import it.consumatoreinformato.app.dto.messages.requests.SendMessageDto;
import it.consumatoreinformato.app.dto.messages.responses.MessageDto;
import it.consumatoreinformato.app.dto.messages.responses.MessageReceivedDto;
import it.consumatoreinformato.app.dto.messages.responses.MessageSentDto;
import it.consumatoreinformato.app.exception.InvalidJwtAuthenticationException;
import it.consumatoreinformato.app.exception.MessageNotFoundException;
import it.consumatoreinformato.app.exception.NotAuthenticatedException;
import it.consumatoreinformato.app.exception.UserNotFoundException;
import it.consumatoreinformato.app.service.MessageService;
import it.consumatoreinformato.app.service.MessageServiceImpl;
import it.consumatoreinformato.app.util.SecurityHandler;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/messages")
public class MessagesController {

    private final MessageService messageService;
    private final SecurityHandler securityHandler;

    @Autowired
    public MessagesController(MessageServiceImpl messageService, SecurityHandler securityHandler) {
        this.messageService = messageService;
        this.securityHandler = securityHandler;
    }


    @PostMapping("/send")
    @ApiOperation(value = "Send a message from the principal to the receiver", httpMethod = "POST", response = MessageSentDto.class)
    @ApiImplicitParam(name = "Authorization", dataType = "string", paramType = "header", required = true)
    public ResponseEntity<MessageSentDto> create(@Valid @RequestBody SendMessageDto sendMessageDto)
            throws InvalidJwtAuthenticationException, UserNotFoundException, NotAuthenticatedException {
        return ResponseEntity.ok(messageService.send(securityHandler.getPrincipalAsUser(), sendMessageDto));
    }

    @GetMapping("/new")
    @ApiOperation(value = "Retrieve all the new messages for the principal", response = MessageReceivedDto.class, responseContainer = "List", httpMethod = "GET")
    @ApiImplicitParam(name = "Authorization", dataType = "string", paramType = "header", required = true)
    public ResponseEntity<List<MessageReceivedDto>> unreads() throws UserNotFoundException, NotAuthenticatedException{
       return ResponseEntity.ok(messageService.unreads(securityHandler.getPrincipalAsUser()));
    }

    @GetMapping("/all")
    @ApiOperation(value = "Retrieve all the messages sent and received by the principal", response = MessageDto.class, responseContainer = "List", httpMethod = "GET")
    @ApiImplicitParam(name = "Authorization", dataType = "string", paramType = "header", required = true)
    public ResponseEntity<List<MessageDto>> all() throws UserNotFoundException, NotAuthenticatedException{
        return ResponseEntity.ok(messageService.all(securityHandler.getPrincipalAsUser()));

    }

    @PostMapping("/read")
    @ApiOperation(value = "Mark all the messages previous to a given date as read", httpMethod = "POST")
    @ApiImplicitParam(name = "Authorization", dataType = "string", paramType = "header", required = true)
    public ResponseEntity<Void> read(@Valid @RequestBody ReadMessageDto readMessageDto)
            throws MessageNotFoundException, UserNotFoundException, NotAuthenticatedException{
        messageService.read(securityHandler.getPrincipalAsUser(), readMessageDto);
        return ResponseEntity.ok().build();
    }

}
