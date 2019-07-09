package it.consumatoreinformato.app.dto.messages.responses;

import com.fasterxml.jackson.annotation.JsonInclude;
import it.consumatoreinformato.app.config.ModelMapperHelper;
import it.consumatoreinformato.app.dto.users.responses.UserBasicDetailsDto;
import it.consumatoreinformato.app.model.entities.User;
import lombok.*;

import java.time.LocalDate;
import java.time.LocalDateTime;

@JsonInclude(JsonInclude.Include.NON_NULL)
@Getter
@Setter
@NoArgsConstructor(access = AccessLevel.PRIVATE)
@AllArgsConstructor(access = AccessLevel.PRIVATE)
@Builder
public class MessageDto {
    private UserBasicDetailsDto receiver;
    private UserBasicDetailsDto sender;
    private String content;
    private LocalDateTime dateTime;
    private Boolean read;
    private Long id;

    public static MessageDto fromModel(Object model) {
        return ModelMapperHelper.mapToNew(model, MessageDto.class);
    }
}
