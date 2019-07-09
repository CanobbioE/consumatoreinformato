package it.consumatoreinformato.app.dto.messages.responses;

import com.fasterxml.jackson.annotation.JsonInclude;
import it.consumatoreinformato.app.config.ModelMapperHelper;
import it.consumatoreinformato.app.dto.users.responses.UserBasicDetailsDto;
import lombok.*;

import java.time.LocalDate;
import java.time.LocalDateTime;

@JsonInclude(JsonInclude.Include.NON_NULL)
@Getter
@Setter
@NoArgsConstructor(access = AccessLevel.PRIVATE)
@AllArgsConstructor(access = AccessLevel.PRIVATE)
@Builder
public class MessageSentDto {
    private UserBasicDetailsDto sender;
    private UserBasicDetailsDto receiver;
    private LocalDateTime dateTime;
    private String content;
    private Long id;


    public static MessageSentDto fromModel(Object model) {
        return ModelMapperHelper.mapToNew(model, MessageSentDto.class);
    }
}
