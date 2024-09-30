// src/pages/SinittoMain.js
import React from "react";
import axios from 'axios';

const SinittoMain = () => {
  
  const handleLogout = async () => {
    // 카카오 로그아웃 요청
    try {
      await axios.post('https://kapi.kakao.com/v1/user/logout', null, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        },
      });
    } catch (error) {
      console.error('카카오 로그아웃 실패:', error);
    }

    // 로컬 스토리지에서 토큰 및 이메일 삭제
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('isSinitto');
    // 로그인 페이지로 리다이렉트
    window.location.href = '/';
  };


  return (
    <div>
      <h2>시니또 메인 페이지</h2>
      <p>환영합니다! 시니또님</p>
      <button onClick={handleLogout}>로그아웃</button>
    </div>
  );
};

export default SinittoMain;
