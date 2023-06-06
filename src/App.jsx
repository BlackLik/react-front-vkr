import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import RoutesPage from './pages';
import Layout from './layout';
const helmetContext = {};

function App() {
  return (
    <BrowserRouter basename='/'>
      <Layout>
        <HelmetProvider context={helmetContext}>
          <RoutesPage />
        </HelmetProvider>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
