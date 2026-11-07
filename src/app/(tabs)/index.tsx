import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useState } from 'react';

import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

// ============================================
// PALETA DE COLORES S.O.I.
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
  paleGreen: '#E7ECE6',
  text: '#654B3D',
};

// ============================================
// PENDIENTES DEL DÍA
// ============================================

const initialTasks = [
  {
    id: 1,
    title: 'Glucosa en ayunas',
    subtitle: 'Completado · 7:30 a. m.',
    completed: true,
  },
  {
    id: 2,
    title: 'Después del almuerzo',
    subtitle: 'Próxima medición · 2:30 p. m.',
    completed: false,
  },
  {
    id: 3,
    title: 'Vitamina prenatal',
    subtitle: 'Recordatorio · 8:00 p. m.',
    completed: false,
  },
];

// ============================================
// PANTALLA DE INICIO
// ============================================

export default function HomeScreen() {
  const [tasks, setTasks] = useState(initialTasks);

  const completedTasks = tasks.filter(
    (task) => task.completed
  ).length;

  const toggleTask = (id: number) => {
    setTasks((current) =>
      current.map((task) =>
        task.id === id
          ? { ...task, completed: !task.completed }
          : task
      )
    );
  };

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

        <View style={styles.headerText}>

          <Text style={styles.date}>
            MIÉRCOLES, 20 DE MAYO
          </Text>

          <Text style={styles.greeting}>
            Buenos días,
          </Text>

          <Text style={styles.name}>
            Sofía
          </Text>

          <Text style={styles.subtitle}>
            Un día más cuidando de ti.
          </Text>

        </View>

        <View style={styles.headerActions}>

          <Pressable style={styles.notificationButton}>
            <Ionicons
              name="notifications-outline"
              size={20}
              color={colors.brown}
            />

            <View style={styles.notificationDot} />
          </Pressable>

          <Pressable
            style={styles.avatar}
            onPress={() => router.push('/(tabs)/yo')}
          >
            <Ionicons
              name="person"
              size={21}
              color={colors.brown}
            />
          </Pressable>

        </View>

      </View>

      {/* ===================================== */}
      {/* MI EMBARAZO */}
      {/* ===================================== */}

      <Pressable style={styles.pregnancyCard}>

        <Text style={styles.pregnancyLabel}>
          MI EMBARAZO
        </Text>

        <Text style={styles.pregnancyText}>
          Semana 24, día 3
        </Text>

        <Ionicons
          name="chevron-forward"
          size={17}
          color={colors.brown}
        />

      </Pressable>

      {/* ===================================== */}
      {/* MI ÚLTIMA MEDICIÓN */}
      {/* ===================================== */}

      <View style={styles.measurementCard}>

        <View style={styles.measurementHeader}>

          <Text style={styles.measurementTitle}>
            Mi última medición
          </Text>

          <View style={styles.statusBadge}>

            <Ionicons
              name="checkmark"
              size={12}
              color={colors.green}
            />

            <Text style={styles.statusText}>
              EN OBJETIVO
            </Text>

          </View>

        </View>

        <View style={styles.measurementBody}>

          <View>

            <View style={styles.glucoseRow}>

              <Text style={styles.glucoseValue}>
                91
              </Text>

              <Text style={styles.glucoseUnit}>
                mg/dL
              </Text>

            </View>

            <Text style={styles.measurementType}>
              En ayunas
            </Text>

            <Text style={styles.measurementTime}>
              Ayer, 7:32 a. m.
            </Text>

          </View>

          {/* GRÁFICA DECORATIVA */}

          <View style={styles.chartContainer}>

            <View style={styles.chartSegment1} />
            <View style={styles.chartSegment2} />
            <View style={styles.chartSegment3} />
            <View style={styles.chartSegment4} />

          </View>

        </View>

      </View>

      {/* ===================================== */}
      {/* REGISTRAR MI GLUCOSA */}
      {/* ===================================== */}

      <Pressable
        style={styles.registerButton}
        onPress={() => router.push('/registrar-medicion')}
      >

        <Ionicons
          name="add"
          size={20}
          color={colors.white}
        />

        <Text style={styles.registerButtonText}>
          Registrar mi glucosa
        </Text>

      </Pressable>

      {/* ===================================== */}
      {/* MIS PENDIENTES */}
      {/* ===================================== */}

      <View style={styles.tasksSection}>

        <View style={styles.tasksHeader}>

          <View>

            <Text style={styles.sectionEyebrow}>
              PARA HOY
            </Text>

            <Text style={styles.tasksTitle}>
              Mis pendientes
            </Text>

          </View>

          <Text style={styles.tasksCounter}>
            {completedTasks} de {tasks.length}
          </Text>

        </View>

        <View style={styles.tasksCard}>

          {tasks.map((task, index) => (

            <Pressable
              key={task.id}
              style={[
                styles.taskItem,
                index !== tasks.length - 1 &&
                  styles.taskBorder,
              ]}
              onPress={() => toggleTask(task.id)}
            >

              <View
                style={[
                  styles.taskCircle,
                  task.completed &&
                    styles.taskCircleCompleted,
                ]}
              >

                {task.completed && (
                  <Ionicons
                    name="checkmark"
                    size={12}
                    color={colors.white}
                  />
                )}

              </View>

              <View style={styles.taskInfo}>

                <Text style={styles.taskTitle}>
                  {task.title}
                </Text>

                <Text style={styles.taskSubtitle}>
                  {task.subtitle}
                </Text>

              </View>

              {!task.completed && (
                <Ionicons
                  name="chevron-forward"
                  size={16}
                  color={colors.brown}
                />
              )}

            </Pressable>

          ))}

        </View>

      </View>

      {/* ===================================== */}
      {/* PERSONALIZA TU S.O.I. */}
      {/* ===================================== */}

      <View style={styles.personalizeCard}>

        <View style={styles.personalizeContent}>

          <Text style={styles.sectionEyebrow}>
            HAZLO TUYO
          </Text>

          <Text style={styles.personalizeTitle}>
            Personaliza tu S.O.I.
          </Text>

          <Text style={styles.personalizeSubtitle}>
            Elige la funda que más se identifique contigo.
          </Text>

          <Pressable
            style={styles.personalizeButton}
            onPress={() => router.push('/(tabs)/yo')}
          >

            <Ionicons
              name="chevron-forward"
              size={17}
              color={colors.white}
            />

          </Pressable>

        </View>

        {/* REPRESENTACIÓN DEL DISPOSITIVO */}

        <View style={styles.deviceContainer}>

          <View style={styles.device}>

            <Text style={styles.deviceText}>
              S.O.I.
            </Text>

            <View style={styles.deviceCircle} />

          </View>

        </View>

      </View>

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
    paddingHorizontal: 20,
    paddingTop: 25,
    paddingBottom: 35,
    gap: 12,
  },

  // =====================================
  // ENCABEZADO
  // =====================================

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },

  headerText: {
    flex: 1,
  },

  date: {
    fontSize: 9,
    fontWeight: '700',
    letterSpacing: 1.3,
    color: colors.terracotta,
    marginBottom: 5,
  },

  greeting: {
    fontSize: 29,
    fontFamily: 'serif',
    color: colors.brown,
    lineHeight: 31,
  },

  name: {
    fontSize: 31,
    fontFamily: 'serif',
    fontStyle: 'italic',
    color: colors.terracotta,
    lineHeight: 34,
  },

  subtitle: {
    fontSize: 11,
    color: colors.muted,
    marginTop: 6,
  },

  headerActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },

  notificationButton: {
    width: 35,
    height: 35,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.white,
  },

  notificationDot: {
    position: 'absolute',
    top: 6,
    right: 7,
    width: 5,
    height: 5,
    borderRadius: 3,
    backgroundColor: colors.terracotta,
  },

  avatar: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: colors.beige,
    borderWidth: 2,
    borderColor: colors.white,
    alignItems: 'center',
    justifyContent: 'center',
  },

  // =====================================
  // MI EMBARAZO
  // =====================================

  pregnancyCard: {
    backgroundColor: colors.beige,
    borderRadius: 13,
    minHeight: 47,
    paddingHorizontal: 13,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 9,
  },

  pregnancyLabel: {
    fontSize: 8,
    color: colors.muted,
    letterSpacing: 0.5,
  },

  pregnancyText: {
    flex: 1,
    fontSize: 11,
    fontWeight: '600',
    color: colors.brown,
  },

  // =====================================
  // ÚLTIMA MEDICIÓN
  // =====================================

  measurementCard: {
    backgroundColor: colors.white,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: colors.border,
    padding: 18,
    minHeight: 155,
  },

  measurementHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  measurementTitle: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.brown,
  },

  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: colors.paleGreen,
    borderRadius: 20,
    paddingHorizontal: 9,
    paddingVertical: 6,
  },

  statusText: {
    fontSize: 8,
    fontWeight: '600',
    color: colors.green,
  },

  measurementBody: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    flex: 1,
    marginTop: 15,
  },

  glucoseRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: 5,
  },

  glucoseValue: {
    fontSize: 39,
    fontFamily: 'serif',
    color: colors.brown,
  },

  glucoseUnit: {
    fontSize: 11,
    color: colors.muted,
  },

  measurementType: {
    fontSize: 11,
    color: colors.text,
    marginTop: 2,
  },

  measurementTime: {
    fontSize: 9,
    color: colors.muted,
    marginTop: 7,
  },

  // =====================================
  // GRÁFICA DECORATIVA
  // =====================================

  chartContainer: {
    width: 100,
    height: 45,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },

  chartSegment1: {
    width: 25,
    height: 1,
    backgroundColor: colors.terracotta,
    opacity: 0.35,
    transform: [{ rotate: '-8deg' }],
  },

  chartSegment2: {
    width: 25,
    height: 1,
    backgroundColor: colors.terracotta,
    opacity: 0.35,
    transform: [{ rotate: '12deg' }],
  },

  chartSegment3: {
    width: 25,
    height: 1,
    backgroundColor: colors.terracotta,
    opacity: 0.35,
    transform: [{ rotate: '-10deg' }],
  },

  chartSegment4: {
    width: 25,
    height: 1,
    backgroundColor: colors.terracotta,
    opacity: 0.35,
    transform: [{ rotate: '5deg' }],
  },

  // =====================================
  // BOTÓN REGISTRAR
  // =====================================

  registerButton: {
    backgroundColor: colors.terracotta,
    borderRadius: 13,
    minHeight: 49,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
  },

  registerButtonText: {
    fontSize: 13,
    color: colors.white,
    fontWeight: '600',
  },

  // =====================================
  // MIS PENDIENTES
  // =====================================

  tasksSection: {
    marginTop: 10,
    gap: 10,
  },

  tasksHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },

  sectionEyebrow: {
    fontSize: 9,
    color: colors.terracotta,
    letterSpacing: 1.3,
    fontWeight: '700',
  },

  tasksTitle: {
    fontSize: 23,
    fontFamily: 'serif',
    color: colors.brown,
  },

  tasksCounter: {
    fontSize: 10,
    fontWeight: '600',
    color: colors.terracotta,
    marginBottom: 4,
  },

  tasksCard: {
    backgroundColor: colors.white,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: colors.border,
    overflow: 'hidden',
  },

  taskItem: {
    minHeight: 57,
    paddingHorizontal: 12,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 11,
  },

  taskBorder: {
    borderBottomWidth: 1,
    borderBottomColor: '#F1E9E2',
  },

  taskCircle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
  },

  taskCircleCompleted: {
    backgroundColor: colors.green,
    borderColor: colors.green,
  },

  taskInfo: {
    flex: 1,
    gap: 3,
  },

  taskTitle: {
    fontSize: 11,
    fontWeight: '600',
    color: colors.brown,
  },

  taskSubtitle: {
    fontSize: 9,
    color: colors.muted,
  },

  // =====================================
  // PERSONALIZA TU S.O.I.
  // =====================================

  personalizeCard: {
    backgroundColor: colors.beige,
    borderRadius: 21,
    padding: 18,
    minHeight: 160,
    flexDirection: 'row',
    marginTop: 12,
    overflow: 'hidden',
  },

  personalizeContent: {
    flex: 1,
    justifyContent: 'center',
    gap: 7,
  },

  personalizeTitle: {
    fontSize: 19,
    fontFamily: 'serif',
    color: colors.brown,
  },

  personalizeSubtitle: {
    fontSize: 10,
    color: colors.text,
    lineHeight: 15,
    maxWidth: 170,
  },

  personalizeButton: {
    width: 31,
    height: 31,
    borderRadius: 16,
    backgroundColor: colors.terracotta,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 5,
  },

  // =====================================
  // DISPOSITIVO S.O.I.
  // =====================================

  deviceContainer: {
    width: 85,
    alignItems: 'center',
    justifyContent: 'center',
  },

  device: {
    width: 53,
    height: 95,
    borderRadius: 26,
    backgroundColor: '#B16F50',
    transform: [{ rotate: '15deg' }],
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 7,
    shadowColor: colors.brown,
    shadowOpacity: 0.25,
    shadowRadius: 8,
    shadowOffset: {
      width: 2,
      height: 5,
    },
  },

  deviceText: {
    color: colors.white,
    fontSize: 13,
    fontFamily: 'serif',
    letterSpacing: 3,
    transform: [{ rotate: '90deg' }],
  },

  deviceCircle: {
    position: 'absolute',
    bottom: 10,
    width: 17,
    height: 17,
    borderRadius: 9,
    backgroundColor: '#DDA889',
  },

});