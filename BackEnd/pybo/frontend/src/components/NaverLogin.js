// src/components/NaverLogin.js
import React, { useEffect } from 'react';
import axios from 'axios';

const NaverLogin = () => {
  useEffect(() => {
    const naverLogin = new window.naver.LoginWithNaverId({
      clientId: 'YOUR_NAVER_CLIENT_ID',
      callbackUrl: 'http://localhost:3000', // 네이버에 설정한 Callback URL
      isPopup: false,
      loginButton: { color: 'green', type: 3, height: 60 },
    });
    naverLogin.init();

    // 네이버 로그인 후 콜백 처리
    window.addEventListener('load', () => {
      naverLogin.getLoginStatus(async (status) => {
        if (status) {
          const email = naverLogin.user.getEmail();
          const name = naverLogin.user.getName();
          // Naver 로그인 정보로 백엔드에 인증 요청
          try {
            const response = await axios.post('http://localhost:5000/api/auth/naver', { email, name });
            console.log('Logged in with Naver:', response.data);
          } catch (error) {
            console.error('Naver login error:', error);
          }
        }
      });
    });
  }, []);

  return (
    <div id="naverIdLogin" />
  );
};

export default NaverLogin;
