import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Image, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';

export default function HomeScreen() {
  const router = useRouter();
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');

  return (
    <View style={styles.container}>
      {/* 지도 이미지 영역 */}
      <View style={styles.mapContainer}>
        <Image source={require('../../assets/images/map-placeholder.png')} style={styles.map} resizeMode="cover" />
      </View>

      {/* 출발/도착 입력 */}
      <View style={styles.inputGroup}>
        <Text style={styles.label}>출발  :</Text>
        <TextInput
          style={styles.input}
          placeholder="출발지를 입력하세요"
          value={from}
          onChangeText={setFrom}
        />
        <Text style={styles.label}>도착  :</Text>
        <TextInput
          style={styles.input}
          placeholder="도착지를 입력하세요"
          value={to}
          onChangeText={setTo}
        />
      </View>

      {/* START 버튼 */}
      <Pressable
        style={({ pressed }) => [styles.button, pressed && { opacity: 0.8 }]}
        onPress={() => router.push("route-select" as const)}
      >
        <Text style={styles.buttonText}>START</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E0F0E9',
    alignItems: 'center',
    paddingTop: 60,
    paddingBottom: 40,
  },
  mapContainer: {
    width: '90%',
    height: 300,
    borderRadius: 16,
    overflow: 'hidden',
    marginBottom: 20,
    borderWidth: 2,
    borderColor: '#D8D8D8',
  },
  map: {
    width: '100%',
    height: '100%',
  },
  inputGroup: {
    width: '85%',
    marginBottom: 20,
  },
  label: {
    alignSelf: 'flex-start',
    marginBottom: 6,
    marginTop: 14,
    fontSize: 16,
    color: '#333',
    fontWeight: '600',
  },
  input: {
    width: '100%',
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    padding: 14,
    fontSize: 16,
    marginBottom: 8,
  },
  button: {
    marginTop: 24,
    backgroundColor: '#FF6B81',
    paddingVertical: 14,
    paddingHorizontal: 100,
    borderRadius: 16,
    elevation: 3,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    textAlign: 'center',
    fontWeight: 'bold',
    letterSpacing: 1,
  },
});