import styles from './InventoryDetails.module.css';

function InventoryDetails({ item, isLoading, error, onClose }) {
  if (isLoading) return <div className={styles.overlay}>Loading...</div>;
  if (error || !item) return null;

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.card} onClick={e => e.stopPropagation()}>
        <button className={styles.closeBtn} onClick={onClose}>&times;</button>
        
        <div className={styles.imageSection}>
          <img 
            src={item.photo || 'https://placehold.co/600x400?text=No+Photo'} 
            alt={item.name} 
          />
        </div>

        <div className={styles.field}>
          <span className={styles.label}>Inventory Name:</span>
          <span className={styles.value} style={{fontWeight: '700'}}>{item.name}</span>
        </div>

        <div className={styles.field}>
          <span className={styles.label}>Price:</span>
          <span className={styles.value}>${Number(item.price).toFixed(2)}</span>
        </div>

        <div className={styles.field}>
          <span className={styles.label}>Stock:</span>
          <span className={styles.value}>{item.stock} pcs.</span>
        </div>

        <div className={styles.field}>
          <span className={styles.label}>Status:</span>
          <span className={styles.value}>{item.status}</span>
        </div>

        <div className={styles.descriptionBlock}>
          <span className={styles.descriptionLabel}>Description</span>
          <div className={styles.descriptionContent}>
            {item.description || 'No description available for this item.'}
          </div>
        </div>
      </div>
    </div>
  );
}

export default InventoryDetails;