package com.alexgls.springboot.filestorageservicebackend.repository;

import com.alexgls.springboot.filestorageservicebackend.entity.FileMetadata;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface FileMetadataRepository extends CrudRepository<FileMetadata, Long> {

}
