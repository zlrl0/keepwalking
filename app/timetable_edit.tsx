import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import {
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { useTimetable } from '../context/TimetableContext';

const days = ['월', '화', '수', '목', '금'];
const hours = ['09:30', '10:30', '11:30', '12:30', '13:30', '14:30', '15:30', '16:30', '17:30'];

const pastelColors = ['#FFD1DC', '#C1E1C1', '#FFFACD', '#D1E0FF', '#E0BBE4'];
const eraser = 'eraser';

export default function TimetableEdit() {
  const router = useRouter();
  const { timetableData, setTimetableData } = useTimetable();

  const [selectedColor, setSelectedColor] = useState(pastelColors[0]);
  const [cells, setCells] = useState<{ [key: string]: { color: string; text: string } }>({});
  const [editingCell, setEditingCell] = useState<string | null>(null);
  const [inputText, setInputText] = useState('');

  // ✅ 기존 timetableData를 불러와서 cells로 복원
  useEffect(() => {
    const restored: { [key: string]: { color: string; text: string } } = {};
    timetableData.forEach(({ day, time, color, text }) => {
      const key = `${day}-${time}`;
      restored[key] = { color, text: text || '' };
    });
    setCells(restored);
  }, []);

  const handleCellPress = (day: string, hour: string) => {
    const key = `${day}-${hour}`;
    if (selectedColor === eraser) {
      setCells((prev) => {
        const updated = { ...prev };
        delete updated[key];
        return updated;
      });
    } else {
      setCells((prev) => ({
        ...prev,
        [key]: { ...(prev[key] || {}), color: selectedColor },
      }));
    }
  };

  const handleCellDoubleClick = (day: string, hour: string) => {
    const key = `${day}-${hour}`;
    if (selectedColor !== eraser) {
      setEditingCell(key);
      setInputText(cells[key]?.text || '');
    }
  };

  const saveText = () => {
    if (editingCell) {
      setCells((prev) => ({
        ...prev,
        [editingCell]: {
          ...(prev[editingCell] || {}),
          text: inputText,
        },
      }));
      setEditingCell(null);
      setInputText('');
    }
  };

  const handleDone = () => {
    const transformed = Object.entries(cells).map(([key, value]) => {
      const [day, time] = key.split('-');
      return { day, time, color: value.color, text: value.text };
    });

    setTimetableData(transformed);
    router.back();
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>시간표 수정</Text>
      <View style={styles.table}>
        <View style={styles.row}>
          <View style={styles.timeCell} />
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
              const key = `${day}-${hour}`;
              const cellData = cells[key] || {};
              return (
                <TouchableOpacity
                  key={key}
                  style={[styles.cell, { backgroundColor: cellData.color || '#fff' }]}
                  onPress={() => handleCellPress(day, hour)}
                  onLongPress={() => handleCellDoubleClick(day, hour)}
                >
                  <Text style={styles.cellText}>{cellData.text || ''}</Text>
                </TouchableOpacity>
              );
            })}
          </View>
        ))}
      </View>

      <Text style={styles.paletteLabel}>색상 선택</Text>
      <View style={styles.palette}>
        {pastelColors.map((color) => (
          <TouchableOpacity
            key={color}
            style={[
              styles.colorCircle,
              {
                backgroundColor: color,
                borderWidth: selectedColor === color ? 2 : 0,
              },
            ]}
            onPress={() => setSelectedColor(color)}
          />
        ))}
        <TouchableOpacity
          key={eraser}
          style={[
            styles.colorCircle,
            styles.eraserCircle,
            { borderWidth: selectedColor === eraser ? 2 : 0 },
          ]}
          onPress={() => setSelectedColor(eraser)}
        >
          <Text style={styles.eraserIcon}>🧽</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.doneButton} onPress={handleDone}>
        <Text style={styles.doneButtonText}>완료</Text>
      </TouchableOpacity>

      <Modal visible={editingCell !== null} transparent animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <TextInput
              style={styles.input}
              value={inputText}
              onChangeText={setInputText}
              placeholder="과목명을 입력하세요"
              autoFocus
            />
            <TouchableOpacity onPress={saveText} style={styles.modalButton}>
              <Text style={styles.modalButtonText}>저장</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </ScrollView>
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
  table: {
    borderWidth: 1,
    borderColor: '#ccc',
  },
  row: {
    flexDirection: 'row',
  },
  headerCell: {
    flex: 1,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F0F0F0',
    borderWidth: 0.5,
    borderColor: '#ccc',
  },
  timeCell: {
    width: 60,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F0F0F0',
    borderWidth: 0.5,
    borderColor: '#ccc',
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
  paletteLabel: {
    marginTop: 24,
    fontSize: 16,
    fontWeight: 'bold',
  },
  palette: {
    flexDirection: 'row',
    marginTop: 12,
    gap: 12,
    alignItems: 'center',
  },
  colorCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    borderColor: '#555',
  },
  eraserCircle: {
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  eraserIcon: {
    fontSize: 20,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 12,
    width: '80%',
  },
  input: {
    borderBottomWidth: 1,
    borderColor: '#ccc',
    marginBottom: 16,
    fontSize: 16,
    paddingVertical: 4,
  },
  modalButton: {
    backgroundColor: '#007AFF',
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  modalButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  doneButton: {
    marginTop: 32,
    backgroundColor: '#4CAF50',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  doneButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
