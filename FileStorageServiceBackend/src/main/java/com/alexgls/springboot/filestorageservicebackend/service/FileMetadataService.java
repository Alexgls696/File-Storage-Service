package com.alexgls.springboot.filestorageservicebackend.service;

import com.alexgls.springboot.filestorageservicebackend.dto.DeleteFileResponse;
import com.alexgls.springboot.filestorageservicebackend.dto.DownloadFileResponse;
import com.alexgls.springboot.filestorageservicebackend.dto.FileMetadataDto;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface FileMetadataService {
    List<FileMetadataDto> findAll();

    List<DeleteFileResponse> deleteFile(List<Long>filesIds);

    DownloadFileResponse downloadFile(long id);

    List<FileMetadataDto> saveFiles(List<MultipartFile> files);
}
