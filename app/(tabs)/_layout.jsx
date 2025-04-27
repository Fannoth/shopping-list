import { Tabs } from 'expo-router';
import { Platform } from 'react-native';
import { HapticTab } from '../../components/HapticTab';
import { IconSymbol } from '../../components/ui/IconSymbol';
import TabBarBackground from '../../components/ui/TabBarBackground';
import { Colors } from '../../constants/Colors';
import { useColorScheme } from '../../hooks/useColorScheme';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme].primary,
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarBackground: TabBarBackground,
        tabBarStyle: Platform.select({ ios: { position: 'absolute' }, default: {} }),
      }}
    >
      <Tabs.Screen 
        name="index" 
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => <IconSymbol name="house.fill" color={color} size={24}/>
        }} 
      />
      <Tabs.Screen 
        name="add" 
        options={{
          title: 'Dodaj',
          tabBarIcon: ({ color }) => <IconSymbol name="plus.circle.fill" color={color} size={24}/>
        }} 
      />
      <Tabs.Screen 
        name="stats" 
        options={{
          title: 'Statystyki',
          tabBarIcon: ({ color }) => <IconSymbol name="chart.bar.fill" color={color} size={24}/>
        }} 
      />
      <Tabs.Screen 
        name="filter" 
        options={{
          title: 'Filtruj',
          tabBarIcon: ({ color }) => <IconSymbol name="line.horizontal.3.decrease.circle.fill" color={color} size={24}/>
        }} 
      />
      <Tabs.Screen 
        name="search" 
        options={{
          title: 'Szukaj',
          tabBarIcon: ({ color }) => <IconSymbol name="magnifyingglass.circle.fill" color={color} size={24}/>
        }} 
      />
    </Tabs>
  );
}
