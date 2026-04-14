import styles from './InventoryForm.module.css';

function InventoryForm({ formData, currentStatus, onChange, onSubmit, onCancel }) {
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Create New Item</h2>
      
      <form onSubmit={onSubmit}>
        <div className={styles.row}>
          <div className={styles.mainColumn}>
            <div className={styles.formGroup}>
              <label className={styles.label}>Item Name *</label>
              <input 
                className={styles.input} 
                type="text" 
                name="inventory_name" 
                value={formData.inventory_name} 
                onChange={onChange} 
                required 
              />
            </div>

            <div className={styles.row}>
              <div className={styles.half}>
                <label className={styles.label}>SKU *</label>
                <input className={styles.input} type="text" name="sku" value={formData.sku} onChange={onChange} required />
              </div>
              <div className={styles.half}>
                <label className={styles.label}>Price ($) *</label>
                <input className={styles.input} type="number" step="0.01" min="0" name="price" value={formData.price} onChange={onChange} required />
              </div>
            </div>

            <div className={`${styles.row} ${styles.formGroup}`}>
              <div className={styles.half}>
                <label className={styles.label}>Stock (pcs) *</label>
                <input 
                  className={styles.input} 
                  type="number" 
                  min="0" 
                  name="stock" 
                  value={formData.stock} 
                  onChange={onChange} 
                  required 
                />
              </div>
              <div className={styles.half}>
                <label className={styles.label}>Auto-Status</label>
                <div 
                  className={styles.statusBadge}
                  style={{ 
                    backgroundColor: currentStatus.bg, 
                    color: currentStatus.color, 
                    border: `1px solid ${currentStatus.color}40`
                  }}
                >
                  {currentStatus.text}
                </div>
              </div>
            </div>
          </div>

          <div className={styles.photoColumn}>
            <label className={styles.label}>Photo (URL)</label>
            <input 
              className={styles.input} 
              type="url" 
              name="photo" 
              placeholder="https://..." 
              value={formData.photo} 
              onChange={onChange} 
            />
            
            <div className={styles.previewBox}>
              {formData.photo ? (
                <img 
                  className={styles.previewImg}
                  src={formData.photo} 
                  alt="Preview" 
                  onError={(e) => { 
                    e.target.style.display = 'none'; 
                    e.target.nextSibling.style.display = 'block'; 
                  }}
                />
              ) : (
                "Paste link"
              )}
              <span className={styles.errorText}>Invalid link</span>
            </div>
          </div>
        </div>

        <div className={styles.formGroup}>
          <label className={styles.label}>Description</label>
          <textarea 
            className={`${styles.input} ${styles.textarea}`} 
            name="description" 
            value={formData.description} 
            onChange={onChange} 
          />
        </div>

        <div className={styles.actions}>
          <button type="button" className={styles.cancelBtn} onClick={onCancel}>
            Cancel
          </button>
          <button type="submit" className={styles.submitBtn}>
            Save Item
          </button>
        </div>
      </form>
    </div>
  );
}

export default InventoryForm;