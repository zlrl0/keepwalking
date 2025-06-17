// ✅ app/screens/MyChallengesScreen.tsx
import { useRouter } from 'expo-router';
import React from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { ProgressBar } from 'react-native-paper';
import { useChallenge } from '../context/ChallengeContext'; // ✅ 컨텍스트 사용
import ChallengeBottomTab from './ChallengeBottomTab';

export default function MyChallengesScreen() {
  const router = useRouter();
  const { challenges, removeChallenge } = useChallenge(); // ✅ 컨텍스트 훅

  return (
    <View style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={styles.wrapper}>
        <View style={styles.container}>
          <Text style={styles.title}>My CHALLENGE</Text>

          {/* 탭 선택 UI */}
          <View style={styles.tabWrapper}>
            <Text style={styles.tabSelected}>도전중인 챌린지</Text>
            <TouchableOpacity onPress={() => router.push('/ch_nv/completed')}>
              <Text style={styles.tab}>완료</Text>
            </TouchableOpacity>
          </View>

          {/* 챌린지 카드 */}
          {challenges.map((challenge) => (
            <View style={styles.card} key={challenge.id}>
              <View style={styles.cardHeader}>
                <Text style={styles.cardTitle}>{challenge.title}</Text>
                <TouchableOpacity onPress={() => removeChallenge(challenge.id)}>
                  <Text style={styles.closeBtn}>X</Text>
                </TouchableOpacity>
              </View>
              <Text style={styles.cardSubText}>{challenge.description}</Text>
              <ProgressBar
                progress={0.6}
                color="#4caf50"
                style={styles.progress}
              />
              <Text style={styles.cardFooter}>🕒 남은 기간 : D-1    3/5</Text>
            </View>
          ))}

          <Text style={styles.moreText}>더보기</Text>
          <Text style={styles.subNote}>포기하지말고 끝까지 도전해보세요!</Text>

          {/* ✅ 나만의 챌린지 만들기 버튼 */}
          <TouchableOpacity style={styles.addBtn} onPress={() => router.push('/ch_nv/create')}>
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
  closeBtn: {
    color: '#aaa',
    fontSize: 14,
  },
  cardSubText: {
    fontSize: 13,
    marginBottom: 8,
  },
  progress: {
    height: 8,
    borderRadius: 4,
    backgroundColor: '#eee',
    marginBottom: 4,
  },
  cardFooter: {
    fontSize: 11,
    color: '#555',
  },
  moreText: {
    textAlign: 'center',
    color: '#555',
    marginVertical: 8,
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
