import React, { useState } from 'react';
import axios from 'axios';
import './Chatbot.css';  // Ensure CSS is applied

const Chatbot = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

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
          onKeyDown={handleKeyDown}
        ></textarea>
        <
