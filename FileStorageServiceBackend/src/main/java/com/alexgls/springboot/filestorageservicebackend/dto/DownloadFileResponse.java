package com.alexgls.springboot.filestorageservicebackend.dto;

import org.springframework.core.io.Resource;

public record DownloadFileResponse(
        String fileName,
        String mimeType,
        Resource resource
) {
}
