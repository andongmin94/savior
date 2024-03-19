import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Auth() {
  // BE에서 받은 token
  const token = new URL(window.location.href).searchParams.get('token');

  let navigate = useNavigate();

  const getToken = async () => {
    try {
      await localStorage.setItem('token', token);
      navigate('/', { replace: true });
      // navigate('/filter', { replace: true });
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getToken();
  }, []); //대괄호 안에 실행조건을 추가. 조건이 없으므로 한번 실행하고 끝남.

  return null;
}

export default Auth;
