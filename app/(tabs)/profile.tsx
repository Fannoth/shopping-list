import React, { FC} from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import {Button, StyleSheet, Text } from 'react-native';
import { getAuth,  } from 'firebase/auth';
import {  logout } from '@/services/authServices';

const ProfileScreen: FC = () => {
     const auth = getAuth();
     const user = auth.currentUser;
     const { displayName, email } = user || {};
  
  return (
    <SafeAreaView style={styles.wrapper}>
         <Text style={styles.label}>
            Imię: {displayName ?? 'Brak danych'}
          </Text>
            <Text style={styles.label}>
            E-mail: {email}
          </Text>
            <Button title="Wyloguj" onPress={() => logout()} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
   wrapper: {
    flex: 1,
    backgroundColor: '#F4F4F8',
    padding: 16,
  },
 
  label: {
    fontSize: 16,
    marginBottom: 12,
    color: '#333',
  },
  
});

export default ProfileScreen;