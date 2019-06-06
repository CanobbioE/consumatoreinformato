package it.consumatoreinformato.app.repository;

import it.consumatoreinformato.app.model.entities.Article;
import it.consumatoreinformato.app.model.entities.Payment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;


@Repository
public interface ArticleRepository extends JpaRepository<Article, Long> {
    List<Article> findAll();
    List<Article> findAllByIdIsNotNullOrderByDate();
}

