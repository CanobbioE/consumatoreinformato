package it.consumatoreinformato.app.service;


import it.consumatoreinformato.app.dto.uploads.requests.FileUploadDto;
import it.consumatoreinformato.app.dto.uploads.responses.UploadFileResponseDto;
import it.consumatoreinformato.app.exception.FileNotFoundException;
import it.consumatoreinformato.app.exception.FileStorageException;
import it.consumatoreinformato.app.exception.InvalidFileNameException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.io.IOException;
import java.net.MalformedURLException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.Objects;

@Component
public class UploadServiceImpl implements UploadService {

    private Path fileStorageLocation;

    @Autowired
    // TODO: this is hardcoded, somehow it doesn't load from properties
    public UploadServiceImpl() {
        this.fileStorageLocation = Paths.get("/uploads").toAbsolutePath().normalize();
        try {
            Files.createDirectories(this.fileStorageLocation);
        } catch (Exception ex) {
        }
    }


    /**
     * @param fileUploadDto
     * @return
     * @throws FileStorageException
     * @throws InvalidFileNameException
     */
    public UploadFileResponseDto uploadFile(FileUploadDto fileUploadDto) throws FileStorageException, InvalidFileNameException {
        // Normalize file name
        String fileName = StringUtils.cleanPath(Objects.requireNonNull(fileUploadDto.getFile().getOriginalFilename()));


        try {
            // Check if the file's name contains invalid characters
            if (fileName.contains("..")) {
                throw new InvalidFileNameException(fileName);
            }

            // Copy file to the target location (Replacing existing file with the same name)
            Path targetLocation = this.fileStorageLocation.resolve(fileName);
            Files.copy(fileUploadDto.getFile().getInputStream(), targetLocation, StandardCopyOption.REPLACE_EXISTING);

            String fileDownloadUri = ServletUriComponentsBuilder.fromCurrentContextPath()
                    .path("/downloadFile/")
                    .path(fileName)
                    .toUriString();

            return UploadFileResponseDto.builder()
                    .fileName(fileName)
                    .fileDownloadUri(fileDownloadUri)
                    .size(fileUploadDto.getFile().getSize())
                    .fileType(fileUploadDto.getFile().getContentType())
                    .build();
        } catch (IOException ex) {
            throw new FileStorageException(fileName, ex);
        }
    }

    /**
     * @param fileName
     * @return
     * @throws FileNotFoundException
     */
    public Resource loadFileAsResource(String fileName) throws FileNotFoundException {
        try {
            Path filePath = this.fileStorageLocation.resolve(fileName).normalize();
            Resource resource = new UrlResource(filePath.toUri());
            if (resource.exists()) {
                return resource;
            } else {
                throw new FileNotFoundException(fileName);
            }
        } catch (MalformedURLException ex) {
            throw new FileNotFoundException(fileName, ex);
        }
    }
}
