package it.consumatoreinformato.app.service;

import it.consumatoreinformato.app.dto.articles.requests.ArticleCreationDto;
import it.consumatoreinformato.app.dto.articles.requests.ArticleEditDto;
import it.consumatoreinformato.app.dto.articles.responses.ArticleDto;
import it.consumatoreinformato.app.model.entities.Article;
import it.consumatoreinformato.app.repository.ArticleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

@Component
public class ArticleServiceImpl implements ArticleService {

    private ArticleRepository articleRepository;


    @Autowired
    public ArticleServiceImpl(ArticleRepository articleRepository) {
        this.articleRepository = articleRepository;
    }

    /**
     * Creates a new article from the given DTO
     *
     * @param articleCreationDto the dto containing all the fields needed to create the Article
     * @return the newly created article
     */
    public ArticleDto create(ArticleCreationDto articleCreationDto) {
        return ArticleDto.fromModel(articleRepository.save(Article.fromDto(articleCreationDto)));
    }

    /**
     * Updates the content, title, date and/or image of the article specified by the ID in the given DTO
     * @param articleEditDto DTO containing all the new fields and the id for the article to be edited
     * @return the edited article
     */
    public ArticleDto edit(ArticleEditDto articleEditDto) {
        return ArticleDto.fromModel(articleRepository.save(Article.builder()
                .content(articleEditDto.getContent())
                .title(articleEditDto.getTitle())
                .date(LocalDate.now())
                .image(articleEditDto.getImage())
                .id(articleEditDto.getId())
                .build())
        );
    }

    /**
     * Retrieve all the articles in the repository
     *
     * @return a list of all the known articles
     */
    // TODO: use pagination
    public List<ArticleDto> getAll() {
        return articleRepository.findAllByIdIsNotNullOrderByDate()
                .stream()
                .map(ArticleDto::fromModel)
                .collect(Collectors.toList());
    }


}
