import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';  // GoogleOAuthProvider 임포트
import StartPage from './components/StartPage';
import SignUp from './components/SignUp';
import ChatbotPage from './components/ChatbotPage';
import Login from './components/Login';

function App() {
  return (
    <GoogleOAuthProvider clientId="YOUR_GOOGLE_CLIENT_ID"> {/* clientId를 입력하세요 */}
      <Router>
        <Routes>
          <Route path="/" element={<StartPage />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          <Route path="/chatbot" element={<ChatbotPage />} />
        </Routes>
      </Router>
    </GoogleOAuthProvider>
  );
}

export default App;
