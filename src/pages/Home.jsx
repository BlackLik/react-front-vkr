import { Seo, FormRecomendation } from '../components';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Container, Accordion } from 'react-bootstrap';

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
      <Seo title='Home' />
      <h1>Home</h1>

      <Accordion
        defaultActiveKey={paramsPredict.citizenship ? '' : '0'}
        alwaysOpen={!paramsPredict.citizenship}
      >
        <Accordion.Item eventKey='0'>
          <Accordion.Header>
            <h2>Фильтр</h2>
          </Accordion.Header>
          <Accordion.Body>
            <FormRecomendation />
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    </Container>
  );
}

export default Home;
