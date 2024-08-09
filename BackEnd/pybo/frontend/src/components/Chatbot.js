import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';

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

      try {
        const response = await axios.post('http://localhost:5000/api/chat', { message: input });
        const botMessage = { user: 'Bot', text: response.data.message };
        setMessages((prevMessages) => [...prevMessages, botMessage]);
      } catch (error) {
        console.error('There was an error sending the message!', error);
      }
    }
  };

  useEffect(() => {
    if (chatWindowRef.current) {
      chatWindowRef.current.scrollTop = chatWindowRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div className="chatbot">
      <h2>Chatbot</h2>
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
