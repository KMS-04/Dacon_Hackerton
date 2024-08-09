// src/App.js
import React, { useState } from 'react';
import LegalText from './components/LegalText';
import Chatbot from './components/Chatbot';
import StartPage from './components/StartPage';
import './App.css';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);

  const handleLogin = () => {
    // 로그인 로직 처리
    setIsAuthenticated(true);
    setHasStarted(true);
  };

  const handleSignUp = () => {
    // 회원가입 로직 처리
    setIsAuthenticated(true);
    setHasStarted(true);
  };

  const handleContinueAsGuest = () => {
    setHasStarted(true);
  };

  return (
    <div className="App">
      {!hasStarted ? (
        <StartPage 
          onLogin={handleLogin} 
          onSignUp={handleSignUp} 
          onContinueAsGuest={handleContinueAsGuest} 
        />
      ) : (
        <>
          {isAuthenticated ? (
            <>
              <LegalText />
              <Chatbot />
            </>
          ) : (
            <>
              <LegalText />
              <Chatbot />
            </>
          )}
        </>
      )}
    </div>
  );
}

export default App;
