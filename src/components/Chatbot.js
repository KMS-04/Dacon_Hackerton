// src/components/Chatbot.js
import React, { useState, useEffect, useRef } from 'react';
import './Chatbot';

const Chatbot = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const chatWindowRef = useRef(null);
  const textareaRef = useRef(null);

  const handleSend = () => {
    if (input.trim()) {
      setMessages([...messages, { user: 'User', text: input }]);
      setInput('');
      // 여기에 챗봇 응답 로직을 추가할 수 있습니다
      setMessages(prevMessages => [...prevMessages, { user: 'Bot', text: '응답 메시지' }]);
    }
  };

  useEffect(() => {
    if (chatWindowRef.current) {
      chatWindowRef.current.scrollTop = chatWindowRef.current.scrollHeight;
    }
  }, [messages]);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.overflow = 'hidden';
      textareaRef.current.style.whiteSpace = 'pre-wrap';
    }
  }, []);

  return (
    <div className="chatbot">
      <h2>챗봇</h2>
      <div className="chat-window" ref={chatWindowRef}>
        {messages.map((msg, index) => (
          <div key={index} className={`chat-message ${msg.user.toLowerCase()}`}>
            <div className={`chat-bubble ${msg.user.toLowerCase()}`}>
              <strong>{msg.user}:</strong> {msg.text}
            </div>
          </div>
        ))}
      </div>
      <div className="chat-input">
        <textarea
          ref={textareaRef}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSend()}
        />
        <button onClick={handleSend}>Send</button>
      </div>
    </div>
  );
};

export default Chatbot;
