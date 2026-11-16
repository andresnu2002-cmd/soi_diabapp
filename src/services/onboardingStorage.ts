import AsyncStorage from '@react-native-async-storage/async-storage';

// ============================================
// ALMACENAMIENTO ONBOARDING S.O.I.
// ============================================

const ONBOARDING_KEY = '@soi_onboarding_completed';

// ============================================
// VERIFICAR SI EL ONBOARDING ESTÁ COMPLETADO
// ============================================

export const isOnboardingCompleted = async (): Promise<boolean> => {
  try {
    const value = await AsyncStorage.getItem(ONBOARDING_KEY);

    return value === 'true';

  } catch (error) {
    console.error(
      'Error consultando el estado del onboarding:',
      error
    );

    return false;
  }
};

// ============================================
// MARCAR ONBOARDING COMO COMPLETADO
// ============================================

export const completeOnboarding = async (): Promise<void> => {
  try {
    await AsyncStorage.setItem(
      ONBOARDING_KEY,
      'true'
    );

  } catch (error) {
    console.error(
      'Error guardando el onboarding:',
      error
    );

    throw error;
  }
};

// ============================================
// REINICIAR ONBOARDING (SOLO PARA PRUEBAS)
// ============================================

export const resetOnboarding = async (): Promise<void> => {
  try {
    await AsyncStorage.removeItem(ONBOARDING_KEY);

  } catch (error) {
    console.error(
      'Error reiniciando el onboarding:',
      error
    );

    throw error;
  }
};