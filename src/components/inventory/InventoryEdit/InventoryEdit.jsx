import { useState, useEffect } from 'react';
import styles from './InventoryEdit.module.css';

function InventoryEdit({ item, onSaveText, onSavePhoto, onClose }) {
  const [name, setName] = useState('');
  const [sku, setSku] = useState('');
  const [price, setPrice] = useState('');
  const [stock, setStock] = useState('');
  const [description, setDescription] = useState('');
  const [previewUrl, setPreviewUrl] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);

  useEffect(() => {
    if (!item) return;

    setName(item.name || '');
    setSku(item.sku || '');
    setPrice(item.price || '');
    setStock(item.stock || '');
    setDescription(item.description || '');
    setPreviewUrl(item.photo || '');
  }, [item]);

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setSelectedFile(file);
    setPreviewUrl(URL.createObjectURL(file));
  };

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.card} onClick={(e) => e.stopPropagation()}>
        <button className={styles.closeBtn} onClick={onClose}>
          &times;
        </button>

        <div className={styles.imageSection}>
          <img
            src={previewUrl || 'https://placehold.co/600x400?text=No+Photo'}
            alt="Preview"
          />

          <div className={styles.photoActions}>
            <input
              type="file"
              id="photoInput"
              hidden
              onChange={handleFileChange}
            />

            <label htmlFor="photoInput" className={styles.selectBtn}>
              Select New Photo
            </label>

            {selectedFile && (
              <button
                className={styles.saveBtn}
                onClick={() => onSavePhoto(selectedFile)}
              >
                Update Photo
              </button>
            )}
          </div>
        </div>

        <div className={styles.infoSection}>
          <div className={styles.field}>
            <label className={styles.label}>Inventory Name:</label>
            <input
              className={styles.input}
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className={styles.field}>
            <label className={styles.label}>SKU:</label>
            <input
              className={styles.input}
              value={sku}
              onChange={(e) => setSku(e.target.value)}
            />
          </div>

          <div className={styles.field}>
            <label className={styles.label}>Price:</label>
            <input
              type="number"
              className={styles.input}
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </div>

          <div className={styles.field}>
            <label className={styles.label}>Stock:</label>
            <input
              type="number"
              className={styles.input}
              value={stock}
              onChange={(e) => setStock(e.target.value)}
            />
          </div>

          <div className={styles.descriptionBlock}>
            <label className={styles.descriptionLabel}>Description</label>
            <textarea
              className={styles.textarea}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          <button
            className={styles.mainSaveBtn}
            onClick={() =>
              onSaveText({ name, sku, price, stock, description })
            }
          >
            Save Text Changes
          </button>
        </div>
      </div>
    </div>
  );
}

export default InventoryEdit;