import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";

import DemoPersonaSwitcher from "@/components/DemoPersonaSwitcher";
import { isMockMode } from "@/mocks/demoStore";

function isLogin() {
  const token = localStorage.getItem("token");
  if (token) {
    return true;
  } else {
    return false;
  }
}

export default function Login() {
  if (isMockMode) {
    return <DemoPersonaSwitcher compact />;
  }

  const oauthUrl = import.meta.env.VITE_OAUTH_URL;

  return (
    <div>
      {!isLogin() ? (
        <div>
          <a href={oauthUrl}>
            <Button className="bg-blue-800 border-none font-bold text-lg">
              로그인
            </Button>
          </a>
        </div>
      ) : (
        <div>
          <Link to="/profile">
            <Button className="bg-blue-800 border-none font-bold text-lg mr-[5px]">
              내 정보
            </Button>
          </Link>

          <Button
            className="bg-blue-800 border-none font-bold text-lg"
            onClick={() => {
              localStorage.removeItem("token");
              localStorage.removeItem("name");
              localStorage.removeItem("profile");
              window.location.assign("/");
            }}
          >
            로그아웃
          </Button>
        </div>
      )}
    </div>
  );
}
