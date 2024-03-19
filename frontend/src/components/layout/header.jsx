import { Navbar, Container, Nav } from 'react-bootstrap';
import Login from '@/pages/Login';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="fixed top-0 w-full">
      {typeof window.electron !== "undefined" && <div className="pt-10"/>}
      <Navbar className="bg-orange-400" variant="dark">
        <Container>
          <Navbar.Brand href="/" className="flex items-center">
            <img src="/savior_logo/savior.png" className="w-32" alt="logo" />
          </Navbar.Brand>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <Nav className="me-auto">
            <Nav.Link href="/search">나에게 맞는 복지 찾기</Nav.Link>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <Nav.Link href="/recommend">복지제도 추천받기</Nav.Link>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <Nav.Link href="/manual">세이비어 이용방법</Nav.Link>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <Nav.Link href="/qna">Q&A</Nav.Link>
          </Nav>
          <Login />
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;