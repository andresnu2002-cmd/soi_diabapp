import { Stack } from 'expo-router';
import { PregnancyProvider } from '@/app/context/PregnancyContext';

export default function RootLayout() {
  return (
    <PregnancyProvider>
      <Stack screenOptions={{ headerShown: false }}>

        <Stack.Screen name="(tabs)" />

        <Stack.Screen
          name="registrar-bienestar"
          options={{
            headerShown: false,
          }}
        />

        <Stack.Screen
          name="personalizar-soi"
          options={{
            headerShown: false,
          }}
        />

        <Stack.Screen
          name="mi-embarazo"
          options={{
            headerShown: false,
          }}
        />

      </Stack>
    </PregnancyProvider>
  );
}