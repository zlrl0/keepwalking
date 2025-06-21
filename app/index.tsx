// app/index.tsx
import { useRouter } from 'expo-router';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useState } from 'react';
import { Alert, Button, StyleSheet, TextInput, View } from 'react-native';
import { auth } from '../firebase/firebaseConfig';

export default function Home() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleLogin = async () => {
    if (!email || !password) return Alert.alert('모든 항목을 입력하세요.');
    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.push('/main'); // 로그인 성공 시 메인화면으로 이동
    } catch (err: any) {
      Alert.alert('로그인 실패', err.message);
    }
  };

  const goToRegister = () => {
    router.push('/RegisterScreen'); // 회원가입 페이지로 이동
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="이메일"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
        keyboardType="email-address"
      />
      <TextInput
        placeholder="비밀번호"
        value={password}
        onChangeText={setPassword}
        style={styles.input}
        secureTextEntry
      />
      <Button title="로그인" onPress={handleLogin} />
      <View style={{ marginVertical: 10 }} />
      <Button title="회원가입" onPress={goToRegister} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 20 },
  input: {
    borderBottomWidth: 1,
    marginBottom: 12,
    paddingVertical: 8,
  },
});
