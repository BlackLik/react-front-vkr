import { Seo, Gender } from '../components';
import { Container } from 'react-bootstrap';

function GenderPage() {
  return (
    <Container>
      <Seo title='Выбрать пол' />
      <h1>Укажите пол</h1>
      <Gender />
    </Container>
  );
}

export default GenderPage;
