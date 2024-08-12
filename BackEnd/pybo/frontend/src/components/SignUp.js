import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { googleLogout, useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import './SignUp.css'; // CSS 파일 임포트

const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const navigate = useNavigate();

  const googleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      try {
        const userInfo = await axios.get('https://www.googleapis.com/oauth2/v3/userinfo', {
          headers: { Authorization: `Bearer ${tokenResponse.access_token}` },
        });
        console.log('Google login successful:', userInfo.data);
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

  const handleSubmit = (e) => {
    e.preventDefault();

    let valid = true;

    if (!validateEmail(email)) {
      setEmailError('잘못된 이메일 형식입니다.');
      valid = false;
    } else {
      setEmailError('');
    }

    if (showPassword) {
      if (!validatePassword(password)) {
        setPasswordError('비밀번호는 8~16자리 사이의 영문과 숫자가 섞여있는 형태여야 합니다');
        valid = false;
      } else {
        setPasswordError('');
      }
    }

    if (valid && !showPassword) {
      setShowPassword(true);
    } else if (valid && showPassword) {
      console.log('Sign Up with email and password:', email, password);
      // 회원가입 로직 추가
    }
  };

  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const validatePassword = (password) => {
    const regex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,16}$/;
    return regex.test(password);
  };

  const handleBackClick = () => {
    navigate('/'); // 시작페이지로 이동
  };

  return (
    <div className="container">
      <button onClick={handleBackClick} className="back-button">
        <img src="/back-icon.png" alt="Back" className="back-icon" />
      </button>
      <h1>Sign Up</h1>
      <form className="form" onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            setEmailError('');
          }}
          className="input"
          required
        />
        {emailError && (
          <p className="error-text">{emailError}</p>
        )}
        {showPassword && (
          <>
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setPasswordError('');
              }}
              className="input"
              required
            />
            {passwordError && (
              <p className="password-error-text">{passwordError}</p>
            )}
          </>
        )}
        <button type="submit" className="submit-button">
          {showPassword ? 'Complete Sign Up' : 'Sign Up'}
        </button>
      </form>
      <div className="social-container">
        <button
          onClick={() => googleLogin()}
          className="social-button google"
        >
          <img src="/google-icon.png" alt="Google" className="icon" />
        </button>
        <button
          onClick={handleNaverLogin}
          className="social-button naver"
        >
          <img src="/naver-icon.png" alt="Naver" className="icon" />
        </button>
      </div>
    </div>
  );
};

export default SignUp;
