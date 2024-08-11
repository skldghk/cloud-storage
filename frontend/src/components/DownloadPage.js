import React, { useState, useEffect } from 'react';
import './DownloadPage.css'; // CSS 파일을 임포트합니다.

const DownloadPage = () => {
    const [files, setFiles] = useState([]);

    useEffect(() => {
        fetchFiles(); // 파일 목록을 가져오는 함수 호출
    }, []);

    const fetchFiles = () => {
        fetch('http://localhost:5000/api/files')
            .then(response => response.json())
            .then(data => setFiles(data))
            .catch(error => console.error('파일 목록을 가져오는 중 오류 발생:', error));
    };

    const handleDelete = (filename) => {
        if (window.confirm('정말로 이 파일을 삭제하시겠습니까?')) {
            fetch(`http://localhost:5000/api/files/delete/${encodeURIComponent(filename)}`, {
                method: 'DELETE',
            })
                .then(response => {
                    if (response.ok) {
                        // 파일 목록을 다시 불러옵니다.
                        setFiles(prevFiles => prevFiles.filter(file => file.filename !== filename));
                    } else {
                        console.error('파일 삭제 실패');
                    }
                })
                .catch(error => console.error('파일 삭제 중 오류 발생:', error));
        }
    };
    
    return (
        <div className="download-page">
            <h2>업로드 해둔 파일들 :</h2>
            <div className="file-list">
                {files.map((file, index) => (
                    <div key={index} className="file-item">
                        <span>{file.filename}</span>
                        <a 
                            href={`http://localhost:5000/api/files/${file.filename}`} 
                            download 
                            className="download-button"
                        >
                            다운로드
                        </a>
                        <button 
                            onClick={() => handleDelete(file.filename)} 
                            className="delete-button"
                        >
                            삭제
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default DownloadPage;
