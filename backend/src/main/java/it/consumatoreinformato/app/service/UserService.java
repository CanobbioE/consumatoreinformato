package it.consumatoreinformato.app.service;

import com.stripe.exception.StripeException;
import it.consumatoreinformato.app.dto.users.requests.ForceRegistrationDto;
import it.consumatoreinformato.app.dto.users.requests.LoginDto;
import it.consumatoreinformato.app.dto.users.requests.RegenerateTokenDto;
import it.consumatoreinformato.app.dto.users.requests.RegistrationDto;
import it.consumatoreinformato.app.dto.users.responses.LoginResponseDto;
import it.consumatoreinformato.app.dto.users.responses.PasswordDto;
import it.consumatoreinformato.app.dto.users.responses.RegenerateTokenResponseDto;
import it.consumatoreinformato.app.dto.payments.responses.PaymentStatusDto;
import it.consumatoreinformato.app.dto.users.responses.UserDto;
import it.consumatoreinformato.app.exception.*;
import it.consumatoreinformato.app.model.entities.User;

import java.util.List;

public interface UserService {
    User getByEmail(String email) throws UserNotFoundException;

    List<UserDto> getAll();

    LoginResponseDto login(LoginDto loginDto) throws UserNotFoundException, WrongPasswordException;

    PaymentStatusDto register(RegistrationDto registrationDto) throws EmailAlreadyRegisteredException, StripeException, PaymentFailedException;

    UserDto forceRegister(ForceRegistrationDto forceRegistrationDto) throws EmailAlreadyRegisteredException;

    RegenerateTokenResponseDto regenerateToken(RegenerateTokenDto regenerateTokenDto) throws UserNotFoundException, InvalidJwtRegenerationTokenException;

    UserDto get(Long id) throws UserNotFoundException;

    PasswordDto changePassword(User user, String newPassword);

}

