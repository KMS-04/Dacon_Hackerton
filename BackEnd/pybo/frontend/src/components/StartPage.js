// src/components/StartPage.js
import React from 'react';

const StartPage = ({ onLogin, onSignUp, onContinueAsGuest }) => {
  return (
    <div style={styles.container}>
      <img src="/logo.png" alt="Logo" style={styles.logo} />
      <div style={styles.buttonsContainer}>
        <button style={styles.button} onClick={onLogin}>Login</button>
        <button style={styles.button} onClick={onSignUp}>Sign Up</button>
        <button style={styles.button} onClick={onContinueAsGuest}>Continue as Guest</button>
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    width: '100vw',
    backgroundColor: '#ffffff',
    padding: '0',
    margin: '0',
    boxSizing: 'border-box',
    transform: 'translateY(-20px)', // 20px 위로 이동
  },
  logo: {
    width: '450px',
    marginBottom: '0px',
  },
  buttonsContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  button: {
    width: '200px',
    padding: '10px 20px',
    margin: '10px',
    fontSize: '16px',
    borderRadius: '5px',
    cursor: 'pointer',
    backgroundColor: '#005B5C',
    color: '#fff',
    border: 'none',
    textAlign: 'center',
  },
};

export default StartPage;
