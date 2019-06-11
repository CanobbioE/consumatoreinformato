package it.consumatoreinformato.app.service;


import it.consumatoreinformato.app.dto.uploads.requests.FileUploadDto;
import it.consumatoreinformato.app.dto.uploads.responses.UploadFileResponseDto;
import it.consumatoreinformato.app.dto.uploads.responses.UserInfoUploadDto;
import it.consumatoreinformato.app.exception.FileNotFoundException;
import it.consumatoreinformato.app.exception.FileStorageException;
import it.consumatoreinformato.app.exception.InvalidFileNameException;
import it.consumatoreinformato.app.model.entities.Upload;
import it.consumatoreinformato.app.model.entities.User;
import it.consumatoreinformato.app.repository.FilesRepository;
import it.consumatoreinformato.app.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
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
import java.time.LocalDate;
import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

@Component
public class FilesServiceImpl implements FilesService {

    private Path fileStorageLocation;
    private UserRepository userRepository;
    private final FilesRepository filesRepository;

    @Autowired
    // TODO: this is hardcoded, somehow it doesn't load from properties
    public FilesServiceImpl(FilesRepository filesRepository, UserRepository userRepository) {
        this.filesRepository = filesRepository;
        this.userRepository = userRepository;
        this.fileStorageLocation = Paths.get("./uploads").toAbsolutePath().normalize();
        try {
            Files.createDirectories(this.fileStorageLocation);
        } catch (Exception ex) {
            System.out.println(ex);
        }
    }


    /**
     * @param fileUploadDto
     * @return
     * @throws FileStorageException
     * @throws InvalidFileNameException
     */
    public UploadFileResponseDto uploadFile(FileUploadDto fileUploadDto, User uploader)
            throws FileStorageException, InvalidFileNameException {

        // Normalize file name
        String fileName = uploader.getId().toString() +
                "-" +
                StringUtils.cleanPath(Objects.requireNonNull(fileUploadDto.getFile().getOriginalFilename()));

        // Check if the file's name contains invalid characters
        if (fileName.contains("..")) {
            throw new InvalidFileNameException(fileName);
        }
        try {

            // Copy file to the target location (Replacing existing file with the same name)
            Path targetLocation = this.fileStorageLocation.resolve(fileName);
            Files.copy(fileUploadDto.getFile().getInputStream(), targetLocation, StandardCopyOption.REPLACE_EXISTING);

            String fileDownloadUri = ServletUriComponentsBuilder.fromCurrentContextPath()
                    .path("/files/download/")
                    .path(fileName)
                    .toUriString();

            filesRepository.save(Upload.builder()
                    .date(LocalDate.now())
                    .filePath(fileDownloadUri)
                    .fileName(fileName)
                    .uploader(uploader)
                    .build());

            return UploadFileResponseDto.builder()
                    .fileName(fileName)
                    .fileDownloadUri(fileDownloadUri)
                    .size(fileUploadDto.getFile().getSize())
                    .fileType(fileUploadDto.getFile().getContentType())
                    .build();
        } catch (IOException ex) {
            throw new FileStorageException(fileName, ex.toString());
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

    /**
     * @return a list of all the uploaded files and where to download them, and who uploaded them
     */
    public List<UserInfoUploadDto> allUploads() {
        return filesRepository.findAll().stream().map(UserInfoUploadDto::fromModel).collect(Collectors.toList());
    }

    /**
     * Retrieve all the id of users that uploaded a file with the specified fileName
     *
     * @param fileName the name of the uploaded file
     * @return a list of IDs
     */
    public List<Long> getOwner(String fileName) {
        return filesRepository.findByFileName(fileName).stream()
                .map(Upload::getUploader)
                .map(User::getId)
                .collect(Collectors.toList());
    }

    /**
     * Retrieve all the files uploaded by the given user
     *
     * @param userID The uploader of the files
     * @return a list of DTOs containing information for each uplaoded file
     */
    public List<UserInfoUploadDto> allUploads(Long userID) {
        return filesRepository.findAllByUploader(userRepository.findById(userID).orElse(null)).stream()
                .map(UserInfoUploadDto::fromModel)
                .collect(Collectors.toList());
    }
}
