import { Seo, RussianMap } from '../components';
import { Container } from 'react-bootstrap';

function RegionPage() {
  return (
    <Container>
      <Seo title='Страница регионов' />
      <h1>Выберете регион</h1>
      <RussianMap />
    </Container>
  );
}

export default RegionPage;
