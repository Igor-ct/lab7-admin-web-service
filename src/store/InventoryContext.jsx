import { createContext, useContext, useState, useEffect } from 'react';
import { inventoryApi } from '../services/inventoryApi'; 

const InventoryContext = createContext();

export const useInventory = () => useContext(InventoryContext);

export const InventoryProvider = ({ children }) => {
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null); 

  const fetchItems = async () => {
    setIsLoading(true);
    setError(null);
    let attempts = 3; 

    while (attempts > 0) {
      try {
        const data = await inventoryApi.getAllItems();
        
        const processedData = data.map(item => ({
          ...item,
          stock: Number(item.stock),
          price: Number(item.price),
          status: Number(item.stock) === 0 ? 'Out of Stock' : (Number(item.stock) <= 5 ? 'Low Stock' : 'In Stock')
        }));

        setItems(processedData);
        setIsLoading(false);
        return; 
      } catch (err) {
        attempts--;
        console.warn(`Запит впав. Залишилось спроб: ${attempts}`);
        
        if (attempts === 0) {
          console.error("Critical Error GET /inventory:", err);
          setError("Не вдалося завантажити товари після декількох спроб. Перевірте з'єднання.");
          setIsLoading(false);
        } else {
          await new Promise(res => setTimeout(res, 1000));
        }
      }
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
      console.error('Error POST /register:', err);
      return { success: false, message: err.message };
    }
  };

  const updateItemText = async (id, textData) => {
    try {
      await inventoryApi.updateItemText(id, textData);
      await fetchItems(); 
      return { success: true };
    } catch (err) {
      return { success: false, message: err.message };
    }
  };

  const updateItemPhoto = async (id, file) => {
    const formData = new FormData();
    formData.append('photo', file);
    try {
      await inventoryApi.updateItemPhoto(id, formData);
      await fetchItems(); 
      return { success: true };
    } catch (err) {
      return { success: false, message: err.message };
    }
  };

  const deleteItem = async (id) => {
  try {
    await inventoryApi.deleteItem(id);
    await fetchItems(); 
    return { success: true };
  } catch (err) {
    console.error("Error delete:", err);
    return { success: false, message: err.message };
  }
};

  return (
    <InventoryContext.Provider value={{ items, isLoading, error, fetchItems, addItem, updateItemText, updateItemPhoto, deleteItem }}>
      {children}
    </InventoryContext.Provider>
  );
};