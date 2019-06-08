package it.consumatoreinformato.app.dto.uploads.responses;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.*;

@JsonInclude(JsonInclude.Include.NON_NULL)
@Getter
@Setter
@NoArgsConstructor(access = AccessLevel.PRIVATE)
@AllArgsConstructor(access = AccessLevel.PRIVATE)
@Builder
public class UploadFileResponseDto {
    private String fileName;
    private String fileDownloadUri;
    private String fileType;
    private long size;
}
