package it.consumatoreinformato.app.dto.user.responses;


import it.consumatoreinformato.app.config.ModelMapperHelper;
import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.*;

@JsonInclude(JsonInclude.Include.NON_NULL)
@Getter
@Setter
@NoArgsConstructor(access = AccessLevel.PRIVATE)
@AllArgsConstructor(access = AccessLevel.PRIVATE)
@Builder
public class UserDto {

    private String email;

    public static UserDto fromModel(Object model) {
        return ModelMapperHelper.mapToNew(model, UserDto.class);
    }

}
