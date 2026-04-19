import { Link } from 'react-router-dom';
import InventoryTable from '../../../components/admin/inventory/InventoryTable/InventoryTable'; 
import styles from './AdminInventory.module.css';

function AdminInventory() {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2>Inventory Management</h2>
        <Link to="/admin/inventory/create" className={styles.addItemBtn}>
          + Add Item
        </Link>
      </div>
      
      <InventoryTable />
    </div>
  );
}

export default AdminInventory;