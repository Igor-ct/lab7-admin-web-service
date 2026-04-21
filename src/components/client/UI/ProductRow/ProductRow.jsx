import LaptopCard from '../LaptopCard/LaptopCard';
import styles from './ProductRow.module.css';

export default function ProductRow({ title, items }) {
  return (
    <div className={styles.rowWrapper}>
      <div className={styles.rowHeader}>
        <h2 className={styles.rowTitle}>{title}</h2>
        <button className={styles.seeAllBtn}>See all ➔</button>
      </div>
      
      <div className={styles.scrollContainer}>
        {items.map((item, index) => (
          <LaptopCard key={index} id={index} />
        ))}
      </div>
    </div>
  );
}