package it.consumatoreinformato.app.rest;

import io.swagger.annotations.ApiImplicitParam;
import io.swagger.annotations.ApiOperation;
import it.consumatoreinformato.app.dto.uploads.requests.FileUploadDto;
import it.consumatoreinformato.app.dto.uploads.responses.UploadFileResponseDto;
import it.consumatoreinformato.app.dto.uploads.responses.UserInfoUploadDto;
import it.consumatoreinformato.app.exception.*;
import it.consumatoreinformato.app.service.FilesService;
import it.consumatoreinformato.app.service.FilesServiceImpl;
import it.consumatoreinformato.app.util.SecurityHandler;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;

import org.springframework.core.io.Resource;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/files")
public class FilesController {

    private final FilesService filesService;
    private static final Logger logger = LoggerFactory.getLogger(FilesController.class);
    private final SecurityHandler securityHandler;


    @Autowired
    public FilesController(FilesServiceImpl uploadService, SecurityHandler securityHandler) {
        this.securityHandler = securityHandler;
        this.filesService = uploadService;
    }

    @ApiOperation(value = "Upload a file", notes = "Upload a file", response = UploadFileResponseDto.class, httpMethod = "POST")
    @PostMapping("/upload")
    @ApiImplicitParam(name = "Authorization", dataType = "string", paramType = "header", required = true)
    public ResponseEntity<UploadFileResponseDto> Upload(@Valid @ModelAttribute FileUploadDto fileUploadDto)
            throws InvalidFileNameException, FileStorageException, NotAuthenticatedException, UserNotFoundException {
        return ResponseEntity.ok(filesService.uploadFile(fileUploadDto, securityHandler.getPrincipalAsUser()));
    }


    @ApiOperation(value = "Download a file", notes = "Download a file", response = Resource.class, httpMethod = "GET")
    @GetMapping("/download/{fileName:.+}")
   //  @ApiImplicitParam(name = "Authorization", dataType = "string", paramType = "header", required = true)
    public ResponseEntity<Resource> downloadFile(@PathVariable String fileName, HttpServletRequest request)
            throws FileNotFoundException,
            InvalidJwtAuthenticationException,
            UserNotFoundException,
            NotAuthenticatedException,
            UserNotOwnerOfFileException {

     /*   Long userID = securityHandler.getPrincipalAsUser().getId();
        if (!filesService.getOwner(fileName).contains(userID) &&
                securityHandler.getPrincipalRoles().contains("ROLE_ADMIN")) {
            throw new UserNotOwnerOfFileException(userID, fileName);
        }*/
        // Load file as Resource
        Resource resource = filesService.loadFileAsResource(fileName);

        // Try to determine file's content type
        String contentType = null;
        try {
            contentType = request.getServletContext().getMimeType(resource.getFile().getAbsolutePath());
        } catch (IOException ex) {
            logger.info("Could not determine file type.");
        }

        // Fallback to the default content type if type could not be determined
        if (contentType == null) {
            contentType = "application/octet-stream";
        }

        return ResponseEntity.ok()
                .contentType(MediaType.parseMediaType(contentType))
                .header(HttpHeaders.CONTENT_DISPOSITION,
                        "attachment; filename=\"" + resource.getFilename() + "\"")
                .body(resource);
    }

    @ApiOperation(
            value = "Get all the uploaded files",
            notes = "Get a list of all the uploaded files",
            responseContainer = "List",
            response = UserInfoUploadDto.class,
            httpMethod = "GET")
    @GetMapping("/all")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseEntity<List<UserInfoUploadDto>> all() throws InvalidJwtAuthenticationException {
        return ResponseEntity.ok(filesService.allUploads());
    }

    @ApiOperation(
            value = "Get all the uploaded files by a user",
            notes = "Get a list of all the uploaded files by the calling user",
            responseContainer = "List",
            response = UserInfoUploadDto.class,
            httpMethod = "GET")
    @ApiImplicitParam(name = "Authorization", dataType = "string", paramType = "header", required = true)
    @GetMapping("/all-by-user/{id}")
    public ResponseEntity<List<UserInfoUploadDto>> allByUser(@Valid @PathVariable String id) {
        Long uid = Long.parseLong(id);
        return ResponseEntity.ok(filesService.allUploads(uid));
    }


}
