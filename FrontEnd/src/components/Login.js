import React, { useState } from 'react';
import { useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // useNavigate 추가
import './Login.css';

const Login = ({ onLoginSuccess }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState(''); // 에러 메시지 상태 추가

  const navigate = useNavigate(); // useNavigate 훅 사용

  const googleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      try {
        const userInfo = await axios.get('https://www.googleapis.com/oauth2/v3/userinfo', {
          headers: { Authorization: `Bearer ${tokenResponse.access_token}` },
        });
        console.log('Google login successful:', userInfo.data);
        onLoginSuccess();
        navigate('/chatbot'); // 로그인 성공 시 ChatbotPage로 이동
      } catch (error) {
        console.error('Google login failed:', error);
      }
    },
    onError: (error) => {
      console.error('Google login error:', error);
    },
  });

  const handleNaverLogin = () => {
    window.location.href = 'http://localhost:5000/login/naver';
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage(''); // 기존 에러 메시지 초기화

    try {
      // 서버에 로그인 요청을 보내는 코드
      const response = await axios.post('http://localhost:5000/api/auth/login', { email, password });

      if (response.data.success) {
        onLoginSuccess();
        navigate('/chatbot'); // 로그인 성공 시 ChatbotPage로 이동
      } else {
        setErrorMessage('이메일 혹은 비밀번호가 잘못되었습니다. 다시 입력해주세요.');
      }
    } catch (error) {
      setErrorMessage('이메일 혹은 비밀번호가 잘못되었습니다. 다시 입력해주세요.');
    }
  };

  return (
    <div className="login-container">
      <h2 className="login-title">Login</h2>
      <form className="login-form" onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="login-input"
          required
        />
        <input
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="login-input"
          required
        />
        {errorMessage && (
          <p className="error-message">{errorMessage}</p>
        )}
        <button type="submit" className="login-submit-button">Login</button>
      </form>
      <div className="social-container">
        <button onClick={() => googleLogin()} className="social-button google">
          <img src="/google-icon.png" alt="Google" className="social-icon" />
        </button>
        <button onClick={handleNaverLogin} className="social-button naver">
          <img src="/naver-icon.png" alt="Naver" className="social-icon" />
        </button>
      </div>
    </div>
  );
};

export default Login;
