import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { LinkContainer } from 'react-router-bootstrap';
import { useSelector } from 'react-redux';

function Header() {
  let region = useSelector((state) => state.region.data.iso);
  let gender = useSelector((state) => state.gender.data.name_gender);

  region = region ? 'Регион ' + region : 'Выбрать регион';
  gender = gender ? 'Пол: ' + gender : 'Выбрать пол';

  return (
    <header>
      <Navbar bg='light' expand='lg'>
        <Container>
          <LinkContainer to='/'>
            <Navbar.Brand>ВекторСПО.РФ</Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls='basic-navbar-nav' />
          <Navbar.Collapse id='basic-navbar-nav'>
            <Nav className='me-auto'>
              <LinkContainer to='/region'>
                <Nav.Link>{region}</Nav.Link>
              </LinkContainer>
              <LinkContainer to='/gender'>
                <Nav.Link>{gender}</Nav.Link>
              </LinkContainer>
            </Nav>
            <Nav>
              <Nav.Link
                href='https://github.com/BlackLik/react-front-vkr'
                target='_blank'
              >
                GitHub React
              </Nav.Link>
              <Nav.Link
                href='https://github.com/BlackLik/flask-rest-vkr'
                target='_blank'
              >
                Github Flask
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
}

export default Header;
