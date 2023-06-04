import PropTypes from 'prop-types';
import Header from './Header';
import Footer from './Footer';
import Main from './Main';

function Layout(props) {
  return (
    <>
      <Header />
      <Main>{props.children}</Main>
      <Footer />
    </>
  );
}

Layout.propTypes = {
  children: PropTypes.node,
};

export default Layout;
