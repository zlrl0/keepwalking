import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

const seoulCampusTimes = ['07:30', '14:40', '15:40', '17:40', '18:40', '23:00'];
const davinciCampusTimes = ['7:50', '7:55', '8:50', '17:00', '18:00', '23:00'];

function getNextBusTime(times: string[]): string | null {
  const now = new Date();
  const currentMinutes = now.getHours() * 60 + now.getMinutes();

  for (const timeStr of times) {
    const [hour, minute] = timeStr.split(':').map(Number);
    const timeMinutes = hour * 60 + minute;
    if (timeMinutes > currentMinutes) return timeStr;
  }
  return null;
}

function getMinutesUntil(timeStr: string): number {
  const now = new Date();
  const [hour, minute] = timeStr.split(':').map(Number);
  const target = new Date();
  target.setHours(hour, minute, 0, 0);
  return Math.ceil((target.getTime() - now.getTime()) / 60000);
}

export default function BusScreen() {
  const [seoulNext, setSeoulNext] = useState('⏰ 정보 없음');
  const [davinciNext, setDavinciNext] = useState('⏰ 정보 없음');

  useEffect(() => {
    const updateTime = () => {
      const nextSeoul = getNextBusTime(seoulCampusTimes);
      const nextDavinci = getNextBusTime(davinciCampusTimes);

      if (nextSeoul) {
        const min = getMinutesUntil(nextSeoul);
        setSeoulNext(`⏰ ${min}분 후 (${nextSeoul})`);
      } else {
        setSeoulNext('⏰ 오늘 남은 버스 없음');
      }

      if (nextDavinci) {
        const min = getMinutesUntil(nextDavinci);
        setDavinciNext(`⏰ ${min}분 후 (${nextDavinci})`);
      } else {
        setDavinciNext('⏰ 오늘 남은 버스 없음');
      }
    };

    updateTime();
    const interval = setInterval(updateTime, 10000); // 10초마다 갱신

    return () => clearInterval(interval);
  }, []);

  return (
    <ScrollView style={styles.container}>
      {/* 상단 카드 - 반 나눔 */}
      <View style={styles.topCard}>
        <View style={styles.topHalf}>
          <Text style={styles.title}>🚌 서울 캠퍼스 방면</Text>
          <Text style={styles.subtitle}>{seoulNext}</Text>
        </View>
        <View style={styles.separator} />
        <View style={styles.topHalf}>
          <Text style={styles.title}>🚌 다빈치 캠퍼스 방면</Text>
          <Text style={styles.subtitle}>{davinciNext}</Text>
        </View>
      </View>

      {/* 시간표 카드 */}
      <View style={styles.tableCard}>
        <View style={styles.rowHeader}>
          <Text style={styles.columnHeader}>서울 캠퍼스 방면</Text>
          <Text style={styles.columnHeader}>다빈치 캠퍼스 방면</Text>
        </View>

        {Array.from({ length: Math.max(seoulCampusTimes.length, davinciCampusTimes.length) }).map((_, i) => (
          <View style={styles.row} key={i}>
            <Text style={styles.cell}>{seoulCampusTimes[i] ?? ''}</Text>
            <Text style={styles.cell}>{davinciCampusTimes[i] ?? ''}</Text>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E8F6EC',
    padding: 16,
  },
  topCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    flexDirection: 'row',
    paddingVertical: 20,
    paddingHorizontal: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  topHalf: {
    flex: 1,
    alignItems: 'center',
  },
  separator: {
    width: 1,
    backgroundColor: '#ddd',
    height: '100%',
    marginHorizontal: 12,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  subtitle: {
    marginTop: 6,
    fontSize: 13,
    color: '#666',
  },
  tableCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    paddingVertical: 12,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  rowHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingBottom: 8,
    borderBottomWidth: 1,
    borderColor: '#ddd',
  },
  columnHeader: {
    fontWeight: 'bold',
    fontSize: 14,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 40,
    paddingVertical: 10,
  },
  cell: {
    fontSize: 14,
    color: '#333',
  },
});
