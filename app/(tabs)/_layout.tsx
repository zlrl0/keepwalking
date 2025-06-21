import { Tabs } from 'expo-router';

export default function TabLayout() {
  return (
    <Tabs>
      <Tabs.Screen
        name="main"
        options={{
          tabBarLabel: '🏠',
          headerShown: false,
        }}
      />
      <Tabs.Screen
        name="navigation"
        options={{
          tabBarLabel: '🗺️',
          headerShown: false,
        }}
      />
      <Tabs.Screen
        name="calories"
        options={{
          tabBarLabel: '🔥',
          headerShown: false,
        }}
      />
      <Tabs.Screen
        name="info"
        options={{
          tabBarLabel: '🔔',
          headerShown: false,
        }}
      />
      <Tabs.Screen
        name="ChallengeScreen"
        options={{
          tabBarLabel: '🏆',
          headerShown: false,
          tabBarStyle: { display: 'none' },
        }}
      />
    </Tabs>
  );
}
