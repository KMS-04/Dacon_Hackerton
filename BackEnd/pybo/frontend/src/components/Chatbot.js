<<<<<<< HEAD
// src/components/Chatbot.js
import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios'; // axios를 사용하여 OpenAI API 호출
import './Chatbot.css'; // './Chatbot'을 './Chatbot.css'로 수정하여 스타일링 파일을 올바르게 불러옴
=======
import React, { useState } from 'react';
import axios from 'axios';
import './Chatbot.css';  // Ensure CSS is applied
>>>>>>> 9a78c3a70ffdd3dd5926446ce40965ed1487c5f2

const Chatbot = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

<<<<<<< HEAD
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
=======
  const sendMessage = async () => {
    if (!input.trim()) return; // 빈 입력 방지

    const userMessage = { message: input };
    setInput('');

    try {
      const response = await axios.post('/api/chat', userMessage);
      setMessages(prevMessages => [
        ...prevMessages,
        { user: true, text: userMessage.message },
        { user: false, text: response.data }
      ]);
    } catch (error) {
      console.error("There was an error sending the message!", error);
>>>>>>> 9a78c3a70ffdd3dd5926446ce40965ed1487c5f2
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    sendMessage();
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="chatbot">
      <div className="chat-window">
        {messages.map((msg, index) => (
          <div key={index} className={`chat-message ${msg.user ? 'user' : 'bot'}`}>
            <div className="chat-bubble">{msg.text}</div>
          </div>
        ))}
      </div>
      <form className="chat-input" onSubmit={handleSubmit}>
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
<<<<<<< HEAD
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
        />
        <button onClick={handleSend}>Send</button>
      </div>
    </div>
  );
};

export default Chatbot;
=======
          onKeyDown={handleKeyDown}
        ></textarea>
        <
>>>>>>> 9a78c3a70ffdd3dd5926446ce40965ed1487c5f2
