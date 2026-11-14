import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { Alert, Platform, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

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
  text: '#654B3D',
  softBeige: '#F2EAE3',
};

// ============================================
// DATOS DE EJEMPLO
// ============================================

const patient = {
  name: 'Sofía R.',
  diagnosis: 'Diabetes gestacional',
  pregnancyWeek: 24,
};

const report = {
  measurements: 11,
  average: 105,
  inTarget: 80,
  fasting: 4,
  afterMeals: 6,
  withoutContext: 1,
  medications: 'Sin registros',
  bloodPressure: 'Sin registros',
};

// ============================================
// COMPONENTE PRINCIPAL
// ============================================

export default function VistaPreviaScreen() {

  const showMessage = (title: string, message: string) => {
    if (Platform.OS === 'web') {
      window.alert(`${title}\n\n${message}`);
    } else {
      Alert.alert(title, message);
    }
  };

  const handleExport = () => {
    showMessage(
      'Exportar PDF',
      'Próximamente podrás descargar tu informe en formato PDF.'
    );
  };

  const handleShare = () => {
    showMessage(
      'Compartir informe',
      'Próximamente podrás compartir tu informe con tu médico.'
    );
  };

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

        <View>
          <Text style={styles.title}>Vista previa</Text>
          <Text style={styles.subtitle}>
            Informe listo para revisar.
          </Text>
        </View>

      </View>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >

        {/* INDICADOR DE PÁGINA */}

        <Text style={styles.pageLabel}>
          VISTA PREVIA · 1 PÁGINA
        </Text>

        {/* DOCUMENTO */}

        <View style={styles.reportCard}>

          {/* LOGOTIPO */}

          <View style={styles.reportHeader}>
            <Text style={styles.reportLogo}>S.O.I.</Text>

            <Text style={styles.reportHeaderText}>
              Resumen de autocuidado
            </Text>
          </View>

          <View style={styles.divider} />

          {/* INFORMACIÓN DE LA PACIENTE */}

          <Text style={styles.patientName}>
            {patient.name}
          </Text>

          <Text style={styles.patientDetails}>
            {patient.diagnosis} · Semana gestacional {patient.pregnancyWeek}
          </Text>

          <Text style={styles.reportDate}>
            Período: 14–20 de marzo de 2025
          </Text>

          {/* INDICADORES */}

          <View style={styles.metricsCard}>

            <View style={styles.metricItem}>
              <Text style={styles.metricValue}>
                {report.measurements}
              </Text>
              <Text style={styles.metricLabel}>
                MEDICIONES
              </Text>
            </View>

            <View style={styles.metricItem}>
              <Text style={styles.metricValue}>
                {report.average}
              </Text>
              <Text style={styles.metricLabel}>
                PROMEDIO MG/DL
              </Text>
            </View>

            <View style={styles.metricItem}>
              <Text style={styles.metricValue}>
                {report.inTarget}%
              </Text>
              <Text style={styles.metricLabel}>
                EN OBJETIVO
              </Text>
            </View>

          </View>

          {/* GLUCOSA */}

          <Text style={styles.sectionTitle}>
            Glucosa
          </Text>

          <View style={styles.reportRow}>
            <Text style={styles.rowLabel}>
              Valores en ayunas
            </Text>
            <Text style={styles.rowValue}>
              {report.fasting} registros
            </Text>
          </View>

          <View style={styles.reportRow}>
            <Text style={styles.rowLabel}>
              Después de comidas
            </Text>
            <Text style={styles.rowValue}>
              {report.afterMeals} registros
            </Text>
          </View>

          <View style={styles.reportRow}>
            <Text style={styles.rowLabel}>
              Sin contexto suficiente
            </Text>
            <Text style={styles.rowValue}>
              {report.withoutContext} registro
            </Text>
          </View>

          {/* TRATAMIENTO */}

          <Text style={styles.sectionTitle}>
            Tratamiento y otros datos
          </Text>

          <View style={styles.reportRow}>
            <Text style={styles.rowLabel}>
              Medicamentos prescritos
            </Text>
            <Text style={styles.rowValue}>
              {report.medications}
            </Text>
          </View>

          <View style={styles.reportRow}>
            <Text style={styles.rowLabel}>
              Presión arterial
            </Text>
            <Text style={styles.rowValue}>
              {report.bloodPressure}
            </Text>
          </View>

          {/* AVISO */}

          <Text style={styles.disclaimer}>
            * Comparaciones con objetivos configurados por contexto.
            Este documento no sustituye la evaluación profesional.
          </Text>

        </View>

        {/* BOTONES */}

        <View style={styles.buttonsRow}>

          <Pressable
            style={styles.exportButton}
            onPress={handleExport}
          >
            <Text style={styles.exportButtonText}>
              Exportar PDF
            </Text>
          </Pressable>

          <Pressable
            style={styles.shareButton}
            onPress={handleShare}
          >
            <Text style={styles.shareButtonText}>
              Compartir informe
            </Text>
          </Pressable>

        </View>

        <Text style={styles.privacyText}>
          Nada se enviará sin tu confirmación.
        </Text>

      </ScrollView>

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
    paddingBottom: 40,
  },

  pageLabel: {
    fontSize: 9,
    color: colors.muted,
    textAlign: 'center',
    letterSpacing: 1,
    marginBottom: 15,
  },

  reportCard: {
    backgroundColor: colors.white,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: colors.border,
    padding: 17,
  },

  reportHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  reportLogo: {
    fontSize: 23,
    fontFamily: 'serif',
    color: colors.terracotta,
    letterSpacing: 2,
  },

  reportHeaderText: {
    fontSize: 8,
    color: colors.muted,
  },

  divider: {
    height: 1,
    backgroundColor: colors.border,
    marginVertical: 13,
  },

  patientName: {
    fontSize: 23,
    fontFamily: 'serif',
    color: colors.brown,
    marginBottom: 5,
  },

  patientDetails: {
    fontSize: 10,
    color: colors.text,
  },

  reportDate: {
    fontSize: 9,
    color: colors.muted,
    marginTop: 12,
    marginBottom: 15,
  },

  metricsCard: {
    backgroundColor: colors.softBeige,
    borderRadius: 12,
    paddingVertical: 16,
    flexDirection: 'row',
    marginBottom: 18,
  },

  metricItem: {
    flex: 1,
    alignItems: 'center',
    gap: 6,
  },

  metricValue: {
    fontSize: 19,
    fontFamily: 'serif',
    color: colors.brown,
  },

  metricLabel: {
    fontSize: 8,
    color: colors.muted,
    textAlign: 'center',
  },

  sectionTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: colors.brown,
    marginTop: 12,
    marginBottom: 10,
  },

  reportRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#F0E8E1',
  },

  rowLabel: {
    fontSize: 10,
    color: colors.text,
    flex: 1,
  },

  rowValue: {
    fontSize: 10,
    fontWeight: '600',
    color: colors.brown,
  },

  disclaimer: {
    fontSize: 8,
    lineHeight: 13,
    color: colors.muted,
    marginTop: 14,
  },

  buttonsRow: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 15,
  },

  exportButton: {
    flex: 1,
    backgroundColor: colors.terracotta,
    borderRadius: 13,
    minHeight: 48,
    alignItems: 'center',
    justifyContent: 'center',
  },

  exportButtonText: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.white,
  },

  shareButton: {
    flex: 1,
    backgroundColor: colors.white,
    borderRadius: 13,
    borderWidth: 1,
    borderColor: colors.border,
    minHeight: 48,
    alignItems: 'center',
    justifyContent: 'center',
  },

  shareButtonText: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.terracotta,
  },

  privacyText: {
    fontSize: 9,
    color: colors.muted,
    textAlign: 'center',
    marginTop: 12,
  },

});