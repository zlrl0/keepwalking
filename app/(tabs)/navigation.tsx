import { Picker } from '@react-native-picker/picker';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { buildings } from '../../functions/src/data/buildings';

export default function HomeScreen() {
  const router = useRouter();
  const [from, setFrom] = useState(buildings[0].name);
  const [to, setTo] = useState(buildings[1].name);

  const handleStart = () => {
    router.push({
      pathname: '/route-select',
      params: { from, to },
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>출발지를 선택하세요</Text>
      <Picker
        selectedValue={from}
        onValueChange={(itemValue) => setFrom(itemValue)}
        style={styles.picker}
      >
        {buildings.map((b) => (
          <Picker.Item key={b.name} label={b.name} value={b.name} />
        ))}
      </Picker>

      <Text style={styles.title}>도착지를 선택하세요</Text>
      <Picker
        selectedValue={to}
        onValueChange={(itemValue) => setTo(itemValue)}
        style={styles.picker}
      >
        {buildings.map((b) => (
          <Picker.Item key={b.name} label={b.name} value={b.name} />
        ))}
      </Picker>

      <Pressable style={styles.button} onPress={handleStart}>
        <Text style={styles.buttonText}>경로 시작</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    paddingHorizontal: 20,
    backgroundColor: '#F9F9F9',
  },
  title: {
    fontSize: 16,
    marginVertical: 10,
    fontWeight: 'bold',
  },
  picker: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#007AFF',
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
