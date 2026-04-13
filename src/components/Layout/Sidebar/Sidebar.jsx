import styles from './Sidebar.module.css';

function Sidebar() {
  return (
    <aside className={styles.sidebar}>
      <nav>
        <ul className={styles.navList}>
          <li className={styles.navItem}> Inventory</li>
          <li className={styles.navItem}> Add New Item</li>
        </ul>
      </nav>
    </aside>
  );
}

export default Sidebar;