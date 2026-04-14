import { useState } from 'react';
import styles from './InventoryTable.module.css';

const DUMMY_INVENTORY = [
  { id: 1, name: 'Ноутбук Lenovo ThinkPad X1', sku: 'LNV-001', price: 1200, stock: 15, status: 'In Stock' },
  { id: 2, name: 'Монітор Dell UltraSharp 27"', sku: 'DLL-027', price: 350, stock: 3, status: 'Low Stock' },
  { id: 3, name: 'Клавіатура Keychron K8', sku: 'KCH-K8', price: 95, stock: 0, status: 'Out of Stock' },
];

function InventoryTable() {
  const [searchTerm, setSearchTerm] = useState('');
  
  const [sortConfig, setSortConfig] = useState({ key: 'id', direction: 'asc' });

  const requestSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const filteredItems = DUMMY_INVENTORY.filter(item => 
    item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.sku.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sortedItems = [...filteredItems].sort((a, b) => {
    if (a[sortConfig.key] < b[sortConfig.key]) {
      return sortConfig.direction === 'asc' ? -1 : 1;
    }
    if (a[sortConfig.key] > b[sortConfig.key]) {
      return sortConfig.direction === 'asc' ? 1 : -1;
    }
    return 0;
  });

  const getSortIcon = (columnKey) => {
    if (sortConfig.key !== columnKey) return <span className={styles.sortIcon}>↕</span>;
    return sortConfig.direction === 'asc' ? <span className={styles.sortIconActive}>↑</span> : <span className={styles.sortIconActive}>↓</span>;
  };

  return (
    <div className={styles.tableWrapper}>
      
      <div className={styles.toolbar}>
        <input 
          type="text" 
          placeholder="🔍 Search by Name or SKU..." 
          className={styles.searchInput}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <table className={styles.table}>
        <thead>
          <tr>
            <th onClick={() => requestSort('id')} className={styles.sortable}>
              ID {getSortIcon('id')}
            </th>
            <th onClick={() => requestSort('name')} className={styles.sortable}>
              Name {getSortIcon('name')}
            </th>
            <th onClick={() => requestSort('sku')} className={styles.sortable}>
              SKU {getSortIcon('sku')}
            </th>
            <th onClick={() => requestSort('price')} className={styles.sortable}>
              Price {getSortIcon('price')}
            </th>
            <th onClick={() => requestSort('stock')} className={styles.sortable}>
              Stock {getSortIcon('stock')}
            </th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {sortedItems.length === 0 ? (
            <tr>
              <td colSpan="7" className={styles.emptyState}>
                <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>📦</div>
                <h4>Products not found</h4>
              </td>
            </tr>
          ) : (
            sortedItems.map((item) => (
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