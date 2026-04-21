import { useInventory } from '../../../store/InventoryContext';
import { useFavorites } from '../../../store/FavoritesContext';
import ProductGrid from '../../../components/client/UI/ProductGrid/ProductGrid';
import styles from './FavoritesPage.module.css'; 

export default function FavoritesPage() {
  const { items, isLoading, error, fetchItems } = useInventory(); 
  const { favorites } = useFavorites();       

  const favoriteProducts = items.filter(item => 
    favorites.includes(item._id || item.id)
  );

  return (
    <div className={styles.pageContainer}>
      
      {isLoading ? (
        <div className={styles.skeletonGrid}>
          {[...Array(6)].map((_, i) => (
            <div key={i} className={styles.skeletonCard} />
          ))}
        </div>
      ) : error ? (
        <div className={styles.errorState}>
          <p>⚠️ {error}</p>
          <button className={styles.retryBtn} onClick={fetchItems}>Reload</button>
        </div>
      ) : (
        <ProductGrid 
          title="❤️ Your Favorites" 
          items={favoriteProducts} 
          emptyMessage="You have no favorites 💔"
        />
      )}
    </div>
  );
}