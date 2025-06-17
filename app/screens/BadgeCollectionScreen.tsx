// ✅ app/screens/BadgeCollectionScreen.tsx
import React, { useState } from 'react';
import { Image, Modal, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import badgeBeginner from '../../assets/badge-beginner.png';
import badgeChallenge from '../../assets/badge-challenge.png';
import badgeFirst from '../../assets/badge-first.png';
import badgeGod from '../../assets/badge-god.png';
import lockIcon from '../../assets/badge-lock.png';
import ChallengeBottomTab from './ChallengeBottomTab';

interface Badge {
  id: string;
  name: string;
  description: string;
  image: any;
  unlocked: boolean;
}

const badges: Badge[] = [
  { id: 'first-step', name: '첫 걸음마', description: '나의 첫 기록', image: badgeFirst, unlocked: true },
  { id: 'beginner', name: '걷기 초보자', description: '1일 만보 달성', image: badgeBeginner, unlocked: true },
  { id: 'school', name: '학교탐험가', description: '교내 루트 달성', image: lockIcon, unlocked: false },
  { id: 'challenge-king', name: '도전왕', description: '한달 연속 오늘의 챌린지 성공', image: badgeChallenge, unlocked: true },
  { id: 'god-of-walk', name: '걷기의 신', description: '누적 100만 보 달성', image: badgeGod, unlocked: true },
  { id: 'steady', name: '꾸준 거북이', description: '일주일 연속 걸음 기록', image: lockIcon, unlocked: false },
];

export default function BadgeCollectionScreen() {
  const [selectedBadge, setSelectedBadge] = useState<Badge | null>(null);
  const [showToast, setShowToast] = useState(false);

  const handleBadgePress = (badge: Badge) => {
    if (badge.unlocked) {
      setSelectedBadge(badge);
    } else {
      setShowToast(true);
      setTimeout(() => setShowToast(false), 1000);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.contentWrapper}>
        <Text style={styles.title}>나의 뱃지 🥇 컬렉션</Text>
        <Text style={styles.sub}>총 a개 / n개 수집 완료</Text>

        <View style={styles.tabRow}>
          <Text style={styles.activeTab}>전체보기</Text>
          <Text style={styles.tab}>최근 획득 순</Text>
          <Text style={styles.tab}>카테고리별</Text>
        </View>

        <ScrollView contentContainerStyle={styles.badgeGrid}>
          {badges.map((badge) => (
            <TouchableOpacity
              key={badge.id}
              style={[styles.badgeCard, !badge.unlocked && styles.locked]}
              onPress={() => handleBadgePress(badge)}
              activeOpacity={badge.unlocked ? 0.7 : 1}
            >
              <View style={styles.badgeImageContainer}>
                <Image source={badge.image} style={styles.badgeImage} />
              </View>
              <Text style={styles.badgeName}>{badge.name}</Text>
              <Text style={styles.badgeDesc}>{badge.unlocked ? badge.description : ''}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* 잠금 토스트 */}
        {showToast && (
          <View style={styles.toast}>
            <Text style={styles.toastText}>아직 수집하지 못했습니다</Text>
          </View>
        )}

        {/* 팝업 */}
        <Modal visible={!!selectedBadge} transparent animationType="fade">
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <TouchableOpacity style={styles.closeBtn} onPress={() => setSelectedBadge(null)}>
                <Text style={styles.closeText}>X</Text>
              </TouchableOpacity>
              {selectedBadge && (
                <>
                  <Image source={selectedBadge.image} style={styles.modalImageSmall} />
                  <Text style={styles.modalName}>{selectedBadge.name}</Text>
                  <Text style={styles.modalDesc}>{selectedBadge.description}</Text>
                </>
              )}
            </View>
          </View>
        </Modal>
      </View>

      <ChallengeBottomTab />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#eaf4ef' },
  contentWrapper: { flex: 1, paddingHorizontal: 20, paddingBottom: 100 },
  title: { fontSize: 18, fontWeight: 'bold', alignSelf: 'center', marginTop: 40 },
  sub: { textAlign: 'center', fontSize: 12, color: '#555', marginBottom: 16 },
  tabRow: { flexDirection: 'row', justifyContent: 'center', gap: 20, marginBottom: 20 },
  tab: { color: '#888', fontSize: 13 },
  activeTab: { fontWeight: 'bold', fontSize: 13, textDecorationLine: 'underline' },

  badgeGrid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', rowGap: 20 },
  badgeCard: {
    width: '48%',
    backgroundColor: '#fff6dc',
    borderRadius: 14,
    paddingTop: 10,
    paddingBottom: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 2,
  },
  badgeImageContainer: { width: '100%', alignItems: 'center', backgroundColor: 'transparent' },
  locked: { backgroundColor: '#ddd' },
  badgeImage: { width: 60, height: 60, resizeMode: 'contain', marginBottom: 8, marginTop: 12 },
  badgeName: { fontWeight: 'bold', fontSize: 13 },
  badgeDesc: { fontSize: 11, color: '#333', textAlign: 'center' },

  toast: {
    position: 'absolute',
    top: '45%',
    alignSelf: 'center',
    backgroundColor: 'white',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 5,
  },
  toastText: { fontSize: 14, color: '#222' },

  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#fffef3',
    padding: 20,
    width: '80%',
    borderRadius: 20,
    alignItems: 'center',
    elevation: 10,
  },
  modalImageSmall: { width: 100, height: 100, resizeMode: 'contain', marginBottom: 10 },
  modalName: { fontWeight: 'bold', fontSize: 16, marginTop: 8 },
  modalDesc: { fontSize: 13, marginTop: 4 },
  closeBtn: { position: 'absolute', top: 10, right: 14 },
  closeText: { fontSize: 16, fontWeight: 'bold' },
});
