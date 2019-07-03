package it.consumatoreinformato.app.dto.messages.responses;

import com.fasterxml.jackson.annotation.JsonInclude;
import it.consumatoreinformato.app.config.ModelMapperHelper;
import it.consumatoreinformato.app.dto.users.responses.UserBasicDetailsDto;
import it.consumatoreinformato.app.model.entities.User;
import lombok.*;

import java.time.LocalDate;

@JsonInclude(JsonInclude.Include.NON_NULL)
@Getter
@Setter
@NoArgsConstructor(access = AccessLevel.PRIVATE)
@AllArgsConstructor(access = AccessLevel.PRIVATE)
@Builder
public class MessageReceivedDto {
    private UserBasicDetailsDto sender;
    private String content;
    private LocalDate date;

    public static MessageReceivedDto fromModel(Object model) {
        return ModelMapperHelper.mapToNew(model, MessageReceivedDto.class);
    }
}
