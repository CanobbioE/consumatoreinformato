package it.consumatoreinformato.app.rest;

import io.swagger.annotations.ApiImplicitParam;
import io.swagger.annotations.ApiOperation;
import it.consumatoreinformato.app.dto.messages.requests.ReadMessageDto;
import it.consumatoreinformato.app.dto.messages.requests.SendMessageDto;
import it.consumatoreinformato.app.dto.messages.responses.MessageDto;
import it.consumatoreinformato.app.dto.messages.responses.MessageReceivedDto;
import it.consumatoreinformato.app.dto.messages.responses.MessageSentDto;
import it.consumatoreinformato.app.exception.InvalidJwtAuthenticationException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/messages")
public class MessagesController {


    @Autowired
    public MessagesController() {
    }


    @PostMapping("/send")
    @ApiOperation(value = "Send a message from the principal to the receiver", httpMethod = "POST", response = MessageSentDto.class)
    @ApiImplicitParam(name = "Authorization", dataType = "string", paramType = "header", required = true)
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseEntity<MessageSentDto> create(@Valid @RequestBody SendMessageDto sendMessageDto)
            throws InvalidJwtAuthenticationException {
        // TODO: service that sends
        return ResponseEntity.ok(MessageSentDto.builder().build());
    }

    @GetMapping("/new")
    @ApiOperation(value = "Retrieve all the new messages for the principal", response = MessageReceivedDto.class, responseContainer = "List", httpMethod = "GET")
    @ApiImplicitParam(name = "Authorization", dataType = "string", paramType = "header", required = true)
    public ResponseEntity<List<MessageReceivedDto>> newMessages() {
        // TODO: service that returns only new messages
        return ResponseEntity.ok(new ArrayList<>());
    }

    @GetMapping("/all")
    @ApiOperation(value = "Retrieve all the messages sent and received by the principal", response = MessageDto.class, responseContainer = "List", httpMethod = "GET")
    @ApiImplicitParam(name = "Authorization", dataType = "string", paramType = "header", required = true)
    public ResponseEntity<List<MessageDto>> all() {
        // TODO: service that returns all messages
        return ResponseEntity.ok(new ArrayList<>());
    }

    @PatchMapping("/read")
    @ApiOperation(value = "Mark all the messages previous to a given date as read", httpMethod = "PATCH")
    @ApiImplicitParam(name = "Authorization", dataType = "string", paramType = "header", required = true)
    public ResponseEntity<Void> read(@Valid @RequestBody ReadMessageDto readMessageDto) {
        // TODO: mark messages as read
        return ResponseEntity.ok().build();
    }

}
