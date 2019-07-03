package it.consumatoreinformato.app.dto.users.responses;


import com.fasterxml.jackson.annotation.JsonInclude;
import it.consumatoreinformato.app.config.ModelMapperHelper;
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
public class UserBasicDetailsDto {

    private Long id;
    private String email;
    private String name;
    private String surname;

    public static UserBasicDetailsDto fromModel(Object model) {
        return ModelMapperHelper.mapToNew(model, UserBasicDetailsDto.class);
    }

}
