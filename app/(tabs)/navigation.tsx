// app/home.tsx
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';

export default function HomeScreen() {
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.label}>출발지</Text>
      <TextInput style={styles.input} value={from} onChangeText={setFrom} placeholder="예: 서울" />

      <Text style={styles.label}>도착지</Text>
      <TextInput style={styles.input} value={to} onChangeText={setTo} placeholder="예: 부산" />

      <Pressable
        style={styles.button}
        onPress={() =>
          router.push({
            pathname: '/route-select',
            params: { from, to },
          })
        }
      >
        <Text style={styles.buttonText}>START</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 20, backgroundColor: '#fff' },
  label: { fontSize: 16, marginVertical: 8 },
  input: { borderWidth: 1, padding: 12, borderRadius: 8 },
  button: { backgroundColor: '#FF6B81', marginTop: 20, padding: 16, borderRadius: 10 },
  buttonText: { color: '#fff', textAlign: 'center', fontWeight: 'bold' },
});
