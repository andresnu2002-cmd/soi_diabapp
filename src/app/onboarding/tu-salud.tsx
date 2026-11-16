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
// TIPOS DE DIABETES
// ============================================

type DiabetesType =
  | 'gestational'
  | 'type2'
  | 'not_confirmed';

// ============================================
// OPCIONES
// ============================================

const options: {
  id: DiabetesType;
  title: string;
  icon: keyof typeof Ionicons.glyphMap;
}[] = [
  {
    id: 'gestational',
    title: 'Diabetes gestacional',
    icon: 'diamond-outline',
  },
  {
    id: 'type2',
    title: 'Diabetes tipo 2',
    icon: 'ellipse-outline',
  },
  {
    id: 'not_confirmed',
    title: 'Aún no tengo un diagnóstico confirmado',
    icon: 'triangle-outline',
  },
];

// ============================================
// PANTALLA 3/8 - TU SALUD
// ============================================

export default function TuSaludScreen() {

  const [selectedDiabetes, setSelectedDiabetes] =
    useState<DiabetesType | null>(null);

  // ==========================================
  // CONTINUAR
  // ==========================================

  const handleContinue = async () => {
  if (!selectedDiabetes) return;

  try {
    await AsyncStorage.setItem(
      '@soi_diabetes_type',
      selectedDiabetes
    );

    router.push('/onboarding/mi-embarazo');

  } catch (error) {
    console.error(
      'Error guardando tipo de diabetes:',
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
            3/8
          </Text>

        </View>

        {/* ================================= */}
        {/* ENCABEZADO */}
        {/* ================================= */}

        <Text style={styles.eyebrow}>
          TU SALUD
        </Text>

        <Text style={styles.title}>
          Conozcamos un poco de tu salud
        </Text>

        <Text style={styles.subtitle}>
          ¿Qué tipo de diabetes te han diagnosticado?
        </Text>

        {/* ================================= */}
        {/* OPCIONES */}
        {/* ================================= */}

        <View style={styles.optionsContainer}>

          {options.map((option) => {

            const isSelected =
              selectedDiabetes === option.id;

            return (

              <Pressable
                key={option.id}
                style={[
                  styles.optionCard,
                  isSelected && styles.optionSelected,
                ]}
                onPress={() =>
                  setSelectedDiabetes(option.id)
                }
              >

                {/* ÍCONO */}

                <View style={styles.optionIcon}>
                  <Ionicons
                    name={option.icon}
                    size={16}
                    color={colors.terracotta}
                  />
                </View>

                {/* TEXTO */}

                <Text style={styles.optionText}>
                  {option.title}
                </Text>

                {/* INDICADOR */}

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

        {/* ================================= */}
        {/* TEXTO INFORMATIVO */}
        {/* ================================= */}

        <Text style={styles.helperText}>
          Esta información nos ayuda a organizar tu
          experiencia. Puedes modificarla después.
        </Text>

      </ScrollView>

      {/* ================================= */}
      {/* BOTÓN INFERIOR */}
      {/* ================================= */}

      <View style={styles.footer}>

        <Pressable
          style={[
            styles.continueButton,
            !selectedDiabetes && styles.disabledButton,
          ]}
          onPress={handleContinue}
          disabled={!selectedDiabetes}
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
    width: '37.5%',
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
    paddingVertical: 10,
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
    lineHeight: 19,
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

  helperText: {
    fontSize: 11,
    color: colors.muted,
    marginTop: 18,
    lineHeight: 17,
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