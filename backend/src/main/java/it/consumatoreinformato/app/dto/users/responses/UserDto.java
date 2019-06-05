package it.consumatoreinformato.app.dto.users.responses;


import it.consumatoreinformato.app.config.ModelMapperHelper;
import com.fasterxml.jackson.annotation.JsonInclude;
import it.consumatoreinformato.app.dto.payments.responses.UserInfoPaymentDto;
import it.consumatoreinformato.app.dto.uploads.responses.UserInfoUploadDto;
import lombok.*;

import java.time.LocalDate;
import java.util.List;
import java.util.Set;

@JsonInclude(JsonInclude.Include.NON_NULL)
@Getter
@Setter
@NoArgsConstructor(access = AccessLevel.PRIVATE)
@AllArgsConstructor(access = AccessLevel.PRIVATE)
@Builder
public class UserDto {

    private Long id;
    private String email;
    private String name;
    private String surname;
    private LocalDate birthday;
    private String birthplace;
    private String codiceFiscale;
    private String homeAddress;
    private String telephoneNumber;
    private List<UserInfoPaymentDto> payments;
    private List<UserInfoUploadDto> uploads;
    private Set<String> roles;

    public static UserDto fromModel(Object model) {
        return ModelMapperHelper.mapToNew(model, UserDto.class);
    }

}
