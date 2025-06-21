import { useLocalSearchParams } from 'expo-router';
import React, { useState } from 'react';
import { Platform, Pressable, StyleSheet, Text, View } from 'react-native';
import KakaoMapWebView from '../components/KakaoMapWebView';

export default function RouteSelectScreen() {
  const { from, to } = useLocalSearchParams<{ from?: string; to?: string }>();
  const [selectedRoute, setSelectedRoute] = useState<string | null>(null);

  const handleRoutePress = (type: string) => {
    if (!from || !to) {
      alert('출발지와 도착지를 입력해주세요.');
      return;
    }

    if (Platform.OS === 'web') {
      // 웹에서는 새 창 또는 리디렉션
      window.location.href = `https://keepwalking-a4728.web.app/map.html?from=${encodeURIComponent(from)}&to=${encodeURIComponent(to)}&type=${type}`;
    } else {
      setSelectedRoute(type);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>경로를 선택하세요</Text>

      <View style={styles.buttonRow}>
        <Pressable style={styles.routeButton} onPress={() => handleRoutePress('shortest')}>
          <Text style={styles.routeButtonText}>최단 거리</Text>
        </Pressable>
        <Pressable style={styles.routeButton} onPress={() => handleRoutePress('healing')}>
          <Text style={styles.routeButtonText}>힐링 경로</Text>
        </Pressable>
      </View>

      <View style={styles.buttonRow}>
        <Pressable style={styles.routeButton} onPress={() => handleRoutePress('exercise')}>
          <Text style={styles.routeButtonText}>운동 경로</Text>
        </Pressable>
        <Pressable style={styles.routeButton} onPress={() => handleRoutePress('fastest')}>
          <Text style={styles.routeButtonText}>최소 시간</Text>
        </Pressable>
      </View>

      {selectedRoute && Platform.OS !== 'web' && (
        <KakaoMapWebView from={from!} to={to!} type={selectedRoute} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E0F0E9',
    alignItems: 'center',
    paddingTop: 40,
    paddingBottom: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '85%',
    marginBottom: 14,
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
