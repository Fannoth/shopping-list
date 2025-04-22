import { useState, useEffect } from 'react';
import { View, SectionList, Text, TouchableOpacity, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter, useFocusEffect } from 'expo-router';
import { Product } from '../../constants/types';
import { useCallback } from 'react';

export default function HomeScreen() {
  const [products, setProducts] = useState<Product[]>([]);
  const router = useRouter();

  const loadProducts = async () => {
    const storedProducts = await AsyncStorage.getItem('shoppingList');
    if (storedProducts) {
      setProducts(JSON.parse(storedProducts) as Product[]);
    }
  };

  useEffect(() => {
    loadProducts();
  }, []);

  useFocusEffect(
    useCallback(() => {
      loadProducts();
    }, [])
  );

  const saveProducts = async (updatedProducts: Product[]) => {
    setProducts(updatedProducts);
    await AsyncStorage.setItem('shoppingList', JSON.stringify(updatedProducts));
  };

  const togglePurchased = async (id: string) => {
    const updatedProducts = products.map((p) =>
      p.id === id ? { ...p, purchased: !p.purchased } : p
    );
    saveProducts(updatedProducts);
  };

  const deleteProduct = async (id: string) => {
    const updatedProducts = products.filter((p) => p.id !== id);
    saveProducts(updatedProducts);
  };

  const sections = [
    { title: '🛒 Do kupienia', data: products.filter((p) => !p.purchased) },
    { title: '✅ Kupione', data: products.filter((p) => p.purchased) },
  ];

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.addButton} onPress={() => router.push('/add')}>
        <Text style={styles.addButtonText}>+ Dodaj Produkt</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.apiButton} onPress={() => router.push('/search')}>
        <Text style={styles.apiButtonText}>🔍 Wyszukaj w bazie</Text>
      </TouchableOpacity>

      <SectionList
        sections={sections}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <TouchableOpacity onPress={() => togglePurchased(item.id)}>
              <Text style={item.purchased ? styles.purchased : styles.text}>
                {item.name} - {item.price} zł ({item.store})
              </Text>
            </TouchableOpacity>
            <View style={styles.buttons}>
              <TouchableOpacity style={styles.deleteButton} onPress={() => deleteProduct(item.id)}>
                <Text style={styles.deleteText}>🗑️</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
        renderSectionHeader={({ section: { title } }) => <Text style={styles.header}>{title}</Text>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f4f4f4', padding: 10 },
  header: { fontSize: 20, fontWeight: 'bold', marginTop: 10, color: '#333' },
  item: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 15,
    marginVertical: 5,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3
  },
  text: { fontSize: 18, color: '#333' },
  purchased: { textDecorationLine: 'line-through', color: 'gray', fontSize: 18 },
  buttons: { flexDirection: 'row', gap: 10 },
  deleteButton: { backgroundColor: 'red', padding: 10, borderRadius: 5 },
  deleteText: { color: 'white', fontSize: 18 },
  addButton: { backgroundColor: '#007bff', padding: 15, borderRadius: 5, alignItems: 'center', marginBottom: 10 },
  addButtonText: { color: 'white', fontSize: 18, fontWeight: 'bold' },
  apiButton: { backgroundColor: '#28a745', padding: 15, borderRadius: 5, alignItems: 'center', marginBottom: 10 },
  apiButtonText: { color: 'white', fontSize: 18, fontWeight: 'bold' },
});
