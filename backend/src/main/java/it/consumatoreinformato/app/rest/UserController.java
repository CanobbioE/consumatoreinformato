package it.consumatoreinformato.app.rest;

import com.stripe.exception.StripeException;
import it.consumatoreinformato.app.dto.user.requests.LoginDto;
import it.consumatoreinformato.app.dto.user.requests.RegenerateTokenDto;
import it.consumatoreinformato.app.dto.user.requests.RegistrationDto;
import it.consumatoreinformato.app.dto.user.responses.LoginResponseDto;
import it.consumatoreinformato.app.dto.user.responses.RegenerateTokenResponseDto;
import it.consumatoreinformato.app.dto.payments.responses.PaymentStatusDto;
import it.consumatoreinformato.app.dto.user.responses.UserDto;
import it.consumatoreinformato.app.exception.*;
import it.consumatoreinformato.app.service.UserService;
import it.consumatoreinformato.app.service.UserServiceImpl;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;

@RestController
@RequestMapping("/users")
public class UserController {

    private final UserService userService;

    @Autowired
    public UserController(UserServiceImpl userService) {
        this.userService = userService;
    }

    @ApiOperation(value = "Register account", notes = "Register as a new user", response = UserDto.class, httpMethod = "POST")
    @PostMapping("/register")
    public ResponseEntity<PaymentStatusDto> register(@Valid @RequestBody RegistrationDto registrationDto)
            throws EmailAlreadyRegisteredException, PaymentFailedException, StripeException {
        return ResponseEntity.ok(userService.register(registrationDto));
    }

    @ApiOperation(value = "Login", notes = "Login as user and receive a jwt token", response = LoginResponseDto.class, httpMethod = "POST")
    @PostMapping("/login")
    public ResponseEntity<LoginResponseDto> login(@Valid @RequestBody LoginDto loginDto)
            throws UserNotFoundException, WrongPasswordException {
        return ResponseEntity.ok(userService.login(loginDto));
    }

    @ApiOperation(value = "Regenerate Token", notes = "Regenerate user token", response = RegenerateTokenResponseDto.class, httpMethod = "POST")
    @PostMapping("/regenerate-token")
    public ResponseEntity<RegenerateTokenResponseDto> regenerateToken(@Valid @RequestBody RegenerateTokenDto regenerateTokenDto)
            throws UserNotFoundException, InvalidJwtRegenerationTokenException {
        return ResponseEntity.ok(userService.regenerateToken(regenerateTokenDto));
    }
}
