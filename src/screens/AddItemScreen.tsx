// src/screens/AddItemScreen.tsx
import React, { useState } from 'react';
import { View, TextInput, StyleSheet, Text, TouchableOpacity } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { saveItem } from '../database/AsyncStorage';
import Icon from 'react-native-vector-icons/MaterialIcons';

const CUSTOM_BLUE = '#6200ee';

const AddItemScreen = ({ navigation }: { navigation: any }) => {
  const [productName, setProductName] = useState('');
  const [expiryDate, setExpiryDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);

  const handleAddItem = async () => {
    if (!productName || !expiryDate) {
      alert('Please fill in all fields');
      return;
    }

    const newItem = {
      id: Date.now().toString(),
      productName,
      expiryDate: expiryDate.toISOString().split('T')[0],
    };

    await saveItem(newItem);
    navigation.goBack();
  };

  const onDateChange = (event: any, selectedDate?: Date) => {
    setShowDatePicker(false);
    if (selectedDate) {
      setExpiryDate(selectedDate);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Product Name</Text>
      <TextInput
        placeholder="Enter product name"
        value={productName}
        onChangeText={setProductName}
        style={styles.input}
        placeholderTextColor="#999"
      />

      <Text style={styles.label}>Expiry Date</Text>
      <TouchableOpacity onPress={() => setShowDatePicker(true)} style={styles.dateButton}>
        <Text style={styles.dateButtonText}>{expiryDate.toDateString()}</Text>
      </TouchableOpacity>

      {showDatePicker && (
        <DateTimePicker
          value={expiryDate}
          mode="date"
          display="default"
          onChange={onDateChange}
        />
      )}

      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={handleAddItem} style={styles.addButton}>
          <Text style={styles.addButtonText}>Add Item</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 16,
    padding: 8,
    borderRadius: 4,
    backgroundColor: '#fff',
    color: '#000',
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
    fontWeight: 'bold',
    color: '#000',
  },
  dateButton: {
    backgroundColor: CUSTOM_BLUE,
    padding: 10,
    borderRadius: 4,
    alignItems: 'center',
    marginBottom: 16,
  },
  dateButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  addButton: {
    backgroundColor: CUSTOM_BLUE,
    padding: 10,
    borderRadius: 4,
    alignItems: 'center',
  },
  addButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  buttonContainer: {
    marginTop: 20,
  },
});

export default AddItemScreen;