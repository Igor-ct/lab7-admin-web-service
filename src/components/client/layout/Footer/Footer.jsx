import styles from './Footer.module.css';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.content}>
        <div className={styles.brandInfo}>
          <h3>LAPTOP WORLD</h3>
          <p>The premium inventory for modern professionals and gamers.</p>
        </div>
        
        <div className={styles.supportInfo}>
          <h4>Support & Contact</h4>
          <p>📞 0-800-LAPTOP-500</p>
          <p>✉️ support@laptopworld.com</p>
        </div>
      </div>
      
      <div className={styles.bottomBar}>
        <p>© 2026 Laptop World Premium. All rights reserved.</p>
      </div>
    </footer>
  );
}