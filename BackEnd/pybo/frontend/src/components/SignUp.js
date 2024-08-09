// src/components/SignUp.js
import React from 'react';

const SignUp = () => {
  return (
    <div style={styles.container}>
      <h1>Sign Up</h1>
      {/* 여기에 회원가입 폼 추가 */}
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
    backgroundColor: '#ffffff',
  },
};

export default SignUp;
