import { useEffect } from 'react';

import {
  ActivityIndicator,
  StyleSheet,
  View,
} from 'react-native';

import { router } from 'expo-router';

import { isOnboardingCompleted } from '@/services/onboardingStorage';

// ============================================
// S.O.I. - PANTALLA DE ENTRADA
// ============================================

export default function EntryScreen() {

  useEffect(() => {

    let active = true;

    const checkOnboarding = async () => {

      try {

        // Consultar si la usuaria completó el onboarding
        const completed = await isOnboardingCompleted();

        console.log(
          'S.O.I. - Onboarding completado:',
          completed
        );

        if (!active) return;

        // Navegar según el estado del onboarding
        if (completed) {

          router.replace('/(tabs)');

        } else {

          router.replace('/onboarding');

        }

      } catch (error) {

        console.error(
          'Error verificando onboarding:',
          error
        );

        if (active) {
          router.replace('/onboarding');
        }

      }

    };

    checkOnboarding();

    return () => {
      active = false;
    };

  }, []);

  return (
    <View style={styles.container}>

      <ActivityIndicator
        size="large"
        color="#A85F3D"
      />

    </View>
  );
}

// ============================================
// ESTILOS
// ============================================

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#F8F4EF',
    justifyContent: 'center',
    alignItems: 'center',
  },

});