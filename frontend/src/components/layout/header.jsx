import { Link } from "react-router-dom";
import { Navbar, Container, Nav } from "react-bootstrap";
//////////////// electron components ////////////////
import TitleBar from "@/components/TitleBar";
/////////////////////////////////////////////////////

import Login from "@/pages/Login";

export default function Header() {
  return (
    <header className="fixed top-0 w-full z-10">
      <TitleBar />
      {typeof window.electron !== "undefined" && <div className="pt-10" />}
      <Navbar className="bg-blue-700 whitespace-nowrap">
        <Container>
          <Navbar.Brand href="/" className="flex flex-shrink-0 items-center">
            <img src="/savior_logo/savior.png" className="w-32" alt="logo" />
          </Navbar.Brand>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <Nav className="me-auto">
            <Nav.Link href="/search">
              <div className="text-white font-bold">나에게 맞는 복지 찾기</div>
            </Nav.Link>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <Nav.Link href="/recommend">
              <div className="text-white font-bold">복지제도 추천받기</div>
            </Nav.Link>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <Nav.Link href="/manual">
              <div className="text-white font-bold">세이비어 이용방법</div>
            </Nav.Link>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            {typeof window.electron === "undefined" &&
              <Nav.Link href="https://k-asap-savior.s3.amazonaws.com/welfare_app/Savior_Setup.exe?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAYS2NXJFTSTXYG2XU%2F20240403%2Fap-northeast-2%2Fs3%2Faws4_request&X-Amz-Date=20240403T083857Z&X-Amz-Expires=604800&X-Amz-SignedHeaders=host&X-Amz-Signature=29cf50eb4016661e786c52a3b622c3be0cd401c45fb543d7ab64632ea3bfe81d">
                <div className="text-white font-bold">다운로드</div>
              </Nav.Link>}
          </Nav>
          <Login />
        </Container>
      </Navbar>
    </header>
  );
}
