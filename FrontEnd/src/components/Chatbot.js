import React, { useState, useEffect, useRef } from 'react';
import './Chatbot.css';

const Chatbot = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const chatWindowRef = useRef(null);
  const textareaRef = useRef(null);

  const handleSend = async () => {
    if (input.trim()) {
      setMessages([...messages, { user: 'User', text: input }]);
      const userMessage = input;
      setInput('');

      try {
        const response = await fetch('/api/chat', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ message: userMessage }),
        });

        if (response.ok) {
          const data = await response.json();
          console.log("Received response from server:", data); // 응답 확인
          setMessages(prevMessages => [...prevMessages, { user: 'Bot', text: data.response }]);
        } else {
          const errorData = await response.json();
          console.error("Error response from server:", errorData); // 에러 확인
          setMessages(prevMessages => [...prevMessages, { user: 'Bot', text: `Error: ${errorData.error}` }]);
        }
      } catch (error) {
        console.error("Error while sending message:", error); // 에러 확인
        setMessages(prevMessages => [...prevMessages, { user: 'Bot', text: `Error: ${error.message}` }]);
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
          onKeyPress={(e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault();
              handleSend();
            }
          }}
        />
        <button onClick={handleSend}>Send</button>
      </div>
    </div>
  );
};

export default Chatbot;
