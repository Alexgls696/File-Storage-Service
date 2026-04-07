--liquibase formatted sql
--changeset alexgls:initialize_schema

create table file_metadata
(
    id bigint primary key generated always as identity,
    original_file_name varchar(128),
    stored_file_name varchar(128),
    file_size bigint,
    upload_date timestamp,
    mime_type varchar(128)
);
