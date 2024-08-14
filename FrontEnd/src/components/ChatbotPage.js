import React from 'react';
import LegalText from './LegalText';
import Chatbot from './Chatbot';
import './ChatbotPage.css'; // CSS 파일 임포트

const ChatbotPage = () => {
  return (
    <div className="chatbot-page"> {/* ChatbotPage.css의 .chatbot-page 스타일이 적용됨 */}
      <LegalText />
      <Chatbot />
    </div>
  );
};

export default ChatbotPage;
