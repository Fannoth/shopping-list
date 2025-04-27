import { FC, useState, useEffect } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { KeyboardAvoidingView, Platform, FlatList, StyleSheet, Text } from 'react-native';
import { fetchMyProducts } from '../../services/productsServices';
import { Input } from '../../components/Input';
import { Product } from '@/services/firebase.types';

const FilterScreen: FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [query, setQuery] = useState<string>('');

  useEffect(() => {
    (async () => {
      const products = await fetchMyProducts();
      setProducts(products as Product[]);
    })();
  }, []);

  const filtered = products.filter(p =>
    p.name.toLowerCase().includes(query.toLowerCase()) ||
    p.store.toLowerCase().includes(query.toLowerCase()) ||
    p.price.toString().includes(query)
  );

  return (
    <SafeAreaView style={styles.wrapper}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <Input
          placeholder="Filtruj po nazwie, sklepie lub cenie"
          value={query}
          onChangeText={setQuery}
        />
        <FlatList
          data={filtered}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <Text style={styles.item}>
              {item.name} – {item.price.toFixed(2)} zł ({item.store})
            </Text>
          )}
        />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  wrapper: { flex: 1, backgroundColor: '#F4F4F8' },
  container: { flex: 1, padding: 20 },
  item: {
    backgroundColor: '#fff',
    padding: 16,
    marginVertical: 8,
    borderRadius: 12,
    fontSize: 16,
    color: '#333',
    // cienie:
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
});

export default FilterScreen;
