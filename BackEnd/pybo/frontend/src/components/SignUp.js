import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { googleLogout, useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';

const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const navigate = useNavigate();

  const googleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      try {
        const userInfo = await axios.get('https://www.googleapis.com/oauth2/v3/userinfo', {
          headers: { Authorization: `Bearer ${tokenResponse.access_token}` },
        });
        console.log('Google login successful:', userInfo.data);
      } catch (error) {
        console.error('Google login failed:', error);
      }
    },
    onError: (error) => {
      console.error('Google login error:', error);
    },
  });

  const handleNaverLogin = () => {
    window.location.href = 'http://localhost:5000/login/naver';
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    let valid = true;

    if (!validateEmail(email)) {
      setEmailError('잘못된 이메일 형식입니다.');
      valid = false;
    } else {
      setEmailError('');
    }

    if (showPassword) {
      if (!validatePassword(password)) {
        setPasswordError('비밀번호는 8~16자리 사이의 영문과 숫자가 섞여있는 형태여야 합니다');
        valid = false;
      } else {
        setPasswordError('');
      }
    }

    if (valid && !showPassword) {
      setShowPassword(true);
    } else if (valid && showPassword) {
      console.log('Sign Up with email and password:', email, password);
      // 회원가입 로직 추가
    }
  };

  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const validatePassword = (password) => {
    const regex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,16}$/;
    return regex.test(password);
  };

  const handleBackClick = () => {
    navigate('/'); // 시작페이지로 이동
  };

  return (
    <div style={styles.container}>
      <button onClick={handleBackClick} style={styles.backButton}>
        <img src="/back-icon.png" alt="Back" style={styles.backIcon} />
      </button>
      <h1>Sign Up</h1>
      <form style={styles.form} onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            setEmailError('');
          }}
          style={styles.input}
          required
        />
        {emailError && (
          <p style={styles.errorText}>{emailError}</p>
        )}
        {showPassword && (
          <>
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setPasswordError('');
              }}
              style={styles.input}
              required
            />
            {passwordError && (
              <p style={styles.passwordErrorText}>{passwordError}</p>
            )}
          </>
        )}
        <button type="submit" style={styles.submitButton}>
          {showPassword ? 'Complete Sign Up' : 'Sign Up'}
        </button>
      </form>
      <div style={styles.socialContainer}>
        <button
          onClick={() => googleLogin()}
          style={{
            ...styles.socialButton,
            ...styles.google,
          }}
        >
          <img src="/google-icon.png" alt="Google" style={styles.icon} />
        </button>
        <button
          onClick={handleNaverLogin}
          style={{ ...styles.socialButton, ...styles.naver }}
        >
          <img src="/naver-icon.png" alt="Naver" style={styles.icon} />
        </button>
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    backgroundColor: '#ffffff',
    position: 'relative',
  },
  backButton: {
    position: 'absolute',
    top: '20px',
    left: '20px',
    width: '40px',
    height: '40px',
    borderRadius: '50%',
    backgroundColor: '#ffffff', // 버튼 색상을 흰색으로 변경
    border: 'none',
    cursor: 'pointer',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  backIcon: {
    width: '20px',
    height: '20px',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginBottom: '20px',
  },
  input: {
    width: '320px',
    padding: '10px',
    marginBottom: '10px',
    fontSize: '16px',
    borderRadius: '5px',
    border: '1px solid #ccc',
    boxSizing: 'border-box',
  },
  submitButton: {
    width: '320px',
    padding: '10px',
    fontSize: '16px',
    borderRadius: '5px',
    backgroundColor: '#005B5C',
    color: '#fff',
    border: 'none',
    cursor: 'pointer',
    marginBottom: '10px',
  },
  socialContainer: {
    display: 'flex',
    justifyContent: 'center',
    gap: '20px',
  },
  socialButton: {
    width: '50px',
    height: '50px',
    borderRadius: '50%',
    border: '2px solid #ccc',
    backgroundColor: '#ffffff',
    cursor: 'pointer',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  google: {},
  naver: {},
  icon: {
    width: '35px',
    height: '35px',
  },
  errorText: {
    color: 'red',
    fontSize: '12px',
    textDecoration: 'underline',
    marginTop: '-10px',
    marginBottom: '10px',
    textAlign: 'left',
    width: '320px',
  },
  passwordErrorText: {
    color: 'red',
    fontSize: '12px',
    textDecoration: 'underline',
    marginTop: '2px',
    textAlign: 'left',
    width: '320px',
  },
};

export default SignUp;
