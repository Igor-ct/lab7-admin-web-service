import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useInventory } from '../../store/InventoryContext';
import InventoryEdit from '../../components/inventory/InventoryEdit/InventoryEdit';

function AdminInventoryEdit() {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const { items, updateItemText, updateItemPhoto } = useInventory();
  
  const [item, setItem] = useState(null);

  useEffect(() => {
    const found = items.find(i => i.id === id);
    if (found) setItem(found);
  }, [id, items]);

  const handleSaveText = async (textData) => {
    const res = await updateItemText(id, textData);
    if (res.success) {
      alert("✅ Text updated!");
    } else {
      alert("❌ Error: " + res.message);
    }
  };

  const handleSavePhoto = async (file) => {
    const res = await updateItemPhoto(id, file);
    if (res.success) {
      alert("✅ Photo updated!");
    } else {
      alert("❌ Error: " + res.message);
    }
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