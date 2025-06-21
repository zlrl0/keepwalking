// app/screens/CreateChallengeScreen.tsx
import { useRouter } from 'expo-router';
import { addDoc, collection } from 'firebase/firestore';
import React, { useState } from 'react';
import { Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { auth, db } from '../../firebase/firebaseConfig';

export default function CreateChallengeScreen() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const router = useRouter();

  const handleCreate = async () => {
    const user = auth.currentUser;
    if (!user) {
      Alert.alert('로그인이 필요합니다.');
      return;
    }

    if (!title || !description) {
      Alert.alert('제목과 설명을 모두 입력하세요.');
      return;
    }

    try {
      const userChallengesRef = collection(db, 'challenges', user.uid, 'myChallenges');
      await addDoc(userChallengesRef, {
        title,
        description,
        createdAt: new Date(),
      });

      Alert.alert('챌린지가 생성되었습니다!');
      router.replace('/screens/CreateChallengeScreen'); // 경로에 맞게 수정
    } catch (error) {
      console.error('챌린지 저장 실패', error);
      Alert.alert('챌린지 저장 중 오류 발생');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>챌린지 만들기</Text>
      <TextInput
        style={styles.input}
        placeholder="챌린지 제목"
        value={title}
        onChangeText={setTitle}
      />
      <TextInput
        style={styles.input}
        placeholder="설명"
        value={description}
        onChangeText={setDescription}
      />
      <TouchableOpacity style={styles.button} onPress={handleCreate}>
        <Text style={styles.buttonText}>저장</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, justifyContent: 'center' },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 20, textAlign: 'center' },
  input: { borderWidth: 1, borderColor: '#ccc', padding: 12, marginBottom: 16, borderRadius: 8 },
  button: { backgroundColor: '#fef6e4', padding: 14, borderRadius: 20, alignItems: 'center' },
  buttonText: { fontSize: 14, fontWeight: 'bold' },
});
