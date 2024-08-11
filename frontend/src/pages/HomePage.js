// src/pages/HomePage.js
import React from 'react';
import './HomePage.css'; // CSS 파일도 추가한다면 이렇게 임포트합니다.

const HomePage = () => {
    return (
        <div className="homepage">
            <h1>클라우드 스토리지에 오신 것을 환영합니다</h1>
            <p className="description">
                이 서비스는 사용자가 파일을 안전하게 저장하고 관리할 수 있도록 도와주는 클라우드 스토리지 플랫폼입니다. 
                개인 파일을 업로드하고, 언제 어디서든지 접근할 수 있습니다.
            </p>
        </div>
    );
};

export default HomePage;
