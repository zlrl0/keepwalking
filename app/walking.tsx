import { useRouter } from 'expo-router';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';

export default function WalkingScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      {/* 지도와 경로 이미지 */}
      <Image source={require('../assets/images/map_line.jpg')} style={styles.map} resizeMode="cover" />

      {/* 예측 정보 */}
      <View style={styles.infoBox}>
        <Text style={styles.label}>🕐 80미터 도착 예상</Text>
        <Text style={styles.detail}>도보: 0.7 km · 8분</Text>
        <Text style={styles.detail}>리워드: 27원</Text>
      </View>

      {/* 종료 버튼 */}
      <Pressable
        style={({ pressed }) => [styles.button, pressed && { opacity: 0.8 }]}
        onPress={() => router.push('end' as const)}
      >
        <Text style={styles.buttonText}>종료</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E6F4EE',
    alignItems: 'center',
    paddingTop: 60,
  },
  map: {
    width: '90%',
    height: 400,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: '#D8D8D8',
    marginBottom: 24,
  },
  infoBox: {
    backgroundColor: '#fff',
    padding: 20,
    width: '85%',
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 30,
    elevation: 2,
  },
  label: {
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 6,
    color: '#333',
  },
  detail: {
    fontSize: 15,
    color: '#555',
    marginBottom: 4,
  },
  button: {
    backgroundColor: '#888',
    paddingVertical: 12,
    paddingHorizontal: 80,
    borderRadius: 16,
  },
  buttonText: {
    fontSize: 17,
    color: '#fff',
    fontWeight: 'bold',
  },
});