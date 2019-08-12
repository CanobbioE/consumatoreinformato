package it.consumatoreinformato.app.rest;

import com.stripe.exception.StripeException;
import io.swagger.annotations.ApiImplicitParam;
import it.consumatoreinformato.app.dto.users.requests.*;
import it.consumatoreinformato.app.dto.users.responses.LoginResponseDto;
import it.consumatoreinformato.app.dto.users.responses.PasswordDto;
import it.consumatoreinformato.app.dto.users.responses.RegenerateTokenResponseDto;
import it.consumatoreinformato.app.dto.payments.responses.PaymentStatusDto;
import it.consumatoreinformato.app.dto.users.responses.UserDto;
import it.consumatoreinformato.app.exception.*;
import it.consumatoreinformato.app.service.UserService;
import it.consumatoreinformato.app.service.UserServiceImpl;
import io.swagger.annotations.ApiOperation;
import it.consumatoreinformato.app.util.SecurityHandler;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/users")
public class UserController {

    private final UserService userService;
    private final SecurityHandler securityHandler;

    @Autowired
    public UserController(UserServiceImpl userService, SecurityHandler securityHandler) {
        this.userService = userService;
        this.securityHandler = securityHandler;
    }

    @ApiOperation(value = "Register account", notes = "Register as a new users", response = UserDto.class, httpMethod = "POST")
    @PostMapping("/register")
    public ResponseEntity<PaymentStatusDto> register(@Valid @RequestBody RegistrationDto registrationDto)
            throws EmailAlreadyRegisteredException, PaymentFailedException, StripeException {
        return ResponseEntity.ok(userService.register(registrationDto));
    }

    @ApiOperation(value = "Login", notes = "Login as users and receive a jwt token", response = LoginResponseDto.class, httpMethod = "POST")
    @PostMapping("/login")
    public ResponseEntity<LoginResponseDto> login(@Valid @RequestBody LoginDto loginDto)
            throws UserNotFoundException, WrongPasswordException {
        return ResponseEntity.ok(userService.login(loginDto));
    }

    @ApiOperation(value = "Regenerate Token", notes = "Regenerate users token", response = RegenerateTokenResponseDto.class, httpMethod = "POST")
    @PostMapping("/regenerate-token")
    public ResponseEntity<RegenerateTokenResponseDto> regenerateToken(@Valid @RequestBody RegenerateTokenDto regenerateTokenDto)
            throws UserNotFoundException, InvalidJwtRegenerationTokenException {
        return ResponseEntity.ok(userService.regenerateToken(regenerateTokenDto));
    }

    @ApiOperation(value = "Retrieve User Data", notes = "Fetches all the data of the current users", response = UserDto.class, httpMethod = "GET")
    @ApiImplicitParam(name = "Authorization", dataType = "string", paramType = "header", required = true)
    @GetMapping("/current")
    public ResponseEntity<UserDto> current()
            throws UserNotFoundException, NotAuthenticatedException {
        return ResponseEntity.ok(
                UserDto.fromModel(userService.getByEmail(securityHandler.getPrincipalAsUser().getEmail()))
        );
    }

    @ApiOperation(value = "Retrieve Users Data", notes = "Fetches all the users data", responseContainer = "List", response = UserDto.class, httpMethod = "GET")
    @ApiImplicitParam(name = "Authorization", dataType = "string", paramType = "header", required = true)
    @GetMapping("/all")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseEntity<List<UserDto>> all()
            throws InvalidJwtAuthenticationException {
        return ResponseEntity.ok(userService.getAll());
    }

    @ApiOperation(value = "Retrieve a User Data", notes = "Fetches one user details", response = UserDto.class, httpMethod = "GET")
    @ApiImplicitParam(name = "Authorization", dataType = "string", paramType = "header", required = true)
    @GetMapping("/details/{id}")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseEntity<UserDto> details(@Valid @PathVariable Long id)
            throws InvalidJwtAuthenticationException, UserNotFoundException {
        return ResponseEntity.ok(userService.get(id));
    }

    @ApiOperation(value = "Account registration by an admin", notes = "Force a user's registration", response = UserDto.class, httpMethod = "POST")
    @PostMapping("/force-register")
    @ApiImplicitParam(name = "Authorization", dataType = "string", paramType = "header", required = true)
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseEntity<UserDto> forceRegister(@Valid @RequestBody ForceRegistrationDto registrationDto)
            throws EmailAlreadyRegisteredException {
        return ResponseEntity.ok(userService.forceRegister(registrationDto));
    }

    @ApiOperation(value = "Change password", notes = "Changes the current user password", response = PasswordDto.class, httpMethod = "POST")
    @PostMapping("/change-password")
    @ApiImplicitParam(name = "Authorization", dataType = "string", paramType = "header", required = true)
    public ResponseEntity<PasswordDto> changePassword(@Valid @RequestBody NewPasswordDto newPasswordDto)
            throws UserNotFoundException, NotAuthenticatedException {
        return ResponseEntity.ok(userService.changePassword(securityHandler.getPrincipalAsUser(), newPasswordDto.getPassword()));
    }




}
