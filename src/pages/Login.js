// Login.js
import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';


const Login = () => {
  const location = useLocation();

  useEffect(() => {
    const query = new URLSearchParams(location.search);
    const code = query.get('code'); // URL 파라미터에서 인가코드 추출

    if (code) {
      // 인가코드가 있으면 백엔드로 콜백 요청
      axios.get(`http://43.202.56.105:8080/api/auth/oauth/kakao/callback?code=${code}`)
        .then((response) => {
          // 로그인 성공 후 처리 (예: 토큰 저장 및 리다이렉션)
          const { accessToken, refreshToken, isSinitto, email, redirectUrl, isMember } = response.data;
          
          if (isMember) {
            // 토큰을 로컬 스토리지에 저장
            localStorage.setItem('accessToken', accessToken);
            localStorage.setItem('refreshToken', refreshToken);
            // isSinitto에 따라 리다이렉션
            if (isSinitto) {
              window.location.href = '/sinitto-main'; // 시니또 메인 페이지
            } else {
              window.location.href = '/protector-main'; // 보호자 메인 페이지
            }
          } else {
            // 이메일을 로컬 스토리지에 저장하고 redirectUrl로 리다이렉션
            localStorage.setItem('email', email);
            window.location.href = redirectUrl; 
          }
        })
        .catch((error) => {
          console.error('로그인 콜백 요청 실패:', error);
        });
    }
  }, [location]);

  const handleLogin = () => {
    // 카카오 로그인 요청을 백엔드로 보내기
    window.location.href = 'http://43.202.56.105:8080/api/auth/oauth/kakao';
  };

  return (
    <div>
      <h1>로그인 페이지</h1>
      <button onClick={handleLogin}>카카오로 로그인</button>
    </div>
  );
};

export default Login;
