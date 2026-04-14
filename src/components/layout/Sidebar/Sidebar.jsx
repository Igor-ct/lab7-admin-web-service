import { Link } from 'react-router-dom';
import styles from './Sidebar.module.css';

function Sidebar() {
  return (
    <aside className={styles.sidebar}>
      <nav>
        <ul className={styles.navList}>
          <Link to="/" style={{ textDecoration: 'none' }}>
            <li className={styles.navItem}>Dashboard</li>
          </Link>
          <Link to="/inventory" style={{ textDecoration: 'none' }}>
            <li className={styles.navItem}>Inventory</li>
          </Link>
          <Link to="/inventory/create" style={{ textDecoration: 'none' }}>
            <li className={styles.navItem}>Add New Item</li>
          </Link>
        </ul>
      </nav>
    </aside>
  );
}

export default Sidebar;