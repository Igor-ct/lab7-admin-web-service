import HeroVideo from './HeroVideo/HeroVideo';
import ProductRow from '../../../components/client/UI/ProductRow/ProductRow';
import styles from './Gallery.module.css';

export default function Gallery() {
  const dummyLaptops = [1, 2, 3, 4, 5, 6, 7]; 

  return (
    <div className={styles.galleryContainer}>
      <HeroVideo />

      <div className={styles.rowsContainer}>
        <ProductRow title="🔥 The Lowest Price" items={dummyLaptops} />
        <ProductRow title="💎 Premium & Highest Price" items={dummyLaptops} />
        <ProductRow title="🎮 Gaming Beasts" items={dummyLaptops} />
      </div>
    </div>
  );
}