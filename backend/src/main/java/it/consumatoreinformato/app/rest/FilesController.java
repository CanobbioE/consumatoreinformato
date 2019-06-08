package it.consumatoreinformato.app.rest;

import io.swagger.annotations.ApiOperation;
import it.consumatoreinformato.app.dto.uploads.requests.FileUploadDto;
import it.consumatoreinformato.app.dto.uploads.responses.UploadFileResponseDto;
import it.consumatoreinformato.app.dto.users.responses.UserDto;
import it.consumatoreinformato.app.exception.FileNotFoundException;
import it.consumatoreinformato.app.exception.FileStorageException;
import it.consumatoreinformato.app.exception.InvalidFileNameException;
import it.consumatoreinformato.app.service.UploadService;
import it.consumatoreinformato.app.service.UploadServiceImpl;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;

import org.springframework.core.io.Resource;

import java.io.IOException;

@RestController
@RequestMapping("/files")
public class FilesController {

    private final UploadService uploadService;
    private static final Logger logger = LoggerFactory.getLogger(FilesController.class);


    @Autowired
    public FilesController(UploadServiceImpl uploadService) {
        this.uploadService = uploadService;
    }

    @ApiOperation(value = "Upload a file", notes = "Upload a file", response = UserDto.class, httpMethod = "POST")
    @PostMapping("/upload")
    public ResponseEntity<UploadFileResponseDto> Upload(@Valid @RequestBody FileUploadDto fileUploadDto)
            throws InvalidFileNameException, FileStorageException {
        return ResponseEntity.ok(uploadService.uploadFile(fileUploadDto));
    }


    @GetMapping("/download/{fileName:.+}")
    public ResponseEntity<Resource> downloadFile(@PathVariable String fileName, HttpServletRequest request)
            throws FileNotFoundException {
        // Load file as Resource
        Resource resource = uploadService.loadFileAsResource(fileName);

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


}
