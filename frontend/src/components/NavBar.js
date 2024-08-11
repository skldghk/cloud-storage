import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './NavBar.css';

const Navbar = ({ isLoggedIn, setIsLoggedIn }) => {
  const navigate = useNavigate();

  const logoutHandler = () => {
    localStorage.removeItem('userInfo');
    setIsLoggedIn(false);
    navigate('/');
  };

  return (
    <nav className="navbar">
      <ul>
        <li>
          <Link to="/" style={{ marginRight: 'auto' }}>홈</Link>
        </li>
        {!isLoggedIn ? (
          <>
            <li>
              <Link to="/login">로그인</Link>
            </li>
            <li>
              <Link to="/register">회원가입</Link>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link to="/upload">파일 업로드</Link>
            </li>
            <li>
              <Link to="/download">파일 다운로드</Link>
            </li>
            <li>
              <button onClick={logoutHandler}>로그아웃</button>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
