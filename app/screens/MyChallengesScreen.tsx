import { useRouter } from 'expo-router';
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
} from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { auth, db } from '../../firebase/firebaseConfig'; // ✅ 경로 확인
import ChallengeBottomTab from './ChallengeBottomTab';

export default function MyChallengesScreen() {
  const router = useRouter();
  const [challenges, setChallenges] = useState([]);

  const fetchChallenges = async () => {
    const user = auth.currentUser;
    if (!user) return;

    try {
      const snapshot = await getDocs(
        collection(db, 'challenges', user.uid, 'myChallenges')
      );
      const fetched = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setChallenges(fetched);
    } catch (error) {
      console.error('챌린지 불러오기 실패', error);
      Alert.alert('챌린지 데이터를 불러오지 못했습니다.');
    }
  };

  useEffect(() => {
    fetchChallenges();
  }, []);

  const handleDelete = async (challengeId: string) => {
    const user = auth.currentUser;
    if (!user) return;

    try {
      await deleteDoc(doc(db, 'challenges', user.uid, 'myChallenges', challengeId));
      setChallenges((prev) => prev.filter((item) => item.id !== challengeId));
    } catch (error) {
      console.error('삭제 실패', error);
      Alert.alert('삭제 중 오류가 발생했습니다.');
    }
  };

  const handleComplete = async (challenge) => {
    const user = auth.currentUser;
    if (!user) return;

    try {
      // 완료된 챌린지로 이동
      await addDoc(collection(db, 'challenges', user.uid, 'completedChallenges'), {
        title: challenge.title,
        description: challenge.description,
        completedAt: new Date(),
      });

      // 기존 목록에서 제거
      await deleteDoc(doc(db, 'challenges', user.uid, 'myChallenges', challenge.id));
      setChallenges((prev) => prev.filter((item) => item.id !== challenge.id));
    } catch (error) {
      console.error('완료 처리 실패:', error);
      Alert.alert('완료 처리 중 오류 발생');
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={styles.wrapper}>
        <View style={styles.container}>
          <Text style={styles.title}>My CHALLENGE</Text>

          {/* 탭 선택 UI */}
          <View style={styles.tabWrapper}>
            <Text style={styles.tabSelected}>도전중인 챌린지</Text>
            <TouchableOpacity onPress={() => router.push('/ch_nv/completedChallenges')}>
              <Text style={styles.tab}>완료</Text>
            </TouchableOpacity>
          </View>

          {/* 챌린지 카드 */}
          {challenges.map((challenge) => (
            <View style={styles.card} key={challenge.id}>
              <View style={styles.cardHeader}>
                <Text style={styles.cardTitle}>{challenge.title}</Text>
              </View>
              <Text style={styles.cardSubText}>{challenge.description}</Text>

              <View style={styles.cardButtons}>
                <TouchableOpacity onPress={() => handleComplete(challenge)}>
                  <Text style={styles.completeBtn}>완료하기</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handleDelete(challenge.id)}>
                  <Text style={styles.closeBtn}>X</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))}

          <Text style={styles.subNote}>포기하지 말고 끝까지 도전해보세요!</Text>

          {/* 나만의 챌린지 만들기 버튼 */}
          <TouchableOpacity
            style={styles.addBtn}
            onPress={() => router.push('/ch_nv/create')}
          >
            <Text style={styles.addBtnText}>+ 나만의 챌린지 만들기</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      <ChallengeBottomTab />
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: '#eaf4ef',
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
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  cardTitle: {
    fontWeight: 'bold',
    fontSize: 15,
  },
  cardSubText: {
    fontSize: 13,
    marginBottom: 8,
  },
  cardButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 8,
  },
  completeBtn: {
    color: '#007AFF',
    fontWeight: 'bold',
    fontSize: 13,
  },
  closeBtn: {
    color: '#aaa',
    fontSize: 14,
  },
  subNote: {
    textAlign: 'center',
    fontSize: 13,
    marginBottom: 20,
  },
  addBtn: {
    backgroundColor: '#fef6e4',
    padding: 14,
    borderRadius: 20,
    alignItems: 'center',
    marginTop: 8,
  },
  addBtnText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
  },
});
