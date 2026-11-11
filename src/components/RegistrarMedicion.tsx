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

import {
  useMeasurements,
} from '@/app/context/MeasurementContext';

// ============================================
// COLORES S.O.I.
// ============================================

const colors = {
  background: '#FBF7F2',
  white: '#FFFFFF',
  brown: '#704832',
  terracotta: '#A85F3D',
  muted: '#B99B86',
  beige: '#EDE1D4',
  border: '#E8DDD3',
  text: '#654B3D',
};

// ============================================
// MOMENTOS DE MEDICIÓN
// ============================================

const moments = [
  'Al despertar',
  'Antes de comer',
  '1 hora después de comer',
  '2 horas después de comer',
  'Antes de dormir',
  'Otro',
];

// ============================================
// FECHA Y HORA
// ============================================

function getCurrentDate() {
  const now = new Date();

  const year = now.getFullYear();

  const month = String(
    now.getMonth() + 1
  ).padStart(2, '0');

  const day = String(
    now.getDate()
  ).padStart(2, '0');

  return `${year}-${month}-${day}`;
}

function getCurrentTime() {
  const now = new Date();

  const hours = String(
    now.getHours()
  ).padStart(2, '0');

  const minutes = String(
    now.getMinutes()
  ).padStart(2, '0');

  return `${hours}:${minutes}`;
}

// ============================================
// COMPONENTE
// ============================================

export default function RegistrarMedicionScreen() {
  const { addMeasurement } = useMeasurements();

  const [glucose, setGlucose] = useState('');

  const [selectedMoment, setSelectedMoment] =
    useState('2 horas después de comer');

  const [showMoments, setShowMoments] =
    useState(false);

  const [date, setDate] =
    useState(getCurrentDate());

  const [time, setTime] =
    useState(getCurrentTime());

  const [food, setFood] = useState('');

  const [note, setNote] = useState('');

  // ============================================
  // VALIDAR FECHA
  // ============================================

  const isValidDate = (value: string) => {
    if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) {
      return false;
    }

    const [year, month, day] =
      value.split('-').map(Number);

    const parsed = new Date(
      year,
      month - 1,
      day
    );

    return (
      parsed.getFullYear() === year &&
      parsed.getMonth() === month - 1 &&
      parsed.getDate() === day
    );
  };

  // ============================================
  // VALIDAR HORA
  // ============================================

  const isValidTime = (value: string) => {
    return /^([01]\d|2[0-3]):[0-5]\d$/.test(
      value
    );
  };

  // ============================================
  // ALERTAS
  // ============================================

  const showMessage = (
    title: string,
    message: string,
    onConfirm?: () => void
  ) => {
    if (Platform.OS === 'web') {
      window.alert(`${title}\n\n${message}`);

      onConfirm?.();
      return;
    }

    Alert.alert(title, message, [
      {
        text: 'Aceptar',
        onPress: onConfirm,
      },
    ]);
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
      showMessage(
        'Resultado inválido',
        'Introduce un valor de glucosa válido.'
      );
      return;
    }

    if (!isValidDate(date)) {
      showMessage(
        'Fecha inválida',
        'Introduce la fecha en formato AAAA-MM-DD.'
      );
      return;
    }

    if (!isValidTime(time)) {
      showMessage(
        'Hora inválida',
        'Introduce la hora en formato HH:MM.'
      );
      return;
    }

    const measurementDate = new Date(
  `${date}T${time}:00`
);

if (Number.isNaN(measurementDate.getTime())) {
  showMessage(
    'Fecha u hora inválida',
    'Introduce una fecha y hora válidas.'
  );
  return;
}

    addMeasurement({
      id: `${Date.now()}-${Math.random()
        .toString(36)
        .slice(2, 9)}`,
      glucose: value,
      unit: 'mg/dL',
      moment: selectedMoment,
      date,
      time,
      food: food.trim(),
      note: note.trim(),
    });

    showMessage(
      'Medición registrada',
      'Tu medición se guardó correctamente.',
      () => router.back()
    );
  };

  // ============================================
  // SINCRONIZACIÓN
  // ============================================

  const handleBluetooth = () => {
    showMessage(
      'Próximamente',
      'La sincronización con tu dispositivo S.O.I. estará disponible próximamente.'
    );
  };

  // ============================================
  // INTERFAZ
  // ============================================

  return (
    <KeyboardAvoidingView
      style={styles.screen}
      behavior={
        Platform.OS === 'ios'
          ? 'padding'
          : undefined
      }
    >
      <ScrollView
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
              size={20}
              color={colors.terracotta}
            />
          </Pressable>

          <View>
            <Text style={styles.title}>
              Registrar glucosa
            </Text>

            <Text style={styles.subtitle}>
              Añade los datos de tu medición.
            </Text>
          </View>
        </View>

        {/* TARJETA PRINCIPAL */}

        <View style={styles.formCard}>
          {/* VALOR DE GLUCOSA */}

          <Text style={styles.label}>
            Valor de glucosa
          </Text>

          <View style={styles.glucoseContainer}>
            <TextInput
              style={styles.glucoseInput}
              value={glucose}
              onChangeText={setGlucose}
              keyboardType="number-pad"
              placeholder="—"
              placeholderTextColor={colors.muted}
              maxLength={4}
            />

            <Text style={styles.unit}>
              mg/dL
            </Text>
          </View>

          {/* MOMENTO */}

          <Text style={styles.label}>
            Momento de la medición
          </Text>

          <Pressable
            style={styles.selectButton}
            onPress={() =>
              setShowMoments(!showMoments)
            }
          >
            <Text style={styles.selectText}>
              {selectedMoment}
            </Text>

            <Ionicons
              name={
                showMoments
                  ? 'chevron-up'
                  : 'chevron-down'
              }
              size={17}
              color={colors.brown}
            />
          </Pressable>

          {showMoments && (
            <View style={styles.dropdown}>
              {moments.map(moment => (
                <Pressable
                  key={moment}
                  style={styles.dropdownOption}
                  onPress={() => {
                    setSelectedMoment(moment);
                    setShowMoments(false);
                  }}
                >
                  <Text
                    style={styles.dropdownText}
                  >
                    {moment}
                  </Text>
                </Pressable>
              ))}
            </View>
          )}

          {/* FECHA Y HORA */}

          <View style={styles.dateTimeRow}>
            <View style={styles.dateTimeField}>
              <Text style={styles.label}>
                Fecha
              </Text>

              <TextInput
                style={styles.smallInput}
                value={date}
                onChangeText={setDate}
                placeholder="AAAA-MM-DD"
                placeholderTextColor={colors.muted}
                autoCapitalize="none"
                maxLength={10}
              />
            </View>

            <View style={styles.dateTimeField}>
              <Text style={styles.label}>
                Hora
              </Text>

              <TextInput
                style={styles.smallInput}
                value={time}
                onChangeText={setTime}
                placeholder="HH:MM"
                placeholderTextColor={colors.muted}
                maxLength={5}
              />
            </View>
          </View>

          {/* COMIDA RELACIONADA */}

          <View style={styles.labelRow}>
            <Text style={styles.label}>
              Comida relacionada
            </Text>

            <Text style={styles.optional}>
              Opcional
            </Text>
          </View>

          <TextInput
            style={styles.input}
            value={food}
            onChangeText={setFood}
            placeholder="Ej. desayuno"
            placeholderTextColor={colors.muted}
          />

          {/* NOTA */}

          <View style={styles.labelRow}>
            <Text style={styles.label}>
              Nota
            </Text>

            <Text style={styles.optional}>
              Opcional
            </Text>
          </View>

          <TextInput
            style={styles.noteInput}
            value={note}
            onChangeText={setNote}
            placeholder="Algo que quieras recordar..."
            placeholderTextColor={colors.muted}
            multiline
            textAlignVertical="top"
          />
        </View>

        {/* BLUETOOTH */}

        <Pressable
          style={styles.bluetoothButton}
          onPress={handleBluetooth}
        >
          <Ionicons
            name="bluetooth"
            size={19}
            color={colors.terracotta}
          />

          <Text style={styles.bluetoothText}>
            Sincronizar desde mi dispositivo
          </Text>

          <Text style={styles.comingSoon}>
            PRÓXIMAMENTE
          </Text>
        </Pressable>

        {/* GUARDAR */}

        <Pressable
          style={({ pressed }) => [
            styles.saveButton,
            pressed && styles.saveButtonPressed,
          ]}
          onPress={saveMeasurement}
        >
          <Text style={styles.saveButtonText}>
            Guardar medición
          </Text>
        </Pressable>
      </ScrollView>
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
    paddingHorizontal: 20,
    paddingTop: 24,
    paddingBottom: 40,
  },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 22,
  },

  backButton: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
  },

  title: {
    fontSize: 27,
    fontFamily: 'serif',
    color: colors.brown,
  },

  subtitle: {
    fontSize: 11,
    color: colors.muted,
    marginTop: 4,
  },

  formCard: {
    backgroundColor: colors.white,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: colors.border,
    padding: 18,
    gap: 12,
  },

  label: {
    fontSize: 11,
    fontWeight: '600',
    color: colors.brown,
  },

  glucoseContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 13,
    minHeight: 65,
    paddingHorizontal: 14,
    marginBottom: 10,
  },

  glucoseInput: {
    flex: 1,
    fontSize: 27,
    fontFamily: 'serif',
    color: colors.brown,
    paddingVertical: 10,
  },

  unit: {
    fontSize: 12,
    color: colors.muted,
  },

  selectButton: {
    minHeight: 46,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 12,
    paddingHorizontal: 13,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
  },

  selectText: {
    fontSize: 12,
    color: colors.brown,
  },

  dropdown: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 12,
    backgroundColor: colors.white,
    overflow: 'hidden',
  },

  dropdownOption: {
    paddingHorizontal: 13,
    paddingVertical: 12,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.border,
  },

  dropdownText: {
    fontSize: 12,
    color: colors.brown,
  },

  dateTimeRow: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 8,
  },

  dateTimeField: {
    flex: 1,
    gap: 8,
  },

  smallInput: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 12,
    paddingHorizontal: 12,
    minHeight: 44,
    fontSize: 12,
    color: colors.brown,
  },

  labelRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  optional: {
    fontSize: 10,
    color: colors.muted,
  },

  input: {
    minHeight: 44,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 12,
    paddingHorizontal: 12,
    fontSize: 12,
    color: colors.brown,
    marginBottom: 8,
  },

  noteInput: {
    minHeight: 85,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 12,
    padding: 12,
    fontSize: 12,
    color: colors.brown,
  },

  bluetoothButton: {
    marginTop: 12,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 12,
    paddingVertical: 14,
    paddingHorizontal: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 7,
  },

  bluetoothText: {
    fontSize: 10,
    color: colors.brown,
    flexShrink: 1,
  },

  comingSoon: {
    fontSize: 7,
    color: colors.muted,
  },

  saveButton: {
    backgroundColor: colors.terracotta,
    borderRadius: 13,
    minHeight: 52,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 15,
  },

  saveButtonPressed: {
    backgroundColor: colors.brown,
  },

  saveButtonText: {
    fontSize: 13,
    fontWeight: '600',
    color: colors.white,
  },
});