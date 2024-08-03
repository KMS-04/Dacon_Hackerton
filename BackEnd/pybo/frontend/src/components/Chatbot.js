// src/components/Chatbot.js
import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios'; // axios를 사용하여 OpenAI API 호출
import './Chatbot.css'; // './Chatbot'을 './Chatbot.css'로 수정하여 스타일링 파일을 올바르게 불러옴

const Chatbot = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const chatWindowRef = useRef(null);
  const textareaRef = useRef(null);

  const handleSend = async () => {
    if (input.trim()) {
      const userMessage = { user: 'User', text: input };
      setMessages([...messages, userMessage]);
      setInput('');

      // OpenAI API 호출
      try {
        const response = await axios.post('/api/chat', { message: input });
        const botMessage = { user: 'Bot', text: response.data.message };
        setMessages((prevMessages) => [...prevMessages, botMessage]);
      } catch (error) {
        console.error('Error fetching OpenAI response:', error);
        const errorMessage = { user: 'Bot', text: '오류가 발생했습니다. 다시 시도해 주세요.' };
        setMessages((prevMessages) => [...prevMessages, errorMessage]);
      }
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
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
        />
        <button onClick={handleSend}>Send</button>
      </div>
    </div>
  );
};

export default Chatbot;
