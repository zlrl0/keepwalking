import { useRouter } from 'expo-router';
import { doc, getDoc } from 'firebase/firestore';
import { useEffect, useState } from 'react';
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

const seoulBusTimes = ['07:30', '14:40', '15:40', '17:40', '18:40', '23:00'];
const davinciBusTimes = ['07:50', '07:55', '08:50', '17:00', '18:00', '23:00'];

function getNextBusDiff(busTimes: string[]): string {
  const now = new Date();
  const nowMins = now.getHours() * 60 + now.getMinutes();

  for (const timeStr of busTimes) {
    const [h, m] = timeStr.split(':').map(Number);
    const total = h * 60 + m;
    if (total > nowMins) {
      const diff = total - nowMins;
      return `${diff}분 후`;
    }
  }
  return '오늘 운행 종료';
}

export default function UnifiedInfoScreen() {
  const { favorites } = useFavorites();
  const router = useRouter();

  const [librarySubtitle, setLibrarySubtitle] = useState('예약 정보가 없습니다.');
  const [busSubtitle, setBusSubtitle] = useState('');

  useEffect(() => {
    const fetchReservation = async () => {
      const user = auth.currentUser;
      if (!user) return;

      const ref = doc(db, 'reservations', user.uid);
      const snap = await getDoc(ref);
      if (snap.exists()) {
        const data = snap.data();
        setLibrarySubtitle(`장소: ${data.roomName}`);
      }
    };
    fetchReservation();
  }, []);

  useEffect(() => {
    const updateBus = () => {
      const s = getNextBusDiff(seoulBusTimes);
      const d = getNextBusDiff(davinciBusTimes);
      setBusSubtitle(`서울 캠퍼스 방면: ${s} | 다빈치 캠퍼스 방면: ${d}`);
    };

    updateBus();
    const interval = setInterval(updateBus, 10000);
    return () => clearInterval(interval);
  }, []);

  const cardData: CardItem[] = [
    { id: '1', title: '수업 정보', subtitle: '', emoji: '📘' },
    { id: '2', title: '도서관 예약', subtitle: librarySubtitle, emoji: '📚' },
    { id: '3', title: '셔틀버스', subtitle: busSubtitle, emoji: '🚌' },
    { id: '4', title: '축제', subtitle: '', emoji: '🎉' },
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