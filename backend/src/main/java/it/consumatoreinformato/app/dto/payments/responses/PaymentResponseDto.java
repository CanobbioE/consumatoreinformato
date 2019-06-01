package it.consumatoreinformato.app.dto.payments.responses;

import com.fasterxml.jackson.annotation.JsonInclude;
import it.consumatoreinformato.app.config.ModelMapperHelper;
import it.consumatoreinformato.app.dto.user.responses.UserDto;
import lombok.*;

import java.math.BigDecimal;
import java.time.LocalDate;


@JsonInclude(JsonInclude.Include.NON_NULL)
@Getter
@Setter
@NoArgsConstructor(access = AccessLevel.PRIVATE)
@AllArgsConstructor(access = AccessLevel.PRIVATE)
@Builder
public class PaymentResponseDto {

    private UserDto payer;
    private BigDecimal amount;
    private LocalDate date;


    public static PaymentResponseDto fromModel(Object model) {
        return ModelMapperHelper.mapToNew(model, PaymentResponseDto.class);
    }


}
