import { format } from 'date-fns';
import { collection, doc, setDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import {
  Dimensions,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { Calendar } from 'react-native-calendars';
import { BarChart } from 'react-native-chart-kit';
import { auth, db } from '../../firebase/firebaseConfig';

const screenWidth = Dimensions.get('window').width;

export default function CaloriesScreen() {
  const [stepCount, setStepCount] = useState(0);
  const [calories, setCalories] = useState(0);
  const [weeklyData, setWeeklyData] = useState<number[]>([0, 0, 0, 0, 0, 0, 0]);
  const [markedDates, setMarkedDates] = useState({});

  const todayKey = format(new Date(), 'yyyy-MM-dd');
  const caloriePerStep = 0.04;

  useEffect(() => {
    if (Platform.OS !== 'web') {
      const { Pedometer } = require('expo-sensors');

      const subscription = Pedometer.watchStepCount(result => {
        setStepCount(result.steps);
        setCalories(parseFloat((result.steps * caloriePerStep).toFixed(2)));
      });

      Pedometer.isAvailableAsync().then(result => {
        if (!result) alert('이 기기에서는 만보기 센서를 사용할 수 없습니다.');
      });

      return () => {
        subscription && subscription.remove();
      };
    }
  }, []);

  useEffect(() => {
    if (Platform.OS !== 'web') {
      const saveDailyData = async () => {
        const user = auth.currentUser;
        if (!user) return;

        const userRef = doc(db, 'users', user.uid);
        const recordRef = doc(collection(userRef, 'records'), todayKey);

        await setDoc(recordRef, {
          steps: stepCount,
          calories,
          date: todayKey,
          createdAt: new Date(),
        });
      };

      saveDailyData();
    }
  }, [stepCount]);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#E6F4EE' }}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>STATISTICS</Text>

        <View style={styles.infoRow}>
          <View style={styles.infoBox}>
            <Text style={styles.infoLabel}>🔥오늘 칼로리 소모🔥</Text>
            <Text style={styles.infoValue}>{calories} kcal</Text>
            <Text style={styles.infoSub}>현재 걸음 수 : {stepCount} 보</Text>
            {Platform.OS === 'web' && (
              <Text style={{ fontSize: 12, color: '#888', marginTop: 4 }}>
                (웹에서는 실시간 측정이 꺼져 있어요)
              </Text>
            )}
          </View>

          <View style={styles.infoBox}>
            <Text style={styles.infoLabel}>💰이번 달 절약금액💰</Text>
            <Text style={styles.infoValue}>계산 필요</Text>
            <Text style={styles.infoSub}>절약 로직 추가 가능</Text>
          </View>
        </View>

        <View style={styles.chartSection}>
          <Text style={styles.chartTitle}>↕ 주간 걸음 수 ↕</Text>
          <BarChart
            data={{
              labels: ['월', '화', '수', '목', '금', '토', '일'],
              datasets: [{ data: weeklyData }],
            }}
            width={screenWidth - 48}
            height={220}
            fromZero
            yAxisLabel=""
            yAxisSuffix=" 보"
            chartConfig={{
              backgroundColor: '#fff',
              backgroundGradientFrom: '#fff',
              backgroundGradientTo: '#fff',
              decimalPlaces: 0,
              color: () => '#29735C',
              labelColor: () => '#333',
              barPercentage: 0.5,
            }}
            style={styles.chart}
          />
        </View>

        <Text style={styles.sectionTitle}>월간 기록</Text>
        <Calendar
          markedDates={{
            [todayKey]: { selected: true, selectedColor: '#90EE90' },
            ...markedDates,
          }}
          theme={{
            calendarBackground: '#fff',
            todayTextColor: '#00adf5',
            arrowColor: '#37966F',
            textDayFontWeight: '500',
          }}
        />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#E6F4EE',
    paddingVertical: 30,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    gap: 12,
    marginBottom: 20,
  },
  infoBox: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 12,
    alignItems: 'center',
    elevation: 2,
  },
  infoLabel: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 6,
    textAlign: 'center',
  },
  infoValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#29735C',
  },
  infoSub: {
    fontSize: 12,
    color: '#666',
    marginTop: 6,
    textAlign: 'center',
  },
  chartSection: {
    width: '100%',
    marginTop: 16,
    marginBottom: 24,
    alignItems: 'center',
  },
  chartTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#444',
  },
  chart: {
    borderRadius: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginVertical: 20,
    color: '#333',
  },
});
