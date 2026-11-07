import { Ionicons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
import { router } from 'expo-router';
import { useState } from 'react';

import {
  Alert,
  Pressable,
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
  selected: '#F0DFD5',
};

// ============================================
// OPCIONES
// ============================================

const activityTypes = [
  '🚶 Caminar',
  '🧘 Yoga prenatal',
  '🏊 Nadar',
  'Otra actividad',
];

const durations = [
  '10 min',
  '20 min',
  '30 min',
];

const feelings = [
  '😊 Cómoda',
  '🙂 Un poco cansada',
  '😓 Muy cansada',
];

// ============================================
// COMPONENTE
// ============================================

export default function RegistrarActividad() {

  const [activity, setActivity] =
    useState('🚶 Caminar');

  const [duration, setDuration] =
    useState('20 min');

  const [feeling, setFeeling] =
    useState('😊 Cómoda');

  // ============================================
  // GUARDAR
  // ============================================

  const handleSave = async () => {

    if (!activity || !duration || !feeling) {
      Alert.alert(
        'Falta información',
        'Completa los datos de tu actividad.'
      );
      return;
    }

    await Haptics.notificationAsync(
      Haptics.NotificationFeedbackType.Success
    );

    Alert.alert(
      'Actividad registrada',
      'Tu movimiento de hoy se ha registrado correctamente.',
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

    <View style={styles.screen}>

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
            Mi movimiento de hoy
          </Text>

          <Text style={styles.subtitle}>
            Cada movimiento cuenta
          </Text>

        </View>

      </View>

      {/* CONTENIDO */}

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >

        <View style={styles.formCard}>

          {/* TIPO DE ACTIVIDAD */}

          <Text style={styles.sectionTitle}>
            ¿Qué actividad realizaste?
          </Text>

          <Text style={styles.label}>
            Tipo de actividad
          </Text>

          <View style={styles.optionsContainer}>

            {activityTypes.map((option) => {

              const selected = activity === option;

              return (

                <Pressable
                  key={option}
                  style={[
                    styles.optionButton,
                    selected && styles.optionSelected,
                  ]}
                  onPress={() => setActivity(option)}
                >

                  <Text style={styles.optionText}>
                    {option}
                  </Text>

                  {selected && (
                    <View style={styles.checkCircle}>
                      <Ionicons
                        name="checkmark"
                        size={13}
                        color={colors.white}
                      />
                    </View>
                  )}

                </Pressable>

              );

            })}

          </View>

          {/* DURACIÓN */}

          <Text style={styles.sectionTitle}>
            ¿Cuánto tiempo?
          </Text>

          <View style={styles.durationContainer}>

            {durations.map((option) => {

              const selected = duration === option;

              return (

                <Pressable
                  key={option}
                  style={[
                    styles.durationButton,
                    selected && styles.durationSelected,
                  ]}
                  onPress={() => setDuration(option)}
                >

                  <Text
                    style={[
                      styles.durationText,
                      selected && styles.durationTextSelected,
                    ]}
                  >
                    {option}
                  </Text>

                </Pressable>

              );

            })}

          </View>

          {/* SENSACIÓN */}

          <Text style={styles.sectionTitle}>
            ¿Cómo te sentiste durante la actividad?
          </Text>

          <View style={styles.optionsContainer}>

            {feelings.map((option) => {

              const selected = feeling === option;

              return (

                <Pressable
                  key={option}
                  style={[
                    styles.optionButton,
                    selected && styles.optionSelected,
                  ]}
                  onPress={() => setFeeling(option)}
                >

                  <Text style={styles.optionText}>
                    {option}
                  </Text>

                  {selected && (
                    <View style={styles.checkCircle}>
                      <Ionicons
                        name="checkmark"
                        size={13}
                        color={colors.white}
                      />
                    </View>
                  )}

                </Pressable>

              );

            })}

          </View>

        </View>

      </ScrollView>

      {/* BOTÓN GUARDAR */}

      <View style={styles.footer}>

        <Pressable
          style={styles.saveButton}
          onPress={handleSave}
        >

          <Text style={styles.saveButtonText}>
            Guardar mi movimiento
          </Text>

        </Pressable>

      </View>

    </View>

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
    fontSize: 26,
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
    padding: 15,
  },

  sectionTitle: {
    fontSize: 21,
    fontFamily: 'serif',
    color: colors.brown,
    marginBottom: 12,
    marginTop: 10,
  },

  label: {
    fontSize: 11,
    fontWeight: '600',
    color: colors.brown,
    marginBottom: 10,
  },

  optionsContainer: {
    gap: 8,
    marginBottom: 20,
  },

  optionButton: {
    minHeight: 45,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: '#FCF9F6',
    paddingHorizontal: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  optionSelected: {
    backgroundColor: colors.selected,
    borderColor: colors.terracotta,
  },

  optionText: {
    fontSize: 11,
    color: colors.brown,
    flex: 1,
  },

  checkCircle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: colors.terracotta,
    alignItems: 'center',
    justifyContent: 'center',
  },

  durationContainer: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 20,
  },

  durationButton: {
    borderRadius: 22,
    borderWidth: 1,
    borderColor: colors.border,
    paddingHorizontal: 15,
    paddingVertical: 10,
    backgroundColor: colors.white,
  },

  durationSelected: {
    backgroundColor: colors.selected,
    borderColor: colors.terracotta,
  },

  durationText: {
    fontSize: 11,
    color: colors.brown,
  },

  durationTextSelected: {
    color: colors.terracotta,
    fontWeight: '600',
  },

  footer: {
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 18,
  },

  saveButton: {
    backgroundColor: colors.terracotta,
    minHeight: 50,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },

  saveButtonText: {
    fontSize: 13,
    fontWeight: '600',
    color: colors.white,
  },

});