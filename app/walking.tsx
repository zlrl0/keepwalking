// app/walking.tsx
import { useLocalSearchParams } from 'expo-router';
import { StyleSheet, View } from 'react-native';
import { WebView } from 'react-native-webview';

export default function WalkingScreen() {
  const { url } = useLocalSearchParams();

  return (
    <View style={styles.container}>
      <WebView source={{ uri: url as string }} style={{ flex: 1 }} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
});
