import styles from './Header.module.css';

function Header() {
  return (
    <header className={styles.header}>
      <h1>Warehouse Admin Panel</h1>
      <div className={styles.userInfo}>Admin</div>
    </header>
  );
}

export default Header;