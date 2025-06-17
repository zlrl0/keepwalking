// ✅ app/screens/KingOfWalkingScreen.tsx
import React, { useState } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import shoesImage from '../../assets/shoes.png';
import ChallengeBottomTab from './ChallengeBottomTab';

export default function KingOfWalkingScreen() {
  const [showPopup, setShowPopup] = useState(true);

  return (
    <View style={styles.wrapper}>
      <Text style={styles.title}>KING OF WALKING</Text>

      {showPopup ? (
        <View style={styles.popupBox}>
          <TouchableOpacity style={styles.closeBtn} onPress={() => setShowPopup(false)}>
            <Text style={styles.closeText}>X</Text>
          </TouchableOpacity>
          <Image source={shoesImage} style={styles.image} />
          <Text style={styles.stepText}>2XXXXX STEPS</Text>
          <Text style={styles.congrats}>Congratulation!</Text>
          <Text style={styles.detail}>저번주 걷기왕입니다!{"\n"}이번주에도 꼭 성공하세요!</Text>
          <TouchableOpacity style={styles.greenBtn}>
            <Text style={styles.greenBtnText}>이번주 걷기왕 참여하기</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <>
          <View style={styles.rankBox}>
            <Text style={styles.subTitle}>이번주 🏃 걷기왕🔥</Text>
            <Text style={styles.period}>2025.05.19 ~ 2025.05.25 기준</Text>
            <View style={styles.rankList}>
              <Text>1등 ooo     xxxxxx보</Text>
              <Text>2등 ooo     xxxxxx보</Text>
              <Text>3등 ooo     xxxxxx보</Text>
            </View>
          </View>

          <View style={styles.statusBox}>
            <Text style={styles.center}>👑님은 현재 NN등입니다</Text>
            <Text style={styles.center}>1등까지 xxxxx보 남았어요{"\n"}조금만 더 힘내봐요!</Text>
            <Text style={styles.center}>내 걸음 수 : xxxxx보{"\n"}일일 평균 : xxxx보{"\n"}지난주 대비 : ▲ +xxx보</Text>
            <Text style={styles.more}>더보기</Text>
          </View>

          <TouchableOpacity style={styles.greenBtn}>
            <Text style={styles.greenBtnText}>이번주 걷기왕 참여하기</Text>
          </TouchableOpacity>
        </>
      )}

      <View style={styles.tabWrapper}>
        <ChallengeBottomTab />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: '#eaf4ef',
    paddingHorizontal: 20,
    paddingBottom: 0, // ✅ 여백 제거
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    fontFamily: 'Courier',
    alignSelf: 'center',
    marginTop: 40,
  },
  tabWrapper: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },

  // 팝업
  popupBox: {
    backgroundColor: '#fff',
    borderRadius: 30,
    padding: 24,
    alignItems: 'center',
    marginVertical: 40,
    marginHorizontal: 10,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 5,
  },
  closeBtn: { position: 'absolute', top: 10, right: 14 },
  closeText: { fontWeight: 'bold', fontSize: 16 },
  image: { width: 120, height: 120, marginBottom: 12 },
  stepText: { backgroundColor: '#ffeb3b', padding: 8, borderRadius: 8, fontWeight: 'bold', marginBottom: 8 },
  congrats: { fontSize: 18, fontWeight: 'bold', marginBottom: 6 },
  detail: { fontSize: 13, textAlign: 'center', marginBottom: 12 },

  // 걷기왕 기본
  rankBox: { alignItems: 'center', marginTop: 20 },
  subTitle: { fontSize: 16, fontWeight: 'bold' },
  period: { fontSize: 12, color: '#333', marginBottom: 12 },
  rankList: { width: '100%', padding: 10, backgroundColor: '#fff', borderRadius: 8, gap: 4 },

  statusBox: { marginTop: 24, alignItems: 'center', gap: 8 },
  center: { textAlign: 'center', fontSize: 13 },
  more: { fontSize: 12, marginTop: 10, color: '#666' },

  greenBtn: {
    marginTop: 20,
    backgroundColor: '#4caf50',
    padding: 12,
    borderRadius: 20,
    alignItems: 'center',
  },
  greenBtnText: { color: '#fff', fontWeight: 'bold' },
});
