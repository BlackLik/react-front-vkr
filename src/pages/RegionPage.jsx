import { RussianMap, Seo } from '../components';
import Layout from '../layout';

function RegionPage() {
  return (
    <Layout>
      <Seo title='Region Page' />
      <h1>Region Page</h1>
      <RussianMap />
    </Layout>
  );
}

export default RegionPage;
