import styles from './Header.module.css';

export default function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.leftGroup}>
        <button className={styles.burgerBtn} aria-label="Menu">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="3" y1="12" x2="21" y2="12"></line>
            <line x1="3" y1="6" x2="21" y2="6"></line>
            <line x1="3" y1="18" x2="21" y2="18"></line>
          </svg>
        </button>
        <div className={styles.logo}>LAPTOP WORLD</div>
      </div>

      <div className={styles.rightGroup}>
        <button className={styles.iconBtn} aria-label="Favorites">
          ❤️
        </button>
        <button className={styles.iconBtn} aria-label="Cart">
          🛒
        </button>
      </div>
    </header>
  );
}