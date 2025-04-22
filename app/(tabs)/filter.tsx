import { useState, useEffect } from 'react';
import { View, Text, TextInput, FlatList, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Product } from '@/constants/types';

export default function FilterScreen() {
  const [products, setProducts] = useState<Product[]>([]);
  const [query, setQuery] = useState<string>('');

  useEffect(() => {
    const loadProducts = async () => {
      const storedProducts = await AsyncStorage.getItem('shoppingList');
      if (storedProducts) {
        setProducts(JSON.parse(storedProducts) as Product[]);
      }
    };
    loadProducts();
  }, []);

  const filteredProducts = products.filter((p) =>
    p.name.toLowerCase().includes(query.toLowerCase()) || 
    p.store.toLowerCase().includes(query.toLowerCase()) || 
    p.price.toString().includes(query)
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🔍 Filtrowanie</Text>
      <TextInput 
        style={styles.input} 
        placeholder="Wpisz nazwę, sklep lub cenę"
        value={query}
        onChangeText={setQuery}
      />
      <FlatList
        data={filteredProducts}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Text style={styles.item}>{item.name} - {item.price} zł ({item.store})</Text>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 10 },
  input: { borderWidth: 1, padding: 8, marginBottom: 10, backgroundColor: '#fff' },
  item: { fontSize: 18, marginVertical: 5 },
});
