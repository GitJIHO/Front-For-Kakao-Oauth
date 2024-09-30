// Signup.js
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
  const [name, setName] = useState('');
  const [phoneNumber, setPhone] = useState('');
  const [isSinitto, setIsSinitto] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async () => {
    const email = localStorage.getItem('email'); // 로컬 스토리지에 저장된 이메일 가져오기

    try {
      const response = await axios.post('http://localhost:8080/api/members/sinitto', {
        name,
        phoneNumber,
        email,
        isSinitto,
      });

      const { accessToken, refreshToken } = response.data;

      // 엑세스 토큰과 리프레시 토큰을 저장하고 페이지 이동
      localStorage.setItem('accessToken', accessToken);
      localStorage.setItem('refreshToken', refreshToken);
      localStorage.removeItem('email');
      if (isSinitto) {
        navigate('/sinitto-main');
      } else {
        navigate('/protector-main');
      }
    } catch (error) {
      console.error('회원가입 실패:', error);
    }
  };

  return (
    <div>
      <h1>회원가입</h1>
      <input
        type="text"
        placeholder="이름"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="text"
        placeholder="전화번호"
        value={phoneNumber}
        onChange={(e) => setPhone(e.target.value)}
      />
      <div>
        <label>
          <input
            type="radio"
            value="sinitto"
            checked={isSinitto}
            onChange={() => setIsSinitto(true)}
          />
          시니또
        </label>
        <label>
          <input
            type="radio"
            value="protector"
            checked={!isSinitto}
            onChange={() => setIsSinitto(false)}
          />
          보호자
        </label>
      </div>
      <button onClick={handleSubmit}>회원가입 완료</button>
    </div>
  );
};

export default Signup;
