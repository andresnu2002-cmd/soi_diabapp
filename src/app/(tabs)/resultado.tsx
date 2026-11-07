import { Ionicons } from '@expo/vector-icons';
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
  // FUNCIONES
  // ============================================

  const handleEditAppointment = () => {
    Alert.alert(
      'Editar cita',
      'Próximamente podrás modificar los datos de tu próxima consulta.'
    );
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
            {appointment.day}
          </Text>

          <View style={styles.appointmentDateDetails}>

            <Text style={styles.appointmentMonth}>
              {appointment.month}
            </Text>

            <Text style={styles.appointmentTime}>
              {appointment.time}
            </Text>

          </View>

        </View>

        {/* ESPECIALIDAD */}

        <Text style={styles.appointmentTitle}>
          {appointment.specialty}
        </Text>

        <Text style={styles.appointmentDoctor}>
          {appointment.doctor} · {appointment.type}
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

});