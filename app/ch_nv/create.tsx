import { useRouter } from 'expo-router';
import { addDoc, collection } from 'firebase/firestore';
import React, { useState } from 'react';
import { Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { auth, db } from '../../firebase/firebaseConfig'; // ✅ 경로 주의!

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

    if (!title.trim() || !description.trim()) {
      Alert.alert('제목과 설명을 모두 입력해주세요.');
      return;
    }

    try {
      await addDoc(collection(db, 'challenges', user.uid, 'myChallenges'), {
        title,
        description,
        createdAt: new Date(),
      });

      Alert.alert('챌린지가 저장되었습니다!');
      router.replace('/screens/MyChallengesScreen'); // ✅ 또는 /main 등 홈화면 경로로 수정
    } catch (error) {
      console.error('챌린지 저장 실패:', error);
      Alert.alert('저장 중 오류가 발생했습니다.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>나만의 챌린지 만들기</Text>

      <TextInput
        style={styles.input}
        placeholder="챌린지 제목"
        value={title}
        onChangeText={setTitle}
      />

      <TextInput
        style={[styles.input, { height: 100 }]}
        placeholder="챌린지 설명"
        multiline
        value={description}
        onChangeText={setDescription}
      />

      <TouchableOpacity style={styles.button} onPress={handleCreate}>
        <Text style={styles.buttonText}>저장하기</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => router.back()}>
        <Text style={styles.cancelText}>← 뒤로가기</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fefefe',
    padding: 24,
    justifyContent: 'center',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 24,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    padding: 12,
    marginBottom: 16,
    fontSize: 15,
    backgroundColor: '#fff',
  },
  button: {
    backgroundColor: '#fef6e4',
    padding: 14,
    borderRadius: 20,
    alignItems: 'center',
    marginBottom: 12,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  cancelText: {
    textAlign: 'center',
    color: '#888',
    marginTop: 4,
  },
});
