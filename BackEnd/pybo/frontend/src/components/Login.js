// src/components/Login.js
import React from 'react';
import { GoogleLogin } from '@react-oauth/google';
import axios from 'axios';

const Login = ({ onLoginSuccess }) => {
  const handleGoogleLogin = async (credentialResponse) => {
    const { credential } = credentialResponse;
    try {
      const response = await axios.post('http://localhost:5000/api/auth/google', { credential });
      const { data } = response;
      console.log('Logged in with Google:', data);
      // 로그인 성공 시 추가적인 처리 로직
      onLoginSuccess();
    } catch (error) {
      console.error('Google login error:', error);
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <GoogleLogin
        onSuccess={handleGoogleLogin}
        onError={() => console.log('Google login failed')}
      />
    </div>
  );
};

export default Login;
  