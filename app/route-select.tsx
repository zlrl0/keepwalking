import { Picker } from '@react-native-picker/picker';
import { useLocalSearchParams } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Platform, Pressable, StyleSheet, Text, View } from 'react-native';
import KakaoMapWebView from '../components/KakaoMapWebView';
import { Building, buildings } from '../functions/src/data/buildings';

export default function RouteSelectScreen() {
  const { from: fromParam, to: toParam } = useLocalSearchParams();
  const [from, setFrom] = useState<Building | null>(null);
  const [to, setTo] = useState<Building | null>(null);
  const [selectedRoute, setSelectedRoute] = useState<string | null>(null);

  // 👉 처음 진입 시 URL 파라미터로부터 building 객체 찾아 세팅
  useEffect(() => {
    if (typeof fromParam === 'string') {
      const fromBuilding = buildings.find((b) => b.name === fromParam) || null;
      setFrom(fromBuilding);
    }
    if (typeof toParam === 'string') {
      const toBuilding = buildings.find((b) => b.name === toParam) || null;
      setTo(toBuilding);
    }
  }, [fromParam, toParam]);

  const handleRoutePress = (type: string) => {
    if (from && to) {
      if (Platform.OS === 'web') {
        const url = `https://keepwalking-a4728.web.app/map.html?fromLat=${from.lat}&fromLng=${from.lng}&toLat=${to.lat}&toLng=${to.lng}&type=${type}`;
        window.location.href = url;
      } else {
        setSelectedRoute(type);
      }
    } else {
      alert('출발지와 도착지를 모두 선택해주세요.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>중앙대 다빈치캠퍼스 길찾기</Text>

      {/* 출발지 */}
      <Text style={styles.label}>출발지:</Text>
      <Picker
        selectedValue={from?.name || ''}
        onValueChange={(value) => {
          const building = buildings.find((b) => b.name === value) || null;
          setFrom(building);
        }}
        style={styles.picker}
      >
        <Picker.Item label="출발지를 선택하세요" value="" />
        {buildings.map((b) => (
          <Picker.Item key={b.name} label={b.name} value={b.name} />
        ))}
      </Picker>

      {/* 도착지 */}
      <Text style={styles.label}>도착지:</Text>
      <Picker
        selectedValue={to?.name || ''}
        onValueChange={(value) => {
          const building = buildings.find((b) => b.name === value) || null;
          setTo(building);
        }}
        style={styles.picker}
      >
        <Picker.Item label="도착지를 선택하세요" value="" />
        {buildings.map((b) => (
          <Picker.Item key={b.name} label={b.name} value={b.name} />
        ))}
      </Picker>

      {/* 경로 버튼 */}
      <View style={styles.buttonRow}>
        <Pressable style={styles.routeButton} onPress={() => handleRoutePress('shortest')}>
          <Text style={styles.routeButtonText}>최단 거리</Text>
        </Pressable>
        <Pressable style={styles.routeButton} onPress={() => handleRoutePress('healing')}>
          <Text style={styles.routeButtonText}>힐링 경로</Text>
        </Pressable>
      </View>

      {/* 모바일에서 지도 표시 */}
      {selectedRoute && from && to && Platform.OS !== 'web' && (
        <KakaoMapWebView from={from} to={to} type={selectedRoute} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 40,
    paddingHorizontal: 20,
    backgroundColor: '#F0F8F8',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  label: {
    marginTop: 10,
    fontWeight: '600',
  },
  picker: {
    backgroundColor: '#fff',
    borderRadius: 10,
    marginBottom: 10,
  },
  buttonRow: {
    flexDirection: 'row',
    marginTop: 20,
    justifyContent: 'space-around',
  },
  routeButton: {
    backgroundColor: '#4CAF50',
    padding: 12,
    borderRadius: 10,
  },
  routeButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});
