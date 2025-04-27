import { TextInput, StyleSheet, TextInputProps } from 'react-native';
import { Colors } from '../constants/Colors';

export function Input(props: TextInputProps) {
  return <TextInput placeholderTextColor={Colors.light.text} style={styles.input} {...props} />;
}

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderColor: Colors.light.primary,
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
    backgroundColor: '#fff',
  },
});
