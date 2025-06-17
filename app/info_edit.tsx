import React from 'react';
import { View, Text, StyleSheet, FlatList, ListRenderItem } from 'react-native';
import InfoCard from '../components/InfoCard';
import { useFavorites } from '../context/FavoriteContext';

type CardItem = {
  id: string;
  title: string;
  emoji: string;
};

const cardData: CardItem[] = [
  { id: '1', title: '수업 정보', emoji: '📘' },
  { id: '2', title: '도서관 예약', emoji: '📚' },
  { id: '3', title: '셔틀버스', emoji: '🚌' },
  { id: '4', title: '축제', emoji: '🎉' },
];

export default function InfoEditScreen() {
  const { favorites, setFavorites } = useFavorites();

  const handleToggle = (title: string) => {
    setFavorites((prev: string[]) =>
      prev.includes(title)
        ? prev.filter((item) => item !== title)
        : [...prev, title]
    );
  };

  const renderItem: ListRenderItem<CardItem> = ({ item }) => (
    <View style={styles.card}>
      <InfoCard
        title={item.title}
        emoji={item.emoji}
        showStar={true}
        initiallyFav={favorites.includes(item.title)}
        onToggle={() => handleToggle(item.title)}
      />
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>통합정보 즐겨찾기</Text>
      <FlatList
        data={cardData}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        numColumns={2}
        contentContainerStyle={styles.grid}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E8F6EC',
    paddingTop: 60,
  },
  header: {
    marginLeft: 16,
    fontSize: 16,
    color: '#888',
    marginBottom: 12,
  },
  grid: {
    paddingHorizontal: 8,
  },
  card: {
    width: '45%',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    margin: '2.5%',
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 2,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
});