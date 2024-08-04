// src/App.js
import React, { useState } from 'react';
import { GoogleOAuthProvider } from '@react-oauth/google'; // GoogleOAuthProvider 가져오기
import LegalText from './components/LegalText';
import Chatbot from './components/Chatbot';
import Login from './components/Login';
import NaverLogin from './components/NaverLogin'; // 네이버 로그인 추가
import './App.css';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleLoginSuccess = () => {
    setIsAuthenticated(true);
  };

  return (
    // GoogleOAuthProvider로 전체 애플리케이션 감싸기
    <GoogleOAuthProvider clientId="YOUR_GOOGLE_CLIENT_ID">
      <div className="App">
        {isAuthenticated ? (
          <>
            <LegalText />
            <Chatbot />
          </>
        ) : (
          <>
            <Login onLoginSuccess={handleLoginSuccess} />
            <NaverLogin onLoginSuccess={handleLoginSuccess} />
          </>
        )}
      </div>
    </GoogleOAuthProvider>
  );
}

export default App;
