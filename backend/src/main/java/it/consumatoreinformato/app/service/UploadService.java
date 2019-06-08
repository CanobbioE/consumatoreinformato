package it.consumatoreinformato.app.service;

import it.consumatoreinformato.app.dto.uploads.requests.FileUploadDto;
import it.consumatoreinformato.app.dto.uploads.responses.UploadFileResponseDto;
import it.consumatoreinformato.app.exception.FileNotFoundException;
import it.consumatoreinformato.app.exception.FileStorageException;
import it.consumatoreinformato.app.exception.InvalidFileNameException;
import org.springframework.core.io.Resource;

public interface UploadService {
    Resource loadFileAsResource(String fileName) throws FileNotFoundException;

    UploadFileResponseDto uploadFile(FileUploadDto fileUploadDto) throws FileStorageException, InvalidFileNameException;
}

