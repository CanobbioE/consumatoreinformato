package it.consumatoreinformato.app.dto.user.requests;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.*;

import javax.validation.constraints.Email;
import java.time.LocalDate;

@JsonInclude(JsonInclude.Include.NON_NULL)
@Getter
@Setter
@NoArgsConstructor(access = AccessLevel.PRIVATE)
@AllArgsConstructor(access = AccessLevel.PRIVATE)
@Builder
public class RegistrationDto {

    @Email
    private String email;
    private String password;

    private String name;
    private String surname;
    private LocalDate birthday;
    private String birthplace;
    private String codiceFiscale;
    private String homeAddress;
    private String telephoneNumber;
    private String stripeToken;

}