import React, { useEffect, useState } from 'react';

const FileList = () => {
    const [files, setFiles] = useState([]);

    useEffect(() => {
        const fetchFiles = async () => {
            const response = await fetch('http://localhost:5000/api/files', {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });
            const data = await response.json();
            setFiles(data);
        };

        fetchFiles();
    }, []);

    const handleDownload = async (fileId) => {
        const response = await fetch(`http://localhost:5000/api/files/download/${fileId}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        });
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = "downloadedFile";
        document.body.appendChild(a);
        a.click();
        a.remove();
    };

    const handleDelete = async (fileId) => {
        const response = await fetch(`http://localhost:5000/api/files/delete/${fileId}`, {
            method: 'DELETE',
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        });

        if (response.ok) {
            setFiles(files.filter(file => file._id !== fileId));
        }
    };

    return (
        <div>
            <h2>파일 목록</h2>
            <ul>
                {files.map(file => (
                    <li key={file._id}>
                        {file.filename}
                        <button onClick={() => handleDownload(file._id)}>다운로드</button>
                        <button onClick={() => handleDelete(file._id)}>삭제</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default FileList;
