import React, { useState } from 'react';
import {
  Alert,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

interface Room {
  id: number;
  name: string;
  available: number;
}

export default function Library() {
  const [rooms, setRooms] = useState<Room[]>([
    { id: 1, name: '열람실 #1', available: 10 },
    { id: 2, name: '열람실 #2', available: 21 },
    { id: 3, name: '열람실 #3', available: 40 },
    { id: 4, name: '열람실 #4', available: 20 },
  ]);
  const [reservedRoomId, setReservedRoomId] = useState<number | null>(null);

  const handleReserve = (id: number) => {
    if (reservedRoomId !== null) {
      const message = '이미 예약된 열람실이 있습니다.';
      Platform.OS === 'web' ? window.alert(message) : Alert.alert(message);
      return;
    }

    setRooms((prev) =>
      prev.map((room) =>
        room.id === id ? { ...room, available: room.available - 1 } : room
      )
    );
    setReservedRoomId(id);

    const message = '예약이 완료되었습니다';
    Platform.OS === 'web' ? window.alert(message) : Alert.alert(message);
  };

  const handleCancel = () => {
    if (reservedRoomId === null) return;

    const confirmMessage = '예약을 취소하시겠습니까?';

    if (Platform.OS === 'web') {
      const confirmed = window.confirm(confirmMessage);
      if (!confirmed) return;

      setRooms((prev) =>
        prev.map((room) =>
          room.id === reservedRoomId
            ? { ...room, available: room.available + 1 }
            : room
        )
      );
      setReservedRoomId(null);
      window.alert('예약이 취소되었습니다');
    } else {
      Alert.alert(
        '예약 취소',
        confirmMessage,
        [
          {
            text: '아니요',
            style: 'cancel',
          },
          {
            text: '확인',
            onPress: () => {
              setRooms((prev) =>
                prev.map((room) =>
                  room.id === reservedRoomId
                    ? { ...room, available: room.available + 1 }
                    : room
                )
              );
              setReservedRoomId(null);
              Alert.alert('예약이 취소되었습니다');
            },
          },
        ],
        { cancelable: true }
      );
    }
  };

  const reservedRoom = rooms.find((room) => room.id === reservedRoomId);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.reservationBox}>
        {reservedRoom ? (
          <>
            <Text style={styles.infoText}></Text>
            <Text style={styles.infoText}>🏛 장소: </Text>
            <Text style={styles.infoText}>{reservedRoom.name}</Text>
            <TouchableOpacity style={styles.cancelButton} onPress={handleCancel}>
              <Text style={styles.cancelText}>예약 취소하기</Text>
            </TouchableOpacity>
          </>
        ) : (
          <Text style={styles.noReservationText}>예약 정보가 없습니다.</Text>
        )}
      </View>

      {rooms.map((room) => (
        <View key={room.id} style={styles.roomCard}>
          <View>
            <Text style={styles.roomTitle}>🏛 {room.name}</Text>
            <Text style={styles.roomSubtitle}>(빈 자리 {room.available}석)</Text>
          </View>
          <TouchableOpacity
            onPress={() => handleReserve(room.id)}
            style={[
              styles.reserveButton,
              reservedRoomId === room.id && styles.reservedButton,
            ]}
            disabled={reservedRoomId !== null && reservedRoomId !== room.id}
          >
            <Text
              style={[
                styles.reserveText,
                reservedRoomId === room.id && styles.reservedText,
              ]}
            >
              {reservedRoomId === room.id ? '예약됨' : '예약'}
            </Text>
          </TouchableOpacity>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E8F6EC',
    padding: 16,
  },
  reservationBox: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 12,
    marginBottom: 24,
    elevation: 2,
    alignItems: 'center',
  },
  infoText: {
    fontSize: 14,
    marginBottom: 6,
  },
  cancelButton: {
    marginTop: 12,
    backgroundColor: '#F0F8F0',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#aaa',
  },
  cancelText: {
    fontSize: 14,
    color: '#333',
  },
  noReservationText: {
    fontSize: 14,
    color: '#666',
  },
  roomCard: {
    backgroundColor: '#fff',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
    elevation: 2,
  },
  roomTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
    color: '#333',
  },
  roomSubtitle: {
    fontSize: 14,
    color: '#666',
  },
  reserveButton: {
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderWidth: 1,
    borderRadius: 20,
    borderColor: '#444',
  },
  reserveText: {
    fontSize: 14,
    color: '#444',
  },
  reservedButton: {
    backgroundColor: '#D1F0D1',
    borderColor: '#2d8a39',
  },
  reservedText: {
    color: '#2d8a39',
    fontWeight: '600',
  },
});
