import { Seo, FormRecomendation, Dashboard } from '../components';
import { useSelector } from 'react-redux';
import { Container, Accordion, Button } from 'react-bootstrap';
import { Navigate } from 'react-router';

function Home() {
  const region = useSelector((state) => state.region.data);
  const gender = useSelector((state) => state.gender.data);
  const paramsPredict = useSelector((state) => state.paramsPredict.data);

  if (region.id === null) {
    return <Navigate to='/region' />;
  }

  if (gender.id === null) {
    return <Navigate to='/gender' />;
  }

  return (
    <Container>
      <Seo title='Главная страница' />
      <h1>Главная страница</h1>

      <Accordion defaultActiveKey={paramsPredict.ip ? '' : '0'}>
        <Accordion.Item eventKey='0'>
          <Accordion.Header>
            <h2>Фильтр</h2>
          </Accordion.Header>
          <Accordion.Body>
            <FormRecomendation />
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>

      <Container fluid className='my-4'>
        <Dashboard />
      </Container>
    </Container>
  );
}

export default Home;
