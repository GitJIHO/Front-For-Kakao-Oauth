import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Redirection = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const query = new URLSearchParams(location.search);
    const code = query.get('code'); // URL 파라미터에서 인가코드 추출

    if (code) {
      // 인가코드가 있으면 백엔드로 콜백 요청
      axios.get(`http://3.34.144.219:8080/api/auth/oauth/kakao/callback?code=${code}`)
        .then((response) => {
          // 로그인 성공 후 처리
          const { accessToken, refreshToken, isSinitto, email, redirectUrl, isMember } = response.data;

          if (isMember) {
            // 토큰을 로컬 스토리지에 저장
            localStorage.setItem('accessToken', accessToken);
            localStorage.setItem('refreshToken', refreshToken);
            // isSinitto에 따라 리다이렉션
            if (isSinitto) {
              navigate('/sinitto-main');
            } else {
              navigate('/protector-main');
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
  }, [location, navigate]);

  return (
    <div>
      <h1>리다이렉션 처리 중...</h1>
    </div>
  );
};

export default Redirection;
