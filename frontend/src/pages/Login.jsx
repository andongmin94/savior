import { Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';

function isLogin() {
  const token = localStorage.getItem('token');
  if (token) {
    return true;
  } else {
    return false;
  }
}

function Login() {
  
  let navigate = useNavigate();

  return (
    <div>
      {!isLogin() ? (
        <div>
          <a href={"/"}>
            
            <Button
              style={{
                backgroundColor: '#ea580c',
                borderColor: '#ea580c',
                fontWeight: 'bold',
                fontSize: 'large',
              }}
            >
              로그인
            </Button>
          </a>
        </div>
      ) : (
        <div>
          <Link to="/profile">
            <Button
              style={{
                backgroundColor: '#90CAF9',
                borderColor: '#90CAF9',
                fontWeight: 'bold',
                fontSize: 'large',
                marginRight: '5px',
              }}
            >
              내 정보
            </Button>
          </Link>

          <Button
            style={{
              backgroundColor: '#ea580c',
              borderColor: '#ea580c',
              fontWeight: 'bold',
              fontSize: 'large',
            }}
            onClick={() => {
              localStorage.removeItem('token');
              localStorage.removeItem('name');
              localStorage.removeItem('profile');
              window.location.replace('/');
            }}
          >
            로그아웃
          </Button>
        </div>
      )}
    </div>
  );
}

export default Login;
