import { useRouter } from 'expo-router';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';

export default function RouteSelectScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      {/* 지도 배경 */}
      <Image source={require('../assets/images/map-placeholder.png')} style={styles.map} resizeMode="cover" />

      {/* 경로 선택 버튼 */}
      <View style={styles.buttonRow}>
        <Pressable style={styles.routeButton} onPress={() => router.push('/walking')}>
          <Text style={styles.routeButtonText}>최단 거리</Text>
        </Pressable>
        <Pressable style={styles.routeButton} onPress={() => router.push('/walking2')}>
          <Text style={styles.routeButtonText}>힐링 경로</Text>
        </Pressable>
      </View>
      <View style={styles.buttonRow}>
        <Pressable style={styles.routeButton} onPress={() => router.push('/walking2')}>
          <Text style={styles.routeButtonText}>운동 경로</Text>
        </Pressable>
        <Pressable style={styles.routeButton} onPress={() => router.push('/walking')}>
          <Text style={styles.routeButtonText}>최소 시간</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E0F0E9',
    alignItems: 'center',
    paddingTop: 60,
  },
  map: {
    width: '90%',
    height: 400,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: '#D8D8D8',
    marginBottom: 30,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '85%',
    marginBottom: 20,
  },
  routeButton: {
    flex: 1,
    backgroundColor: '#fff',
    paddingVertical: 14,
    marginHorizontal: 6,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#ccc',
    alignItems: 'center',
    elevation: 2,
  },
  routeButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
});
