import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

const seoulCampusTimes = ['14:40', '15:40', '17:40', '18:40'];
const davinciCampusTimes = ['7:50', '7:55', '8:50'];

export default function BusScreen() {
  return (
    <ScrollView style={styles.container}>
      {/* 상단 카드 */}
      <View style={styles.topCard}>
        <Text style={styles.title}>🚌 기숙사행</Text>
        <Text style={styles.subtitle}>⏰ 3분 후 출발</Text>
      </View>

      {/* 시간표 카드 */}
      <View style={styles.tableCard}>
        <View style={styles.rowHeader}>
          <Text style={styles.columnHeader}>서울 캠퍼스 방면</Text>
          <Text style={styles.columnHeader}>다빈치 캠퍼스 방면</Text>
        </View>

        {/* 시간표 행 */}
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
    padding: 20,
    alignItems: 'center',
    marginBottom: 16,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  subtitle: {
    marginTop: 8,
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
