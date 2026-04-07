package com.alexgls.springboot.filestorageservicebackend.controller;

import com.alexgls.springboot.filestorageservicebackend.dto.DeleteFileResponse;
import com.alexgls.springboot.filestorageservicebackend.dto.DownloadFileResponse;
import com.alexgls.springboot.filestorageservicebackend.dto.FileMetadataDto;
import com.alexgls.springboot.filestorageservicebackend.service.FileMetadataService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/files")
@Slf4j
@CrossOrigin(value = "http://localhost:5173")
public class FilesController {

    private final FileMetadataService fileMetadataService;

    @GetMapping
    public List<FileMetadataDto> getAllFiles() {
        log.info("Get all files request");
        return fileMetadataService.findAll();
    }

    @GetMapping("/download/{id}")
    public ResponseEntity<Resource> downloadFile(@PathVariable("id") Long id) {
        log.info("Download file request");
        DownloadFileResponse downloadFileResponse = fileMetadataService.downloadFile(id);
        Resource resource = downloadFileResponse.resource();

        String encodedFileName = URLEncoder.encode(downloadFileResponse.fileName(), StandardCharsets.UTF_8)
                .replace("+", "%20");

        String contentType = downloadFileResponse.mimeType();
        return ResponseEntity.ok()
                .contentType(MediaType.parseMediaType(contentType))
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + encodedFileName + "\"")
                .body(resource);
    }

    @PostMapping(value = "/upload", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<List<FileMetadataDto>>uploadFile(@RequestParam("files") List<MultipartFile> multipartFiles) {
        log.info("Upload file request");
        List<FileMetadataDto>uploadFilesDtoList = fileMetadataService.saveFiles(multipartFiles);

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(uploadFilesDtoList);
    }

    @DeleteMapping
    public List<DeleteFileResponse> deleteFile(@RequestBody List<Long>filesIds) {
        log.info("Delete file request, ids: {}", filesIds);
        return fileMetadataService.deleteFile(filesIds);
    }

}
