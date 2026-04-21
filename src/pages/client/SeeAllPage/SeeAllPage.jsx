import { useParams, useNavigate } from 'react-router-dom';
import { useInventory } from '../../../store/InventoryContext';
import ProductGrid from '../../../components/client/UI/ProductGrid/ProductGrid';
import styles from './SeeAllPage.module.css';

export default function SeeAllPage() {
  const { categoryId } = useParams();
  const navigate = useNavigate();
  const { items, isLoading, error, fetchItems } = useInventory();

  let filteredItems = [];
  let pageTitle = "All items";

  switch (categoryId) {
    case 'lowest-price':
      filteredItems = [...items].sort((a, b) => a.price - b.price);
      pageTitle = "🔥 The Lowest Price";
      break;
    case 'highest-price':
      filteredItems = [...items].sort((a, b) => b.price - a.price);
      pageTitle = "💎 Highest Price";
      break;
    case 'gaming-beasts':
      const gamingBeastsSkus = ['SKU-001', 'SKU-002', 'SKU-003', 'SKU-004'];
      filteredItems = items.filter(item => gamingBeastsSkus.includes(item.sku));
      pageTitle = "🎮 Gaming Beasts";
      break;
    default:
      filteredItems = items; 
      pageTitle = "Catalog of goods";
  }

  return (
    <div className={styles.pageContainer}>
      <button className={styles.backBtn} onClick={() => navigate(-1)}>
        ⬅ Return
      </button>

      {isLoading ? (
  <div className={styles.skeletonGrid}>
    {[...Array(6)].map((_, index) => (
      <div key={index} className={styles.skeletonCard} />
    ))}
  </div>
) : error ? (
        <div className={styles.errorState}>
          <p>⚠️ {error}</p>
          <button className={styles.retryBtn} onClick={fetchItems}>Reload</button>
        </div>
      ) : (
        <ProductGrid 
          title={pageTitle} 
          items={filteredItems} 
          emptyMessage="This category has no items." 
        />
      )}
    </div>
  );
}