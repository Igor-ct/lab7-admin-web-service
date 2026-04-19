import { Link } from 'react-router-dom';
import styles from './Sidebar.module.css';

function Sidebar() {
  return (
    <aside className={styles.sidebar}>
      <nav>
        <ul className={styles.navList}>
          <Link to="/admin" className={styles.navLink}>
            <li className={styles.navItem}>Dashboard</li>
          </Link>
          <Link to="/admin/inventory" className={styles.navLink}>
            <li className={styles.navItem}>Inventory</li>
          </Link>
          <Link to="/admin/inventory/create" className={styles.navLink}>
            <li className={styles.navItem}>Add New Item</li>
          </Link>
        </ul>
      </nav>
    </aside>
  );
}

export default Sidebar;