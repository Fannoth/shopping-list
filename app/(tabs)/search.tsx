import { useState } from 'react';
import { View, TextInput, Button, FlatList, Text, TouchableOpacity, Image, StyleSheet, ActivityIndicator } from 'react-native';
import { searchProducts } from '../../services/foodApi';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import { Product } from '../../constants/types';

export default function SearchScreen() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSearch = async () => {
    if (!query) return;
    setLoading(true);
    const products = await searchProducts(query);
    setResults(products);
    setLoading(false);
  };

  const addToShoppingList = async (product: Product) => {
    const storedProducts = await AsyncStorage.getItem('shoppingList');
    const products: Product[] = storedProducts ? JSON.parse(storedProducts) : [];
    const updatedProducts = [product, ...products];

    await AsyncStorage.setItem('shoppingList', JSON.stringify(updatedProducts));
    router.push('/');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🔍 Wyszukaj produkt</Text>
      <TextInput
        style={styles.input}
        placeholder="Wpisz nazwę produktu..."
        value={query}
        onChangeText={setQuery}
      />
      <Button title="Szukaj" onPress={handleSearch} />

      {loading ? <ActivityIndicator size="large" color="#007bff" style={{ marginTop: 20 }} /> : null}

      <FlatList
        data={results}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.product} onPress={() => addToShoppingList(item)}>
            <Image source={{ uri: item.image }} style={styles.image} />
            <View style={styles.productDetails}>
              <Text style={styles.productText}>{item.name}</Text>
              <Text style={styles.productSubtext}>{item.price} zł | {item.store}</Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 10 },
  input: { borderWidth: 1, padding: 8, marginBottom: 10, backgroundColor: '#fff' },
  product: { flexDirection: 'row', alignItems: 'center', padding: 10, backgroundColor: '#f9f9f9', marginVertical: 5, borderRadius: 5 },
  image: { width: 50, height: 50, borderRadius: 5, marginRight: 10 },
  productDetails: { flex: 1 },
  productText: { fontSize: 18, fontWeight: 'bold' },
  productSubtext: { fontSize: 14, color: 'gray' },
});
