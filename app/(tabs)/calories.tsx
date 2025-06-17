import { router } from 'expo-router';
import React from 'react';
import {
    Dimensions,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { Calendar } from 'react-native-calendars';
import { BarChart } from 'react-native-chart-kit';

const screenWidth = Dimensions.get('window').width;

export default function CaloriesScreen() {
  const weeklyCalories = [210, 120, 200, 180, 300, 160, 220];
  const weeklySavings = [1800, 2000, 1200, 3000, 3300, 2400, 2500];

  const markedDates = {
  '2025-06-01': { selected: true, selectedColor: '#90EE90' },
  '2025-06-02': { selected: true, selectedColor: '#FFB6C1' },
  '2025-06-03': { selected: true, selectedColor: '#90EE90' },
  '2025-06-04': { selected: true, selectedColor: '#FFB6C1' },
  '2025-06-05': { selected: true, selectedColor: '#FFB6C1' },
  '2025-06-06': { selected: true, selectedColor: '#90EE90' },
  '2025-06-07': { selected: true, selectedColor: '#FFB6C1' },
  '2025-06-08': { selected: true, selectedColor: '#90EE90' },
  '2025-06-09': { selected: true, selectedColor: '#FFB6C1' },
  '2025-06-10': { selected: true, selectedColor: '#90EE90' },
  '2025-06-11': { selected: true, selectedColor: '#FFB6C1' },
  '2025-06-12': { selected: true, selectedColor: '#FFB6C1' },
  '2025-06-13': { selected: true, selectedColor: '#90EE90' },
  '2025-06-14': { selected: true, selectedColor: '#90EE90' },
  '2025-06-15': { selected: true, selectedColor: '#90EE90' },
  '2025-06-16': { selected: true, selectedColor: '#90EE90' },
};


  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#E6F4EE' }}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>STATISTICS</Text>

        <View style={styles.infoRow}>
          <View style={styles.infoBox}>
            <Text style={styles.infoLabel}>🔥이번 주 칼로리 소모량🔥</Text>
            <Text style={styles.infoValue}>4053kcal</Text>
            <Text style={styles.infoSub}>🍕피자 2판 소모!</Text>
          </View>
          <View style={styles.infoBox}>
            <Text style={styles.infoLabel}>💰이번 달 절약금액💰</Text>
            <Text style={styles.infoValue}>40500원</Text>
            <Text style={styles.infoSub}>이번 달 목표 금액까지 67300원 남았어요</Text>
          </View>
        </View>

        <View style={styles.chartSection}>
          <Text style={styles.chartTitle}>↕ 주간 걸음 수 ↕</Text>
          <BarChart
            data={{
              labels: ['월', '화', '수', '목', '금', '토', '일'],
              datasets: [{ data: weeklyCalories }],
            }}
            width={Dimensions.get('window').width - 48}
            height={220}
            fromZero
            yAxisSuffix=" kcal"
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

          <Text style={styles.comment}>평소보다 53보 더 걸었어요 ~</Text>
          <Text style={styles.comment}>🏃 105보 더 걸으면 주간 신기록 달성!</Text>

          <TouchableOpacity onPress={() => router.push('ChallengeScreen')}>
            <View style={styles.alertBox}>
             <Text style={styles.alertText}>😥 아직 완료하지 못한 챌린지가 있어요</Text>
            </View>
          </TouchableOpacity>
        </View>

        <View style={styles.chartSection}>
          <Text style={styles.chartTitle}>💸 주간 절약 금액 💸</Text>
          <BarChart
            data={{
              labels: ['월', '화', '수', '목', '금', '토', '일'],
              datasets: [{ data: weeklySavings }],
            }}
            width={Dimensions.get('window').width - 48}
            height={220}
            fromZero
            yAxisSuffix="₩"
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
          markedDates={markedDates}
          theme={{
            calendarBackground: '#fff',
            todayTextColor: '#00adf5',
            arrowColor: '#37966F',
            textDayFontWeight: '500',
          }}
        />

        <View style={styles.legendBox}>
          <View style={styles.legendRow}>
            <View style={[styles.colorDot, { backgroundColor: '#90EE90' }]} />
            <Text style={styles.legendText}>목표 달성 9일</Text>
            <Text style={[styles.legendText, { marginLeft: 20 }]}>
              이번 달 성공률 : 30%
            </Text>
          </View>
          <View style={styles.legendRow}>
            <View style={[styles.colorDot, { backgroundColor: '#FFB6C1' }]} />
            <Text style={styles.legendText}>미달성 22일</Text>
            <Text style={[styles.legendText, { marginLeft: 20 }]}>
              최다 연속 성공일 : 4일
            </Text>
          </View>
        </View>
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
  comment: {
    fontSize: 12,
    color: '#333',
    marginTop: 6,
  },
  alertBox: {
    backgroundColor: '#FFDADA',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginTop: 12,
  },
  alertText: {
    fontSize: 12,
    color: '#880000',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginVertical: 20,
    color: '#333',
  },
  legendBox: {
    width: '100%',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 14,
    marginVertical: 20,
  },
  legendRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  colorDot: {
    width: 14,
    height: 14,
    borderRadius: 3,
    marginRight: 8,
  },
  legendText: {
    fontSize: 13,
    color: '#444',
  },
});
