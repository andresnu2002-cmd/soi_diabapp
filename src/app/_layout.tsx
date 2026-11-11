import { Stack } from 'expo-router';

import { PregnancyProvider } from '@/app/context/PregnancyContext';
import { MeasurementProvider } from '@/app/context/MeasurementContext';

export default function RootLayout() {
  return (
    <PregnancyProvider>
      <MeasurementProvider>
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="(tabs)" />

          <Stack.Screen
            name="registrar-bienestar"
            options={{ headerShown: false }}
          />

          <Stack.Screen
            name="personalizar-soi"
            options={{ headerShown: false }}
          />

          <Stack.Screen
            name="mi-embarazo"
            options={{ headerShown: false }}
          />

          <Stack.Screen
            name="mi-dispositivo"
            options={{ headerShown: false }}
          />
        </Stack>
      </MeasurementProvider>
    </PregnancyProvider>
  );
}