const BASE_URL = 'http://localhost:5000';

export const inventoryApi = {
  getAllItems: async () => {
    const response = await fetch(`${BASE_URL}/inventory`);
    if (!response.ok) throw new Error('Error loading data');
    return await response.json();
  },

  getItemById: async (id) => {
    const response = await fetch(`${BASE_URL}/inventory/${id}`);
    if (!response.ok) throw new Error('Помилка отримання товару');
    return await response.json();
  },
  createItem: async (formData) => {
    const response = await fetch(`${BASE_URL}/register`, {
      method: 'POST',
      body: formData,
    });
    if (!response.ok) throw new Error('Server error on create');
    return await response.json(); 
  }
};