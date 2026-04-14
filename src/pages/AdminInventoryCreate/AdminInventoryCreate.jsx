import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import InventoryForm from '../../components/inventory/InventoryForm/InventoryForm';

function AdminInventoryCreate() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    sku: '',
    price: '',
    stock: '',
    description: '',
    photo: '' 
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleCancel = () => {
    navigate('/inventory');
  };

  const calculateStatus = (stockValue) => {
    if (stockValue === '') return { text: 'Enter quantity', color: '#94a3b8', bg: '#f1f5f9' };
    
    const qty = parseInt(stockValue);
    if (qty === 0) return { text: 'Out of Stock', color: '#991b1b', bg: '#fee2e2' };
    if (qty > 0 && qty <= 5) return { text: 'Low Stock', color: '#854d0e', bg: '#fef08a' };
    return { text: 'In Stock', color: '#166534', bg: '#dcfce7' };
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const finalData = {
      ...formData,
      status: calculateStatus(formData.stock).text
    };

    console.log('Sending to DB:', finalData);
    
    setTimeout(() => {
      alert('✅ Item successfully created!');
      navigate('/inventory');
    }, 800);
  };

  return (
    <div>
      <div style={{ marginBottom: '1.5rem', maxWidth: '800px', margin: '0 auto 1.5rem auto' }}>
        <Link to="/inventory" style={{ color: '#64748b', textDecoration: 'none', fontWeight: '500' }}>
          ← Back to Inventory
        </Link>
      </div>

      <InventoryForm 
        formData={formData}
        currentStatus={calculateStatus(formData.stock)}
        onChange={handleChange}
        onSubmit={handleSubmit}
        onCancel={handleCancel}
      />
    </div>
  );
}

export default AdminInventoryCreate;