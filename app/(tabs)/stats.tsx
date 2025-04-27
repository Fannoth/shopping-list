import React, { FC, useState, useEffect, useCallback } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { View, Text, StyleSheet } from 'react-native';
import { fetchMyProducts } from '@/services/productsServices';
import { Product } from '@/services/firebase.types';
import { useFocusEffect } from 'expo-router';

const StatsScreen: FC = () => {
  const [total, setTotal] = useState(0);
  const [count, setCount] = useState(0);

  const fetchStats = async () => {
    const prods = await fetchMyProducts() as Product[];
    const bought = prods.filter(p => p.purchased);
    setCount(bought.length);
    setTotal(bought.reduce((s,p) => s + p.price, 0));
  };

  useFocusEffect(
    useCallback(() => {
      fetchStats();
    }, [])
  );

  return (
    <SafeAreaView style={styles.wrapper}>
      <View style={styles.container}>
        <Text style={styles.title}>📊 Statystyki zakupów</Text>
        <View style={styles.card}>
          <Text style={styles.stat}>💰 Wydano: {total.toFixed(2)} zł</Text>
          <Text style={styles.stat}>🛍 Kupione: {count}</Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  wrapper: { flex: 1, backgroundColor: '#F4F4F8' },
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
  title: { fontSize: 24, fontWeight: '700', marginBottom: 16, color: '#333' },
  card: {
    backgroundColor: '#fff', padding: 20, borderRadius: 12, width: '100%',
    shadowColor: '#000', shadowOpacity: 0.1, shadowRadius: 6, elevation: 3
  },
  stat: { fontSize: 18, marginVertical: 4, color: '#555' }
});

export default StatsScreen;