import React, { useState } from 'react';
import './FileUpload.css';

const FileUpload = ({ onFileUploaded }) => {
    const [file, setFile] = useState(null);

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleUpload = async () => {
        if (!file) return;

        const formData = new FormData();
        formData.append('file', file);

        const token = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')).token : null;

        const response = await fetch('http://localhost:5000/api/files/upload', {
            method: 'POST',
            body: formData,
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        if (response.ok) {
            const result = await response.json();
            if (onFileUploaded) {
                onFileUploaded(result.file);
            }
        } else {
            alert('파일 업로드 실패');
        }
    };

    return (
        <div className="upload-container">
            <h2>파일 업로드</h2>
            <input 
                type="file" 
                onChange={handleFileChange} 
                className="file-input"
            />
            <button 
                onClick={handleUpload} 
                className="upload-button"
            >
                업로드
            </button>
        </div>
    );
};

export default FileUpload;
