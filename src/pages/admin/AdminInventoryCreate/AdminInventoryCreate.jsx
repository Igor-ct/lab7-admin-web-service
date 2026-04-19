import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import InventoryForm from '../../../components/admin/inventory/InventoryForm/InventoryForm';
import { useInventory } from '../../../store/InventoryContext'; 
import styles from './AdminInventoryCreate.module.css';
function AdminInventoryCreate() {
  const navigate = useNavigate();
  
  const { addItem } = useInventory();

  const [formData, setFormData] = useState({
    name: '', 
    sku: '',
    price: '',
    stock: '',
    description: '',
    photo: null 
  });

  const [previewUrl, setPreviewUrl] = useState('');

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    
    if (type === 'file') {
      const file = files[0];
      setFormData(prev => ({ ...prev, photo: file }));
      
      if (file) {
        setPreviewUrl(URL.createObjectURL(file));
      } else {
        setPreviewUrl('');
      }
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleCancel = () => {
    navigate('/admin/inventory');
  };

  const calculateStatus = (stockValue) => {
    if (stockValue === '') return { text: 'Enter quantity', color: '#94a3b8', bg: '#f1f5f9' };
    
    const qty = parseInt(stockValue);
    if (qty === 0) return { text: 'Out of Stock', color: '#991b1b', bg: '#fee2e2' };
    if (qty > 0 && qty <= 5) return { text: 'Low Stock', color: '#854d0e', bg: '#fef08a' };
    return { text: 'In Stock', color: '#166534', bg: '#dcfce7' };
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const dataToSend = new FormData();
    dataToSend.append('name', formData.name);
    dataToSend.append('sku', formData.sku);
    dataToSend.append('price', parseFloat(formData.price));
    dataToSend.append('stock', parseInt(formData.stock));
    dataToSend.append('description', formData.description);
    dataToSend.append('status', calculateStatus(formData.stock).text);
    
    if (formData.photo) {
      dataToSend.append('photo', formData.photo);
    }

    console.log('Sending data to Store...');

    const result = await addItem(dataToSend);

    if (result.success) {
      alert('✅ Item successfully created!');
      navigate('/admin/inventory');
    } else {
      alert(`❌ Error creating item: ${result.message}`);
    }
  };

  return (
    <div>
      <div className={styles.container}>
        <Link to="/admin/inventory" className={styles.link}>
          ← Back to Inventory
        </Link>
      </div>

      <InventoryForm 
        formData={formData}
        previewUrl={previewUrl} 
        currentStatus={calculateStatus(formData.stock)}
        onChange={handleChange}
        onSubmit={handleSubmit}
        onCancel={handleCancel}
      />
    </div>
  );
}

export default AdminInventoryCreate;