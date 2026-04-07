import { useEffect, useState } from "react";
import { API_URL } from "../../../utils/UrlUtils"
import FileItem from "../FileItem/FileItem";

import './FilesSection.css'
export default function FilesSection(onClose) {

    const [files, setFiles] = useState([]);

    const fetchUsers = async () => {
        const data = await fetch(`${API_URL}/api/files`, {
            method: 'GET'
        });
        const filesData = await data.json();
        setFiles(filesData);
    }

    useEffect(() => {
        fetchUsers();
    }, []);

    return (
        <div className="files-section">
            <div className="files-list">
                {files?.length > 0 ? (
                    files.map((file) => (
                        <div className="file-container" key={'file-container' + file.id}>
                            <FileItem key={'file-item' + file.id} file={file} />
                            <DownloadFileButton key={'download-button' + file.id} file={file} />
                        </div>
                    ))
                ) : (
                    <p>Нет файлов для отображения.</p>
                )
                }
            </div>
        </div>
    );
}

function DownloadFileButton({ file }) {

    const handleDownloadClick = async () => {
        window.open(`${API_URL}/api/files/download/${file.id}`, '_blank');
    }

    return (
        <button onClick={handleDownloadClick}>Скачать {file.fileName}</button>
    )
}