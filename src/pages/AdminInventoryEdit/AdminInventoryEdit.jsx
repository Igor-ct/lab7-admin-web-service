import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useInventory } from '../../store/InventoryContext';
import { inventoryApi } from '../../services/inventoryApi';
import InventoryEdit from '../../components/inventory/InventoryEdit/InventoryEdit';

function AdminInventoryEdit() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { items, fetchItems } = useInventory();
  const [item, setItem] = useState(null);

  useEffect(() => {
    const found = items.find(i => i.id === id);
    if (found) setItem(found);
  }, [id, items]);

  const handleSaveText = async (textData) => {
    try {
      await inventoryApi.updateItemText(id, textData);
      alert("Text data updated!");
      await fetchItems(); 
    } catch (err) { alert(err.message); }
  };

  const handleSavePhoto = async (file) => {
    const formData = new FormData();
    formData.append('photo', file);
    try {
      await inventoryApi.updateItemPhoto(id, formData);
      alert("Photo updated!");
      await fetchItems();
    } catch (err) { alert(err.message); }
  };

  return (
    <InventoryEdit 
      item={item} 
      onSaveText={handleSaveText}
      onSavePhoto={handleSavePhoto}
      onClose={() => navigate('/inventory')} 
    />
  );
}

export default AdminInventoryEdit;