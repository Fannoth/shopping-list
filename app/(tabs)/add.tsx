import { useState } from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import { Product } from '@/constants/types';

export default function AddProductScreen() {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [store, setStore] = useState('');
  const router = useRouter();

  const addProduct = async () => {
    if (!name || !price || !store) return;
    
    const newProduct: Product = { 
      id: Date.now().toString(), 
      name, 
      price: parseFloat(price), 
      store, 
      purchased: false 
    };

    const storedProducts = await AsyncStorage.getItem('shoppingList');
    const products: Product[] = storedProducts ? JSON.parse(storedProducts) : [];

    const updatedProducts = [newProduct, ...products];
    await AsyncStorage.setItem('shoppingList', JSON.stringify(updatedProducts));

    router.back();
  };

  return (
    <View style={styles.container}>
      <TextInput placeholder="Nazwa produktu" style={styles.input} onChangeText={setName} />
      <TextInput placeholder="Cena" style={styles.input} keyboardType="numeric" onChangeText={setPrice} />
      <TextInput placeholder="Sklep" style={styles.input} onChangeText={setStore} />
      <Button title="Dodaj" onPress={addProduct} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  input: { borderWidth: 1, marginBottom: 10, padding: 8 }
});
