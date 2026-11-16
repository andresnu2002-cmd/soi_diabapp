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
  TextInput,
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
// TIPOS
// ============================================

type HealthCondition =
  | 'anemia'
  | 'hypertension'
  | 'preeclampsia'
  | 'pcos'
  | 'other'
  | 'none';

const STORAGE_KEY = '@soi_onboarding_health_conditions';
const OTHER_KEY = '@soi_onboarding_other_condition';

// ============================================
// OPCIONES
// ============================================

const conditions: {
  id: HealthCondition;
  label: string;
}[] = [
  { id: 'anemia', label: 'Anemia' },
  { id: 'hypertension', label: 'Hipertensión' },
  { id: 'preeclampsia', label: 'Preeclampsia' },
  { id: 'pcos', label: 'Síndrome de ovario poliquístico' },
  { id: 'other', label: 'Otra' },
  { id: 'none', label: 'Ninguna conocida' },
];

// ============================================
// PANTALLA 6/8
// ============================================

export default function CondicionesSaludScreen() {
  const [selectedConditions, setSelectedConditions] =
    useState<HealthCondition[]>([]);

  const [otherCondition, setOtherCondition] = useState('');

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  // ==========================================
  // RECUPERAR RESPUESTAS
  // ==========================================

  useEffect(() => {
    let active = true;

    const loadData = async () => {
      try {
        const values = await AsyncStorage.multiGet([
          STORAGE_KEY,
          OTHER_KEY,
        ]);

        if (!active) return;

        const data = Object.fromEntries(values);

        const savedConditions = data[STORAGE_KEY];

        if (savedConditions) {
          const parsed: unknown = JSON.parse(savedConditions);

          if (Array.isArray(parsed)) {
            const validConditions = parsed.filter(
              (value): value is HealthCondition =>
                typeof value === 'string' &&
                conditions.some(
                  (condition) => condition.id === value
                )
            );

            setSelectedConditions(
              validConditions.includes('none')
                ? ['none']
                : validConditions
            );
          }
        }

        setOtherCondition(data[OTHER_KEY] ?? '');

      } catch (error) {
        console.error(
          'Error cargando condiciones de salud:',
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
  // SELECCIÓN DE CONDICIONES
  // ==========================================

  const toggleCondition = (condition: HealthCondition) => {
    setSelectedConditions((current) => {
      // "Ninguna conocida" excluye las demás opciones.
      if (condition === 'none') {
        return current.includes('none') ? [] : ['none'];
      }

      const withoutNone = current.filter(
        (item) => item !== 'none'
      );

      if (withoutNone.includes(condition)) {
        return withoutNone.filter(
          (item) => item !== condition
        );
      }

      return [...withoutNone, condition];
    });
  };

  // ==========================================
  // GUARDAR RESPUESTAS
  // ==========================================

  const saveConditions = async (
    values: HealthCondition[],
    other: string
  ) => {
    await AsyncStorage.multiSet([
      [STORAGE_KEY, JSON.stringify(values)],
      [
        OTHER_KEY,
        values.includes('other') ? other.trim() : '',
      ],
    ]);
  };

  // ==========================================
  // CONTINUAR
  // ==========================================

  const handleContinue = async () => {
    if (saving) return;

    try {
      setSaving(true);

      await saveConditions(
        selectedConditions,
        otherCondition
      );

      console.log(
        'Condiciones guardadas:',
        selectedConditions
      );

      router.push('/onboarding/preferencias');

    } catch (error) {
      console.error(
        'Error guardando condiciones:',
        error
      );
    } finally {
      setSaving(false);
    }
  };

  // ==========================================
  // PREFIERO NO RESPONDER
  // ==========================================

  const handleSkip = async () => {
    if (saving) return;

    try {
      setSaving(true);

      await saveConditions([], '');
      setSelectedConditions([]);
      setOtherCondition('');

      console.log(
        'La usuaria prefirió no responder.'
      );
router.push('/onboarding/preferencias');

    } catch (error) {
      console.error(
        'Error omitiendo condiciones:',
        error
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

  // ==========================================
  // INTERFAZ
  // ==========================================

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
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
            6/8
          </Text>
        </View>

        {/* ENCABEZADO */}

        <Text style={styles.eyebrow}>
          TU SALUD
        </Text>

        <Text style={styles.title}>
          Un poquito más sobre ti
        </Text>

        <Text style={styles.subtitle}>
          ¿Hay otra condición diagnosticada que quieras registrar?
        </Text>

        {/* OPCIONES */}

        <View style={styles.conditionsGrid}>
          {conditions.map((condition) => {
            const isSelected =
              selectedConditions.includes(condition.id);

            return (
              <Pressable
                key={condition.id}
                style={[
                  styles.conditionCard,
                  isSelected && styles.conditionSelected,
                ]}
                onPress={() => toggleCondition(condition.id)}
                accessibilityRole="checkbox"
                accessibilityState={{
                  checked: isSelected,
                }}
              >
                <Text style={styles.conditionText}>
                  {condition.label}
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

        {/* CAMPO PARA OTRA CONDICIÓN */}

        {selectedConditions.includes('other') && (
          <View style={styles.otherContainer}>
            <Text style={styles.otherLabel}>
              ¿Cuál otra condición?
            </Text>

            <TextInput
              style={styles.otherInput}
              value={otherCondition}
              onChangeText={setOtherCondition}
              placeholder="Escribe la condición"
              placeholderTextColor={colors.muted}
              maxLength={100}
              returnKeyType="done"
            />
          </View>
        )}

      </ScrollView>

      {/* BOTONES INFERIORES */}

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

        <Pressable
          style={styles.skipButton}
          onPress={handleSkip}
          disabled={saving}
        >
          <Text style={styles.skipText}>
            Prefiero no responder
          </Text>
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
    width: '75%',
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

  conditionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },

  conditionCard: {
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

  conditionSelected: {
    borderColor: colors.terracotta,
    backgroundColor: colors.selected,
  },

  conditionText: {
    flexShrink: 1,
    fontSize: 11,
    color: colors.brown,
    lineHeight: 16,
  },

  otherContainer: {
    marginTop: 20,
  },

  otherLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.brown,
    marginBottom: 10,
  },

  otherInput: {
    height: 48,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 12,
    backgroundColor: colors.white,
    paddingHorizontal: 14,
    fontSize: 13,
    color: colors.brown,
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

  skipButton: {
    alignItems: 'center',
    paddingVertical: 12,
    marginTop: 3,
  },

  skipText: {
    fontSize: 11,
    color: colors.muted,
  },
});