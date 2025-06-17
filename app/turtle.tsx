import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import * as Progress from 'react-native-progress';

export default function TurtleScreen() {
  const router = useRouter();

  return (
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
        bounces={false} // 👈 iOS에서 튕김 방지
      >
        {/* Back Button */}
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="chevron-back" size={28} color="black" />
        </TouchableOpacity>

        <Text style={styles.title}>쿵야 키우기</Text>

        <View style={styles.progressWrapper}>
          <Text style={styles.levelText}>lv. 5</Text>
          <Progress.Bar
            progress={0.5}
            width={200}
            height={10}
            color="#4CAF50"
            borderRadius={5}
            unfilledColor="#E0E0E0"
            borderWidth={0}
          />
        </View>

        <Image
          source={require('../assets/images/egg.png')}
          style={styles.eggImage}
          resizeMode="contain"
        />

        <Text style={styles.challengeText}>다음 레벨까지 남은 챌린지 3개!</Text>

        <View style={styles.pointBox}>
          <View style={styles.pointRow}>
            <Text style={styles.pointLabelBold}>모은콩</Text>
            <Text style={styles.pointValueBold}>5280콩</Text>
          </View>
          <View style={styles.pointRow}>
            <Text style={styles.pointLabel}>오늘의 미션 1 완료</Text>
            <Text style={styles.pointValue}>+220콩</Text>
          </View>
          <View style={styles.pointRow}>
            <Text style={styles.pointLabel}>걷기왕 n등 달성</Text>
            <Text style={styles.pointValue}>+500콩</Text>
          </View>
        </View>
      </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    alignItems: 'center',
    backgroundColor: '#E9F5EE',
    paddingTop: 10,
    paddingBottom: 10, // 👈 여백 줄이기
    minHeight: '100%', // 👈 이거 추가해서 빈 공간 방지
  },
  backButton: {
    alignSelf: 'flex-start',
    marginLeft: 20,
    marginBottom: 4,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 10,
  },
  progressWrapper: {
    backgroundColor: '#fff',
    width: '88%',
    alignItems: 'center',
    paddingVertical: 12,
    borderRadius: 16,
    marginBottom: 14,
    elevation: 2,
  },
  levelText: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 6,
  },
  eggImage: {
    width: 140,
    height: 140,
    marginVertical: 12,
  },
  challengeText: {
    fontSize: 14,
    fontWeight: '500',
    marginVertical: 8,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 12,
  },
  pointBox: {
    width: '88%',
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    elevation: 2,
    marginTop: 10,
  },
  pointRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  pointLabel: {
    fontSize: 14,
    color: '#333',
  },
  pointLabelBold: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#000',
  },
  pointValue: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#2E7D32',
  },
  pointValueBold: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#000',
  },
});
