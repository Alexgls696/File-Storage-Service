
import './FileItem.css'

export default function FileItem({ file }) {

    const transformDate = (dateString) => {
        return new Date(dateString).toLocaleString();
    }

    const formatSize = (bytes) => {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    }

    return (
        <div className="file-item">
            <p>Идентификатор: {file.id}</p>
            <p>Название: {file.fileName}</p>
            <p>Размер: {formatSize(file.fileSize)} байт</p>
            <p>Тип файла: {file.mimeType}</p>
            <p>Загружен: {transformDate(file.uploadDate)}</p>
        </div>
    );
}