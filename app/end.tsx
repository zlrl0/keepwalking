import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';

export default function EndScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      {/* 지도 종료 화면 */}
      <View style={styles.mapContainer}>
        <Image
          source={require('../assets/images/map_line.jpg')}
          style={styles.map}
          resizeMode="cover"
        />
        <View style={styles.overlay}>
          <Text style={styles.overlayText}>길찾기가 종료되었습니다</Text>
        </View>
      </View>

      {/* 다시 시작 버튼 */}
      <Pressable
        style={({ pressed }) => [styles.button, pressed && { opacity: 0.9 }]}
        onPress={() => router.replace('navigation' as const)}
      >
        <Text style={styles.buttonText}>START</Text>
      </Pressable>

      {/* 하단 툴바 */}
      <View style={styles.tabBar}>
        <Ionicons name="home" size={24} color="#444" onPress={() => router.replace('main' as const)} />
        <Ionicons name="map" size={24} color="#999" onPress={() => router.replace('navigation' as const)} />
        <Ionicons name="flame" size={24} color="#999" onPress={() => router.replace('calories' as const)} />
        <Ionicons name="notifications" size={24} color="#999" onPress={() => router.replace('info' as const)}/>
        <Ionicons name="trophy" size={24} color="#999" onPress={() => router.replace('ChallengeScreen' as const)}/>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E7F5F0',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 40,
    paddingBottom: 90,
  },
  mapContainer: {
    width: '88%',
    height: 320,
    borderRadius: 20,
    overflow: 'hidden',
    marginBottom: 32,
    borderWidth: 2,
    borderColor: '#C8D6CF',
    position: 'relative',
  },
  map: {
    width: '100%',
    height: '100%',
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(255,255,255,0.85)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  overlayText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    letterSpacing: 0.5,
  },
  button: {
    backgroundColor: '#FFA6AF',
    width: '80%',
    paddingVertical: 16,
    borderRadius: 18,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 4,
    alignItems: 'center',
    marginBottom: 30,
  },
  buttonText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    letterSpacing: 1.5,
  },
  tabBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 70,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#E7F5F0',
    borderTopWidth: 1,
    borderColor: '#ccc',
    paddingBottom: 10,
  },
});