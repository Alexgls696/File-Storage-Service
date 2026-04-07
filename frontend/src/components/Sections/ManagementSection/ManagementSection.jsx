import { useState, useEffect } from 'react';
import './ManagementSection.css';

import { API_URL } from '../../../utils/UrlUtils';

export default function ManagementSection() {
    const [files, setFiles] = useState([]);
    const [selectedIds, setSelectedIds] = useState([]);
    const [isDeleting, setIsDeleting] = useState(false);
    const [message, setMessage] = useState({ type: '', text: '' });

    const fetchFiles = async () => {
        try {
            const response = await fetch(`${API_URL}/api/files`);
            const data = await response.json();
            setFiles(data);
        } catch (error) {
            console.error("Ошибка при загрузке файлов:", error);
        }
    };

    useEffect(() => {
        fetchFiles();
    }, []);

    const handleCheckboxChange = (fileId) => {
        setSelectedIds(prev => 
            prev.includes(fileId) 
                ? prev.filter(id => id !== fileId) 
                : [...prev, fileId]
        );
    };

    const handleSelectAll = () => {
        if (selectedIds.length === files.length) {
            setSelectedIds([]);
        } else {
            setSelectedIds(files.map(f => f.id));
        }
    };

    // Удаление выбранных
    const handleDelete = async () => {
        if (selectedIds.length === 0) return;

        if (!window.confirm(`Вы уверены, что хотите удалить ${selectedIds.length} файл(ов)?`)) {
            return;
        }

        setIsDeleting(true);
        try {
            const response = await fetch(`${API_URL}/api/files`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(selectedIds)
            });

            if (response.ok) {
                const results = await response.json();
                const successCount = results.filter(r => r.status === 'Success').length;
                const errorCount = results.filter(r => r.status === 'Error').length;

                setMessage({ 
                    type: 'success', 
                    text: `Удаление завершено. Успешно: ${successCount}, Ошибок: ${errorCount}` 
                });

                setSelectedIds([]); // Очищаем выбор
                fetchFiles();       // Обновляем список
            } else {
                setMessage({ type: 'error', text: 'Ошибка сервера при удалении.' });
            }
        } catch (error) {
            setMessage({ type: 'error', text: 'Не удалось связаться с сервером.' });
        } finally {
            setIsDeleting(false);
        }
    };

    return (
        <div className="management-section">
            <div className="management-header">
                <h2>Управление файлами</h2>
                <button 
                    className="delete-button" 
                    onClick={handleDelete} 
                    disabled={selectedIds.length === 0 || isDeleting}
                >
                    {isDeleting ? "Удаление..." : `Удалить выбранные (${selectedIds.length})`}
                </button>
            </div>

            {message.text && (
                <div className={`message-banner ${message.type}`}>
                    {message.text}
                </div>
            )}

            <div className="table-container">
                <table className="management-table">
                    <thead>
                        <tr>
                            <th>
                                <input 
                                    type="checkbox" 
                                    onChange={handleSelectAll}
                                    checked={files.length > 0 && selectedIds.length === files.length}
                                />
                            </th>
                            <th>ID</th>
                            <th>Название файла</th>
                            <th>Размер</th>
                            <th>Тип</th>
                        </tr>
                    </thead>
                    <tbody>
                        {files.length > 0 ? (
                            files.map(file => (
                                <tr key={file.id} className={selectedIds.includes(file.id) ? 'selected-row' : ''}>
                                    <td>
                                        <input 
                                            type="checkbox" 
                                            checked={selectedIds.includes(file.id)}
                                            onChange={() => handleCheckboxChange(file.id)}
                                        />
                                    </td>
                                    <td>{file.id}</td>
                                    <td className="file-name-cell">{file.fileName}</td>
                                    <td>{(file.fileSize / 1024).toFixed(1)} KB</td>
                                    <td>{file.mimeType}</td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="5" className="empty-table">Файлы не найдены</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}