import { useState } from 'react';
import styles from './Filters.module.css';

const FilterSection = ({ title, children, defaultOpen = false }) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className={styles.filterSection}>
      <button 
        className={styles.accordionHeader} 
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
      >
        <h4 className={styles.subtitle}>{title}</h4>
        <span className={`${styles.chevron} ${isOpen ? styles.open : ''}`}>
          ▼
        </span>
      </button>
      
      {isOpen && (
        <div className={styles.accordionContent}>
          {children}
        </div>
      )}
    </div>
  );
};

export default function Filters() {
  return (
    <div className={styles.filtersContainer}>
      <div className={styles.searchSection}>
        <div className={styles.inputWrapper}>
          <span className={styles.searchIcon}>🔍</span>
          <input 
            type="text" 
            placeholder="Search laptops..." 
            className={styles.searchInput} 
          />
        </div>
      </div>
      
      <FilterSection title="Brands" defaultOpen={true}>
        <ul className={styles.filterList}>
          <li><label><input type="checkbox" /> ASUS</label></li>
          <li><label><input type="checkbox" /> Lenovo</label></li>
          <li><label><input type="checkbox" /> Apple</label></li>
          <li><label><input type="checkbox" /> HP</label></li>
          <li><label><input type="checkbox" /> Dell</label></li>
        </ul>
      </FilterSection>

      <FilterSection title="Price" defaultOpen={true}>
        <div className={styles.priceContainer}>
          <input type="number" placeholder="Min $" className={styles.priceInput} />
          <span className={styles.priceSeparator}>-</span>
          <input type="number" placeholder="Max $" className={styles.priceInput} />
        </div>
      </FilterSection>

      <FilterSection title="Availability" defaultOpen={false}>
        <ul className={styles.filterList}>
          <li>
            <label className={styles.toggleLabel}>
              <input type="checkbox" /> <span>In Stock</span>
            </label>
          </li>
          <li>
            <label className={styles.toggleLabel}>
              <input type="checkbox" /> <span>Out of Stock</span>
            </label>
          </li>
        </ul>
      </FilterSection>
    </div>
  );
}