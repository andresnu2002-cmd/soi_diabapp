import { useEffect, useState } from 'react';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {
  ActivityIndicator,
  Platform,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

// ============================================
// COLORES S.O.I.
// ============================================

const colors = {
  background: '#F8F4EF',
  white: '#FFFFFF',
  brown: '#704832',
  terracotta: '#A85F3D',
  muted: '#B99B86',
  border: '#E8DDD3',
  selected: '#F1DFD3',
};

// ============================================
// TIPOS DE PREFERENCIAS
// ============================================

type Preference =
  | 'understand_results'
  | 'glucose_tracking'
  | 'measurement_reminders'
  | 'prepare_appointments'
  | 'view_progress'
  | 'emotional_tracking'
  | 'habits_tracking'
  | 'share_medical_team';

// ============================================
// CLAVE DE ALMACENAMIENTO
// ============================================

const STORAGE_KEY = '@soi_onboarding_preferences';

// ============================================
// OPCIONES
// ============================================

const preferences: {
  id: Preference;
  label: string;
}[] = [
  {
    id: 'understand_results',
    label: 'Entender mis resultados',
  },
  {
    id: 'glucose_tracking',
    label: 'Llevar un registro de mi glucosa',
  },
  {
    id: 'measurement_reminders',
    label: 'Recordar mis mediciones',
  },
  {
    id: 'prepare_appointments',
    label: 'Prepararme para mis controles',
  },
  {
    id: 'view_progress',
    label: 'Ver cómo he evolucionado',
  },
  {
    id: 'emotional_tracking',
    label: 'Registrar cómo me siento',
  },
  {
    id: 'habits_tracking',
    label: 'Registrar alimentación y hábitos',
  },
  {
    id: 'share_medical_team',
    label: 'Compartir con mi equipo médico',
  },
];

// ============================================
// PANTALLA 7/8 - PREFERENCIAS
// ============================================

export default function PreferenciasOnboardingScreen() {
  const [selectedPreferences, setSelectedPreferences] =
    useState<Preference[]>([]);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  // ==========================================
  // RECUPERAR PREFERENCIAS GUARDADAS
  // ==========================================

  useEffect(() => {
    let active = true;

    const loadPreferences = async () => {
      try {
        const saved = await AsyncStorage.getItem(STORAGE_KEY);

        if (!active) return;

        if (saved) {
          const parsed: unknown = JSON.parse(saved);

          if (Array.isArray(parsed)) {
            const validPreferences = parsed.filter(
              (value): value is Preference =>
                typeof value === 'string' &&
                preferences.some(
                  (preference) => preference.id === value
                )
            );

            setSelectedPreferences(validPreferences);
          }
        }
      } catch (error) {
        console.error(
          'Error cargando preferencias:',
          error
        );
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    };

    loadPreferences();

    return () => {
      active = false;
    };
  }, []);

  // ==========================================
  // SELECCIÓN MÚLTIPLE
  // ==========================================

  const togglePreference = (preference: Preference) => {
    setSelectedPreferences((current) => {
      if (current.includes(preference)) {
        return current.filter(
          (item) => item !== preference
        );
      }

      return [...current, preference];
    });
  };

  // ==========================================
  // GUARDAR PREFERENCIAS
  // ==========================================

  const handleContinue = async () => {
    if (saving) return;

    try {
      setSaving(true);

      await AsyncStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(selectedPreferences)
      );

      console.log(
        'Preferencias guardadas:',
        selectedPreferences
      );
      router.push('/onboarding/monitoreo');

    } catch (error) {
      console.error(
        'Error guardando preferencias:',
        error
      );
    } finally {
      setSaving(false);
    }
  };

  // ==========================================
  // PANTALLA DE CARGA
  // ==========================================

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator
          size="large"
          color={colors.terracotta}
        />
      </View>
    );
  }

  // ==========================================
  // INTERFAZ
  // ==========================================

  return (
    <SafeAreaView style={styles.container}>

      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >

        {/* ================================= */}
        {/* BARRA DE PROGRESO */}
        {/* ================================= */}

        <View style={styles.topBar}>

          <Pressable
            style={styles.backButton}
            onPress={() => router.back()}
          >
            <Ionicons
              name="chevron-back"
              size={18}
              color={colors.brown}
            />
          </Pressable>

          <View style={styles.progressTrack}>
            <View style={styles.progressFill} />
          </View>

          <Text style={styles.stepCounter}>
            7/8
          </Text>

        </View>

        {/* ================================= */}
        {/* ENCABEZADO */}
        {/* ================================= */}

        <Text style={styles.eyebrow}>
          PREFERENCIAS
        </Text>

        <Text style={styles.title}>
          ¿Qué te gustaría encontrar aquí?
        </Text>

        <Text style={styles.subtitle}>
          Elige lo que más conecte contigo.
        </Text>

        {/* ================================= */}
        {/* TARJETAS DE PREFERENCIAS */}
        {/* ================================= */}

        <View style={styles.preferencesGrid}>

          {preferences.map((preference) => {
            const isSelected =
              selectedPreferences.includes(preference.id);

            return (
              <Pressable
                key={preference.id}
                style={[
                  styles.preferenceCard,
                  isSelected && styles.preferenceSelected,
                ]}
                onPress={() => togglePreference(preference.id)}
                accessibilityRole="checkbox"
                accessibilityState={{
                  checked: isSelected,
                }}
              >

                <Text style={styles.preferenceText}>
                  {preference.label}
                </Text>

                {isSelected && (
                  <Ionicons
                    name="checkmark"
                    size={14}
                    color={colors.terracotta}
                  />
                )}

              </Pressable>
            );
          })}

        </View>

      </ScrollView>

      {/* ================================= */}
      {/* BOTÓN INFERIOR */}
      {/* ================================= */}

      <View style={styles.footer}>

        <Pressable
          style={[
            styles.continueButton,
            saving && styles.disabledButton,
          ]}
          onPress={handleContinue}
          disabled={saving}
        >

          <Text style={styles.continueText}>
            Continuar
          </Text>

          <Ionicons
            name="chevron-forward"
            size={17}
            color={colors.white}
          />

        </Pressable>

      </View>

    </SafeAreaView>
  );
}

// ============================================
// ESTILOS
// ============================================

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },

  loadingContainer: {
    flex: 1,
    backgroundColor: colors.background,
    justifyContent: 'center',
    alignItems: 'center',
  },

  content: {
    flexGrow: 1,
    paddingHorizontal: 24,
    paddingTop: Platform.OS === 'android' ? 30 : 20,
    paddingBottom: 30,
  },

  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 38,
  },

  backButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.border,
    justifyContent: 'center',
    alignItems: 'center',
  },

  progressTrack: {
    flex: 1,
    height: 2,
    backgroundColor: colors.border,
  },

  progressFill: {
    width: '87.5%',
    height: '100%',
    backgroundColor: colors.terracotta,
  },

  stepCounter: {
    fontSize: 10,
    color: colors.muted,
  },

  eyebrow: {
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 1.5,
    color: colors.terracotta,
    marginBottom: 8,
  },

  title: {
    fontSize: 29,
    fontFamily: 'serif',
    color: colors.brown,
    lineHeight: 35,
    marginBottom: 10,
  },

  subtitle: {
    fontSize: 12,
    color: colors.muted,
    lineHeight: 18,
    marginBottom: 24,
  },

  preferencesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },

  preferenceCard: {
    width: '48%',
    minHeight: 52,
    borderRadius: 13,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.white,
    paddingHorizontal: 10,
    paddingVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 4,
  },

  preferenceSelected: {
    borderColor: colors.terracotta,
    backgroundColor: colors.selected,
  },

  preferenceText: {
    flex: 1,
    fontSize: 11,
    color: colors.brown,
    lineHeight: 16,
  },

  footer: {
    paddingHorizontal: 24,
    paddingTop: 12,
    paddingBottom: Platform.OS === 'ios' ? 35 : 20,
    backgroundColor: colors.background,
  },

  continueButton: {
    height: 52,
    borderRadius: 14,
    backgroundColor: colors.terracotta,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
  },

  disabledButton: {
    opacity: 0.55,
  },

  continueText: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.white,
  },
});