import { Stack } from 'expo-router';

import { PregnancyProvider } from '@/app/context/PregnancyContext';

import { MeasurementProvider } from '@/app/context/MeasurementContext';

import { DailyRecordsProvider } from '@/app/context/DailyRecordsContext';

// ============================================
// ROOT LAYOUT
// ============================================

export default function RootLayout() {
  return (
    <PregnancyProvider>
      <MeasurementProvider>
        <DailyRecordsProvider>

          <Stack
            screenOptions={{
              headerShown: false,
            }}
          >

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

            <Stack.Screen
              name="mi-dispositivo"
              options={{
                headerShown: false,
              }}
            />

          </Stack>

        </DailyRecordsProvider>
      </MeasurementProvider>
    </PregnancyProvider>
  );
}