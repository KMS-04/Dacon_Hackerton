import React from 'react';
import { useNavigate } from 'react-router-dom';
import './StartPage.css'; // CSS 파일을 임포트

const StartPage = () => {
  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate('/login'); // 로그인 페이지로 이동
  };

  const handleSignUpClick = () => {
    navigate('/signup'); // 회원가입 페이지로 이동
  };

  const handleContinueAsGuestClick = () => {
    navigate('/chatbot'); // 게스트로 계속하기 시, 챗봇 페이지로 이동
  };

  return (
    <div className="container">
      <img src="/logo.png" alt="Logo" className="logo" />
      <div className="buttons-container">
        <button className="button" onClick={handleLoginClick}>Login</button>
        <button className="button" onClick={handleSignUpClick}>Sign Up</button>
        <button className="button" onClick={handleContinueAsGuestClick}>Continue as Guest</button>
      </div>
    </div>
  );
};

export default StartPage;
