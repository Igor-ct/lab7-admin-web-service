import styles from './LaptopCard.module.css';

export default function LaptopCard({ id }) {
  return (
    <div className={styles.card}>
      <div className={styles.imagePlaceholder}>
        💻 Image {id + 1}
      </div>
      <div className={styles.info}>
        <h3 className={styles.name}>GIGABYTE AORUS 16X</h3>
        <p className={styles.specs}>RTX 5080 • 32GB RAM • 2TB SSD</p>
        <div className={styles.bottomRow}>
          <span className={styles.price}>$2,499</span>
          <button className={styles.cartBtn}>🛒</button>
        </div>
      </div>
    </div>
  );
}