import React, { useEffect, useState } from 'react';
import {
  Alert,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

interface InfoCardProps {
  title: string;
  subtitle?: string;
  emoji: string;
  showStar?: boolean;
  initiallyFav?: boolean;
  onToggle?: () => void;
  onPress?: () => void;
}

export default function InfoCard({
  title,
  subtitle,
  emoji,
  showStar = false,
  initiallyFav = true,
  onToggle,
  onPress,
}: InfoCardProps) {
  const [isFav, setIsFav] = useState<boolean>(initiallyFav);

  useEffect(() => {
    setIsFav(initiallyFav);
  }, [initiallyFav]);

  const toggleFav = () => {
    const nextFav = !isFav;
    setIsFav(nextFav);
    onToggle?.();

    const message = `${title} 항목이 ${nextFav ? '추가' : '해제'}되었습니다.`;

    if (Platform.OS === 'web') {
      window.alert(message);
    } else {
      Alert.alert(
        nextFav ? '⭐ 즐겨찾기 추가됨' : '☆ 즐겨찾기 해제됨',
        message,
        [{ text: '확인' }]
      );
    }
  };

  return (
    <TouchableOpacity onPress={onPress} style={styles.cardWrapper}>
      {showStar && (
        <TouchableOpacity onPress={toggleFav} style={styles.starButton}>
          <Text style={styles.starText}>{isFav ? '⭐' : '☆'}</Text>
        </TouchableOpacity>
      )}

      <View style={styles.textWrapper}>
        <Text style={styles.titleText}>
          {emoji} {title}
        </Text>
        {subtitle && <Text style={styles.subtitleText}>{subtitle}</Text>}
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  cardWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    width: '100%',
  },
  starButton: {
    marginRight: 8,
  },
  starText: {
    fontSize: 18,
  },
  textWrapper: {
    flex: 1,
  },
  titleText: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  subtitleText: {
    fontSize: 14,
    color: '#666',
  },
});
