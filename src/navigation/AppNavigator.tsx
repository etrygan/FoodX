// src/navigation/AppNavigator.tsx
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ItemListScreen from '../screens/ItemListScreen';
import AddItemScreen from '../screens/AddItemScreen';

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="ItemList"
          component={ItemListScreen}
          options={{ title: 'Food Expiry Tracker' }}
        />
        <Stack.Screen
          name="AddItem"
          component={AddItemScreen}
          options={{ title: 'Add Item' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;