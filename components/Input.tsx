import React from 'react';
import { TextInput, StyleSheet, TextInputProps } from 'react-native';
import { Colors } from '@/constants/Colors';

export const Input: React.FC<TextInputProps> = props => (
  <TextInput
    placeholderTextColor={Colors.light.text}
    style={styles.input}
    {...props}
  />
);

const styles = StyleSheet.create({
  input: {
    backgroundColor: Colors.light.background,  
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 10,
    fontSize: 16,
    color: Colors.light.text,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
});
