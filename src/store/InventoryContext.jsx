import { createContext, useContext, useState, useEffect } from 'react';
import { inventoryApi } from '../services/inventoryApi'; 

const InventoryContext = createContext();

export const useInventory = () => useContext(InventoryContext);

export const InventoryProvider = ({ children }) => {
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchItems = async () => {
    setIsLoading(true);
    try {
      const data = await inventoryApi.getAllItems();
      
      const processedData = data.map(item => ({
        ...item,
        stock: Number(item.stock),
        price: Number(item.price),
        status: Number(item.stock) === 0 ? 'Out of Stock' : (Number(item.stock) <= 5 ? 'Low Stock' : 'In Stock')
      }));

      setItems(processedData);
    } catch (err) {
      console.error("Error GET /inventory:", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const addItem = async (formData) => {
    try {
      await inventoryApi.createItem(formData);
      
      await fetchItems(); 
      return { success: true };
    } catch (err) {
      console.error('Помилка POST /register:', err);
      return { success: false, message: err.message };
    }
  };

  return (
    <InventoryContext.Provider value={{ items, isLoading, addItem, fetchItems }}>
      {children}
    </InventoryContext.Provider>
  );
};