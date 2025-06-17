import { Ionicons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';

export default function TabLayout() {
  return (
    <Tabs>
      <Tabs.Screen
        name="main"
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home" size={size} color={color} />
          ),
          tabBarLabel: () => null,
          headerShown: false,
        }}
      />
      <Tabs.Screen
        name="navigation"
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="map" size={size} color={color} />
          ),
          tabBarLabel: () => null,
          headerShown: false,
        }}
      />
      <Tabs.Screen
        name="calories"
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="flame" size={size} color={color} />
          ),
          tabBarLabel: () => null,
          headerShown: false,
        }}
      />
      <Tabs.Screen
        name="info"
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="notifications" size={size} color={color} />
          ),
          tabBarLabel: () => null,
          headerShown: false,
        }}
      />
      <Tabs.Screen
        name="ChallengeScreen"
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="trophy" size={size} color={color} />
          ),
          tabBarLabel: () => null,
          headerShown: false,
          tabBarStyle: { display: 'none' },
        }}
        
      />
    </Tabs>
  );
}
