import Container from 'react-bootstrap/Container';
import styles from './Footer.module.css';

function Footer() {
  return (
    <footer className={styles.footer + ' bg-light'}>
      <Container fluid={true} bg='light' expand='lg'>
        <span>© {new Date().getFullYear()} Все права защищены</span>
      </Container>
    </footer>
  );
}

export default Footer;
