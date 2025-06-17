import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

const festivalData = [
  {
    date: '05/25',
    schedule: [
      { time: '17:00 - 18:00', artist: '에스파' },
      { time: '18:00 - 19:00', artist: 'YB 밴드' },
      { time: '19:00 - 20:00', artist: '싸이' },
    ],
  },
  {
    date: '05/26',
    schedule: [
      { time: '17:00 - 18:00', artist: '스테이씨' },
      { time: '18:00 - 19:00', artist: '프로미스나인' },
      { time: '19:00 - 20:00', artist: '잇지' },
    ],
  },
  {
    date: '05/27',
    schedule: [
      { time: '17:00 - 18:00', artist: '뉴진스' },
      { time: '18:00 - 19:00', artist: '잔나비' },
      { time: '19:00 - 20:00', artist: '지코' },
    ],
  },
];

export default function FestivalScreen() {
  return (
    <ScrollView style={styles.container}>
      {festivalData.map((day, idx) => (
        <View key={idx} style={styles.card}>
          <Text style={styles.cardTitle}>🎉 축제 {day.date}</Text>
          {day.schedule.map((item, i) => (
            <View key={i} style={styles.row}>
              <Text style={styles.time}>{item.time}</Text>
              <Text style={styles.artist}>{item.artist}</Text>
            </View>
          ))}
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFE4E1', // 연핑크 배경
    paddingVertical: 24,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    marginHorizontal: 16,
    marginBottom: 24,
    padding: 16,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 6,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  time: {
    fontSize: 14,
    color: '#333',
  },
  artist: {
    fontSize: 14,
    fontWeight: '500',
  },
});
