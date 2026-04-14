import { useState } from 'react'; 
import { Link } from 'react-router-dom';
import { useInventory } from '../../../store/InventoryContext'; 
import styles from './InventoryTable.module.css';

function InventoryTable() {
  const { items: inventory } = useInventory();

  const [searchTerm, setSearchTerm] = useState('');
  const [sortConfig, setSortConfig] = useState({ key: 'id', direction: 'asc' });
  const [filterStatus, setFilterStatus] = useState('All');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [showAdvanced, setShowAdvanced] = useState(false);


  const requestSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const filteredItems = inventory.filter(item => {
    const itemName = item.name || '';
    const nameMatch = itemName.toLowerCase().includes(searchTerm.toLowerCase());
    const skuMatch = (item.sku || '').toLowerCase().includes(searchTerm.toLowerCase());
    const idMatch = (item.id || '').toString().includes(searchTerm);
    const matchesSearch = nameMatch || skuMatch || idMatch;

    const matchesStatus = filterStatus === 'All' || item.status === filterStatus;

    const itemPrice = item.price;
    const min = minPrice === '' ? 0 : parseFloat(minPrice);
    const max = maxPrice === '' ? Infinity : parseFloat(maxPrice);
    const matchesPrice = itemPrice >= min && itemPrice <= max;

    return matchesSearch && matchesStatus && matchesPrice;
  });

  const sortedItems = [...filteredItems].sort((a, b) => {
    if (a[sortConfig.key] < b[sortConfig.key]) return sortConfig.direction === 'asc' ? -1 : 1;
    if (a[sortConfig.key] > b[sortConfig.key]) return sortConfig.direction === 'asc' ? 1 : -1;
    return 0;
  });

  const getSortIcon = (columnKey) => {
    if (sortConfig.key !== columnKey) return <span className={styles.sortIcon}>↕</span>;
    return sortConfig.direction === 'asc' ? <span className={styles.sortIconActive}>↑</span> : <span className={styles.sortIconActive}>↓</span>;
  };

  const clearFilters = () => {
    setFilterStatus('All');
    setMinPrice('');
    setMaxPrice('');
  };

  return (
    <div className={styles.tableWrapper}>
      <div className={styles.toolbar}>
        <div className={styles.mainSearchRow}>
          <input 
            type="text" 
            placeholder="🔍 Search by Name, SKU or ID..." 
            className={styles.searchInput}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button 
            className={showAdvanced ? styles.activeFilterBtn : styles.toggleFilterBtn}
            onClick={() => setShowAdvanced(!showAdvanced)}
          >
            {showAdvanced ? 'Hide filters' : '⚙️ Advance Search'}
          </button>
        </div>

        {showAdvanced && (
          <div className={styles.advancedFiltersPanel}>
            <div className={styles.filtersGroup}>
              <div className={styles.filterItem}>
                <label>Status:</label>
                <select 
                  className={styles.filterSelect}
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                >
                  <option value="All">All Status</option>
                  <option value="In Stock">In Stock</option>
                  <option value="Low Stock">Low Stock</option>
                  <option value="Out of Stock">Out of Stock</option>
                </select>
              </div>

              <div className={styles.filterItem}>
                <label>Price ($):</label>
                <div className={styles.priceFilter}>
                  <input 
                    type="number" 
                    placeholder="Min" 
                    className={styles.filterInput}
                    value={minPrice}
                    onChange={(e) => setMinPrice(e.target.value)}
                  />
                  <span>-</span>
                  <input 
                    type="number" 
                    placeholder="Max" 
                    className={styles.filterInput}
                    value={maxPrice}
                    onChange={(e) => setMaxPrice(e.target.value)}
                  />
                </div>
              </div>
            </div>
            
            <button className={styles.clearBtn} onClick={clearFilters}>
              Clear filters
            </button>
          </div>
        )}
      </div>

      <table className={styles.table}>
        <thead>
          <tr>
            <th onClick={() => requestSort('id')} className={styles.sortable}>ID {getSortIcon('id')}</th>
            <th>Photo</th>
            <th onClick={() => requestSort('name')} className={styles.sortable}>Name {getSortIcon('name')}</th>
            <th onClick={() => requestSort('sku')} className={styles.sortable}>SKU {getSortIcon('sku')}</th>
            <th onClick={() => requestSort('price')} className={styles.sortable}>Price {getSortIcon('price')}</th>
            <th onClick={() => requestSort('stock')} className={styles.sortable}>Stock {getSortIcon('stock')}</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {sortedItems.length === 0 ? (
            <tr>
              <td colSpan="8" className={styles.emptyState}>
                <div className={styles.emptyIcon}>📦</div>
                <h4>Products not found</h4>
              </td>
            </tr>
          ) : (
            sortedItems.map((item) => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>
                  <img 
                    src={item.photo || 'https://placehold.co/50x50?text=No+Img'} 
                    alt={item.name}
                    className={styles.productImage}
                  />
                </td>
                <td className={styles.itemName}>{item.name}</td>
                <td>{item.sku}</td>
                <td>${item.price.toFixed(2)}</td>
                <td>{item.stock} pcs.</td>
                <td>
                  <span className={`${styles.badge} ${styles[item.status.replace(/ /g, '')]}`}>
                    {item.status}
                  </span>
                </td>
                <td>
                  <Link to={`/inventory/${item.id}`} className={`${styles.actionBtn} ${styles.actionLink}`}>👁️</Link>
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