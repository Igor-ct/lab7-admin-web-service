import LaptopCard from '../LaptopCard/LaptopCard';
import styles from './ProductGrid.module.css';

export default function ProductGrid({ title, items, emptyMessage = "Products not found." }) {
  return (
    <div className={styles.gridWrapper}>
      {title && <h2 className={styles.gridTitle}>{title}</h2>}
      
      {!items || items.length === 0 ? (
        <div className={styles.emptyState}>
          <span>{emptyMessage}</span>
        </div>
      ) : (
        <div className={styles.gridContainer}>
          {items.map((item) => (
            <LaptopCard key={item._id || item.id} product={item} />
          ))}
        </div>
      )}
    </div>
  );
}