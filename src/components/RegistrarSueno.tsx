import { Ionicons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
import { router } from 'expo-router';
import { useState } from 'react';

import {
  Alert,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { useDailyRecords } from '@/app/context/DailyRecordsContext';
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
  note: '#EFEEE9',
};

// ============================================
// OPCIONES
// ============================================

const sleepHours = [
  'Menos de 5 horas',
  '5–6 horas',
  '7–8 horas',
  'Más de 8 horas',
];

const sleepQuality = [
  '😊 Descansé bien',
  '🙂 Me desperté varias veces',
  '😴 Descansé mal',
];

// ============================================
// COMPONENTE
// ============================================

export default function RegistrarSueno() {

  const { addSleepRecord } = useDailyRecords();

const getToday = () => {
  const today = new Date();

  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const day = String(today.getDate()).padStart(2, '0');

  return `${year}-${month}-${day}`;
};

const [date, setDate] = useState(getToday);

  const [hours, setHours] =
    useState('7–8 horas');

  const [quality, setQuality] =
    useState('😊 Descansé bien');

  // ============================================
  // GUARDAR
  // ============================================

const handleSave = async () => {

  if (!hours || !quality) {
    Alert.alert(
      'Falta información',
      'Selecciona las horas y la calidad de tu descanso.'
    );
    return;
  }

  // Validar formato de fecha
  const datePattern = /^\d{4}-\d{2}-\d{2}$/;

  if (!datePattern.test(date)) {
    if (Platform.OS === 'web') {
      window.alert('Introduce la fecha en formato AAAA-MM-DD.');
    } else {
      Alert.alert(
        'Fecha inválida',
        'Introduce la fecha en formato AAAA-MM-DD.'
      );
    }
    return;
  }

  const [year, month, day] = date.split('-').map(Number);
  const parsedDate = new Date(year, month - 1, day);

  if (
    parsedDate.getFullYear() !== year ||
    parsedDate.getMonth() !== month - 1 ||
    parsedDate.getDate() !== day
  ) {
    if (Platform.OS === 'web') {
      window.alert('Introduce una fecha válida.');
    } else {
      Alert.alert('Fecha inválida', 'Introduce una fecha válida.');
    }
    return;
  }

  // Guardar en DailyRecordsContext
  addSleepRecord({
    id: `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`,
    date,
    hours,
    quality,
  });

  await Haptics.notificationAsync(
    Haptics.NotificationFeedbackType.Success
  );

  if (Platform.OS === 'web') {
    window.alert('Tu descanso se ha registrado correctamente.');
    router.back();
    return;
  }

  Alert.alert(
    'Descanso registrado',
    'Tu descanso se ha registrado correctamente.',
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
            Mi descanso
          </Text>

          <Text style={styles.subtitle}>
            Dormir también es una forma de cuidarte
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

          {/* FECHA DEL REGISTRO */}

<Text style={styles.dateLabel}>
  Fecha del registro
</Text>

<TextInput
  style={styles.dateInput}
  value={date}
  onChangeText={setDate}
  placeholder="AAAA-MM-DD"
  placeholderTextColor={colors.muted}
  keyboardType="numbers-and-punctuation"
  maxLength={10}
/>

          <Text style={styles.eyebrow}>
            SUEÑO
          </Text>

          {/* HORAS DE SUEÑO */}

          <Text style={styles.sectionTitle}>
            ¿Cuántas horas dormiste aproximadamente?
          </Text>

          <View style={styles.optionsContainer}>

            {sleepHours.map((option) => {

              const selected = hours === option;

              return (

                <Pressable
                  key={option}
                  style={[
                    styles.optionButton,
                    selected && styles.optionSelected,
                  ]}
                  onPress={() => setHours(option)}
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

          {/* CALIDAD DEL DESCANSO */}

          <Text style={styles.sectionTitle}>
            ¿Cómo fue tu descanso?
          </Text>

          <View style={styles.optionsContainer}>

            {sleepQuality.map((option) => {

              const selected = quality === option;

              return (

                <Pressable
                  key={option}
                  style={[
                    styles.optionButton,
                    selected && styles.optionSelected,
                  ]}
                  onPress={() => setQuality(option)}
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

        {/* MENSAJE INFORMATIVO */}

        <View style={styles.noteCard}>

          <Text style={styles.noteText}>
            Este registro es personal y no busca evaluar ni juzgar tu descanso.
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
            Guardar mi descanso
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
    padding: 15,
  },

  eyebrow: {
    fontSize: 9,
    fontWeight: '700',
    letterSpacing: 1.2,
    color: colors.terracotta,
    marginBottom: 10,
  },

  sectionTitle: {
    fontSize: 21,
    fontFamily: 'serif',
    color: colors.brown,
    lineHeight: 25,
    marginBottom: 12,
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
    justifyContent: 'center',
    alignItems: 'center',
  },

  noteCard: {
    backgroundColor: colors.note,
    borderRadius: 13,
    padding: 15,
    marginTop: 15,
  },

  noteText: {
    fontSize: 11,
    color: colors.muted,
    lineHeight: 17,
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
  dateLabel: {
  fontSize: 12,
  fontWeight: '600',
  color: colors.brown,
  marginBottom: 10,
},

dateInput: {
  borderWidth: 1,
  borderColor: colors.border,
  borderRadius: 12,
  paddingHorizontal: 13,
  height: 47,
  color: colors.brown,
  fontSize: 12,
  backgroundColor: '#FFFCF9',
  marginBottom: 20,
},

});