import LaptopCard from '../LaptopCard/LaptopCard';
import styles from './ProductRow.module.css';

export default function ProductRow({ title, items, isLoading, error, onRetry }) {
  
  if (isLoading) {
    return (
      <div className={styles.rowWrapper}>
        <div className={styles.rowHeader}>
          <h2 className={styles.rowTitle}>{title}</h2>
        </div>
        <div className={styles.scrollContainer}>
            {[1, 2, 3, 4].map((n) => (
            <div key={n} className={styles.skeletonCard}></div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.rowWrapper}>
        <div className={styles.rowHeader}>
          <h2 className={styles.rowTitle}>{title}</h2>
        </div>
        <div className={styles.errorState}>
          <span>⚠️ {error}</span>
          <button onClick={onRetry} className={styles.retryBtn}>Спробувати ще раз</button>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.rowWrapper}>
      <div className={styles.rowHeader}>
        <h2 className={styles.rowTitle}>{title}</h2>
        <button className={styles.seeAllBtn}>See all ➔</button>
      </div>
      
      <div className={styles.scrollContainer}>
        {!items || items.length === 0 ? (
          <div className={styles.emptyState}>
            <span>🛒 Наразі в цій категорії немає товарів.</span>
          </div>
        ) : (
          items.map((item) => (
            <LaptopCard key={item._id || item.id} product={item} />
          ))
        )}
      </div>
    </div>
  );
}