import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './RegisterPage.css';

function RegisterPage() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate(); // useNavigate 훅을 사용합니다.

  const submitHandler = async (e) => {
    e.preventDefault();

    const response = await fetch('http://localhost:5000/api/users/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, email, password }),
      });
      
    if (response.ok) {
      navigate('/login'); // 회원가입 성공 시 로그인 페이지로 이동
    } else {
      // 실패 시 에러 처리 (예: 경고 메시지 표시)
      const data = await response.json();
      console.log(data.message);
    }
  };

  return (
    <div className="register-container">
      <h2>회원가입</h2>
      <form onSubmit={submitHandler} className="register-form">
        <div className="form-group">
          <label htmlFor="username">사용자 이름</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="사용자 이름"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">이메일</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="이메일"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">비밀번호</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="비밀번호"
            required
          />
        </div>
        <button type="submit" className="register-button">회원가입</button>
      </form>
    </div>
  );
}

export default RegisterPage;
