import { useRouter } from 'expo-router';
import { collection, getDocs } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { auth, db } from '../../firebase/firebaseConfig';
import ChallengeBottomTab from '../screens/ChallengeBottomTab';

export default function CompletedChallenges() {
  const router = useRouter();
  const [completed, setCompleted] = useState([]);

  const fetchCompletedChallenges = async () => {
    const user = auth.currentUser;
    if (!user) return;

    try {
      const snapshot = await getDocs(
        collection(db, 'challenges', user.uid, 'completedChallenges')
      );
      const fetched = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setCompleted(fetched);
    } catch (error) {
      console.error('완료 챌린지 불러오기 실패:', error);
      Alert.alert('완료된 챌린지를 불러오는 데 실패했습니다.');
    }
  };

  useEffect(() => {
    fetchCompletedChallenges();
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={styles.wrapper}>
        <View style={styles.container}>
          <Text style={styles.title}>완료한 챌린지</Text>

          {/* 탭 선택 UI */}
          <View style={styles.tabWrapper}>
            <TouchableOpacity onPress={() => router.replace('/screens/MyChallengesScreen')}>
              <Text style={styles.tab}>도전중</Text>
            </TouchableOpacity>
            <Text style={styles.tabSelected}>완료</Text>
          </View>

          {/* 챌린지 카드 */}
          {completed.map((challenge) => (
            <View style={styles.card} key={challenge.id}>
              <Text style={styles.cardTitle}>{challenge.title}</Text>
              <Text style={styles.cardSubText}>{challenge.description}</Text>
              <Text style={styles.cardDate}>
                완료일:{' '}
                {challenge.completedAt?.toDate?.().toLocaleDateString?.() ||
                  '알 수 없음'}
              </Text>
            </View>
          ))}

          {completed.length === 0 && (
            <Text style={styles.emptyText}>완료된 챌린지가 없습니다.</Text>
          )}
        </View>
      </ScrollView>

      <ChallengeBottomTab />
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: '#f8f9fa',
    alignItems: 'center',
    paddingBottom: 40,
  },
  container: {
    paddingVertical: 40,
    paddingHorizontal: 20,
    width: '100%',
    maxWidth: 500,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    fontFamily: 'Courier',
    alignSelf: 'center',
  },
  tabWrapper: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 20,
    marginVertical: 16,
  },
  tab: {
    fontSize: 14,
    color: '#999',
  },
  tabSelected: {
    fontSize: 14,
    fontWeight: 'bold',
    textDecorationLine: 'underline',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3,
  },
  cardTitle: {
    fontWeight: 'bold',
    fontSize: 15,
    marginBottom: 4,
  },
  cardSubText: {
    fontSize: 13,
    marginBottom: 6,
  },
  cardDate: {
    fontSize: 12,
    color: '#888',
  },
  emptyText: {
    textAlign: 'center',
    color: '#888',
    marginTop: 20,
  },
});
