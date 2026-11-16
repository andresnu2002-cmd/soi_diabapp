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
// TIPOS DE EMOCIONES
// ============================================

type Emotion =
  | 'excited'
  | 'happy'
  | 'calm'
  | 'confident'
  | 'anxious'
  | 'afraid'
  | 'overwhelmed'
  | 'unsure';

// ============================================
// OPCIONES DE BIENESTAR
// ============================================

const emotions: {
  id: Emotion;
  label: string;
  emoji: string;
}[] = [
  {
    id: 'excited',
    label: 'Emocionada',
    emoji: '🥰',
  },
  {
    id: 'happy',
    label: 'Feliz',
    emoji: '😊',
  },
  {
    id: 'calm',
    label: 'Tranquila',
    emoji: '🌿',
  },
  {
    id: 'confident',
    label: 'Segura',
    emoji: '💪',
  },
  {
    id: 'anxious',
    label: 'Ansiosa',
    emoji: '😰',
  },
  {
    id: 'afraid',
    label: 'Con miedo',
    emoji: '😟',
  },
  {
    id: 'overwhelmed',
    label: 'Abrumada',
    emoji: '😩',
  },
  {
    id: 'unsure',
    label: 'No estoy segura',
    emoji: '🤔',
  },
];

// ============================================
// PANTALLA 5/8 - BIENESTAR
// ============================================

export default function BienestarOnboardingScreen() {
  const [selectedEmotions, setSelectedEmotions] =
    useState<Emotion[]>([]);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  // ==========================================
  // RECUPERAR RESPUESTAS GUARDADAS
  // ==========================================

  useEffect(() => {
    const loadEmotions = async () => {
      try {
        const saved = await AsyncStorage.getItem(
          '@soi_onboarding_emotions'
        );

        if (saved) {
          const parsed: unknown = JSON.parse(saved);

          if (Array.isArray(parsed)) {
            const validEmotions = parsed.filter(
              (value): value is Emotion =>
                typeof value === 'string' &&
                emotions.some((emotion) => emotion.id === value)
            );

            setSelectedEmotions(validEmotions);
          }
        }
      } catch (error) {
        console.error(
          'Error cargando emociones:',
          error
        );
      } finally {
        setLoading(false);
      }
    };

    loadEmotions();
  }, []);

  // ==========================================
  // SELECCIÓN MÚLTIPLE
  // ==========================================

  const toggleEmotion = (emotion: Emotion) => {
    setSelectedEmotions((current) => {
      if (current.includes(emotion)) {
        return current.filter((item) => item !== emotion);
      }

      return [...current, emotion];
    });
  };

  // ==========================================
  // GUARDAR RESPUESTAS
  // ==========================================

  const saveEmotions = async (values: Emotion[]) => {
    await AsyncStorage.setItem(
      '@soi_onboarding_emotions',
      JSON.stringify(values)
    );
  };

  // ==========================================
  // CONTINUAR
  // ==========================================

  const handleContinue = async () => {
    if (saving) return;

    try {
      setSaving(true);

      await saveEmotions(selectedEmotions);

      console.log(
        'Emociones guardadas:',
        selectedEmotions
      );

      router.push('/onboarding/condiciones-salud');

    } catch (error) {
      console.error(
        'Error guardando emociones:',
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

      await saveEmotions([]);

      setSelectedEmotions([]);

      console.log(
        'La usuaria prefirió no responder.'
      );

      router.push('/onboarding/condiciones-salud');

    } catch (error) {
      console.error(
        'Error omitiendo bienestar:',
        error
      );
    } finally {
      setSaving(false);
    }
  };

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
            5/8
          </Text>

        </View>

        {/* ENCABEZADO */}

        <Text style={styles.eyebrow}>
          BIENESTAR
        </Text>

        <Text style={styles.title}>
          Tu bienestar también importa
        </Text>

        <Text style={styles.subtitle}>
          ¿Cómo te sientes hoy? Puedes elegir varias.
        </Text>

        {/* TARJETAS DE EMOCIONES */}

        <View style={styles.emotionsGrid}>

          {emotions.map((emotion) => {
            const isSelected =
              selectedEmotions.includes(emotion.id);

            return (
              <Pressable
                key={emotion.id}
                style={[
                  styles.emotionCard,
                  isSelected && styles.emotionSelected,
                ]}
                onPress={() => toggleEmotion(emotion.id)}
                accessibilityRole="checkbox"
                accessibilityState={{
                  checked: isSelected,
                }}
              >

                <Text
                  style={styles.emotionText}
                  numberOfLines={2}
                >
                  {emotion.emoji} {emotion.label}
                </Text>

                {isSelected && (
                  <Ionicons
                    name="checkmark"
                    size={15}
                    color={colors.terracotta}
                  />
                )}

              </Pressable>
            );
          })}

        </View>

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
    alignItems: 'center',
    justifyContent: 'center',
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
    width: '62.5%',
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

  emotionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },

  emotionCard: {
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

  emotionSelected: {
    borderColor: colors.terracotta,
    backgroundColor: colors.selected,
  },

  emotionText: {
    flexShrink: 1,
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