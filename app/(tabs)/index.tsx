import React, { FC, useState, useEffect, useCallback } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { SectionList, StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { useRouter, useFocusEffect } from 'expo-router';
import { fetchMyProducts, togglePurchased, deleteProduct } from '@/services/productsServices';
import { Product } from '@/constants/types';
import { Button } from '../../components/Button';

const HomeScreen: FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const router = useRouter();

  const load = async () => setProducts(await fetchMyProducts() as Product[]);
  useEffect(() => { load(); }, []);
  useFocusEffect(
    useCallback(() => {
      load();
    }, [])
  );

  const sections = [
    { title: '🛒 Do kupienia', data: products.filter(p => !p.purchased) },
    { title: '✅ Kupione', data: products.filter(p => p.purchased) }
  ];

  return (
    <SafeAreaView style={styles.wrapper}>
      <View style={styles.container}>
        <Button title="+ Dodaj Produkt" onPress={() => router.push('/add')} />
        <Button title="🔍 Wyszukaj w bazie" onPress={() => router.push('/search')} />

        <SectionList
          sections={sections}
          keyExtractor={item => item.id}
          renderSectionHeader={({ section: { title } }) => <Text style={styles.header}>{title}</Text>}
          renderItem={({ item }) => (
            <View style={styles.itemCard}>
              <TouchableOpacity onPress={() => togglePurchased(item.id, item.purchased).then(load)}>
                <Text style={[styles.itemText, item.purchased && styles.purchased]}>
                  {item.name} – {item.price.toFixed(2)} zł ({item.store})
                </Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.deleteBtn} onPress={() => deleteProduct(item.id).then(load)}>
                <Text style={styles.deleteTxt}>Usuń</Text>
              </TouchableOpacity>
            </View>
          )}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  wrapper: { flex: 1, backgroundColor: '#F4F4F8' },
  container: { flex: 1, padding: 20 },
  header: { fontSize: 20, fontWeight: '700', marginTop: 16, color: '#333' },
  itemCard: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    backgroundColor: '#fff', borderRadius: 12, padding: 16, marginVertical: 8,
    shadowColor: '#000', shadowOpacity: 0.1, shadowRadius: 6, elevation: 3
  },
  itemText: { fontSize: 16, color: '#333' },
  purchased: { textDecorationLine: 'line-through', color: 'gray' },
  deleteBtn: { backgroundColor: '#FF4D4F', paddingVertical: 6, paddingHorizontal: 12, borderRadius: 8 },
  deleteTxt: { color: '#fff', fontWeight: '600' }
});

export default HomeScreen;