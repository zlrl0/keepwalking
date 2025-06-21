import { useFocusEffect, useRouter } from 'expo-router';
import { doc, getDoc } from 'firebase/firestore';
import { useCallback, useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import InfoCard from '../../components/InfoCard';
import { useFavorites } from '../../context/FavoriteContext';
import { auth, db } from '../../firebase/firebaseConfig';

interface CardItem {
  id: string;
  title: string;
  subtitle: string;
  emoji: string;
}

export default function UnifiedInfoScreen() {
  const { favorites } = useFavorites();
  const router = useRouter();

  const [librarySubtitle, setLibrarySubtitle] = useState('예약 정보가 없습니다.');

  // ✅ 화면에 포커스될 때마다 최신 예약 정보 fetch
  useFocusEffect(
    useCallback(() => {
      const fetchReservation = async () => {
        const user = auth.currentUser;
        if (!user) return;

        try {
          const ref = doc(db, 'reservations', user.uid);
          const snap = await getDoc(ref);
          if (snap.exists()) {
            const data = snap.data();
            setLibrarySubtitle(`장소: ${data.roomName}`);
          } else {
            setLibrarySubtitle('예약 정보가 없습니다.');
          }
        } catch (err) {
          console.error('❌ Firestore 읽기 실패:', err);
          setLibrarySubtitle('예약 정보가 없습니다.');
        }
      };

      fetchReservation();
    }, [])
  );

  const cardData: CardItem[] = [
    { id: '1', title: '수업 정보', subtitle: '09:00~10:15 | B310 / History of Culture', emoji: '📘' },
    { id: '2', title: '도서관 예약', subtitle: librarySubtitle, emoji: '📚' },
    { id: '3', title: '셔틀버스', subtitle: '3분 후 | B10관 → 기숙사', emoji: '🚌' },
    { id: '4', title: '축제', subtitle: '05/23 | 에스파(aespa)', emoji: '🎉' },
  ];

  const filteredData = cardData.filter((item) => favorites.includes(item.title));

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.pageTitle}>통합정보</Text>

      {filteredData.map((item) => (
        <View key={item.id} style={styles.cardWrapper}>
          <InfoCard
            title={item.title}
            subtitle={item.subtitle}
            emoji={item.emoji}
            onPress={() => {
              switch (item.title) {
                case '수업 정보':
                  router.push('/timetable');
                  break;
                case '도서관 예약':
                  router.push('/library');
                  break;
                case '셔틀버스':
                  router.push('/bus');
                  break;
                case '축제':
                  router.push('/festival');
                  break;
              }
            }}
          />
        </View>
      ))}

      <TouchableOpacity style={styles.addCard} onPress={() => router.push('/info_edit')}>
        <Text style={styles.plus}>＋</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E8F6EC',
  },
  pageTitle: {
    marginTop: 60,
    marginBottom: 8,
    marginLeft: 16,
    fontSize: 16,
    color: '#888',
  },
  cardWrapper: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginVertical: 8,
    marginHorizontal: 16,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
    alignItems: 'center',
  },
  addCard: {
    margin: 16,
    height: 80,
    backgroundColor: '#fff',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 2,
  },
  plus: {
    fontSize: 32,
    color: '#999',
  },
});
