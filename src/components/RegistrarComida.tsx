import { Ionicons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
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
  text: '#654B3D',
  selected: '#F0DFD5',
};

// ============================================
// TIPOS
// ============================================

type MealType =
  | 'Desayuno'
  | 'Almuerzo'
  | 'Cena'
  | 'Colación';

// ============================================
// COMPONENTE
// ============================================

export default function RegistrarComida() {

  const [mealType, setMealType] =
    useState<MealType>('Almuerzo');

  const [time, setTime] =
    useState('1:10 p. m.');

  const [description, setDescription] =
    useState('');

  const mealOptions: MealType[] = [
    'Desayuno',
    'Almuerzo',
    'Cena',
    'Colación',
  ];

  // ============================================
  // GUARDAR COMIDA
  // ============================================

  const handleSave = async () => {

    if (!time.trim()) {
      Alert.alert(
        'Falta información',
        'Por favor, indica la hora de tu comida.'
      );
      return;
    }

    await Haptics.notificationAsync(
      Haptics.NotificationFeedbackType.Success
    );

    Alert.alert(
      'Comida registrada',
      'Tu registro se ha completado correctamente.',
      [
        {
          text: 'Aceptar',
          onPress: () => router.back(),
        },
      ]
    );
  };

  // ============================================
  // INTERFAZ
  // ============================================

  return (

    <KeyboardAvoidingView
      style={styles.screen}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >

      {/* ENCABEZADO */}

      <View style={styles.header}>

        <Pressable
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <Ionicons
            name="chevron-back"
            size={20}
            color={colors.terracotta}
          />
        </Pressable>

        <View style={styles.headerText}>

          <Text style={styles.title}>
            Registrar comida
          </Text>

          <Text style={styles.subtitle}>
            Solo lo que te resulte útil
          </Text>

        </View>

      </View>

      {/* CONTENIDO */}

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >

        <View style={styles.formCard}>

          {/* TIPO DE COMIDA */}

          <Text style={styles.label}>
            ¿Qué comida fue?
          </Text>

          <View style={styles.optionsContainer}>

            {mealOptions.map((option) => {

              const selected = mealType === option;

              return (

                <Pressable
                  key={option}
                  style={[
                    styles.optionButton,
                    selected && styles.optionSelected,
                  ]}
                  onPress={() => setMealType(option)}
                >

                  <Text
                    style={[
                      styles.optionText,
                      selected && styles.optionTextSelected,
                    ]}
                  >
                    {option}
                  </Text>

                </Pressable>

              );

            })}

          </View>

          {/* HORA */}

          <Text style={styles.label}>
            Hora
          </Text>

          <TextInput
            style={styles.input}
            value={time}
            onChangeText={setTime}
            placeholder="Ej. 1:10 p. m."
            placeholderTextColor={colors.muted}
          />

          {/* DESCRIPCIÓN */}

          <Text style={styles.label}>
            Descripción breve
          </Text>

          <TextInput
            style={styles.descriptionInput}
            value={description}
            onChangeText={setDescription}
            placeholder="Ej. ensalada, arroz y pollo"
            placeholderTextColor={colors.muted}
            multiline
            textAlignVertical="top"
          />

          {/* AGREGAR FOTO */}

          <Pressable
            style={styles.photoButton}
            onPress={() => {
              Alert.alert(
                'Agregar fotografía',
                'Próximamente podrás adjuntar una fotografía de tu comida.'
              );
            }}
          >

            <Ionicons
              name="camera-outline"
              size={22}
              color={colors.terracotta}
            />

            <View style={styles.photoTextContainer}>

              <Text style={styles.photoTitle}>
                Añadir una foto
              </Text>

              <Text style={styles.photoSubtitle}>
                Opcional
              </Text>

            </View>

          </Pressable>

          {/* MENSAJE */}

          <Text style={styles.helperText}>
            No necesitas contar calorías ni detallar cada ingrediente.
          </Text>

        </View>

      </ScrollView>

      {/* BOTÓN GUARDAR */}

      <View style={styles.footer}>

        <Pressable
          style={styles.saveButton}
          onPress={handleSave}
        >

          <Text style={styles.saveButtonText}>
            Guardar comida
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

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 25,
    paddingBottom: 18,
    gap: 12,
  },

  backButton: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.border,
    justifyContent: 'center',
    alignItems: 'center',
  },

  headerText: {
    flex: 1,
  },

  title: {
    fontSize: 27,
    fontFamily: 'serif',
    color: colors.brown,
  },

  subtitle: {
    fontSize: 11,
    color: colors.muted,
    marginTop: 3,
  },

  scroll: {
    flex: 1,
  },

  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 30,
  },

  formCard: {
    backgroundColor: colors.white,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: colors.border,
    padding: 16,
  },

  label: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.brown,
    marginTop: 18,
    marginBottom: 10,
  },

  optionsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },

  optionButton: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 22,
    paddingHorizontal: 15,
    paddingVertical: 10,
    backgroundColor: colors.white,
  },

  optionSelected: {
    backgroundColor: colors.selected,
    borderColor: colors.terracotta,
  },

  optionText: {
    fontSize: 11,
    color: colors.text,
  },

  optionTextSelected: {
    color: colors.terracotta,
    fontWeight: '600',
  },

  input: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 12,
    paddingHorizontal: 13,
    height: 47,
    color: colors.brown,
    fontSize: 12,
  },

  descriptionInput: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 12,
    padding: 13,
    minHeight: 85,
    color: colors.brown,
    fontSize: 12,
  },

  photoButton: {
    borderWidth: 1,
    borderStyle: 'dashed',
    borderColor: colors.border,
    borderRadius: 12,
    padding: 13,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginTop: 20,
    backgroundColor: '#FCF9F6',
  },

  photoTextContainer: {
    gap: 3,
  },

  photoTitle: {
    fontSize: 11,
    color: colors.terracotta,
    fontWeight: '600',
  },

  photoSubtitle: {
    fontSize: 9,
    color: colors.muted,
  },

  helperText: {
    fontSize: 10,
    color: colors.muted,
    lineHeight: 16,
    marginTop: 16,
  },

  footer: {
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 18,
    backgroundColor: colors.background,
  },

  saveButton: {
    backgroundColor: '#D5B2A1',
    borderRadius: 14,
    minHeight: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },

  saveButtonText: {
    color: colors.white,
    fontSize: 13,
    fontWeight: '600',
  },

});