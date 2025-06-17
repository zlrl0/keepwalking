import { FontAwesome5, Ionicons, MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';

export default function ChallengeBottomTab() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      {/* ← 버튼 누르면 ChallengeScreen으로 이동 */}
      <TouchableOpacity onPress={() => router.push('/screens/ChallengeScreen')}>
        <Ionicons name="chevron-back" size={24} color="#444" />
      </TouchableOpacity>

      <TouchableOpacity onPress={() => router.push('/ch_nv/medal')}>
        <FontAwesome5 name="medal" size={24} color="#fbbc04" />
      </TouchableOpacity>

      <TouchableOpacity onPress={() => router.push('/ch_nv/my')}>
        <MaterialIcons name="check-circle" size={24} color="#ef4444" />
      </TouchableOpacity>

      <TouchableOpacity onPress={() => router.push('/ch_nv/walking-king')}>
        <FontAwesome5 name="crown" size={24} color="#9c27b0" />
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
});
