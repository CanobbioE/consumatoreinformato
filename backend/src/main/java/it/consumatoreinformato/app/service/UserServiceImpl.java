package it.consumatoreinformato.app.service;

import com.stripe.exception.StripeException;
import com.stripe.model.Charge;
import it.consumatoreinformato.app.config.jwt.JwtTokenProvider;
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
import it.consumatoreinformato.app.model.entities.Payment;
import it.consumatoreinformato.app.model.entities.User;
import it.consumatoreinformato.app.repository.PaymentRepository;
import it.consumatoreinformato.app.repository.UserRepository;
import org.apache.tomcat.jni.Local;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;


@Service
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private final PaymentRepository paymentRepository;
    private final PaymentService paymentService;
    private final PasswordEncoder passwordEncoder;

    private final AuthenticationManager authenticationManager;
    private final JwtTokenProvider jwtTokenProvider;


    @Autowired
    public UserServiceImpl(UserRepository userRepository,
                           PaymentServiceImpl paymentService,
                           PaymentRepository paymentRepository,
                           PasswordEncoder passwordEncoder,
                           AuthenticationManager authenticationManager,
                           JwtTokenProvider jwtTokenProvider
    ) {
        this.userRepository = userRepository;
        this.paymentRepository = paymentRepository;
        this.passwordEncoder = passwordEncoder;
        this.authenticationManager = authenticationManager;
        this.jwtTokenProvider = jwtTokenProvider;
        this.paymentService = paymentService;
    }

    /**
     * @param email users's email
     * @return the users to which correspond the given email
     * @throws UserNotFoundException if the users does not exist
     */
    public User getByEmail(String email) throws UserNotFoundException {
        Optional<User> oUser = userRepository.findByEmail(email);
        if (!oUser.isPresent()) throw new UserNotFoundException(email);

        return oUser.get();
    }

    /**
     * Changes a user's password
     * @param user who is getting the password changed
     * @param newPassword the new password
     * @return the encoded password
     */
    public PasswordDto changePassword(User user, String newPassword) {
        User savedUser = saveUser(user, newPassword);
        return PasswordDto.builder().hash(savedUser.getHash()).build();
    }

    /**
     * Registers a new users with a fake payment
     * @param forceRegistrationDto a registrationDTO but with a lastPayment date
     * @see RegistrationDto
     * @return the newly created user
     * @throws EmailAlreadyRegisteredException if the email is already in use
     */
    public UserDto forceRegister(ForceRegistrationDto forceRegistrationDto) throws
            EmailAlreadyRegisteredException {

        LocalDate lastPayment = forceRegistrationDto.getPaymentDate();
        if (lastPayment == null) lastPayment = LocalDate.now();

        if (userRepository.existsByEmail(forceRegistrationDto.getEmail()))
            throw new EmailAlreadyRegisteredException(forceRegistrationDto.getEmail());

        User savedUser = saveUser(User.fromDto(forceRegistrationDto), forceRegistrationDto.getPassword());
        savePayment(new BigDecimal(20 * 100), lastPayment, savedUser);
        return UserDto.fromModel(savedUser);
    }


    /**
     * Registers a new users after verifying that the payment was valid
     *
     * @param registrationDto a dto containing the registration details
     * @return anything needed to the front end
     * @throws EmailAlreadyRegisteredException if the user is already registered
     * @throws StripeException                 if we get an error while forwarding the payment request to stripe
     * @throws PaymentFailedException          if the payment has failed in any way
     */
    public PaymentStatusDto register(RegistrationDto registrationDto) throws
            EmailAlreadyRegisteredException,
            StripeException,
            PaymentFailedException {

        LocalDate lastPayment = LocalDate.now();
        if (userRepository.existsByEmail(registrationDto.getEmail()))
            throw new EmailAlreadyRegisteredException(registrationDto.getEmail());
        Charge charge = paymentService.chargeCreditCard(registrationDto.getEmail(), registrationDto.getStripeToken());
        if (!charge.getPaid()) throw new PaymentFailedException(charge.getStatus());


        User savedUser = saveUser(User.fromDto(registrationDto), registrationDto.getPassword());
        savePayment(new BigDecimal(20 * 100), lastPayment, savedUser);


        return PaymentStatusDto.builder().paid(charge.getPaid()).build();
    }

    /**
     * Tries to log the users in by verifying its credentials
     *
     * @param loginDto a DTO containing an email and a password
     * @return a DTO containing all the needed tokens to authenticate the users
     * @throws UserNotFoundException  if the username (email) is not found
     * @throws WrongPasswordException if the password provided doesn't match the hash stored
     */
    public LoginResponseDto login(LoginDto loginDto) throws UserNotFoundException, WrongPasswordException {
        User user = getByEmail(loginDto.getEmail());
        try {
            authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(user.getEmail(),
                    loginDto.getPassword()));
            return getLoginResponseDto(user);
        } catch (AuthenticationException e) {
            throw new WrongPasswordException();
        }
    }

    /**
     * Refresh the validity of a JWT
     *
     * @param regenerateTokenDto
     * @return the regenerated token
     * @throws UserNotFoundException
     * @throws InvalidJwtRegenerationTokenException
     */
    @Override
    public RegenerateTokenResponseDto regenerateToken(RegenerateTokenDto regenerateTokenDto)
            throws UserNotFoundException, InvalidJwtRegenerationTokenException {
        User user = getByEmail(jwtTokenProvider.getUsernameByRegenerationToken(regenerateTokenDto.getRegenerateToken()));

        return getRegenerateTokenResponseDto(user);
    }

    /**
     * @param password to e hashed
     * @return the hashed password
     */
    private String calculateHash(String password) {
        return passwordEncoder.encode(password);
    }

    /**
     * @param user
     * @return a LoginResponseDto containing an auth token and refresh token
     */
    private LoginResponseDto getLoginResponseDto(User user) {
        return LoginResponseDto
                .builder()
                .token(getToken(user))
                .regenerateToken(getRegenerationToken(user))
                .build();
    }

    /**
     * @param user
     * @return a Dto containing the refresh token and auth token
     */
    private RegenerateTokenResponseDto getRegenerateTokenResponseDto(User user) {
        return RegenerateTokenResponseDto
                .builder()
                .token(getToken(user))
                .regenerateToken(getRegenerationToken(user))
                .build();
    }

    /**
     * @param user
     * @return an auth token
     */
    private String getToken(User user) {
        return jwtTokenProvider.createToken(user.getEmail(), new ArrayList<>(user.getRoles()));
    }

    /**
     * @param user
     * @return a refresh token
     */
    private String getRegenerationToken(User user) {
        return jwtTokenProvider.createRegenerationToken(user.getEmail(), new ArrayList<>(user.getRoles()));
    }


    /**
     * @return A list of all the users registered in the application
     */
    public List<UserDto> getAll() {
        return userRepository.findAll().stream().map(UserDto::fromModel).collect(Collectors.toList());
    }

    /**
     * Retrieves a user details
     *
     * @param id the identifier for the user
     * @return a dto containing all the user details
     * @throws UserNotFoundException if the user cannot be found
     */
    public UserDto get(Long id) throws UserNotFoundException {
        return UserDto.fromModel(userRepository.findById(id).orElseThrow(() -> new UserNotFoundException(id)));
    }


    private User saveUser(User user, String password) {
        String hash = calculateHash(password);
        user.setHash(hash);
        return userRepository.save(user);
    }


    private Payment savePayment(BigDecimal amount, LocalDate date, User payer) {
        Payment payment = Payment.builder()
                .amount(amount)
                .date(date)
                .payer(payer)
                .build();
        return paymentRepository.save(payment);
    }
}
