import { colors } from '@/styles/global';
import { Ionicons } from '@expo/vector-icons';
import { Tabs, router } from 'expo-router';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: colors.background,
          borderTopColor: colors.surface,
        },
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.textSecondary,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Inicio',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home" size={size} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="add-meal"
        options={{
          title: 'Seguimiento',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="add-circle" size={size} color={color} />
          ),
        }}
      />

           <Tabs.Screen
        name="cita"
        options={{
          title: 'Cita',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="calendar" size={size} color={color} />
          ),
        }}
        listeners={{
          tabPress: (e) => {
            e.preventDefault();
            router.navigate('/(tabs)/cita');
          },
        }}
      />


      <Tabs.Screen
        name="meals"
        options={{
          title: 'Aprender',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="list" size={size} color={color} />
          ),
        }}
      />

 
<Tabs.Screen
  name="yo"
  options={{
    title: 'Yo',
    tabBarIcon: ({ color, size }) => (
      <Ionicons name="person-circle" size={size} color={color} />
    ),
  }}
  listeners={{
    tabPress: (e) => {
      e.preventDefault();
      router.navigate('/(tabs)/yo');
    },
  }}
/>
    </Tabs>






  );
}