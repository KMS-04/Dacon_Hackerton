import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import StartPage from './components/StartPage';
import SignUp from './components/SignUp';
import ChatbotPage from './components/ChatbotPage'; // ChatbotPage 컴포넌트 임포트
import Login from './components/Login';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<StartPage />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/chatbot" element={<ChatbotPage />} /> {/* ChatbotPage 라우트 */}
      </Routes>
    </Router>
  );
}

export default App;
