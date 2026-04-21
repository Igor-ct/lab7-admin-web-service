import { Link } from 'react-router-dom';
import styles from './NotFound.module.css';

function NotFound() {
  return (
    <div className={styles.container}>
      <h2 className={styles.errorCode}>404</h2>
      <h3 className={styles.title}>Resource not found</h3>
      
      <Link to="/" className={styles.link}>
        Return to Main Page
      </Link>
    </div>
  );
}

export default NotFound;