// app/add.tsx
import { FC, useState } from 'react';
import { SafeAreaView, KeyboardAvoidingView, Platform, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { addProduct } from '../../services/productsServices';
import { Input } from '../../components/Input';
import { Button } from '../../components/Button';

const AddProductScreen: FC = () => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [store, setStore] = useState('');
  const router = useRouter();

  const handleAdd = async () => {
    if (!name || !price || !store) return;
    await addProduct({ name, price: parseFloat(price), store });
    router.back();
  };

  return (
    <SafeAreaView style={styles.wrapper}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <Input placeholder="Nazwa produktu" value={name} onChangeText={setName} />
        <Input placeholder="Cena" keyboardType="decimal-pad" value={price} onChangeText={setPrice} />
        <Input placeholder="Sklep" value={store} onChangeText={setStore} />
        <Button title="Dodaj produkt" onPress={handleAdd} />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  wrapper: { flex: 1, backgroundColor: '#F4F4F8' },
  container: { flex: 1, padding: 20 },
});

export default AddProductScreen;
