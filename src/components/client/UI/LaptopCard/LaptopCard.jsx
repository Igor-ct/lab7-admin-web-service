import { useState } from 'react';
import styles from './LaptopCard.module.css';

export default function LaptopCard({ product }) {
  const [isExpanded, setIsExpanded] = useState(false);

  if (!product) return null;

  const getBadgeStyle = (status) => {
    switch (status) {
      case 'In Stock': return styles.badgeSuccess;
      case 'Low Stock': return styles.badgeWarning;
      case 'Out of Stock': return styles.badgeDanger;
      default: return styles.badgeDefault;
    }
  };

  const isOutOfStock = product.status === 'Out of Stock';

  const formattedPrice = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0
  }).format(product.price);

  return (
    <div className={styles.card} onMouseLeave={() => setIsExpanded(false)}>
      
      <div className={styles.imagePlaceholder}>
        <div className={`${styles.statusBadge} ${getBadgeStyle(product.status)}`}>
          {product.status}
        </div>
        
        {product.photo ? (
           <img src={product.photo} alt={product.name} className={styles.productImage} />
        ) : (
           <span>💻 No Image</span>
        )}
      </div>

      <div className={styles.infoContainer}>
        
        <h3 className={styles.name}>{product.name}</h3> 
        <p className={styles.description}>{product.description}</p>

        <div className={`${styles.popoutOverlay} ${isExpanded ? styles.showPopout : ''}`}>
          <h3 className={styles.fullName}>{product.name}</h3>
          <p className={styles.fullDescription}>{product.description}</p>
        </div>

      </div>

      <div className={styles.uiContainer}>
        <span className={styles.price}>{formattedPrice}</span>
        
        <div className={styles.actions}>
          <button 
            className={`${styles.actionBtn} ${isExpanded ? styles.activeExpand : ''}`} 
            onClick={() => setIsExpanded(!isExpanded)}
            title="Читати більше"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className={styles.icon}>
              <polyline points="6 9 12 15 18 9"></polyline>
            </svg>
          </button>

          <button className={styles.actionBtn} title="Додати в улюблене">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className={styles.icon}>
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
            </svg>
          </button>

          <button 
            className={`${styles.actionBtn} ${styles.cartBtn}`} 
            title={isOutOfStock ? "Немає в наявності" : "В кошик"}
            disabled={isOutOfStock}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className={styles.icon}>
              <circle cx="9" cy="21" r="1"></circle>
              <circle cx="20" cy="21" r="1"></circle>
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
            </svg>
          </button>
        </div>
      </div>

    </div>
  );
}