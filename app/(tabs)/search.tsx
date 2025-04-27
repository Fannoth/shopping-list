import React, { FC, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { KeyboardAvoidingView, Platform, StyleSheet, FlatList, View, Text, Image, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Input } from '@/components/Input';
import { Button } from '@/components/Button';
import { searchProducts } from '@/services/foodApi';
import { addProduct } from '@/services/productsServices';
import { Product } from '@/constants/types';
import { useRouter } from 'expo-router';

const SearchScreen: FC = () => {
  const [query, setQuery] = useState<string>('');
  const [results, setResults] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();

  const handleSearch = async () => {
    if (!query) return;
    setLoading(true);
    const products = await searchProducts(query);
    setResults(products);
    setLoading(false);
  };

  const handleAdd = async (item: Product) => {
    await addProduct({ name: item.name, price: item.price, store: item.store });
    router.replace('/');
  };

  return (
    <SafeAreaView style={styles.wrapper}>
      <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <Input placeholder="Wpisz nazwę produktu..." value={query} onChangeText={setQuery} />
        <Button title="Szukaj" onPress={handleSearch} />
        {loading && <ActivityIndicator size="large" style={styles.loader} />}

        <FlatList
          data={results}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity style={styles.card} onPress={() => handleAdd(item)}>
              {item.image && <Image source={{ uri: item.image }} style={styles.img} />}
              <View style={styles.details}>
                <Text style={styles.name}>{item.name}</Text>
                <Text style={styles.sub}>{item.price.toFixed(2)} zł – {item.store}</Text>
              </View>
            </TouchableOpacity>
          )}
        />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  wrapper: { flex: 1, backgroundColor: '#F4F4F8' },
  container: { flex: 1, padding: 20 },
  loader: { marginVertical: 20 },
  card: {
    flexDirection: 'row', alignItems: 'center', backgroundColor: '#fff', borderRadius: 12,
    padding: 16, marginVertical: 8, shadowColor: '#000', shadowOpacity: 0.1, shadowRadius: 6, elevation: 3
  },
  img: { width: 50, height: 50, borderRadius: 8, marginRight: 12 },
  details: { flex: 1 },
  name: { fontSize: 16, fontWeight: '600', color: '#333' },
  sub: { fontSize: 14, color: '#666', marginTop: 4 }
});

export default SearchScreen;