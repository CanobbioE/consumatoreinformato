package it.consumatoreinformato.app.dto.messages.responses;
import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.*;

import java.time.LocalDate;

@JsonInclude(JsonInclude.Include.NON_NULL)
@Getter
@Setter
@NoArgsConstructor(access = AccessLevel.PRIVATE)
@AllArgsConstructor(access = AccessLevel.PRIVATE)
@Builder
public class  MessageSentDto {
    private Long sender;
    private Long receiver;
    private LocalDate date;
}
