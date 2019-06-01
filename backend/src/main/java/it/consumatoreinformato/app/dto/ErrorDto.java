package it.consumatoreinformato.app.dto;

import it.consumatoreinformato.app.exception.handling.InternalErrorCode;
import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.*;

import java.util.Map;

@JsonInclude(JsonInclude.Include.NON_NULL)
@Getter
@Setter
@NoArgsConstructor(access = AccessLevel.PRIVATE)
@AllArgsConstructor(access = AccessLevel.PRIVATE)
@Builder
public class ErrorDto {

    private InternalErrorCode code;
    private Map<String, Object> params;

}
