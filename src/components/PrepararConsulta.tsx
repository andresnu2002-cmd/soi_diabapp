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
  softBeige: '#F2EAE3',
};

// ============================================
// TIPOS
// ============================================

type ReportPeriod =
  | 'Últimos 7 días'
  | 'Últimos 14 días'
  | 'Últimos 30 días';

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
// COMPONENTE
// ============================================

export default function PrepararConsulta() {

  const [selectedPeriod, setSelectedPeriod] =
    useState<ReportPeriod>('Últimos 7 días');

  const [showPeriods, setShowPeriods] =
    useState(false);

  const [notes, setNotes] =
    useState('');

  // ============================================
  // CAMBIAR PERÍODO
  // ============================================

  const periods: ReportPeriod[] = [
    'Últimos 7 días',
    'Últimos 14 días',
    'Últimos 30 días',
  ];

  // ============================================
  // PREVISUALIZAR
  // ============================================

  const handlePreview = () => {

    Alert.alert(
      'Previsualizar informe',
      'Próximamente podrás visualizar el informe completo antes de compartirlo con tu médico.'
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

      {/* ===================================== */}
      {/* ENCABEZADO */}
      {/* ===================================== */}

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
            Mi reporte médico
          </Text>

          <Text style={styles.subtitle}>
            Prepara tu próxima consulta.
          </Text>

        </View>

      </View>

      {/* ===================================== */}
      {/* CONTENIDO */}
      {/* ===================================== */}

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >

        {/* ================================= */}
        {/* PERÍODO DEL INFORME */}
        {/* ================================= */}

        <View style={styles.periodCard}>

          <Text style={styles.periodLabel}>
            PERÍODO DEL INFORME
          </Text>

          <Pressable
            style={styles.periodSelector}
            onPress={() => setShowPeriods(!showPeriods)}
          >

            <Text style={styles.periodValue}>
              {selectedPeriod}
            </Text>

            <Ionicons
              name={
                showPeriods
                  ? 'chevron-up'
                  : 'chevron-forward'
              }
              size={18}
              color={colors.brown}
            />

          </Pressable>

          {showPeriods && (

            <View style={styles.periodOptions}>

              {periods.map((period) => (

                <Pressable
                  key={period}
                  style={styles.periodOption}
                  onPress={() => {
                    setSelectedPeriod(period);
                    setShowPeriods(false);
                  }}
                >

                  <Text style={styles.periodOptionText}>
                    {period}
                  </Text>

                  {selectedPeriod === period && (
                    <Ionicons
                      name="checkmark"
                      size={16}
                      color={colors.terracotta}
                    />
                  )}

                </Pressable>

              ))}

            </View>

          )}

        </View>

        {/* ================================= */}
        {/* VISTA PREVIA DEL REPORTE */}
        {/* ================================= */}

        <View style={styles.reportCard}>

          {/* LOGO */}

          <View style={styles.reportHeader}>

            <Text style={styles.reportLogo}>
              S.O.I.
            </Text>

            <Text style={styles.reportHeaderText}>
              Resumen de autocuidado
            </Text>

          </View>

          <View style={styles.divider} />

          {/* PACIENTE */}

          <Text style={styles.patientName}>
            {patient.name}
          </Text>

          <Text style={styles.patientDetails}>
            {patient.diagnosis} · Semana gestacional {patient.pregnancyWeek}
          </Text>

          <Text style={styles.reportDate}>
            Período: 14–20 de marzo de 2025
          </Text>

          {/* ================================= */}
          {/* INDICADORES */}
          {/* ================================= */}

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

          {/* ================================= */}
          {/* GLUCOSA */}
          {/* ================================= */}

          <Text style={styles.reportSectionTitle}>
            Glucosa
          </Text>

          <View style={styles.reportRow}>

            <Text style={styles.reportRowLabel}>
              Valores en ayunas
            </Text>

            <Text style={styles.reportRowValue}>
              {report.fasting} registros
            </Text>

          </View>

          <View style={styles.reportRow}>

            <Text style={styles.reportRowLabel}>
              Después de comidas
            </Text>

            <Text style={styles.reportRowValue}>
              {report.afterMeals} registros
            </Text>

          </View>

          <View style={styles.reportRow}>

            <Text style={styles.reportRowLabel}>
              Sin contexto suficiente
            </Text>

            <Text style={styles.reportRowValue}>
              {report.withoutContext} registro
            </Text>

          </View>

          {/* ================================= */}
          {/* TRATAMIENTO */}
          {/* ================================= */}

          <Text style={styles.reportSectionTitle}>
            Tratamiento y otros datos
          </Text>

          <View style={styles.reportRow}>

            <Text style={styles.reportRowLabel}>
              Medicamentos prescritos
            </Text>

            <Text style={styles.reportRowValue}>
              {report.medications}
            </Text>

          </View>

          <View style={styles.reportRow}>

            <Text style={styles.reportRowLabel}>
              Presión arterial
            </Text>

            <Text style={styles.reportRowValue}>
              {report.bloodPressure}
            </Text>

          </View>

          {/* AVISO */}

          <Text style={styles.reportDisclaimer}>
            * Comparaciones con objetivos configurados por contexto.
            Este documento no sustituye la evaluación profesional.
          </Text>

        </View>

        {/* ================================= */}
        {/* NOTAS PARA EL MÉDICO */}
        {/* ================================= */}

        <View style={styles.notesCard}>

          <Text style={styles.notesTitle}>
            Notas para mi médico
          </Text>

          <TextInput
            style={styles.notesInput}
            placeholder="Dudas o preguntas que quieras llevar..."
            placeholderTextColor={colors.muted}
            value={notes}
            onChangeText={setNotes}
            multiline
            textAlignVertical="top"
          />

        </View>

      </ScrollView>

      {/* ===================================== */}
      {/* BOTÓN INFERIOR */}
      {/* ===================================== */}

      <View style={styles.footer}>

        <Pressable
          style={styles.previewButton}
          onPress={handlePreview}
        >

          <Text style={styles.previewButtonText}>
            Previsualizar informe
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

  // =====================================
  // ENCABEZADO
  // =====================================

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 22,
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
    alignItems: 'center',
    justifyContent: 'center',
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

  // =====================================
  // CONTENIDO
  // =====================================

  scroll: {
    flex: 1,
  },

  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 30,
    gap: 12,
  },

  // =====================================
  // PERÍODO
  // =====================================

  periodCard: {
    backgroundColor: colors.white,
    borderRadius: 17,
    borderWidth: 1,
    borderColor: colors.border,
    padding: 14,
  },

  periodLabel: {
    fontSize: 9,
    fontWeight: '600',
    color: colors.muted,
    marginBottom: 8,
  },

  periodSelector: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  periodValue: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.brown,
  },

  periodOptions: {
    marginTop: 12,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },

  periodOption: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
  },

  periodOptionText: {
    fontSize: 12,
    color: colors.brown,
  },

  // =====================================
  // REPORTE
  // =====================================

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

  // =====================================
  // INDICADORES
  // =====================================

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

  // =====================================
  // SECCIONES DEL REPORTE
  // =====================================

  reportSectionTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: colors.brown,
    marginTop: 6,
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

  reportRowLabel: {
    fontSize: 10,
    color: colors.text,
    flex: 1,
  },

  reportRowValue: {
    fontSize: 10,
    fontWeight: '600',
    color: colors.brown,
  },

  reportDisclaimer: {
    fontSize: 8,
    lineHeight: 13,
    color: colors.muted,
    marginTop: 14,
  },

  // =====================================
  // NOTAS
  // =====================================

  notesCard: {
    backgroundColor: colors.white,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: colors.border,
    padding: 16,
  },

  notesTitle: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.brown,
    marginBottom: 12,
  },

  notesInput: {
    minHeight: 90,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 12,
    padding: 13,
    fontSize: 12,
    color: colors.brown,
    backgroundColor: '#FFFCF9',
  },

  // =====================================
  // BOTÓN INFERIOR
  // =====================================

  footer: {
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 18,
    backgroundColor: colors.background,
  },

  previewButton: {
    backgroundColor: colors.terracotta,
    borderRadius: 14,
    minHeight: 51,
    alignItems: 'center',
    justifyContent: 'center',
  },

  previewButtonText: {
    color: colors.white,
    fontSize: 13,
    fontWeight: '600',
  },

});