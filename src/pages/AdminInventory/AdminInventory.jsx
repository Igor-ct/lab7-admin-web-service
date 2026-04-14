import InventoryTable from '../../components/inventory/InventoryTable/InventoryTable'; 

function AdminInventory() {
  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2>Inventory Management</h2>
        <button style={{ padding: '0.5rem 1rem', background: '#3498db', color: 'white', border: 'none', borderRadius: '4px' }}>
          + Add Item
        </button>
      </div>
      
      <InventoryTable />
    </div>
  );
}

export default AdminInventory;