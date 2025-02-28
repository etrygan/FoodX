// src/database/AsyncStorage.ts
import AsyncStorage from '@react-native-async-storage/async-storage';

interface Item {
  id: string;
  productName: string;
  expiryDate: string;
}

const saveItem = async (item: Item) => {
  try {
    const existingItems = await getItems();
    const newItems = [...existingItems, item];
    await AsyncStorage.setItem('items', JSON.stringify(newItems));
  } catch (error) {
    console.log('Error saving item: ', error);
  }
};

const getItems = async (): Promise<Item[]> => {
  try {
    const items = await AsyncStorage.getItem('items');
    return items ? JSON.parse(items) : [];
  } catch (error) {
    console.log('Error fetching items: ', error);
    return [];
  }
};

const deleteItem = async (id: string) => {
  try {
    const existingItems = await getItems();
    const newItems = existingItems.filter((item) => item.id !== id);
    await AsyncStorage.setItem('items', JSON.stringify(newItems));
  } catch (error) {
    console.log('Error deleting item: ', error);
  }
};

export { saveItem, getItems, deleteItem };