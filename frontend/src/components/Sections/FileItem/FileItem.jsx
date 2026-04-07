
import './FileItem.css'

export default function FileItem({ file }) {

    const transformDate = (date) => {
        return date;
    }

    return (
        <div className="file-item">
            <p>Идентификатор: {file.id}</p>
            <p>Название: {file.fileName}</p>
            <p>Размер: {file.fileSize} байт</p>
            <p>Тип файла: {file.mimeType}</p>
            <p>Загружен: {()=>transformDate(file.uploadDate)}</p>
        </div>
    );
}