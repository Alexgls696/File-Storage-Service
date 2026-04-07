import { useRef, useState } from "react";
import { API_URL } from "../../../utils/UrlUtils";
import './DownloadSection.css'

export default function DownloadSection() {
    const [selectedFiles, setSelectedFiles] = useState([]);
    const [status, setStatus] = useState({ type: '', message: '' });
    const [isUploading, setIsUploading] = useState(false);
    const fileInputRef = useRef(null);

    const handleFileChange = (e) => {
        setSelectedFiles(Array.from(e.target.files));
        setStatus({ type: '', message: '' }); 
    };

    const handleUpload = async () => {
        if (selectedFiles.length === 0) {
            setStatus({ type: 'error', message: 'Пожалуйста, выберите хотя бы один файл.' });
            return;
        }

        setIsUploading(true);
        setStatus({ type: 'info', message: 'Загрузка...' });

        const formData = new FormData();
        selectedFiles.forEach(file => {
            formData.append('files', file); 
        });

        try {
            const response = await fetch(`${API_URL}/api/files/upload`, {
                method: 'POST',
                body: formData, 
            });

            if (response.ok) {
                setStatus({ type: 'success', message: `Успешно загружено файлов: ${selectedFiles.length}` });
                setSelectedFiles([]); 
                if (fileInputRef.current) fileInputRef.current.value = ''; 
            } else {
                const errorData = await response.json();
                setStatus({ type: 'error', message: `Ошибка: ${errorData.detail || 'Сервер отклонил запрос'}` });
            }
        } catch (error) {
            setStatus({ type: 'error', message: 'Не удалось связаться с сервером.' });
            console.error("Upload error:", error);
        } finally {
            setIsUploading(false);
        }
    };

    return (
        <div className="upload-section">
            <h2>Загрузка новых файлов</h2>
            
            <div className="upload-card">
                <input 
                    type="file" 
                    multiple 
                    onChange={handleFileChange} 
                    ref={fileInputRef}
                    id="file-input"
                    className="file-input-hidden"
                />
                <label htmlFor="file-input" className="file-input-label">
                    {selectedFiles.length > 0 
                        ? `Выбрано файлов: ${selectedFiles.length}` 
                        : "Выберите файлы для загрузки"}
                </label>

                {selectedFiles.length > 0 && (
                    <ul className="selected-files-list">
                        {selectedFiles.map((f, i) => (
                            <li key={i}>{f.name} ({(f.size / 1024).toFixed(1)} KB)</li>
                        ))}
                    </ul>
                )}

                <button 
                    className="upload-button" 
                    onClick={handleUpload} 
                    disabled={isUploading || selectedFiles.length === 0}
                >
                    {isUploading ? "Загрузка..." : "Загрузить"}
                </button>

                {status.message && (
                    <div className={`status-message ${status.type}`}>
                        {status.message}
                    </div>
                )}
            </div>
        </div>
    );
}