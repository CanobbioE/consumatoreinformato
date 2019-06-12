package it.consumatoreinformato.app.service;

import it.consumatoreinformato.app.dto.uploads.requests.FileUploadDto;
import it.consumatoreinformato.app.dto.uploads.responses.UploadFileResponseDto;
import it.consumatoreinformato.app.dto.uploads.responses.UserInfoUploadDto;
import it.consumatoreinformato.app.exception.FileNotFoundException;
import it.consumatoreinformato.app.exception.FileStorageException;
import it.consumatoreinformato.app.exception.InvalidFileNameException;
import it.consumatoreinformato.app.model.entities.User;
import org.springframework.core.io.Resource;

import java.util.List;

public interface FilesService {
    Resource loadFileAsResource(String fileName) throws FileNotFoundException;

    UploadFileResponseDto uploadFile(FileUploadDto fileUploadDto, User uploader) throws FileStorageException, InvalidFileNameException;

    List<UserInfoUploadDto> allUploads();

    List<Long> getOwner(String fileName);

    List<UserInfoUploadDto> allUploads(Long userID);
}

