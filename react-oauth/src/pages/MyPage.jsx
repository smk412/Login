import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getUserInfo } from '../api/getUserInfo';
import './MyPage.css';

export default function MyPage({ isLogin, setIsLogin }) {
  const navigate = useNavigate();
  const [info, setInfo] = useState({
    email: '',
    firstName: '',
    lastName: '',
  });

  useEffect(() => {
    if (!isLogin) {
      navigate('/');
      return;
    }

    const initUserinfo = async () => {
      const newinfo = await getUserInfo();
      setInfo(newinfo);
    };
    initUserinfo();
  }, [isLogin, navigate]);

  // 로그아웃 핸들러
  const handleLogout = () => {
    setIsLogin(false);
    navigate('/');
  };

  return (
    <div className="mypage-container">
      <h1 className="mypage-title">My Page</h1>
      <div className="user-info-card">
        <h2>Welcome, {info.firstName}!</h2>
        <p><strong>Email:</strong> {info.email}</p>
        <p><strong>Full Name:</strong> {info.lastName} {info.firstName}</p>
      </div>
      <button className="logout-button" onClick={handleLogout}>로그아웃</button>
    </div>
  );
}
