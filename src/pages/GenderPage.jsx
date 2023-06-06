import { Seo, Gender } from '../components';
import { Container } from 'react-bootstrap';

function GenderPage() {
  return (
    <Container>
      <Seo title='Gender Page' />
      <h1>Gender Page</h1>
      <Gender />
    </Container>
  );
}

export default GenderPage;
