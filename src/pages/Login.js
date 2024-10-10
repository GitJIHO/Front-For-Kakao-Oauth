import React from 'react';

const Login = () => {
  const handleLogin = () => {
    // 카카오 로그인 요청을 백엔드로 보내기
    window.location.href = 'http://3.34.144.219:8080/api/auth/oauth/kakao';
  };

  return (
    <div>
      <h1>로그인 페이지</h1>
      <button onClick={handleLogin}>카카오로 로그인</button>
    </div>
  );
};

export default Login;
