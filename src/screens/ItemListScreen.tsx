// src/screens/ItemListScreen.tsx
import React, { useEffect, useState } from 'react';
import { View, FlatList, StyleSheet, Button, Text, TouchableOpacity } from 'react-native';
import { getItems, deleteItem } from '../database/AsyncStorage';
import { useIsFocused } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';

interface Item {
  id: string;
  productName: string;
  expiryDate: string;
}

const ItemListScreen = ({ navigation }: { navigation: any }) => {
  const [items, setItems] = useState<Item[]>([]);
  const isFocused = useIsFocused();

  // Helper function to calculate days remaining
  const getDaysRemaining = (expiryDate: string) => {
    const today = new Date();
    const [year, month, day] = expiryDate.split('-').map(Number);
    const expDate = new Date(year, month - 1, day); // months are 0-indexed
    
    // Reset time components to midnight
    today.setHours(0, 0, 0, 0);
    expDate.setHours(0, 0, 0, 0);
    
    const diffTime = expDate.getTime() - today.getTime();
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays < 0) return 'Expired';
    return diffDays === 0 ? 'Expired' : `${diffDays} day${diffDays !== 1 ? 's' : ''} remaining`;
  };

  useEffect(() => {
    if (isFocused) {
      fetchItems();
    }
  }, [isFocused]);

  const fetchItems = async () => {
    const items = await getItems();
    setItems(items);
  };

  const handleDelete = async (id: string) => {
    setItems(prevItems => prevItems.filter(item => item.id !== id));
    await deleteItem(id);
  };

  const renderItem = ({ item }: { item: Item }) => (
    <View style={styles.item}>
      <Text style={styles.productName}>{item.productName}</Text>
      <Text>
        Expiry Date: {item.expiryDate} - {getDaysRemaining(item.expiryDate)}
      </Text>
      <TouchableOpacity onPress={() => handleDelete(item.id)} style={styles.deleteButton}>
        <Icon name="delete" size={24} color="#ff0000" />
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <Button title="Add Item" onPress={() => navigation.navigate('AddItem')} />
      
      <FlatList
        data={items}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

// Keep the same styles as before
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  item: {
    padding: 16,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    backgroundColor: '#fff',
  },
  productName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
  },
  deleteButton: {
    position: 'absolute',
    right: 16,
    top: 16,
  },
});

export default ItemListScreen;