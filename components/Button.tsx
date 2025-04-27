import { TouchableOpacity, Text, StyleSheet, TouchableOpacityProps } from 'react-native';
import { Colors } from '../constants/Colors';

export function Button({ title, ...rest }: TouchableOpacityProps & { title: string }) {
  return (
    <TouchableOpacity style={styles.btn} {...rest}>
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  btn: {
    backgroundColor: Colors.light.primary,
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginVertical: 8,
  },
  text: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
