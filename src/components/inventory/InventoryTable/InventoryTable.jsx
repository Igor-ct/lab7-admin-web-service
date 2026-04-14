import { useState } from 'react';
import styles from './InventoryTable.module.css';

const DUMMY_INVENTORY = [
  { id: 1, name: 'Ноутбук Lenovo ThinkPad X1', sku: 'LNV-001', price: 1200, stock: 15, status: 'In Stock' },
  { id: 2, name: 'Монітор Dell UltraSharp 27"', sku: 'DLL-027', price: 350, stock: 3, status: 'Low Stock' },
  { id: 3, name: 'Клавіатура Keychron K8', sku: 'KCH-K8', price: 95, stock: 0, status: 'Out of Stock' },
];

function InventoryTable() {
 const [searchTerm, setSearchTerm] = useState('');

 const filteredItems = DUMMY_INVENTORY.filter(item => 
    item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.sku.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className={styles.tableWrapper}>
      
      <div className={styles.toolbar}>
        <input 
          type="text" 
          placeholder="Пошук за назвою або SKU..." 
          className={styles.searchInput}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <table className={styles.table}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>SKU</th>
            <th>Price</th>
            <th>Stock</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredItems.length === 0 ? (
            <tr>
              <td colSpan="7" className={styles.emptyState}>
                <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>📦</div>
                <h4>Products not found</h4>
              </td>
            </tr>
          ) : (
            filteredItems.map((item) => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td className={styles.itemName}>{item.name}</td>
                <td>{item.sku}</td>
                <td>${item.price}</td>
                <td>{item.stock} шт.</td>
                <td>
                  <span className={`${styles.badge} ${styles[item.status.replace(/ /g, '')]}`}>
                    {item.status}
                  </span>
                </td>
                <td>
                  <button className={styles.actionBtn}>✏️</button>
                  <button className={styles.actionBtn}>🗑️</button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default InventoryTable;