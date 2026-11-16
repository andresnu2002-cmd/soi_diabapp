import { Stack } from 'expo-router';

import { PregnancyProvider } from '@/app/context/PregnancyContext';
import { MeasurementProvider } from '@/app/context/MeasurementContext';
import { DailyRecordsProvider } from '@/app/context/DailyRecordsContext';

// ============================================
// ROOT LAYOUT - S.O.I.
// ============================================

export default function RootLayout() {
  return (
    <PregnancyProvider>
      <MeasurementProvider>
        <DailyRecordsProvider>

          <Stack
            screenOptions={{
              headerShown: false,
              animation: 'slide_from_right',
            }}
          >

            {/* ================================= */}
            {/* PANTALLA DE ENTRADA */}
            {/* ================================= */}

            <Stack.Screen
              name="index"
              options={{
                headerShown: false,
              }}
            />

            {/* ================================= */}
            {/* ONBOARDING - 8 PASOS */}
            {/* ================================= */}

            <Stack.Screen
              name="onboarding"
              options={{
                headerShown: false,
                gestureEnabled: false,
              }}
            />

            {/* ================================= */}
            {/* NAVEGACIÓN PRINCIPAL */}
            {/* ================================= */}

            <Stack.Screen
              name="(tabs)"
              options={{
                headerShown: false,
              }}
            />

            {/* ================================= */}
            {/* REGISTROS */}
            {/* ================================= */}

            <Stack.Screen
              name="registrar-bienestar"
              options={{
                headerShown: false,
              }}
            />

            {/* ================================= */}
            {/* PERSONALIZACIÓN S.O.I. */}
            {/* ================================= */}

            <Stack.Screen
              name="personalizar-soi"
              options={{
                headerShown: false,
              }}
            />

            {/* ================================= */}
            {/* EMBARAZO */}
            {/* ================================= */}

            <Stack.Screen
              name="mi-embarazo"
              options={{
                headerShown: false,
              }}
            />

            {/* ================================= */}
            {/* DISPOSITIVO */}
            {/* ================================= */}

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