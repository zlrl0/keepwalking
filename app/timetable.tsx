import { useRouter } from 'expo-router';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useTimetable } from '../context/TimetableContext';

const days = ['월', '화', '수', '목', '금'];
const hours = ['09:30', '10:30', '11:30', '12:30', '13:30', '14:30', '15:30', '16:30', '17:30'];

export default function Timetable() {
  const router = useRouter();
  const { timetableData } = useTimetable();

  // helper 함수: day + time 조합에 해당하는 셀 데이터 찾기
  const getCellData = (day: string, hour: string) => {
    return timetableData.find((cell) => cell.day === day && cell.time === hour);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>시간표</Text>
      <View style={styles.tableWrapper}>
        <View style={styles.headerRow}>
          <View style={styles.timeHeaderCell} />
          {days.map((day) => (
            <View key={day} style={styles.headerCell}>
              <Text>{day}</Text>
            </View>
          ))}
        </View>

        {hours.map((hour) => (
          <View key={hour} style={styles.row}>
            <View style={styles.timeCell}>
              <Text>{hour}</Text>
            </View>
            {days.map((day) => {
              const cellData = getCellData(day, hour);
              return (
                <View
                  key={`${day}-${hour}`}
                  style={[
                    styles.cell,
                    { backgroundColor: cellData?.color || '#fff' },
                  ]}
                >
                  <Text style={styles.cellText}>{cellData?.text || ''}</Text>
                </View>
              );
            })}
          </View>
        ))}
      </View>

      <TouchableOpacity style={styles.editButton} onPress={() => router.push('/timetable_edit')}>
        <Text style={styles.editButtonText}>✏️ 시간표 수정</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E8F6EC',
    paddingTop: 60,
    paddingHorizontal: 12,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  tableWrapper: {
    borderWidth: 1,
    borderColor: '#ccc',
  },
  headerRow: {
    flexDirection: 'row',
  },
  row: {
    flexDirection: 'row',
  },
  timeHeaderCell: {
    width: 60,
    backgroundColor: '#F0F0F0',
    borderWidth: 0.5,
    borderColor: '#ccc',
  },
  headerCell: {
    flex: 1,
    padding: 8,
    backgroundColor: '#F0F0F0',
    borderWidth: 0.5,
    borderColor: '#ccc',
    alignItems: 'center',
  },
  timeCell: {
    width: 60,
    padding: 8,
    backgroundColor: '#F0F0F0',
    borderWidth: 0.5,
    borderColor: '#ccc',
    alignItems: 'center',
  },
  cell: {
    flex: 1,
    height: 40,
    borderWidth: 0.5,
    borderColor: '#ccc',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cellText: {
    fontSize: 12,
    color: '#333',
  },
  editButton: {
    marginTop: 24,
    backgroundColor: '#4CAF50',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  editButtonText: {
    color: '#fff',
    fontSize: 16,
  },
});
