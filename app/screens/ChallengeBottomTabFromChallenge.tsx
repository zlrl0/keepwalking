import { useRouter } from 'expo-router';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function ChallengeBottomTab() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => router.push('/main')}>
        <Text style={styles.tabText}>←</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => router.push('/ch_nv/medal')}>
        <Text style={styles.tabText}>🥇</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => router.push('/ch_nv/my')}>
        <Text style={styles.tabText}>✔</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => router.push('/ch_nv/walking-king')}>
        <Text style={styles.tabText}>👑</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 25,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#ddd',
    position: 'absolute',
    bottom: 0,
    width: '100%',
    zIndex: 999,
    elevation: 10,
  },
  tabText: {
    fontSize: 16,
    color: '#333',
  },
});
