import PropTypes from 'prop-types';
import styles from './Main.module.css';

function Main(props) {
  return <main className={styles.main}>{props.children}</main>;
}

Main.propTypes = {
  children: PropTypes.node,
};

export default Main;
