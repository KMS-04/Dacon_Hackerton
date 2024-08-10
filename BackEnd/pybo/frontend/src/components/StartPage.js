import React from 'react';
import { useNavigate } from 'react-router-dom';

const StartPage = () => {
  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate('/login'); // 로그인 페이지로 이동
  };

  const handleSignUpClick = () => {
    navigate('/signup'); // 회원가입 페이지로 이동
  };

  const handleContinueAsGuestClick = () => {
    navigate('/chatbot'); // 게스트로 계속하기 시, 챗봇 페이지로 이동
  };

  return (
    <div style={styles.container}>
      <img src="/logo.png" alt="Logo" style={styles.logo} />
      <div style={styles.buttonsContainer}>
        <button style={styles.button} onClick={handleLoginClick}>Login</button>
        <button style={styles.button} onClick={handleSignUpClick}>Sign Up</button>
        <button style={styles.button} onClick={handleContinueAsGuestClick}>Continue as Guest</button>
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
    transform: 'translateY(-20px)',
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
