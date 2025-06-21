// ✅ app/screens/CompletedChallengesScreen.tsx
import { useRouter } from 'expo-router';
import React from 'react';
import { Platform, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import ChallengeBottomTab from './ChallengeBottomTab';

const CompletedChallengesScreen = () => {
  const router = useRouter();

  return (
    <View style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={styles.wrapper}>
        <View style={styles.container}>
          <Text style={styles.title}>My CHALLENGE</Text>

          {/* 탭 선택 UI */}
          <View style={styles.tabWrapper}>
            <TouchableOpacity onPress={() => router.replace('/ch_nv/my')}>
              <Text style={styles.tab}>도전중인 챌린지</Text>
            </TouchableOpacity>
            <Text style={styles.tabSelected}>완료</Text>
          </View>

          {[1, 2, 3].map((_, idx) => (
            <View style={styles.card} key={idx}>
              <View style={styles.cardInner}>
                <Text style={styles.cardTitle}>알바 챌린지</Text>
                <Text style={styles.cardSubText}>완료일 : 2025. 05. 23</Text>
                <View style={styles.cardBottomSection}>
                  <Text style={styles.cardSuccess}>성공률 : 66% (2/3일 성공)</Text>
                  <Text style={styles.cardPeriod}>기간 : 2025. 05. 19 ~ 2025. 05. 23 (5일)</Text>
                  {/* 다시 도전하기 버튼 제거됨 */}
                </View>
              </View>
            </View>
          ))}

          <View style={styles.footerBox}>
            

            <TouchableOpacity style={styles.addBtn}>
              <Text style={styles.addBtnText}>+ 나만의 챌린지 만들기</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>

      <ChallengeBottomTab />
    </View>
  );
};

export default CompletedChallengesScreen;

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
    marginTop: Platform.OS === 'web' ? 0 : 20,
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
    marginBottom: 16,
    padding: 0,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3,
    width: '100%',
  },
  cardInner: {
    padding: 16,
  },
  cardTitle: {
    fontWeight: 'bold',
    fontSize: 15,
    marginBottom: 4,
  },
  cardSubText: {
    fontSize: 13,
    marginBottom: 4,
  },
  cardBottomSection: {
    marginTop: 8,
  },
  cardSuccess: {
    fontSize: 13,
    color: '#4caf50',
    marginBottom: 2,
  },
  cardPeriod: {
    fontSize: 12,
    color: '#555',
    marginBottom: 8,
  },
  footerBox: {
    width: '100%',
    alignItems: 'center',
    marginTop: 8,
  },
  moreText: {
    textAlign: 'center',
    color: '#555',
    marginBottom: 10,
  },
  addBtn: {
    backgroundColor: '#fef6e4',
    padding: 12,
    borderRadius: 20,
    alignItems: 'center',
    width: '100%',
    maxWidth: 500,
  },
  addBtnText: {
    color: '#333',
    fontSize: 14,
  },
});
