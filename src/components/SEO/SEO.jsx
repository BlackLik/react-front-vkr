import { Helmet } from 'react-helmet-async';
import PropTypes from 'prop-types';

function Seo(props) {
  return (
    <Helmet>
      <title>{props.title} | Вектор СПО</title>
      <meta name='title' content={'Vite and React ' + props.title} />
      <meta name='description' content={props.description} />
      <meta property='og:title' content={props.title} />
      <meta property='og:type' content='website' />
      <meta property='og:url' content={props.url} />
      <meta property='og:description' content={props.description} />
      <meta property='og:site_name' content={props.siteName} />
      <meta property='og:locale' content={props.locale} />
      <meta property='og:locale:alternate' content={props.localeAlternate} />
    </Helmet>
  );
}

Seo.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  url: PropTypes.string,
  siteName: PropTypes.string,
  locale: PropTypes.string,
  localeAlternate: PropTypes.string,
};

export default Seo;
