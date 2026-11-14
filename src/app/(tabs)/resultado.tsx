import { Ionicons } from '@expo/vector-icons';
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

// ============================================
// COLORES S.O.I.
// ============================================

const colors = {
  background: '#F8F4EF',
  white: '#FFFFFF',

  brown: '#704832',
  darkBrown: '#70402D',

  terracotta: '#A85F3D',
  muted: '#B99B86',

  beige: '#EDE1D4',
  border: '#E8DDD3',

  text: '#654B3D',

  softGreen: '#E7ECE6',
  green: '#879B86',
};

// ============================================
// DATOS DE EJEMPLO
// ============================================

const appointment = {
  day: '28',
  month: 'MAR',
  time: '10:30',
  specialty: 'Control de endocrinología',
  doctor: 'Dra. Laura Méndez',
  type: 'Consulta presencial',
};

const summary = {
  diagnosis: 'Diabetes gestacional',
  pregnancyWeek: 'Semana 24',
  measurements: 11,
  inTarget: 8,
  withContext: 10,
};

// ============================================
// COMPONENTE PRINCIPAL
// ============================================

export default function ResultadosScreen() {

  const [reportReady, setReportReady] = useState(false);

  // ============================================
// ESTADOS DE LA CITA
// ============================================

const [isEditingAppointment, setIsEditingAppointment] =
  useState(false);

const [appointmentData, setAppointmentData] = useState({
  date: '2027-03-28',
  time: appointment.time,
  specialty: appointment.specialty,
  doctor: appointment.doctor,
  type: appointment.type,
});

const [appointmentDraft, setAppointmentDraft] =
  useState(appointmentData);

const updateAppointmentDraft = (
  field: keyof typeof appointmentDraft,
  value: string
) => {
  setAppointmentDraft(current => ({
    ...current,
    [field]: value,
  }));
};

const appointmentDate = new Date(
  `${appointmentData.date}T12:00:00`
);

const appointmentDay = String(
  appointmentDate.getDate()
).padStart(2, '0');

const appointmentMonth = appointmentDate
  .toLocaleDateString('es-ES', { month: 'short' })
  .replace('.', '')
  .toUpperCase();

  // ============================================
  // FUNCIONES
  // ============================================

  const handleEditAppointment = () => {
  setAppointmentDraft({ ...appointmentData });
  setIsEditingAppointment(true);
};

const handleSaveAppointment = () => {

  const {
    date,
    time,
    specialty,
    doctor,
    type,
  } = appointmentDraft;

  if (
    !date.trim() ||
    !time.trim() ||
    !specialty.trim() ||
    !doctor.trim() ||
    !type.trim()
  ) {
    if (Platform.OS === 'web') {
      window.alert('Completa todos los campos de la cita.');
    } else {
      Alert.alert(
        'Campos incompletos',
        'Completa todos los campos de la cita.'
      );
    }
    return;
  }

  // Validar fecha YYYY-MM-DD
  const dateMatch = /^(\d{4})-(\d{2})-(\d{2})$/.exec(date);

  if (!dateMatch) {
    if (Platform.OS === 'web') {
      window.alert('La fecha debe tener el formato AAAA-MM-DD.');
    } else {
      Alert.alert('Fecha inválida', 'Usa el formato AAAA-MM-DD.');
    }
    return;
  }

  const year = Number(dateMatch[1]);
  const month = Number(dateMatch[2]);
  const day = Number(dateMatch[3]);

  const parsedDate = new Date(year, month - 1, day);

  const validDate =
    parsedDate.getFullYear() === year &&
    parsedDate.getMonth() === month - 1 &&
    parsedDate.getDate() === day;

  if (!validDate || !/^([01]\d|2[0-3]):[0-5]\d$/.test(time)) {
    if (Platform.OS === 'web') {
      window.alert('Verifica la fecha y la hora de la cita.');
    } else {
      Alert.alert(
        'Datos inválidos',
        'Verifica la fecha y la hora de la cita.'
      );
    }
    return;
  }

  setAppointmentData({
    date,
    time,
    specialty: specialty.trim(),
    doctor: doctor.trim(),
    type: type.trim(),
  });

  setIsEditingAppointment(false);
};
  const handlePrepareAppointment = () => {
  router.push('/preparar-consulta');
};

  const handleGenerateReport = () => {

    setReportReady(true);

    Alert.alert(
      'Preparar informe',
      'Próximamente podrás generar un informe con tus mediciones y registros para compartirlo con tu médico.'
    );

  };

  // ============================================
  // INTERFAZ
  // ============================================

  return (

    <ScrollView
      style={styles.screen}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >

      {/* ===================================== */}
      {/* ENCABEZADO */}
      {/* ===================================== */}

      <View style={styles.header}>

        <Text style={styles.title}>
          Resultados
        </Text>

        <Text style={styles.subtitle}>
          Todo listo para tu próxima consulta.
        </Text>

      </View>

      {/* ===================================== */}
      {/* PRÓXIMA CITA */}
      {/* ===================================== */}

      <View style={styles.appointmentCard}>

        {/* CÍRCULO DECORATIVO */}

        <View style={styles.decorativeCircle} />

        <Text style={styles.appointmentEyebrow}>
          PRÓXIMA CITA
        </Text>

        {/* FECHA */}

        <View style={styles.appointmentDateRow}>

          <Text style={styles.appointmentDay}>
  {appointmentDay}
</Text>

          <View style={styles.appointmentDateDetails}>

            <Text style={styles.appointmentMonth}>
  {appointmentMonth}
</Text>

            <Text style={styles.appointmentTime}>
  {appointmentData.time}
</Text>

          </View>

        </View>

        {/* ESPECIALIDAD */}

        <Text style={styles.appointmentTitle}>
  {appointmentData.specialty}
</Text>

        <Text style={styles.appointmentDoctor}>
  {appointmentData.doctor} · {appointmentData.type}
</Text>

        {/* BOTONES */}

        <View style={styles.appointmentButtons}>

          <Pressable
            style={styles.editButton}
            onPress={handleEditAppointment}
          >

            <Ionicons
              name="pencil-outline"
              size={14}
              color={colors.white}
            />

            <Text style={styles.editButtonText}>
              Editar cita
            </Text>

          </Pressable>

          <Pressable
            style={styles.prepareButton}
            onPress={handlePrepareAppointment}
          >

            <Text style={styles.prepareButtonText}>
              Preparar consulta
            </Text>

            <Ionicons
              name="chevron-forward"
              size={15}
              color={colors.brown}
            />

          </Pressable>

        </View>

      </View>

      {/* ===================================== */}
{/* FORMULARIO EDITAR CITA */}
{/* ===================================== */}

{isEditingAppointment && (

  <View style={styles.appointmentForm}>

    <Text style={styles.formTitle}>
      Editar próxima cita
    </Text>

    <Text style={styles.formSubtitle}>
      Actualiza los detalles de tu consulta.
    </Text>

    {/* FECHA */}

    <Text style={styles.formLabel}>
      Fecha de la cita
    </Text>

    <TextInput
      style={styles.formInput}
      value={appointmentDraft.date}
      onChangeText={(value) =>
        updateAppointmentDraft('date', value)
      }
      placeholder="AAAA-MM-DD"
      placeholderTextColor={colors.muted}
    />

    {/* HORA */}

    <Text style={styles.formLabel}>
      Hora
    </Text>

    <TextInput
      style={styles.formInput}
      value={appointmentDraft.time}
      onChangeText={(value) =>
        updateAppointmentDraft('time', value)
      }
      placeholder="10:30"
      placeholderTextColor={colors.muted}
    />

    {/* CONSULTA O ESTUDIO */}

    <Text style={styles.formLabel}>
      Nombre de la consulta o estudio
    </Text>

    <TextInput
      style={styles.formInput}
      value={appointmentDraft.specialty}
      onChangeText={(value) =>
        updateAppointmentDraft('specialty', value)
      }
      placeholder="Ej. Ecografía obstétrica"
      placeholderTextColor={colors.muted}
    />

    {/* MÉDICO */}

    <Text style={styles.formLabel}>
      Nombre del médico
    </Text>

    <TextInput
      style={styles.formInput}
      value={appointmentDraft.doctor}
      onChangeText={(value) =>
        updateAppointmentDraft('doctor', value)
      }
      placeholder="Ej. Dra. Laura Méndez"
      placeholderTextColor={colors.muted}
    />

    {/* TIPO */}

    <Text style={styles.formLabel}>
      Tipo de consulta
    </Text>

    <TextInput
      style={styles.formInput}
      value={appointmentDraft.type}
      onChangeText={(value) =>
        updateAppointmentDraft('type', value)
      }
      placeholder="Presencial o virtual"
      placeholderTextColor={colors.muted}
    />

    {/* BOTONES */}

    <View style={styles.formButtons}>

      <Pressable
        style={styles.cancelButton}
        onPress={() => setIsEditingAppointment(false)}
      >
        <Text style={styles.cancelButtonText}>
          Cancelar
        </Text>
      </Pressable>

      <Pressable
        style={styles.saveAppointmentButton}
        onPress={handleSaveAppointment}
      >
        <Text style={styles.saveAppointmentText}>
          Guardar cambios
        </Text>
      </Pressable>

    </View>

  </View>

)}


      {/* ===================================== */}
      {/* MI RESUMEN */}
      {/* ===================================== */}

      <View style={styles.summaryHeader}>

        <View>

          <Text style={styles.summaryEyebrow}>
            ÚLTIMOS 7 DÍAS
          </Text>

          <Text style={styles.summaryTitle}>
            Mi resumen
          </Text>

        </View>

        <Text style={styles.summaryStatus}>
          AL DÍA
        </Text>

      </View>

      {/* ===================================== */}
      {/* TARJETA DE RESUMEN */}
      {/* ===================================== */}

      <View style={styles.summaryCard}>

        {/* PRIMERA FILA */}

        <View style={styles.summaryRow}>

          <View style={styles.summaryCell}>

            <Text style={styles.summaryLabel}>
              DIAGNÓSTICO
            </Text>

            <Text style={styles.summaryValue}>
              {summary.diagnosis}
            </Text>

          </View>

          <View style={styles.summaryCell}>

            <Text style={styles.summaryLabel}>
              EMBARAZO
            </Text>

            <Text style={styles.summaryValue}>
              {summary.pregnancyWeek}
            </Text>

          </View>

        </View>

        {/* SEGUNDA FILA */}

        <View style={styles.summaryRow}>

          <View style={styles.summaryCell}>

            <Text style={styles.summaryLabel}>
              MEDICIONES
            </Text>

            <Text style={styles.summaryValue}>
              {summary.measurements} registros
            </Text>

          </View>

          <View style={styles.summaryCell}>

            <Text style={styles.summaryLabel}>
              EN OBJETIVO
            </Text>

            <Text style={styles.summaryValue}>
              {summary.inTarget} de {summary.withContext} con contexto
            </Text>

          </View>

        </View>

      </View>

      {/* ===================================== */}
      {/* MENSAJE INFORMATIVO */}
      {/* ===================================== */}

      <View style={styles.infoCard}>

        <View style={styles.infoIcon}>

          <Ionicons
            name="information-circle"
            size={23}
            color={colors.green}
          />

        </View>

        <View style={styles.infoTextContainer}>

          <Text style={styles.infoTitle}>
            Una lectura clara
          </Text>

          <Text style={styles.infoDescription}>
            Tu objetivo se compara según cada contexto.
            S.O.I. no modifica indicaciones de tu equipo médico.
          </Text>

        </View>

      </View>

      {/* ===================================== */}
      {/* PREPARAR INFORME */}
      {/* ===================================== */}

      <Pressable
        style={styles.reportButton}
        onPress={handleGenerateReport}
      >

        <Ionicons
          name="document-text-outline"
          size={19}
          color={colors.white}
        />

        <Text style={styles.reportButtonText}>
          Preparar informe para mi médico
        </Text>

      </Pressable>

      {/* MENSAJE DE PRIVACIDAD */}

      <Text style={styles.privacyText}>
        Tu información solo se comparte cuando tú lo decides.
      </Text>

    </ScrollView>

  );
}

// ============================================
// ESTILOS
// ============================================

const styles = StyleSheet.create({

  // =====================================
  // PANTALLA
  // =====================================

  screen: {
    flex: 1,
    backgroundColor: colors.background,
  },

  content: {
    paddingHorizontal: 20,
    paddingTop: 28,
    paddingBottom: 45,
  },

  // =====================================
  // ENCABEZADO
  // =====================================

  header: {
    marginBottom: 20,
  },

  title: {
    fontSize: 31,
    fontFamily: 'serif',
    color: colors.brown,
  },

  subtitle: {
    fontSize: 11,
    color: colors.muted,
    marginTop: 4,
  },

  // =====================================
  // PRÓXIMA CITA
  // =====================================

  appointmentCard: {
    backgroundColor: colors.darkBrown,
    borderRadius: 22,
    padding: 19,
    overflow: 'hidden',
    marginBottom: 24,
  },

  decorativeCircle: {
    position: 'absolute',
    width: 125,
    height: 125,
    borderRadius: 65,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.10)',
    right: -35,
    top: -35,
  },

  appointmentEyebrow: {
    fontSize: 9,
    fontWeight: '700',
    letterSpacing: 1.5,
    color: '#D9A88B',
    marginBottom: 16,
  },

  appointmentDateRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },

  appointmentDay: {
    fontSize: 37,
    fontFamily: 'serif',
    color: colors.white,
  },

  appointmentDateDetails: {
    marginLeft: 8,
  },

  appointmentMonth: {
    fontSize: 9,
    fontWeight: '600',
    color: '#E7C3AC',
  },

  appointmentTime: {
    fontSize: 9,
    color: '#E7C3AC',
    marginTop: 3,
  },

  appointmentTitle: {
    fontSize: 22,
    fontFamily: 'serif',
    color: colors.white,
    marginBottom: 7,
  },

  appointmentDoctor: {
    fontSize: 10,
    color: '#E0BBA6',
    marginBottom: 19,
  },

  // =====================================
  // BOTONES DE CITA
  // =====================================

  appointmentButtons: {
    flexDirection: 'row',
    gap: 8,
  },

  editButton: {
    flex: 1,
    minHeight: 39,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.30)',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
  },

  editButtonText: {
    color: colors.white,
    fontSize: 10,
    fontWeight: '600',
  },

  prepareButton: {
    flex: 1.2,
    minHeight: 39,
    borderRadius: 10,
    backgroundColor: '#FFF9F3',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
  },

  prepareButtonText: {
    fontSize: 10,
    fontWeight: '600',
    color: colors.brown,
  },

  // =====================================
  // RESUMEN
  // =====================================

  summaryHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    marginBottom: 12,
  },

  summaryEyebrow: {
    fontSize: 9,
    fontWeight: '700',
    letterSpacing: 1.3,
    color: colors.terracotta,
    marginBottom: 4,
  },

  summaryTitle: {
    fontSize: 24,
    fontFamily: 'serif',
    color: colors.brown,
  },

  summaryStatus: {
    fontSize: 10,
    fontWeight: '600',
    color: colors.terracotta,
    marginBottom: 5,
  },

  // =====================================
  // TARJETA RESUMEN
  // =====================================

  summaryCard: {
    backgroundColor: colors.white,
    borderRadius: 19,
    borderWidth: 1,
    borderColor: colors.border,
    overflow: 'hidden',
    marginBottom: 14,
  },

  summaryRow: {
    flexDirection: 'row',
    minHeight: 66,
    borderBottomWidth: 1,
    borderBottomColor: '#F0E8E1',
  },

  summaryCell: {
    flex: 1,
    padding: 14,
    justifyContent: 'center',
    borderRightWidth: 1,
    borderRightColor: '#F0E8E1',
  },

  summaryLabel: {
    fontSize: 9,
    color: colors.muted,
    marginBottom: 7,
  },

  summaryValue: {
    fontSize: 11,
    fontWeight: '600',
    color: colors.brown,
  },

  // =====================================
  // MENSAJE INFORMATIVO
  // =====================================

  infoCard: {
    backgroundColor: colors.softGreen,
    borderRadius: 14,
    padding: 15,
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 10,
    marginBottom: 17,
  },

  infoIcon: {
    marginTop: 1,
  },

  infoTextContainer: {
    flex: 1,
  },

  infoTitle: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.brown,
    marginBottom: 5,
  },

  infoDescription: {
    fontSize: 10,
    color: colors.text,
    lineHeight: 16,
  },

  // =====================================
  // INFORME MÉDICO
  // =====================================

  reportButton: {
    backgroundColor: colors.terracotta,
    minHeight: 51,
    borderRadius: 13,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,

    shadowColor: colors.terracotta,
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 3,
  },

  reportButtonText: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.white,
  },

  privacyText: {
    fontSize: 9,
    color: colors.muted,
    textAlign: 'center',
    marginTop: 13,
  },
  // ============================================
// EDITAR CITA
// ============================================

appointmentForm: {
  backgroundColor: colors.white,
  borderRadius: 18,
  borderWidth: 1,
  borderColor: colors.border,
  padding: 18,
  marginTop: -12,
  marginBottom: 24,
},

formTitle: {
  fontSize: 22,
  fontFamily: 'serif',
  color: colors.brown,
  marginBottom: 5,
},

formSubtitle: {
  fontSize: 11,
  color: colors.muted,
  marginBottom: 18,
},

formLabel: {
  fontSize: 11,
  fontWeight: '600',
  color: colors.brown,
  marginBottom: 7,
},

formInput: {
  backgroundColor: '#FFFCF9',
  borderWidth: 1,
  borderColor: colors.border,
  borderRadius: 12,
  minHeight: 45,
  paddingHorizontal: 13,
  paddingVertical: 10,
  fontSize: 13,
  color: colors.brown,
  marginBottom: 15,
},

formButtons: {
  flexDirection: 'row',
  gap: 10,
  marginTop: 8,
},

cancelButton: {
  flex: 1,
  minHeight: 45,
  borderRadius: 12,
  borderWidth: 1,
  borderColor: colors.border,
  justifyContent: 'center',
  alignItems: 'center',
},

cancelButtonText: {
  color: colors.brown,
  fontSize: 12,
  fontWeight: '600',
},

saveAppointmentButton: {
  flex: 1.3,
  minHeight: 45,
  borderRadius: 12,
  backgroundColor: colors.terracotta,
  justifyContent: 'center',
  alignItems: 'center',
},

saveAppointmentText: {
  color: colors.white,
  fontSize: 12,
  fontWeight: '600',
},

});