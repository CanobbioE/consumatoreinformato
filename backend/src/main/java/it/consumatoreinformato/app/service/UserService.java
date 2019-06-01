package it.consumatoreinformato.app.service;

import com.stripe.exception.StripeException;
import it.consumatoreinformato.app.dto.user.requests.LoginDto;
import it.consumatoreinformato.app.dto.user.requests.RegenerateTokenDto;
import it.consumatoreinformato.app.dto.user.requests.RegistrationDto;
import it.consumatoreinformato.app.dto.user.responses.LoginResponseDto;
import it.consumatoreinformato.app.dto.user.responses.RegenerateTokenResponseDto;
import it.consumatoreinformato.app.dto.payments.responses.PaymentStatusDto;
import it.consumatoreinformato.app.exception.*;
import it.consumatoreinformato.app.model.entities.User;

public interface UserService {
    User getByEmail(String email) throws UserNotFoundException;

    LoginResponseDto login(LoginDto loginDto) throws UserNotFoundException, WrongPasswordException;

    PaymentStatusDto register(RegistrationDto registrationDto) throws EmailAlreadyRegisteredException, StripeException, PaymentFailedException;

    RegenerateTokenResponseDto regenerateToken(RegenerateTokenDto regenerateTokenDto) throws UserNotFoundException, InvalidJwtRegenerationTokenException;
}

