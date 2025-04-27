import React, { FC, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { KeyboardAvoidingView, Platform, StyleSheet, Text, Alert } from 'react-native';
import { Input } from '@/components/Input';
import { Button } from '@/components/Button';
import { useRouter } from 'expo-router';
import { signUp } from '@/services/authServices';

const RegisterScreen: FC = () => {
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const router = useRouter();

  const handleSignUp = async () => {
    try {
      await signUp(email.trim(), password, name);
      router.replace('/');
    } catch (e: any) {
      Alert.alert('Błąd rejestracji', e.message);
    }
  };

  return (
    <SafeAreaView style={styles.wrapper}>
      <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <Text style={styles.title}>📝 Rejestracja</Text>
        <Input placeholder="Imię" value={name} onChangeText={setName} />
        <Input placeholder="Email" value={email} onChangeText={setEmail} autoCapitalize="none" />
        <Input placeholder="Hasło" value={password} onChangeText={setPassword} secureTextEntry />
        <Button title="Zarejestruj" onPress={handleSignUp} />
        <Text style={styles.switch} onPress={() => router.push('/login')}>Masz już konto? Zaloguj się</Text>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  wrapper: { flex: 1, backgroundColor: '#F4F4F8' },
  container: { flex: 1, padding: 20, justifyContent: 'center' },
  title: { fontSize: 24, fontWeight: '700', marginBottom: 20, color: '#333', textAlign: 'center' },
  switch: { marginTop: 16, textAlign: 'center', color: '#4F46E5' }
});

export default RegisterScreen;
