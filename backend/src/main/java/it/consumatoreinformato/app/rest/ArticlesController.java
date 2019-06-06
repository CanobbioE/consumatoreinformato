package it.consumatoreinformato.app.rest;

import io.swagger.annotations.ApiImplicitParam;
import io.swagger.annotations.ApiOperation;
import it.consumatoreinformato.app.dto.articles.requests.ArticleCreationDto;
import it.consumatoreinformato.app.dto.articles.requests.ArticleEditDto;
import it.consumatoreinformato.app.dto.articles.responses.ArticleDto;
import it.consumatoreinformato.app.dto.users.responses.UserDto;
import it.consumatoreinformato.app.exception.InvalidJwtAuthenticationException;
import it.consumatoreinformato.app.service.ArticleService;
import it.consumatoreinformato.app.service.ArticleServiceImpl;
import it.consumatoreinformato.app.util.SecurityHandler;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/articles")
public class ArticlesController {

    private ArticleService articleService;

    @Autowired
    public ArticlesController(ArticleServiceImpl articleService) {
        this.articleService = articleService;
    }

    @PostMapping("/create")
    @ApiOperation(value = "Create an article", response = ArticleDto.class, httpMethod = "POST")
    @ApiImplicitParam(name = "Authorization", dataType = "string", paramType = "header", required = true)
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseEntity<ArticleDto> create(@Valid @RequestBody ArticleCreationDto articleCreationDto)
            throws InvalidJwtAuthenticationException {
        return ResponseEntity.ok(articleService.create(articleCreationDto));
    }

    // TODO this should be patch bu it's not working...
    @PostMapping("/edit")
    @ApiOperation(value = "Edit an article", response = ArticleDto.class, httpMethod = "POST")
    @ApiImplicitParam(name = "Authorization", dataType = "string", paramType = "header", required = true)
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseEntity<ArticleDto> edit(@Valid @RequestBody ArticleEditDto articleEditDto)
            throws InvalidJwtAuthenticationException {
        return ResponseEntity.ok(articleService.edit(articleEditDto));
    }

    @GetMapping("/all")
    @ApiOperation(value = "Retrieve all the articles", response = UserDto.class, httpMethod = "GET")
    public ResponseEntity<List<ArticleDto>> all() {
        return ResponseEntity.ok(articleService.getAll());
    }
}
