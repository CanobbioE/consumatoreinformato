package it.consumatoreinformato.app.dto.articles.responses;

import com.fasterxml.jackson.annotation.JsonInclude;
import it.consumatoreinformato.app.config.ModelMapperHelper;
import lombok.*;

import java.time.LocalDate;


@JsonInclude(JsonInclude.Include.NON_NULL)
@Getter
@Setter
@NoArgsConstructor(access = AccessLevel.PRIVATE)
@AllArgsConstructor(access = AccessLevel.PRIVATE)
@Builder
public class ArticleDto {
    private Long id;
    private LocalDate date;
    private String title;
    private String content;
    private String image;

    public static ArticleDto fromModel(Object model) {
        return ModelMapperHelper.mapToNew(model, ArticleDto.class);
    }
}
