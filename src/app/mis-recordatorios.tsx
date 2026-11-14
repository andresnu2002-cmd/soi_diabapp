import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useState } from 'react';
import {
  Alert,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  TextInput,
  View,
} from 'react-native';

type Reminder = {
  id: string;
  title: string;
  time: string;
  frequency: string;
  enabled: boolean;
  icon: 'notifications-outline' | 'calendar-outline';
};

const colors = {
  background: '#F8F4EF',
  white: '#FFFFFF',
  brown: '#704832',
  terracotta: '#A85F3D',
  muted: '#B99B86',
  border: '#E8DDD3',
  beige: '#F0E5DB',
  green: '#879B86',
};

const initialReminders: Reminder[] = [
  { id: '1', title: 'Glucosa en ayunas', time: '07:30', frequency: 'Todos los días', enabled: true, icon: 'notifications-outline' },
  { id: '2', title: 'Después del almuerzo', time: '14:30', frequency: 'Todos los días', enabled: true, icon: 'notifications-outline' },
  { id: '3', title: 'Vitamina prenatal', time: '20:00', frequency: 'Todos los días', enabled: true, icon: 'notifications-outline' },
  { id: '4', title: 'Próxima cita', time: '09:30', frequency: '28 mar', enabled: false, icon: 'calendar-outline' },
];

const validTime = (time: string) => /^([01]\d|2[0-3]):[0-5]\d$/.test(time);

export default function MisRecordatoriosScreen() {
  const [reminders, setReminders] = useState<Reminder[]>(initialReminders);
  const [adding, setAdding] = useState(false);
  const [title, setTitle] = useState('');
  const [time, setTime] = useState('08:00');
  const [frequency, setFrequency] = useState('Todos los días');

  const toggleReminder = (id: string, enabled: boolean) => {
    setReminders(current => current.map(item => item.id === id ? { ...item, enabled } : item));
  };

  const showError = (message: string) => {
    if (Platform.OS === 'web') window.alert(message);
    else Alert.alert('Revisa el recordatorio', message);
  };

  const addReminder = () => {
    if (!title.trim()) return showError('Escribe un nombre para el recordatorio.');
    if (!validTime(time)) return showError('Introduce una hora válida en formato HH:MM (24 horas).');
    if (!frequency.trim()) return showError('Indica la frecuencia del recordatorio.');

    setReminders(current => [...current, {
      id: `${Date.now()}-${current.length}`,
      title: title.trim(),
      time,
      frequency: frequency.trim(),
      enabled: true,
      icon: 'notifications-outline',
    }]);
    setTitle('');
    setTime('08:00');
    setFrequency('Todos los días');
    setAdding(false);
  };

  const goBack = () => {
    if (router.canGoBack()) router.back();
    else router.replace('/(tabs)/yo');
  };

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
      <View style={styles.header}>
        <Pressable style={styles.backButton} onPress={goBack} accessibilityLabel="Volver a Mis datos">
          <Ionicons name="chevron-back" size={20} color={colors.terracotta} />
        </Pressable>
        <View style={styles.headerText}>
          <Text style={styles.title}>Mis recordatorios</Text>
          <Text style={styles.subtitle}>Solo los que te resulten útiles.</Text>
        </View>
      </View>

      <View style={styles.listCard}>
        {reminders.map((reminder, index) => (
          <View key={reminder.id} style={[styles.reminderRow, index === reminders.length - 1 && styles.lastRow]}>
            <View style={styles.reminderIcon}>
              <Ionicons name={reminder.icon} size={17} color={colors.terracotta} />
            </View>
            <View style={styles.reminderInfo}>
              <Text style={styles.reminderTitle}>{reminder.title}</Text>
              <Text style={styles.reminderDetail}>{reminder.frequency} · {reminder.time}</Text>
            </View>
            <Switch
              value={reminder.enabled}
              onValueChange={enabled => toggleReminder(reminder.id, enabled)}
              trackColor={{ false: '#DDD6D0', true: colors.green }}
              thumbColor={colors.white}
              ios_backgroundColor="#DDD6D0"
              accessibilityLabel={`${reminder.enabled ? 'Desactivar' : 'Activar'} ${reminder.title}`}
            />
          </View>
        ))}
      </View>

      {adding && (
        <View style={styles.formCard}>
          <Text style={styles.formTitle}>Nuevo recordatorio</Text>
          <Text style={styles.label}>Nombre</Text>
          <TextInput style={styles.input} value={title} onChangeText={setTitle} placeholder="Ej. Medir glucosa" placeholderTextColor={colors.muted} />
          <Text style={styles.label}>Hora (HH:MM)</Text>
          <TextInput style={styles.input} value={time} onChangeText={setTime} placeholder="08:00" keyboardType="numbers-and-punctuation" placeholderTextColor={colors.muted} maxLength={5} />
          <Text style={styles.label}>Frecuencia</Text>
          <TextInput style={styles.input} value={frequency} onChangeText={setFrequency} placeholder="Todos los días" placeholderTextColor={colors.muted} />
          <View style={styles.formButtons}>
            <Pressable style={styles.cancelButton} onPress={() => setAdding(false)}><Text style={styles.cancelText}>Cancelar</Text></Pressable>
            <Pressable style={styles.saveButton} onPress={addReminder}><Text style={styles.saveText}>Guardar</Text></Pressable>
          </View>
        </View>
      )}

      {!adding && (
        <Pressable style={styles.addButton} onPress={() => setAdding(true)}>
          <Ionicons name="add" size={18} color={colors.white} />
          <Text style={styles.addButtonText}>Añadir recordatorio</Text>
        </Pressable>
      )}
      <Text style={styles.note}>Los interruptores administran los recordatorios dentro de esta pantalla. Las notificaciones automáticas del dispositivo aún no están configuradas.</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.background },
  content: { paddingHorizontal: 20, paddingTop: 25, paddingBottom: 45 },
  header: { flexDirection: 'row', alignItems: 'center', gap: 12, marginBottom: 22 },
  backButton: { width: 38, height: 38, borderRadius: 19, backgroundColor: colors.white, borderWidth: 1, borderColor: colors.border, alignItems: 'center', justifyContent: 'center' },
  headerText: { flex: 1 },
  title: { fontSize: 25, fontFamily: 'serif', color: colors.brown },
  subtitle: { fontSize: 11, color: colors.muted, marginTop: 3 },
  listCard: { backgroundColor: colors.white, borderWidth: 1, borderColor: colors.border, borderRadius: 17, overflow: 'hidden', marginBottom: 12 },
  reminderRow: { minHeight: 64, paddingHorizontal: 10, paddingVertical: 8, flexDirection: 'row', alignItems: 'center', borderBottomWidth: 1, borderBottomColor: '#F0E8E1', gap: 10 },
  lastRow: { borderBottomWidth: 0 },
  reminderIcon: { width: 34, height: 34, borderRadius: 11, backgroundColor: colors.beige, alignItems: 'center', justifyContent: 'center' },
  reminderInfo: { flex: 1 },
  reminderTitle: { fontSize: 12, fontWeight: '600', color: colors.brown },
  reminderDetail: { fontSize: 9, color: colors.muted, marginTop: 4 },
  addButton: { backgroundColor: colors.terracotta, minHeight: 48, borderRadius: 12, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 10 },
  addButtonText: { color: colors.white, fontSize: 12, fontWeight: '600' },
  formCard: { backgroundColor: colors.white, borderWidth: 1, borderColor: colors.border, borderRadius: 16, padding: 16 },
  formTitle: { fontSize: 20, fontFamily: 'serif', color: colors.brown, marginBottom: 15 },
  label: { fontSize: 11, fontWeight: '600', color: colors.brown, marginBottom: 6 },
  input: { minHeight: 44, borderRadius: 10, borderWidth: 1, borderColor: colors.border, backgroundColor: '#FFFCF9', paddingHorizontal: 12, fontSize: 13, color: colors.brown, marginBottom: 14 },
  formButtons: { flexDirection: 'row', gap: 10, marginTop: 3 },
  cancelButton: { flex: 1, minHeight: 43, borderWidth: 1, borderColor: colors.border, borderRadius: 10, alignItems: 'center', justifyContent: 'center' },
  cancelText: { fontSize: 12, color: colors.brown, fontWeight: '600' },
  saveButton: { flex: 1, minHeight: 43, borderRadius: 10, backgroundColor: colors.terracotta, alignItems: 'center', justifyContent: 'center' },
  saveText: { fontSize: 12, color: colors.white, fontWeight: '600' },
  note: { marginTop: 15, fontSize: 10, lineHeight: 16, textAlign: 'center', color: colors.muted },
});