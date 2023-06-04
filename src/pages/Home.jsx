import { Seo } from '../components';
import Layout from '../layout';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

function Home() {
  const region = useSelector((state) => state.region.data);

  if (region.id === null) {
    return <Navigate to='/region' />;
  }

  return (
    <Layout>
      <Seo title='Home' />
      Home
    </Layout>
  );
}

export default Home;
