import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import { router } from 'expo-router';


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
  textSecondary: '#A18A7B',
};

// ============================================
// DATOS DE EJEMPLO
// ============================================

const pregnancyData = {
  currentWeek: 'Semana 24',
  dueDate: 'Marzo 2025',
  pregnancyType: 'Embarazo único',
};

const healthData = {
  condition: 'Diabetes gestacional',
  monitoring: 'No registrado',
};

const preferencesData = {
  reminders: 'Configurados · 4 activos',
  notifications: 'Activadas',
  privacy: 'Solo yo',
};

// ============================================
// COMPONENTE PRINCIPAL
// ============================================

export default function YoScreen() {

  const [deviceConnected, setDeviceConnected] =
    useState(false);

  // ============================================
  // FUNCIONES
  // ============================================

  const handleDevice = () => {
  router.push('/mi-dispositivo');
};

  const handleReminders = () => {

    Alert.alert(
      'Recordatorios',
      'Aquí podrás configurar tus recordatorios de mediciones, medicamentos y citas.'
    );

  };

  const handleNotifications = () => {

    Alert.alert(
      'Notificaciones',
      'Aquí podrás administrar las notificaciones de S.O.I.'
    );

  };

  const handlePrivacy = () => {

    Alert.alert(
      'Privacidad',
      'Tus datos personales y de salud permanecerán bajo tu control.'
    );

  };

  const handleLogout = () => {

    Alert.alert(
      'Cerrar sesión',
      '¿Deseas cerrar tu sesión?',
      [
        {
          text: 'Cancelar',
          style: 'cancel',
        },
        {
          text: 'Cerrar sesión',
          style: 'destructive',
          onPress: () => {
            Alert.alert(
              'Próximamente',
              'La gestión de sesiones estará disponible cuando se implemente la autenticación.'
            );
          },
        },
      ]
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
          Mis datos
        </Text>

        <Text style={styles.subtitle}>
          Tu información, siempre bajo tu control.
        </Text>

      </View>

      {/* ===================================== */}
      {/* MI EMBARAZO */}
      {/* ===================================== */}

      <View style={styles.sectionCard}>

        <View style={styles.sectionHeader}>

          <View style={styles.sectionIcon}>

            <Ionicons
              name="heart-outline"
              size={19}
              color={colors.white}
            />

          </View>

          <Text style={styles.sectionTitle}>
            Mi embarazo
          </Text>

          <Ionicons
            name="chevron-forward"
            size={17}
            color={colors.brown}
          />

        </View>

        {/* SEMANA ACTUAL */}

        <InfoRow
          label="Semana actual"
          value={pregnancyData.currentWeek}
        />

        {/* FECHA ESTIMADA */}

        <InfoRow
          label="Fecha estimada de parto"
          value={pregnancyData.dueDate}
        />

        {/* TIPO DE EMBARAZO */}

        <InfoRow
          label="Tipo de embarazo"
          value={pregnancyData.pregnancyType}
          last
        />

      </View>

      {/* ===================================== */}
      {/* MI SALUD */}
      {/* ===================================== */}

      <View style={styles.sectionCard}>

        <View style={styles.sectionHeader}>

          <View style={styles.sectionIcon}>

            <Ionicons
              name="document-text-outline"
              size={19}
              color={colors.white}
            />

          </View>

          <Text style={styles.sectionTitle}>
            Mi salud
          </Text>

        </View>

        <InfoRow
          label="Condición principal"
          value={healthData.condition}
        />

        <InfoRow
          label="Monitoreo"
          value={healthData.monitoring}
          last
        />

      </View>

      {/* ===================================== */}
      {/* MI DISPOSITIVO S.O.I. */}
      {/* ===================================== */}

      <Pressable
        style={styles.deviceCard}
        onPress={handleDevice}
      >

        <View style={styles.deviceIcon}>

          <Ionicons
            name="bluetooth"
            size={20}
            color={colors.white}
          />

        </View>

        <View style={styles.deviceContent}>

          <Text style={styles.deviceTitle}>
            Mi dispositivo S.O.I.
          </Text>

          <Text style={styles.deviceSubtitle}>
            {deviceConnected
              ? 'Bluetooth · Conectado'
              : 'Bluetooth · Sin conectar'}
          </Text>

        </View>

        <Ionicons
          name="chevron-forward"
          size={19}
          color={colors.white}
        />

      </Pressable>

      {/* ===================================== */}
      {/* MIS PREFERENCIAS */}
      {/* ===================================== */}

      <View style={styles.sectionCard}>

        <View style={styles.sectionHeader}>

          <View style={styles.sectionIcon}>

            <Ionicons
              name="notifications-outline"
              size={19}
              color={colors.white}
            />

          </View>

          <Text style={styles.sectionTitle}>
            Mis preferencias
          </Text>

        </View>

        {/* RECORDATORIOS */}

        <Pressable
          style={styles.preferenceRow}
          onPress={handleReminders}
        >

          <View style={styles.preferenceText}>

            <Text style={styles.infoLabel}>
              Recordatorios
            </Text>

            <Text style={styles.infoValue}>
              {preferencesData.reminders}
            </Text>

          </View>

          <Ionicons
            name="chevron-forward"
            size={17}
            color={colors.brown}
          />

        </Pressable>

        {/* NOTIFICACIONES */}

        <Pressable
          style={styles.preferenceRow}
          onPress={handleNotifications}
        >

          <View style={styles.preferenceText}>

            <Text style={styles.infoLabel}>
              Notificaciones
            </Text>

          </View>

          <Text style={styles.preferenceValue}>
            {preferencesData.notifications}
          </Text>

        </Pressable>

        {/* PRIVACIDAD */}

        <Pressable
          style={[
            styles.preferenceRow,
            styles.lastRow,
          ]}
          onPress={handlePrivacy}
        >

          <View style={styles.preferenceText}>

            <Text style={styles.infoLabel}>
              Privacidad
            </Text>

          </View>

          <Text style={styles.preferenceValue}>
            {preferencesData.privacy}
          </Text>

        </Pressable>

      </View>

      {/* ===================================== */}
      {/* CERRAR SESIÓN */}
      {/* ===================================== */}

      <Pressable
        style={styles.logoutButton}
        onPress={handleLogout}
      >

        <Text style={styles.logoutText}>
          Cerrar sesión
        </Text>

      </Pressable>

      {/* ===================================== */}
      {/* VERSIÓN */}
      {/* ===================================== */}

      <Text style={styles.versionText}>
        S.O.I. · Prototipo conceptual v1.0
      </Text>

    </ScrollView>

  );
}

// ============================================
// COMPONENTE REUTILIZABLE
// ============================================

function InfoRow({
  label,
  value,
  last = false,
}: {
  label: string;
  value: string;
  last?: boolean;
}) {

  return (

    <View
      style={[
        styles.infoRow,
        last && styles.lastRow,
      ]}
    >

      <Text style={styles.infoLabel}>
        {label}
      </Text>

      <Text style={styles.infoValue}>
        {value}
      </Text>

    </View>

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
    paddingBottom: 35,
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
  // TARJETAS GENERALES
  // =====================================

  sectionCard: {
    backgroundColor: colors.white,
    borderRadius: 19,
    borderWidth: 1,
    borderColor: colors.border,
    overflow: 'hidden',
    marginBottom: 12,
  },

  sectionHeader: {
    minHeight: 54,
    backgroundColor: colors.beige,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 13,
    gap: 10,
  },

  sectionIcon: {
    width: 31,
    height: 31,
    borderRadius: 10,
    backgroundColor: colors.terracotta,
    justifyContent: 'center',
    alignItems: 'center',
  },

  sectionTitle: {
    fontSize: 19,
    fontFamily: 'serif',
    color: colors.brown,
    flex: 1,
  },

  // =====================================
  // FILAS DE INFORMACIÓN
  // =====================================

  infoRow: {
    minHeight: 54,
    paddingHorizontal: 13,
    paddingVertical: 10,
    justifyContent: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#F0E8E1',
  },

  lastRow: {
    borderBottomWidth: 0,
  },

  infoLabel: {
    fontSize: 10,
    color: colors.textSecondary,
    marginBottom: 5,
  },

  infoValue: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.brown,
  },

  // =====================================
  // DISPOSITIVO S.O.I.
  // =====================================

  deviceCard: {
    backgroundColor: colors.darkBrown,
    borderRadius: 15,
    paddingHorizontal: 14,
    minHeight: 63,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 11,
    marginBottom: 12,
  },

  deviceIcon: {
    width: 35,
    height: 35,
    borderRadius: 12,
    backgroundColor: 'rgba(255,255,255,0.14)',
    justifyContent: 'center',
    alignItems: 'center',
  },

  deviceContent: {
    flex: 1,
  },

  deviceTitle: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.white,
    marginBottom: 4,
  },

  deviceSubtitle: {
    fontSize: 10,
    color: '#DAB8A5',
  },

  // =====================================
  // PREFERENCIAS
  // =====================================

  preferenceRow: {
    minHeight: 57,
    paddingHorizontal: 13,
    paddingVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: '#F0E8E1',
  },

  preferenceText: {
    flex: 1,
  },

  preferenceValue: {
    fontSize: 11,
    fontWeight: '600',
    color: colors.brown,
  },

  // =====================================
  // CERRAR SESIÓN
  // =====================================

  logoutButton: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    marginTop: 2,
  },

  logoutText: {
    fontSize: 11,
    color: colors.terracotta,
    fontWeight: '600',
  },

  // =====================================
  // VERSIÓN
  // =====================================

  versionText: {
    fontSize: 9,
    color: colors.muted,
    textAlign: 'center',
    marginTop: 3,
  },

});