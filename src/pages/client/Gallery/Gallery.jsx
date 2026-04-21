import { useInventory } from '../../../store/InventoryContext'; 
import HeroVideo from './HeroVideo/HeroVideo';
import ProductRow from '../../../components/client/UI/ProductRow/ProductRow';
import styles from './Gallery.module.css';

export default function Gallery() {
  const { items, isLoading, error, fetchItems } = useInventory();

  const lowestPriceItems = items ? [...items].sort((a, b) => a.price - b.price).slice(0, 10) : [];
  const highestPriceItems = items ? [...items].sort((a, b) => b.price - a.price).slice(0, 10) : [];
  
  const gamingBeastsSkus = ['SKU-001', 'SKU-002', 'SKU-003']; 
  const gamingItems = items ? items.filter(item => gamingBeastsSkus.includes(item.sku)) : [];

  return (
    <div className={styles.galleryContainer}>
      <HeroVideo />

      <div className={styles.rowsContainer}>
        <ProductRow 
          title="🔥 The Lowest Price" 
          items={lowestPriceItems} 
          isLoading={isLoading} 
          error={error} 
          onRetry={fetchItems}
          linkTo="/category/lowest-price" 
        />
        
        <ProductRow 
          title="💎 The Highest Price" 
          items={highestPriceItems} 
          isLoading={isLoading} 
          error={error} 
          onRetry={fetchItems} 
          linkTo="/category/highest-price"
        />
        
        <ProductRow 
          title="🎮 Gaming Beasts" 
          items={gamingItems} 
          isLoading={isLoading} 
          error={error} 
          onRetry={fetchItems} 
          linkTo="/category/gaming-beasts"
        />
      </div>
    </div>
  );
}