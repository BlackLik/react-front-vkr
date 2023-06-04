import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import RoutesPage from './pages';

const helmetContext = {};

function App() {
  return (
    <BrowserRouter basename='/'>
      <HelmetProvider context={helmetContext}>
        <RoutesPage />
      </HelmetProvider>
    </BrowserRouter>
  );
}

export default App;
