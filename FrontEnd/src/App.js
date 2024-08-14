// src/App.js

import React from 'react';
import LegalText from './components/LegalText';
import Chatbot from './components/Chatbot';
import './App.css';

function App() {
  return (
    <div className="App">
      <LegalText />
      <Chatbot />
    </div>
  );
}

export default App;
