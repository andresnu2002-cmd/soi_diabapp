import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useState } from 'react';

import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';

// ============================================
// COLORES S.O.I
// ============================================

const colors = {
  background: '#F3E8D5',
  white: '#FFFFFF',
  brown: '#6E503D',
  text: '#795B48',
  muted: '#B8A18C',
  sand: '#CDB99D',
  green: '#607E61',
  coral: '#C47769',
  border: '#E4D0B7',
};

// ============================================
// OPCIONES DE MEDICIÓN
// ============================================

const moments = [
  'Al despertar',
  'Antes de comer',
  'Después de comer',
  'Antes de dormir',
  'Otro',
];

const feelings = [
  'Me sentía bien',
  'Estaba cansada',
  'Estaba estresada',
  'Acababa de comer',
  'Otro',
];

// ============================================
// PANTALLA REGISTRAR MEDICIÓN
// ============================================

export default function RegistrarMedicionScreen() {

  const [selectedMoment, setSelectedMoment] =
    useState('Al despertar');

  const [glucose, setGlucose] = useState('');

  const [selectedFeelings, setSelectedFeelings] =
    useState<string[]>([]);

  // Seleccionar o quitar una sensación
  const toggleFeeling = (feeling: string) => {

    if (selectedFeelings.includes(feeling)) {

      setSelectedFeelings(
        selectedFeelings.filter(
          item => item !== feeling
        )
      );

    } else {

      setSelectedFeelings([
        ...selectedFeelings,
        feeling,
      ]);

    }

  };

  // ============================================
  // GUARDAR MEDICIÓN
  // ============================================

  const saveMeasurement = () => {

    const value = Number(glucose);

    if (
      glucose.trim() === '' ||
      !Number.isFinite(value) ||
      value <= 0
    ) {

      Alert.alert(
        'Resultado inválido',
        'Por favor, introduce un valor de glucosa válido.'
      );

      return;
    }

    // Aquí conectaremos el almacenamiento
    // permanente de las mediciones.

    Alert.alert(
      'Medición registrada',
      'Tu medición se ha registrado correctamente.',
      [
        {
          text: 'Aceptar',
          onPress: () => router.back(),
        },
      ]
    );

  };

  return (

    <KeyboardAvoidingView
      style={styles.screen}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >

      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >

        {/* ===================================== */}
        {/* VOLVER */}
        {/* ===================================== */}

        <Pressable
          style={styles.backButton}
          onPress={() => router.back()}
        >

          <Ionicons
            name="arrow-back"
            size={18}
            color={colors.brown}
          />

          <Text style={styles.backText}>
            Volver
          </Text>

        </Pressable>


        {/* ===================================== */}
        {/* ENCABEZADO */}
        {/* ===================================== */}

        <View style={styles.header}>

          <Text style={styles.title}>
            Registrar medición
          </Text>

          <Text style={styles.subtitle}>
            Solo unos datos y listo.
          </Text>

        </View>


        {/* ===================================== */}
        {/* CUÁNDO FUE */}
        {/* ===================================== */}

        <View style={styles.section}>

          <Text style={styles.sectionTitle}>
            ¿CUÁNDO FUE?
          </Text>

          <View style={styles.optionsContainer}>

            {moments.map(moment => {

              const selected =
                selectedMoment === moment;

              return (

                <Pressable
                  key={moment}
                  style={[
                    styles.optionButton,
                    selected && styles.optionSelected,
                  ]}
                  onPress={() =>
                    setSelectedMoment(moment)
                  }
                >

                  <Text
                    style={[
                      styles.optionText,
                      selected && styles.optionTextSelected,
                    ]}
                  >
                    {moment}
                  </Text>

                </Pressable>

              );

            })}

          </View>

        </View>


        {/* ===================================== */}
        {/* RESULTADO */}
        {/* ===================================== */}

        <View style={styles.section}>

          <Text style={styles.sectionTitle}>
            RESULTADO
          </Text>

          <View style={styles.resultRow}>

            <TextInput
              style={styles.glucoseInput}
              value={glucose}
              onChangeText={setGlucose}
              keyboardType="numeric"
              placeholder="95"
              placeholderTextColor={colors.brown}
              maxLength={4}
            />

            <Text style={styles.unitText}>
              mg/dL
            </Text>

          </View>

        </View>


        {/* ===================================== */}
        {/* ¿QUIERES AÑADIR ALGO? */}
        {/* ===================================== */}

        <View style={styles.section}>

          <Text style={styles.sectionTitle}>
            ¿QUIERES AÑADIR ALGO?
          </Text>

          <View style={styles.optionsContainer}>

            {feelings.map(feeling => {

              const selected =
                selectedFeelings.includes(feeling);

              return (

                <Pressable
                  key={feeling}
                  style={[
                    styles.optionButton,
                    selected && styles.optionSelected,
                  ]}
                  onPress={() =>
                    toggleFeeling(feeling)
                  }
                >

                  <Text
                    style={[
                      styles.optionText,
                      selected && styles.optionTextSelected,
                    ]}
                  >
                    {feeling}
                  </Text>

                </Pressable>

              );

            })}

          </View>

        </View>

      </ScrollView>


      {/* ===================================== */}
      {/* BOTÓN GUARDAR */}
      {/* ===================================== */}

      <View style={styles.footer}>

        <Pressable
          style={styles.saveButton}
          onPress={saveMeasurement}
        >

          <Text style={styles.saveButtonText}>
            Guardar
          </Text>

        </Pressable>

      </View>

    </KeyboardAvoidingView>

  );

}

// ============================================
// ESTILOS
// ============================================

const styles = StyleSheet.create({

  screen: {
    flex: 1,
    backgroundColor: colors.background,
  },

  content: {
    paddingHorizontal: 28,
    paddingTop: 30,
    paddingBottom: 30,
    gap: 28,
  },

  // =====================================
  // VOLVER
  // =====================================

  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 7,
    alignSelf: 'flex-start',
  },

  backText: {
    fontSize: 12,
    color: colors.brown,
  },

  // =====================================
  // ENCABEZADO
  // =====================================

  header: {
    gap: 4,
  },

  title: {
    fontSize: 27,
    color: colors.brown,
    fontFamily: 'serif',
    fontStyle: 'italic',
  },

  subtitle: {
    fontSize: 12,
    color: colors.text,
  },

  // =====================================
  // SECCIONES
  // =====================================

  section: {
    gap: 12,
  },

  sectionTitle: {
    fontSize: 11,
    fontWeight: '600',
    letterSpacing: 0.7,
    color: colors.text,
  },

  // =====================================
  // OPCIONES
  // =====================================

  optionsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },

  optionButton: {
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 25,
    paddingHorizontal: 15,
    paddingVertical: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },

  optionSelected: {
    backgroundColor: colors.coral,
    borderColor: colors.coral,
  },

  optionText: {
    fontSize: 11,
    color: colors.brown,
  },

  optionTextSelected: {
    color: colors.white,
    fontWeight: '600',
  },

  // =====================================
  // RESULTADO
  // =====================================

  resultRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },

  glucoseInput: {
    width: 100,
    height: 62,
    borderWidth: 1.5,
    borderColor: colors.coral,
    borderRadius: 12,
    backgroundColor: colors.white,
    textAlign: 'center',
    fontSize: 23,
    fontWeight: '600',
    color: colors.brown,
  },

  unitText: {
    fontSize: 15,
    color: colors.text,
  },

  // =====================================
  // BOTÓN GUARDAR
  // =====================================

  footer: {
    paddingHorizontal: 28,
    paddingBottom: 25,
    paddingTop: 12,
    backgroundColor: colors.background,
  },

  saveButton: {
    backgroundColor: colors.coral,
    minHeight: 52,
    borderRadius: 13,
    justifyContent: 'center',
    alignItems: 'center',
  },

  saveButtonText: {
    color: colors.white,
    fontSize: 14,
    fontWeight: '600',
  },

});