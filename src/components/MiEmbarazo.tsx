import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';

import { useState } from 'react';

import {
  Alert,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';

import { usePregnancy } from '@/app/context/PregnancyContext';

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
  green: '#879B86',
};

// ============================================
// COMPONENTE MI EMBARAZO
// ============================================

export default function MiEmbarazo() {

  const {
    pregnancy,
    updatePregnancy,
  } = usePregnancy();

  const [weeks, setWeeks] = useState(
    String(pregnancy.weeks)
  );

  const [days, setDays] = useState(
    String(pregnancy.days)
  );

  const [pregnancyType, setPregnancyType] =
    useState(pregnancy.pregnancyType);

  // ============================================
  // GUARDAR CAMBIOS
  // ============================================

  const handleSave = () => {

    const newWeeks = Number(weeks);
    const newDays = Number(days);

    if (
      weeks.trim() === '' ||
      days.trim() === '' ||
      !Number.isInteger(newWeeks) ||
      !Number.isInteger(newDays) ||
      newWeeks < 0 ||
      newWeeks > 42 ||
      newDays < 0 ||
      newDays > 6 ||
      newWeeks * 7 + newDays > 42 * 7
    ) {

      Alert.alert(
        'Datos incorrectos',
        'Ingresa semanas entre 0 y 42 y días entre 0 y 6, sin superar las 42 semanas.'
      );

      return;
    }

    updatePregnancy({
      weeks: newWeeks,
      days: newDays,
      pregnancyType,
    });

    router.back();
  };

  return (

    <ScrollView
      style={styles.screen}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
      keyboardShouldPersistTaps="handled"
    >

      {/* ENCABEZADO */}

      <View style={styles.header}>

        <Pressable
          style={styles.backButton}
          onPress={() => router.back()}
        >

          <Ionicons
            name="chevron-back"
            size={22}
            color={colors.brown}
          />

        </Pressable>

        <View>

          <Text style={styles.title}>
            Mi embarazo
          </Text>

          <Text style={styles.subtitle}>
            Un día a la vez, a tu ritmo.
          </Text>

        </View>

      </View>

      {/* RESUMEN ACTUAL */}

      <View style={styles.summaryCard}>

        <Ionicons
          name="heart-outline"
          size={27}
          color={colors.terracotta}
        />

        <Text style={styles.summaryLabel}>
          MI EMBARAZO
        </Text>

        <Text style={styles.summaryValue}>
          Semana {pregnancy.weeks}, día {pregnancy.days}
        </Text>

        <Text style={styles.summarySubtitle}>
          Cada semana es parte de tu historia.
        </Text>

      </View>

      {/* EDITAR INFORMACIÓN */}

      <View style={styles.formCard}>

        <Text style={styles.sectionTitle}>
          Mis datos
        </Text>

        <Text style={styles.description}>
          Actualiza la información de tu embarazo.
        </Text>

        {/* SEMANAS Y DÍAS */}

        <View style={styles.inputRow}>

          <View style={styles.inputGroup}>

            <Text style={styles.inputLabel}>
              Semanas
            </Text>

            <TextInput
              style={styles.input}
              value={weeks}
              onChangeText={setWeeks}
              keyboardType="number-pad"
              maxLength={2}
            />

          </View>

          <View style={styles.inputGroup}>

            <Text style={styles.inputLabel}>
              Días
            </Text>

            <TextInput
              style={styles.input}
              value={days}
              onChangeText={setDays}
              keyboardType="number-pad"
              maxLength={1}
            />

          </View>

        </View>

        {/* TIPO DE EMBARAZO */}

        <Text style={styles.inputLabel}>
          Tipo de embarazo
        </Text>

        <View style={styles.optionsRow}>

          {[
            'Embarazo único',
            'Embarazo múltiple',
          ].map((type) => (

            <Pressable
              key={type}
              style={[
                styles.option,
                pregnancyType === type &&
                  styles.optionSelected,
              ]}
              onPress={() => setPregnancyType(type)}
            >

              <Text
                style={[
                  styles.optionText,
                  pregnancyType === type &&
                    styles.optionTextSelected,
                ]}
              >
                {type}
              </Text>

            </Pressable>

          ))}

        </View>

      </View>

      {/* INFORMACIÓN */}

      <View style={styles.infoCard}>

        <Ionicons
          name="information-circle-outline"
          size={20}
          color={colors.green}
        />

        <Text style={styles.infoText}>
          Puedes actualizar esta información cuando
          lo necesites. Si tienes dudas sobre tu edad
          gestacional, consulta con tu profesional de salud.
        </Text>

      </View>

      {/* GUARDAR */}

      <Pressable
        style={styles.saveButton}
        onPress={handleSave}
      >

        <Text style={styles.saveButtonText}>
          Guardar cambios
        </Text>

      </Pressable>

    </ScrollView>

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
    padding: 20,
    paddingBottom: 45,
    gap: 17,
  },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 8,
  },

  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
  },

  title: {
    fontSize: 28,
    fontFamily: 'serif',
    color: colors.brown,
  },

  subtitle: {
    fontSize: 11,
    color: colors.muted,
    marginTop: 4,
  },

  summaryCard: {
    backgroundColor: colors.beige,
    borderRadius: 20,
    padding: 25,
    alignItems: 'center',
    gap: 9,
  },

  summaryLabel: {
    fontSize: 9,
    fontWeight: '700',
    letterSpacing: 1.2,
    color: colors.terracotta,
  },

  summaryValue: {
    fontSize: 25,
    fontFamily: 'serif',
    color: colors.brown,
  },

  summarySubtitle: {
    fontSize: 11,
    color: colors.muted,
  },

  formCard: {
    backgroundColor: colors.white,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: colors.border,
    padding: 20,
  },

  sectionTitle: {
    fontSize: 23,
    fontFamily: 'serif',
    color: colors.brown,
  },

  description: {
    fontSize: 11,
    color: colors.muted,
    marginTop: 6,
    marginBottom: 22,
  },

  inputRow: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 20,
  },

  inputGroup: {
    flex: 1,
  },

  inputLabel: {
    fontSize: 11,
    fontWeight: '600',
    color: colors.brown,
    marginBottom: 9,
  },

  input: {
    backgroundColor: colors.background,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 12,
    padding: 14,
    fontSize: 16,
    color: colors.brown,
  },

  optionsRow: {
    flexDirection: 'row',
    gap: 9,
  },

  option: {
    flex: 1,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 12,
    paddingVertical: 14,
    paddingHorizontal: 5,
    alignItems: 'center',
  },

  optionSelected: {
    backgroundColor: '#F2E1D6',
    borderColor: colors.terracotta,
  },

  optionText: {
    fontSize: 10,
    color: colors.brown,
    textAlign: 'center',
  },

  optionTextSelected: {
    fontWeight: '700',
    color: colors.terracotta,
  },

  infoCard: {
    backgroundColor: '#E7ECE6',
    borderRadius: 14,
    padding: 15,
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 10,
  },

  infoText: {
    flex: 1,
    fontSize: 11,
    lineHeight: 18,
    color: colors.brown,
  },

  saveButton: {
    backgroundColor: colors.terracotta,
    borderRadius: 14,
    paddingVertical: 17,
    alignItems: 'center',
  },

  saveButtonText: {
    color: colors.white,
    fontSize: 13,
    fontWeight: '600',
  },

});