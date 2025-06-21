import { router } from 'expo-router';
import { signOut } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { auth, db } from '../../firebase/firebaseConfig';

export default function MainScreen() {
  const [nickname, setNickname] = useState('');
  const [seoulShuttleText, setSeoulShuttleText] = useState('');
  const [davinciShuttleText, setDavinciShuttleText] = useState('');

  const seoulShuttleTimes = ['07:30', '14:40', '15:40', '17:40', '18:40', '23:00'];
  const davinciShuttleTimes = ['07:50', '07:55', '08:50', '17:00', '18:00', '23:00'];

  const getNextShuttleText = (shuttleTimes: string[]) => {
    const now = new Date();
    for (let time of shuttleTimes) {
      const [hour, minute] = time.split(':').map(Number);
      const shuttleTime = new Date();
      shuttleTime.setHours(hour, minute, 0, 0);
      if (shuttleTime > now) {
        const diffMin = Math.round((shuttleTime.getTime() - now.getTime()) / 60000);
        return `${diffMin}분 후`;
      }
    }
    return '오늘 셔틀 종료';
  };

  useEffect(() => {
    const fetchNickname = async () => {
      const user = auth.currentUser;
      if (user) {
        const docRef = doc(db, 'users', user.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setNickname(docSnap.data().nickname || '');
        }
      }
    };

    fetchNickname();

    // 처음 셔틀 시간 계산
    setSeoulShuttleText(getNextShuttleText(seoulShuttleTimes));
    setDavinciShuttleText(getNextShuttleText(davinciShuttleTimes));

    // ⏱ 1분마다 갱신
    const interval = setInterval(() => {
      setSeoulShuttleText(getNextShuttleText(seoulShuttleTimes));
      setDavinciShuttleText(getNextShuttleText(davinciShuttleTimes));
    }, 60000);

    return () => clearInterval(interval);
  }, []);

  const handleTurtleClick = () => {
    router.push('../turtle');
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      router.replace('/');
    } catch (error) {
      console.error('로그아웃 실패:', error);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContent}>
      {/* 상단 로그아웃 버튼 */}
      <View style={styles.header}>
        <TouchableOpacity onPress={handleLogout}>
          <Text style={styles.logoutText}>로그아웃</Text>
        </TouchableOpacity>
      </View>

      {/* 인사말 */}
      <Text style={styles.greeting}>
        {nickname ? `${nickname}님, 오늘도 건강하게 걸어보세요!` : '환영합니다!'}
      </Text>

      {/* 거북이 캐릭터 */}
      <TouchableOpacity onPress={handleTurtleClick}>
        <View style={styles.turtleWrapper}>
          <Image
            source={require('../../assets/images/turtle2.png')}
            style={styles.character}
            resizeMode="contain"
          />
        </View>
      </TouchableOpacity>

      <View style={styles.walkBox}>
        <Text style={styles.walkTitle}>오늘 걸은 거리</Text>
        <Text style={styles.walkDistance}>1.18km</Text>
      </View>

      <View style={styles.sectionBox}>
        <Text style={styles.sectionTitle}>맞춤 공지사항</Text>
        <Text style={styles.noticeText}>📘 수업 : History of Culture (09:00~10:15) [B101]</Text>
        <Text style={styles.noticeText}>📍 셔틀 - 서울 캠퍼스 방면 : {seoulShuttleText} / 다빈치 캠퍼스 방면 : {davinciShuttleText}</Text>
        <Text style={styles.noticeText}>🎉 축제 05/23 : 에스파(aespa)</Text>
      </View>

      <View style={styles.sectionBox}>
        <Text style={styles.sectionTitle}>오늘의 미션</Text>
        <Text style={styles.missionText}>이번주 알바 가는 날은 걸어서 가기</Text>
        <Text style={styles.missionText}>수업갈때 디어 안타고 걸어서 원형관 가기</Text>
        <Text style={styles.missionText}>고니탕 찍고 기숙사 걸어 오기</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContent: {
    backgroundColor: '#EAF5ED',
    paddingHorizontal: 20,
    paddingBottom: 30,
    paddingTop: 60,
    alignItems: 'center',
  },
  header: {
    width: '100%',
    paddingHorizontal: 4,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginBottom: 10,
  },
  logoutText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#FF5C5C',
  },
  greeting: {
    fontSize: 14,
    color: '#333',
    marginBottom: 8,
    fontWeight: '600',
  },
  turtleWrapper: {
    backgroundColor: '#F1FAF6',
    borderRadius: 20,
    padding: 20,
    marginBottom: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  character: {
    width: 180,
    height: 180,
  },
  walkBox: {
    backgroundColor: '#EBF7F0',
    width: '100%',
    alignItems: 'center',
    borderRadius: 12,
    paddingVertical: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  walkTitle: {
    color: '#29735C',
    fontWeight: 'bold',
    fontSize: 16,
  },
  walkDistance: {
    fontSize: 20,
    fontWeight: '600',
    marginTop: 6,
  },
  sectionBox: {
    backgroundColor: '#fff',
    width: '100%',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOpacity: 0.03,
    shadowRadius: 4,
    elevation: 2,
  },
  sectionTitle: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 10,
    color: '#37966F',
  },
  noticeText: {
    fontSize: 14,
    marginBottom: 4,
  },
  missionText: {
    fontSize: 14,
    marginBottom: 6,
  },
});
