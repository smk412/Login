import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import GoogleLogin from '../components/GoogleLogin';
import Nav from '../components/Nav';
import { postLoginToken } from '../api/postLoginToken';
import './Login.css';

export default function Login({ isLogin, setIsLogin }) {
  const navigate = useNavigate();

  const onGoogleSignIn = async res => {
    const { credential } = res;
    const result = await postLoginToken(credential, setIsLogin);
    setIsLogin(result);
  };

  useEffect(() => {
    if (isLogin) {
      navigate('/mypage');
    }
  }, [isLogin, navigate]);

  return (
    <div className="login-container">
      <h1 className="login-title">Google 로그인</h1>
      <Nav />
      <div className="google-login-wrapper">
        <GoogleLogin onGoogleSignIn={onGoogleSignIn} text="로그인" />
      </div>
    </div>
  );
}
