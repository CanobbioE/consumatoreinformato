package it.consumatoreinformato.app.dto.uploads.responses;

import com.fasterxml.jackson.annotation.JsonInclude;
import it.consumatoreinformato.app.config.ModelMapperHelper;
import it.consumatoreinformato.app.model.entities.User;
import lombok.*;

import java.time.LocalDate;

@JsonInclude(JsonInclude.Include.NON_NULL)
@Getter
@Setter
@NoArgsConstructor(access = AccessLevel.PRIVATE)
@AllArgsConstructor(access = AccessLevel.PRIVATE)
@Builder
public class UserInfoUploadDto {
    private LocalDate date;
    private String filePath;
    private User uploader;
    private String fileName;

    public static UserInfoUploadDto fromModel(Object model) {
        return ModelMapperHelper.mapToNew(model, UserInfoUploadDto.class);
    }
}
