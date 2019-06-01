package it.consumatoreinformato.app.service;

import it.consumatoreinformato.app.dto.articles.requests.ArticleCreationDto;
import it.consumatoreinformato.app.dto.articles.responses.ArticleDto;
import it.consumatoreinformato.app.model.entities.Article;
import it.consumatoreinformato.app.repository.ArticleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

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
     * Retrieve all the articles in the repository
     *
     * @return a list of all the known articles
     */
    // TODO: use pagination
    public List<ArticleDto> getAll() {
        return articleRepository.findAll().stream().map(ArticleDto::fromModel).collect(Collectors.toList());
    }


}
