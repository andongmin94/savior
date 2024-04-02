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
            <Nav.Link href="/">
              <div className="text-white font-bold">다운로드</div>
            </Nav.Link>}
          </Nav>
          <Login />
        </Container>
      </Navbar>
    </header>
  );
}
