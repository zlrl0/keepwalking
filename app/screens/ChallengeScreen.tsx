import React from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { ProgressBar } from 'react-native-paper';
import ChallengeBottomTab from './ChallengeBottomTabFromChallenge';

const ChallengeScreen = () => {
  return (
    <View style={styles.wrapper}>
      <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 120 }}>
        <Text style={styles.title}>CHALLENGE</Text>
        <Text style={styles.subtitle}>걷고, 기록하고, 나만의 건강 루틴 만들기</Text>

        <View style={styles.missionBox}>
          <Text style={styles.missionTitle}>{"<오늘의 미션>"}</Text>

          {/* 미션 1 */}
          <View style={styles.missionItem}>
            <Text style={styles.missionText}>✅ 오늘 하루 6000보 이상 걷기</Text>
            <ProgressBar progress={4350 / 6000} color="#5cb85c" style={styles.progress} />
            <Text style={styles.rewardText}>달성시 +1000콩</Text>
            <Text style={styles.descText}>하루 6000보 걷기만 충분해요. 오늘도 건강 챙기기 🌿</Text>
          </View>

          {/* 미션 2 */}
          <View style={styles.missionItem}>
            <Text style={styles.missionText}>✅ 엘리베이터 대신 계단 10층 이상 오르기</Text>
            <ProgressBar progress={2 / 10} color="#5cb85c" style={styles.progress} />
            <Text style={styles.rewardText}>달성시 +2000콩</Text>
            <Text style={styles.descText}>엘리베이터 대신 계단 10층 이상 오르기</Text>
          </View>

          {/* 미션 3 */}
          <View style={styles.missionItem}>
            <Text style={styles.missionText}>✅ 산책 풍경 사진 찍기</Text>
            <ProgressBar progress={0 / 1} color="#5cb85c" style={styles.progress} />
            <Text style={styles.rewardText}>달성시 +500콩</Text>
            <Text style={styles.descText}>산책하면서 보인 예쁜 풍경을 찍어서 업로드 해보세요!</Text>
          </View>

          {/* 미션 4 */}
          <View style={styles.missionItem}>
            <Text style={styles.missionText}>✅ 오늘의 캠퍼스 도보 루트 완주하기</Text>
            <ProgressBar progress={0} color="#5cb85c" style={styles.progress} />
            <Text style={styles.rewardText}>달성시 +500콩</Text>
            <Text style={styles.descText}>중앙대의 숨은 명소를 도보로 만나보세요 🏞️</Text>
          </View>

          {/* 버튼 */}
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>{"<오늘의 루트 시작하기>"}</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* 하단 내비바 */}
      <ChallengeBottomTab />
    </View>
  );
};

export default ChallengeScreen;

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: '#eaf4ef',
  },
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 50,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    alignSelf: 'center',
    fontFamily: 'Courier',
  },
  subtitle: {
    fontSize: 14,
    textAlign: 'center',
    color: '#666',
    marginBottom: 20,
  },
  missionBox: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 20,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 6,
    elevation: 5,
  },
  missionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    alignSelf: 'center',
    marginBottom: 20,
  },
  missionItem: {
    marginBottom: 20,
  },
  missionText: {
    fontSize: 16,
    marginBottom: 6,
  },
  progress: {
    height: 10,
    borderRadius: 5,
    backgroundColor: '#eee',
    marginBottom: 4,
  },
  rewardText: {
    fontSize: 12,
    color: '#4caf50',
    marginBottom: 2,
  },
  descText: {
    fontSize: 12,
    color: '#333',
  },
  button: {
    backgroundColor: '#d8f3dc',
    padding: 12,
    borderRadius: 10,
    marginTop: 10,
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 14,
    color: '#333',
  },
});
