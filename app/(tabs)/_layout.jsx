// app/tabs/_layout.jsx
import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: 'black',
      }}
    >
      <Tabs.Screen
        name="mytrip"
        options={{
          tabBarLabel: 'My Trip',
          tabBarIcon: ({ color }) => <Ionicons name="location-sharp" size={24} color={color} />,
        }}
      />

      <Tabs.Screen
        name="profile"
        options={{
          tabBarLabel: 'Profile',
          tabBarIcon: ({ color }) => <Ionicons name="people-circle-sharp" size={24} color={color} />,
        }}
      />
    </Tabs>
  );
}