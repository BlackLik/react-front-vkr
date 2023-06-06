import { Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import { ProgressBar } from 'react-bootstrap';

const HomePage = lazy(() => import('./Home'));
const RegionPage = lazy(() => import('./RegionPage'));
const GenderPage = lazy(() => import('./GenderPage'));
const ErorrPage = lazy(() => import('./ErorrNotFoundPage'));

function RoutesPage() {
  return (
    <Suspense fallback={<ProgressBar animated now={100} />}>
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/region' element={<RegionPage />} />
        <Route path='/gender' element={<GenderPage />} />
        <Route path='*' element={<ErorrPage />} />
      </Routes>
    </Suspense>
  );
}

export default RoutesPage;
