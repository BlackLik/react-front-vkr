import PropTypes from 'prop-types';
import { Suspense, lazy } from 'react';
import { ProgressBar } from 'react-bootstrap';

const Header = lazy(() => import('./Header'));
const Footer = lazy(() => import('./Footer'));
const Main = lazy(() => import('./Main'));

function Layout(props) {
  return (
    <Suspense fallback={<ProgressBar animated now={100} />}>
      <Header />
      <Main>{props.children}</Main>
      <Footer />
    </Suspense>
  );
}

Layout.propTypes = {
  children: PropTypes.node,
};

export default Layout;
