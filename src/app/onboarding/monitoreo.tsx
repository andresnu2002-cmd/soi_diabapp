import { useEffect, useState } from 'react';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {
  ActivityIndicator,
  Alert,
  Platform,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import { completeOnboarding } from '@/services/onboardingStorage';

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
  info: '#EFEAE2',
};

// ============================================
// TIPOS
// ============================================

type MonitoringMethod =
  | 'soi_device'
  | 'other_glucometer'
  | 'manual';

type SchedulePreference =
  | 'configure'
  | 'later';

// ============================================
// ALMACENAMIENTO
// ============================================

const METHOD_KEY = '@soi_monitoring_method';
const SCHEDULE_KEY = '@soi_schedule_preference';

// ============================================
// OPCIONES
// ============================================

const monitoringOptions: {
  id: MonitoringMethod;
  label: string;
  icon: keyof typeof Ionicons.glyphMap;
}[] = [
  {
    id: 'soi_device',
    label: 'Con mi dispositivo S.O.I.',
    icon: 'diamond-outline',
  },
  {
    id: 'other_glucometer',
    label: 'Con otro glucómetro',
    icon: 'ellipse-outline',
  },
  {
    id: 'manual',
    label: 'Manualmente',
    icon: 'triangle-outline',
  },
];

// ============================================
// PANTALLA 8/8
// ============================================

export default function MonitoreoOnboardingScreen() {
  const [method, setMethod] =
    useState<MonitoringMethod | null>(null);

  const [schedulePreference, setSchedulePreference] =
    useState<SchedulePreference>('later');

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  // ==========================================
  // RECUPERAR CONFIGURACIÓN
  // ==========================================

  useEffect(() => {
    let active = true;

    const loadData = async () => {
      try {
        const values = await AsyncStorage.multiGet([
          METHOD_KEY,
          SCHEDULE_KEY,
        ]);

        if (!active) return;

        const data = Object.fromEntries(values);

        const savedMethod = data[METHOD_KEY];

        if (
          savedMethod === 'soi_device' ||
          savedMethod === 'other_glucometer' ||
          savedMethod === 'manual'
        ) {
          setMethod(savedMethod);
        }

        const savedSchedule = data[SCHEDULE_KEY];

        if (
          savedSchedule === 'configure' ||
          savedSchedule === 'later'
        ) {
          setSchedulePreference(savedSchedule);
        }
      } catch (error) {
        console.error(
          'Error cargando configuración de monitoreo:',
          error
        );
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    };

    loadData();

    return () => {
      active = false;
    };
  }, []);

  // ==========================================
  // FINALIZAR ONBOARDING
  // ==========================================

  const handleFinish = async () => {
    if (!method || saving) return;

    try {
      setSaving(true);

      // Guardar las respuestas del paso 8.
      await AsyncStorage.multiSet([
        [METHOD_KEY, method],
        [SCHEDULE_KEY, schedulePreference],
      ]);

      // Marcar el onboarding como completado.
      await completeOnboarding();

      // Abrir la pantalla final de bienvenida.
      router.replace('/onboarding/completado');

    } catch (error) {
      console.error(
        'Error finalizando onboarding:',
        error
      );

      Alert.alert(
        'No se pudo finalizar',
        'Inténtalo nuevamente.'
      );
    } finally {
      setSaving(false);
    }
  };

  // ==========================================
  // CARGA
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

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >

        {/* BARRA DE PROGRESO */}

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
            8/8
          </Text>
        </View>

        {/* ENCABEZADO */}

        <Text style={styles.eyebrow}>
          MONITOREO
        </Text>

        <Text style={styles.title}>
          Tu glucosa, a tu manera
        </Text>

        <Text style={styles.subtitle}>
          ¿Cómo quieres registrar tu glucosa?
        </Text>

        {/* MÉTODOS DE REGISTRO */}

        <View style={styles.optionsContainer}>
          {monitoringOptions.map((option) => {
            const isSelected = method === option.id;

            return (
              <Pressable
                key={option.id}
                style={[
                  styles.optionCard,
                  isSelected && styles.optionSelected,
                ]}
                onPress={() => setMethod(option.id)}
                accessibilityRole="radio"
                accessibilityState={{
                  checked: isSelected,
                }}
              >
                <View style={styles.optionIcon}>
                  <Ionicons
                    name={option.icon}
                    size={16}
                    color={colors.terracotta}
                  />
                </View>

                <Text style={styles.optionText}>
                  {option.label}
                </Text>

                <View style={styles.radioCircle}>
                  {isSelected && (
                    <Ionicons
                      name="checkmark"
                      size={12}
                      color={colors.white}
                    />
                  )}
                </View>
              </Pressable>
            );
          })}
        </View>

        {/* NOTA SOBRE DISPOSITIVO */}

        <View style={styles.infoCard}>
          <Ionicons
            name="bluetooth-outline"
            size={17}
            color="#7B9488"
          />

          <Text style={styles.infoText}>
            La conexión S.O.I. es una simulación
            conceptual. No representa una medición
            salival clínicamente validada.
          </Text>
        </View>

        {/* HORARIOS */}

        <Text style={styles.question}>
          ¿Tienes horarios indicados por tu médico?
        </Text>

        <View style={styles.scheduleRow}>
          <Pressable
            style={[
              styles.scheduleButton,
              schedulePreference === 'configure' &&
                styles.scheduleSelected,
            ]}
            onPress={() =>
              setSchedulePreference('configure')
            }
          >
            <Text style={styles.scheduleText}>
              Sí, configurarlos
            </Text>
          </Pressable>

          <Pressable
            style={[
              styles.scheduleButton,
              schedulePreference === 'later' &&
                styles.scheduleSelected,
            ]}
            onPress={() =>
              setSchedulePreference('later')
            }
          >
            <Text style={styles.scheduleText}>
              Después
            </Text>
          </Pressable>
        </View>

      </ScrollView>

      {/* BOTÓN INFERIOR */}

      <View style={styles.footer}>
        <Pressable
          style={[
            styles.finishButton,
            (!method || saving) && styles.disabledButton,
          ]}
          onPress={handleFinish}
          disabled={!method || saving}
        >
          <Text style={styles.finishText}>
            {saving ? 'Guardando...' : 'Finalizar'}
          </Text>

          {!saving && (
            <Ionicons
              name="chevron-forward"
              size={17}
              color={colors.white}
            />
          )}
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
    width: '100%',
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
    marginBottom: 24,
  },

  optionsContainer: {
    gap: 8,
  },

  optionCard: {
    minHeight: 59,
    borderRadius: 14,
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.border,
    paddingHorizontal: 13,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },

  optionSelected: {
    backgroundColor: colors.selected,
    borderColor: colors.terracotta,
  },

  optionIcon: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: colors.background,
    alignItems: 'center',
    justifyContent: 'center',
  },

  optionText: {
    flex: 1,
    fontSize: 13,
    color: colors.brown,
  },

  radioCircle: {
    width: 19,
    height: 19,
    borderRadius: 10,
    backgroundColor: colors.terracotta,
    alignItems: 'center',
    justifyContent: 'center',
  },

  infoCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    backgroundColor: colors.info,
    borderRadius: 12,
    padding: 13,
    marginTop: 12,
  },

  infoText: {
    flex: 1,
    fontSize: 10,
    color: colors.muted,
    lineHeight: 15,
  },

  question: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.brown,
    marginTop: 22,
    marginBottom: 12,
  },

  scheduleRow: {
    flexDirection: 'row',
    gap: 8,
  },

  scheduleButton: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 20,
    backgroundColor: colors.white,
    paddingHorizontal: 13,
    paddingVertical: 10,
  },

  scheduleSelected: {
    backgroundColor: colors.selected,
    borderColor: colors.terracotta,
  },

  scheduleText: {
    fontSize: 11,
    color: colors.brown,
  },

  footer: {
    paddingHorizontal: 24,
    paddingTop: 12,
    paddingBottom: Platform.OS === 'ios' ? 35 : 20,
    backgroundColor: colors.background,
  },

  finishButton: {
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

  finishText: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.white,
  },
});