import { Ionicons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';

const colors = {
  white: '#FFFFFF',
  terracotta: '#A85F3D',
  muted: '#B99B86',
};

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,

        tabBarLabelPosition: 'below-icon',
        tabBarShowLabel: true,

        tabBarStyle: {
          backgroundColor: colors.white,
          borderTopWidth: 1,
          borderTopColor: '#F0E8DF',
          height: 75,
          paddingTop: 0,
          paddingBottom: 20,
          elevation: 0,
          shadowOpacity: 0,
        },

        tabBarActiveTintColor: colors.terracotta,
        tabBarInactiveTintColor: colors.muted,

        tabBarLabelStyle: {
          fontSize: 9,
          fontWeight: '400',
          marginTop: 2,
        },

        tabBarIconStyle: {
          marginBottom: 0,
        },

        tabBarItemStyle: {
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          paddingVertical: 0,
        },
      }}
    >

      <Tabs.Screen
        name="index"
        options={{
          title: 'Inicio',
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name={focused ? 'home' : 'home-outline'}
              size={20}
              color={color}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="seguimiento"
        options={{
          title: 'Progreso',
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name={focused ? 'stats-chart' : 'stats-chart-outline'}
              size={20}
              color={color}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="resultado"
        options={{
          title: 'Resultados',
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name={focused ? 'document-text' : 'document-text-outline'}
              size={20}
              color={color}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="aprender"
        options={{
          title: 'Aprender',
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name={focused ? 'book' : 'book-outline'}
              size={20}
              color={color}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="yo"
        options={{
          title: 'Mis datos',
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name={focused ? 'person' : 'person-outline'}
              size={20}
              color={color}
            />
          ),
        }}
      />

      <Tabs.Screen
  name="tu_progreso"
  options={{
    href: null,
    headerShown: false,
  }}
/>

    </Tabs>
    
  );
}