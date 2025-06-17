import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useChallenge } from '../context/ChallengeContext';

export default function CreateChallengeScreen() {
  const router = useRouter();
  const { addChallenge } = useChallenge();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleCreate = () => {
    addChallenge({
      id: Date.now().toString(),
      title,
      description,
      progress: 0,
      total: 5,
    });
    router.replace('/ch_nv/my');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>챌린지 만들기</Text>
      <TextInput placeholder="제목" style={styles.input} value={title} onChangeText={setTitle} />
      <TextInput
        placeholder="설명"
        style={[styles.input, { height: 100 }]}
        multiline
        value={description}
        onChangeText={setDescription}
      />
      <TouchableOpacity style={styles.button} onPress={handleCreate}>
        <Text style={styles.buttonText}>만들기</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 24, backgroundColor: '#fff' },
  title: { fontSize: 20, fontWeight: 'bold', marginBottom: 20 },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
  },
  button: {
    backgroundColor: '#4caf50',
    padding: 14,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 12,
  },
  buttonText: { color: '#fff', fontWeight: 'bold' },
});
