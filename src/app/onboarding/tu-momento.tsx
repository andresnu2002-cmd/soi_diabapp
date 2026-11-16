import { useState } from 'react';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
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
  beige: '#EDE1D4',
  border: '#E8DDD3',
  selected: '#F1DFD3',
};

// ============================================
// TIPOS
// ============================================

type LifeStage =
  | 'pregnant'
  | 'postpartum'
  | 'not_pregnant';

// ============================================
// OPCIONES
// ============================================

const options: {
  id: LifeStage;
  title: string;
  icon: keyof typeof Ionicons.glyphMap;
}[] = [
  {
    id: 'pregnant',
    title: 'Estoy embarazada',
    icon: 'diamond-outline',
  },
  {
    id: 'postpartum',
    title: 'Estoy en posparto',
    icon: 'ellipse-outline',
  },
  {
    id: 'not_pregnant',
    title: 'No estoy embarazada',
    icon: 'triangle-outline',
  },
];

// ============================================
// PANTALLA 2/8
// ============================================

export default function TuMomentoScreen() {
  const [selectedStage, setSelectedStage] =
    useState<LifeStage | null>(null);

const handleContinue = async () => {
  if (!selectedStage) return;

  try {
    await AsyncStorage.setItem(
      '@soi_life_stage',
      selectedStage
    );

    console.log(
      'Etapa guardada:',
      selectedStage
    );

    router.push('/onboarding/tu-salud');

  } catch (error) {
    console.error(
      'Error guardando etapa:',
      error
    );
  }
};

  return (
    <SafeAreaView style={styles.container}>

      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >

        {/* NAVEGACIÓN SUPERIOR */}

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
            2/8
          </Text>

        </View>

        {/* ENCABEZADO */}

        <Text style={styles.eyebrow}>
          TU MOMENTO
        </Text>

        <Text style={styles.title}>
          Cada etapa tiene su propia historia
        </Text>

        <Text style={styles.subtitle}>
          ¿En qué etapa te encuentras?
        </Text>

        {/* OPCIONES */}

        <View style={styles.optionsContainer}>

          {options.map((option) => {
            const isSelected =
              selectedStage === option.id;

            return (
              <Pressable
                key={option.id}
                style={[
                  styles.optionCard,
                  isSelected && styles.optionSelected,
                ]}
                onPress={() => setSelectedStage(option.id)}
              >

                <View style={styles.optionIcon}>
                  <Ionicons
                    name={option.icon}
                    size={16}
                    color={colors.terracotta}
                  />
                </View>

                <Text style={styles.optionText}>
                  {option.title}
                </Text>

                <View
                  style={[
                    styles.radioCircle,
                    isSelected && styles.radioSelected,
                  ]}
                >
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

      </ScrollView>

      {/* BOTÓN INFERIOR */}

      <View style={styles.footer}>

        <Pressable
          style={[
            styles.continueButton,
            !selectedStage && styles.disabledButton,
          ]}
          onPress={handleContinue}
          disabled={!selectedStage}
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
    width: '25%',
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
    gap: 9,
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
    backgroundColor: '#F8F4EF',
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

  radioSelected: {
    backgroundColor: colors.terracotta,
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