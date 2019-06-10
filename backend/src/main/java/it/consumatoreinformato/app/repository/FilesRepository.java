package it.consumatoreinformato.app.repository;

import it.consumatoreinformato.app.model.entities.Article;
import it.consumatoreinformato.app.model.entities.Upload;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.io.File;
import java.util.List;


@Repository
public interface FilesRepository extends JpaRepository<Upload, Long> {
    List<Upload> findAll();
    List<Upload> findByFileName(String fileName);
}

