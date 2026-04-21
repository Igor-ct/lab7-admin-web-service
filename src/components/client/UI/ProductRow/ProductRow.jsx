import { Link } from 'react-router-dom';
import LaptopCard from '../LaptopCard/LaptopCard';
import styles from './ProductRow.module.css';

export default function ProductRow({ title, items, isLoading, error, onRetry, linkTo }) {  
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
          <button onClick={onRetry} className={styles.retryBtn}>Reload</button>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.rowWrapper}>
      <div className={styles.rowHeader}>
        <h2 className={styles.rowTitle}>{title}</h2>
        <Link to={linkTo} className={styles.seeAllBtn}>
            See all ➔
          </Link>
      </div>
      
      <div className={styles.scrollContainer}>
        {!items || items.length === 0 ? (
          <div className={styles.emptyState}>
            <span>🛒 No items.</span>
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