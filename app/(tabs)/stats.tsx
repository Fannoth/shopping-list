import { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from 'expo-router';
import { useCallback } from 'react';

export default function StatsScreen() {
  const [totalSpent, setTotalSpent] = useState<number>(0);
  const [purchasedCount, setPurchasedCount] = useState<number>(0);

  const fetchStats = async () => {
    const storedProducts = await AsyncStorage.getItem('shoppingList');
    if (storedProducts) {
      const products = JSON.parse(storedProducts);
      const spent = products
        .filter((p: any) => p.purchased)
        .reduce((sum: number, p: any) => sum + p.price, 0);
      setTotalSpent(spent);
      setPurchasedCount(products.filter((p: any) => p.purchased).length);
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchStats();
    }, [])
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>📊 Statystyki zakupów</Text>
      <Text style={styles.stat}>💰 Wydano łącznie: {totalSpent.toFixed(2)} zł</Text>
      <Text style={styles.stat}>🛍️ Kupione produkty: {purchasedCount}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#f4f4f4' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 10 },
  stat: { fontSize: 18, marginVertical: 5 },
});
