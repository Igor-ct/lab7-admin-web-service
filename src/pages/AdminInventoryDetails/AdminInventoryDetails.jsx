import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useInventory } from '../../store/InventoryContext';
import { inventoryApi } from '../../services/inventoryApi';
import InventoryDetails from '../../components/inventory/InventoryDetails/InventoryDetails'; 

function AdminInventoryDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { items } = useInventory();
  
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getData = async () => {
      setLoading(true);
      try {
        const found = items.find(i => i.id === id);
        if (found) {
          setItem(found);
        } else {
          const data = await inventoryApi.getItemById(id);
          setItem(data);
        }
      } catch (err) {
        setError("Product is not found");
      } finally {
        setLoading(false);
      }
    };
    getData();
  }, [id, items]);

  const handleClose = () => navigate('/inventory');

  return (
    <InventoryDetails 
      item={item} 
      isLoading={loading} 
      error={error} 
      onClose={handleClose} 
    />
  );
}

export default AdminInventoryDetails;