package it.consumatoreinformato.app.service;

import it.consumatoreinformato.app.dto.articles.requests.ArticleCreationDto;
import it.consumatoreinformato.app.dto.articles.responses.ArticleDto;

import java.util.List;

public interface ArticleService {
    ArticleDto create(ArticleCreationDto articleCreationDto);
    List<ArticleDto> getAll();
}

