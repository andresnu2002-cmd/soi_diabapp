import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useState } from 'react';
import { useMeasurements } from '@/app/context/MeasurementContext';
import { useDailyRecords } from '@/app/context/DailyRecordsContext';

import {
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
  terracotta: '#A85F3D',
  muted: '#B99B86',
  beige: '#EDE1D4',
  border: '#E8DDD3',
  green: '#879B86',
  paleGreen: '#E7ECE6',
  text: '#654B3D',
  softPink: '#F0DFD5',
  softGray: '#E2E7E4',
  softGreen: '#DFE6DB',
};

// ============================================
// TIPOS
// ============================================

type ProgressTab = 'Glucosa' | 'Hábitos' | 'Bienestar';

type Period = 'Día' | 'Semana' | 'Mes' | 'Todos';

// ============================================
// Los registros de glucosa provienen de MeasurementContext.
// ============================================

const habits = [
  {
    id: 'alimentacion',
    letter: 'A',
    title: 'Alimentación',
    subtitle: 'Registra sin contar calorías',
    background: colors.softPink,
  },
  {
    id: 'sueno',
    letter: 'S',
    title: 'Sueño',
    subtitle: '¿Cómo descansaste?',
    background: colors.softGray,
  },
  {
    id: 'actividad',
    letter: 'A',
    title: 'Actividad física',
    subtitle: 'Registra tu movimiento de hoy',
    background: colors.softGreen,
  },
];

// ============================================
// CONFIGURACIÓN DEL CALENDARIO
// ============================================

const months = [
  'Enero',
  'Febrero',
  'Marzo',
  'Abril',
  'Mayo',
  'Junio',
  'Julio',
  'Agosto',
  'Septiembre',
  'Octubre',
  'Noviembre',
  'Diciembre',
];

const weekDays = ['L', 'M', 'X', 'J', 'V', 'S', 'D'];

// ============================================
// FUNCIONES DEL CALENDARIO
// ============================================

const formatDateKey = (date: Date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');

  return `${year}-${month}-${day}`;
};

const getCalendarDays = (date: Date) => {
  const year = date.getFullYear();
  const month = date.getMonth();

  const firstDay = new Date(year, month, 1);

  // Convertir domingo=0 a lunes=0
  const startOffset = (firstDay.getDay() + 6) % 7;

  const daysInMonth = new Date(
    year,
    month + 1,
    0
  ).getDate();

  const days: (number | null)[] = [];

  for (let i = 0; i < startOffset; i++) {
    days.push(null);
  }

  for (let day = 1; day <= daysInMonth; day++) {
    days.push(day);
  }

  // Completar la última semana
  while (days.length % 7 !== 0) {
    days.push(null);
  }

  return days;
};

// ============================================
// COMPONENTE PRINCIPAL
// ============================================

export default function SeguimientoScreen() {
  const { measurements } = useMeasurements();
  const { getRecordsByDate, wellnessRecords } = useDailyRecords();
  const [graphWidth, setGraphWidth] = useState(0);
  const [selectedMeasurementId, setSelectedMeasurementId] = useState<string | null>(null);

  const abrirHabito = (
  tipo: 'alimentacion' | 'sueno' | 'actividad'
) => {
  router.push({
    pathname: '/(tabs)/tu_progreso',
    params: { tipo },
  });
};

  const [activeTab, setActiveTab] =
    useState<ProgressTab>('Glucosa');
const [selectedPeriod, setSelectedPeriod] =
  useState<Period>('Todos');

  const [showAllHistory, setShowAllHistory] =
    useState(false);

  const [selectedHabits, setSelectedHabits] =
    useState<string[]>([]);

  // ============================================
  // ESTADOS DEL CALENDARIO
  // ============================================

  const [showCalendar, setShowCalendar] =
    useState(false);

  const [currentMonth, setCurrentMonth] =
    useState(new Date(new Date().getFullYear(), new Date().getMonth(), 1));

  const [selectedDate, setSelectedDate] =
    useState(new Date());

  const sorted = [...measurements].sort((a, b) =>
    `${a.date}T${a.time}`.localeCompare(`${b.date}T${b.time}`)
  );

const periodStart = new Date(selectedDate);
periodStart.setHours(0, 0, 0, 0);

const periodEnd = new Date(selectedDate);
periodEnd.setHours(23, 59, 59, 999);

if (selectedPeriod === 'Semana') {
  periodStart.setDate(periodStart.getDate() - 6);
}

if (selectedPeriod === 'Mes') {
  periodStart.setDate(periodStart.getDate() - 29);
}

const filtered =
  selectedPeriod === 'Todos'
    ? sorted
    : sorted.filter(item => {
        const measurementDate = new Date(
          `${item.date}T${item.time}:00`
        );

        return (
          measurementDate >= periodStart &&
          measurementDate <= periodEnd
        );
      });
const chartData = filtered;
  const selectedMeasurement = chartData.find(item => item.id === selectedMeasurementId) ?? null;
  const dailyRecords = selectedMeasurement ? getRecordsByDate(selectedMeasurement.date) : null;
  const latestWellness = [...wellnessRecords].sort((a, b) => b.date.localeCompare(a.date))[0] ?? null;
  const emotionNames: Record<string, string> = { emocionada: 'Emocionada', feliz: 'Feliz', tranquila: 'Tranquila', segura: 'Segura', ansiosa: 'Ansiosa', miedo: 'Con miedo' };
  const emotionLabel = (emotion: string) => emotionNames[emotion] ?? emotion;
  const average = filtered.length
    ? Math.round(filtered.reduce((sum, item) => sum + item.glucose, 0) / filtered.length)
    : null;
  const maxValue = Math.max(140, ...chartData.map(item => item.glucose));
  const minValue = Math.min(60, ...chartData.map(item => item.glucose));
  const chartHeight = 135;
  const padding = 7;
  const yFor = (value: number) =>
    padding + ((maxValue - value) / (maxValue - minValue || 1)) * (chartHeight - padding * 2);
  const xFor = (index: number) =>
    chartData.length <= 1 ? graphWidth / 2 :
      padding + index * (graphWidth - padding * 2) / (chartData.length - 1);

  const measurementDates = measurements.reduce<Record<string, number>>((acc, item) => {
    acc[item.date] = (acc[item.date] || 0) + 1;
    return acc;
  }, {});
  const visibleHistory = showAllHistory ? [...sorted].reverse() : [...sorted].reverse().slice(0, 2);


  // ============================================
  // FUNCIONES
  // ============================================

  const toggleHabit = (id: string) => {
    setSelectedHabits((current) =>
      current.includes(id)
        ? current.filter((item) => item !== id)
        : [...current, id]
    );
  };

  const changeMonth = (direction: number) => {
    setCurrentMonth(
      new Date(
        currentMonth.getFullYear(),
        currentMonth.getMonth() + direction,
        1
      )
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
          Tu progreso
        </Text>

        <Text style={styles.subtitle}>
          Comprende cómo has evolucionado.
        </Text>

      </View>

      {/* ===================================== */}
      {/* PESTAÑAS INTERNAS */}
      {/* ===================================== */}

      <View style={styles.tabsContainer}>

        {(['Glucosa', 'Hábitos', 'Bienestar'] as ProgressTab[])
          .map((tab) => {

            const selected = activeTab === tab;

            return (
              <Pressable
                key={tab}
                style={[
                  styles.tabButton,
                  selected && styles.tabSelected,
                ]}
                onPress={() => setActiveTab(tab)}
              >
                <Text
                  style={[
                    styles.tabText,
                    selected && styles.tabTextSelected,
                  ]}
                >
                  {tab}
                </Text>
              </Pressable>
            );
          })}

      </View>

      {/* ===================================== */}
      {/* CONTENIDO GLUCOSA */}
      {/* ===================================== */}

      {activeTab === 'Glucosa' && (

        <View style={styles.tabContent}>

          {/* SELECTOR DE PERÍODO */}

          <View style={styles.periodRow}>

            <View style={styles.periodSelector}>

              {(['Día', 'Semana', 'Mes', 'Todos'] as Period[])
                .map((period) => {

                  const selected =
                    selectedPeriod === period;

                  return (
                    <Pressable
                      key={period}
                      style={[
                        styles.periodButton,
                        selected && styles.periodSelected,
                      ]}
                      onPress={() =>
                        setSelectedPeriod(period)
                      }
                    >
                      <Text
                        style={[
                          styles.periodText,
                          selected && styles.periodTextSelected,
                        ]}
                      >
                        {period}
                      </Text>
                    </Pressable>
                  );
                })}

            </View>

            {/* BOTÓN CALENDARIO */}

            <Pressable
              style={styles.calendarButton}
              onPress={() =>
                setShowCalendar(!showCalendar)
              }
            >
              <Ionicons
                name={
                  showCalendar
                    ? 'stats-chart-outline'
                    : 'calendar-outline'
                }
                size={20}
                color={colors.terracotta}
              />
            </Pressable>

          </View>

          {/* ================================= */}
          {/* GRÁFICA DE GLUCOSA */}
          {/* ================================= */}

          {!showCalendar && (
            <View style={styles.chartCard}>
              <View style={styles.chartHeader}>
                <Text style={styles.chartEyebrow}>
                  {selectedPeriod === 'Todos'
                    ? 'Todas mis mediciones'
                    : selectedPeriod === 'Día'
                      ? `Día ${formatDateKey(selectedDate)}`
                      : `${formatDateKey(periodStart)} al ${formatDateKey(periodEnd)}`}
                </Text>
                <Text style={styles.legendText}>{filtered.length} mediciones</Text>
              </View>
              <View style={styles.averageRow}>
                <Text style={styles.averageLabel}>Promedio</Text>
                <Text style={styles.averageValue}>{average ?? '—'}</Text>
                <Text style={styles.averageUnit}>mg/dL</Text>
              </View>
              {chartData.length === 0 ? (
                <View style={{ paddingVertical: 35, alignItems: 'center', gap: 12 }}>
                  <Text style={styles.chartFooterText}>No hay mediciones en este período.</Text>
                  <Pressable onPress={() => router.push('/registrar-medicion')}>
                    <Text style={{ color: colors.terracotta, fontWeight: '600' }}>Registrar glucosa</Text>
                  </Pressable>
                </View>
              ) : (
                <>
                  <View style={styles.graph}>
                    <View style={styles.graphLabels}>
                      <Text style={styles.axisText}>{maxValue}</Text>
                      <Text style={styles.axisText}>{Math.round((maxValue + minValue) / 2)}</Text>
                      <Text style={styles.axisText}>{minValue}</Text>
                    </View>
                    <View style={styles.graphArea} onLayout={event => setGraphWidth(event.nativeEvent.layout.width)}>
                      <View style={styles.gridLine} />
                      <View style={styles.gridLine} />
                      <View style={styles.gridLine} />
                      {graphWidth > 0 && chartData.slice(1).map((item, index) => {
                        const x1 = xFor(index);
                        const x2 = xFor(index + 1);
                        const y1 = yFor(chartData[index].glucose);
                        const y2 = yFor(item.glucose);
                        const dx = x2 - x1;
                        const dy = y2 - y1;
                        const length = Math.sqrt(dx * dx + dy * dy);
                        const angle = Math.atan2(dy, dx) * 180 / Math.PI;
                        return (
                          <View key={`line-${item.id}`} style={{
                            position: 'absolute', left: (x1 + x2) / 2 - length / 2,
                            top: (y1 + y2) / 2 - 1, width: length, height: 2,
                            backgroundColor: colors.terracotta,
                            transform: [{ rotate: `${angle}deg` }],
                          }} />
                        );
                      })}
                      {graphWidth > 0 && chartData.map((item, index) => {
                        const selected = selectedMeasurementId === item.id;
                        return (
                          <Pressable
                            key={item.id}
                            accessibilityRole="button"
                            accessibilityLabel={`Medición ${item.glucose} mg/dL del ${item.date} a las ${item.time}`}
                            accessibilityHint="Muestra los detalles de esta medición"
                            onPress={() => setSelectedMeasurementId(selected ? null : item.id)}
                            hitSlop={8}
                            style={[
                              styles.pointTouchTarget,
                              {
                                left: xFor(index) - 14,
                                top: yFor(item.glucose) - 14,
                              },
                            ]}
                          >
                            <View style={[styles.graphPoint, selected && styles.graphPointSelected]} />
                          </Pressable>
                        );
                      })}
                    </View>
                  </View>
                  <View style={styles.daysRow}>
                    {chartData.map((item, index) => {
                      const labelStep = Math.max(1, Math.ceil(chartData.length / 4));
                      if (index % labelStep !== 0 && index !== chartData.length - 1) return null;
                      if (index === chartData.length - 1 && index > 0 && index - Math.floor((index - 1) / labelStep) * labelStep < 2) return null;
                      return (
                        <Text
                          key={item.id}
                          numberOfLines={1}
                          style={[
                            styles.dayLabel,
                            {
                              position: 'absolute',
                              left: Math.max(0, Math.min(graphWidth - 42, xFor(index) - 21)),
                              width: 42,
                              textAlign: 'center',
                            },
                          ]}
                        >
                          {selectedPeriod === 'Día'
                            ? item.time
                            : `${item.date.slice(8)}/${item.date.slice(5, 7)}`}
                        </Text>
                      );
                    })}
                  </View>
                  {selectedMeasurement && (
                    <View style={styles.measurementDetailCard}>
                      <View style={styles.detailHeader}>
                        <View style={styles.detailHeading}>
                          <View style={styles.detailMarker} />
                          <Text style={styles.detailTitle}>Medición seleccionada</Text>
                        </View>
                        <Pressable
                          onPress={() => setSelectedMeasurementId(null)}
                          accessibilityLabel="Cerrar detalles"
                          hitSlop={10}
                        >
                          <Ionicons name="close" size={18} color={colors.brown} />
                        </Pressable>
                      </View>
                      <Text style={styles.detailValue}>
                        {selectedMeasurement.glucose} <Text style={styles.detailUnit}>mg/dL</Text>
                      </Text>
                      <Text style={styles.detailText}>Fecha: {selectedMeasurement.date}</Text>
                      <Text style={styles.detailText}>Hora: {selectedMeasurement.time}</Text>
                      <Text style={styles.detailText}>Momento: {selectedMeasurement.moment}</Text>
                      <Text style={styles.detailText}>
                        Comida relacionada: {selectedMeasurement.food || 'No indicada'}
                      </Text>
                      <Text style={styles.detailText}>
                        Nota: {selectedMeasurement.note || 'Sin nota'}
                      </Text>
                      <View style={styles.dailyDivider} />
                      <Text style={styles.dailySectionTitle}>Registros del día · {selectedMeasurement.date}</Text>

                      <Text style={styles.dailyCategory}>🍽️ Alimentación</Text>
                      {dailyRecords?.food.length ? dailyRecords.food.map(item => (
                        <View key={item.id} style={styles.dailyRecord}>
                          <Text style={styles.detailText}>{item.mealType} · {item.time}</Text>
                          <Text style={styles.detailText}>{item.description || 'Sin descripción'}</Text>
                        </View>
                      )) : <Text style={styles.dailyEmpty}>Sin registrar</Text>}

                      <Text style={styles.dailyCategory}>🌙 Sueño</Text>
                      {dailyRecords?.sleep ? (
                        <View style={styles.dailyRecord}>
                          <Text style={styles.detailText}>{dailyRecords.sleep.hours}</Text>
                          <Text style={styles.detailText}>{dailyRecords.sleep.quality}</Text>
                        </View>
                      ) : <Text style={styles.dailyEmpty}>Sin registrar</Text>}

                      <Text style={styles.dailyCategory}>🏃 Actividad física</Text>
                      {dailyRecords?.activities.length ? dailyRecords.activities.map(item => (
                        <View key={item.id} style={styles.dailyRecord}>
                          <Text style={styles.detailText}>{item.activity} · {item.duration}</Text>
                          <Text style={styles.detailText}>{item.feeling}</Text>
                        </View>
                      )) : <Text style={styles.dailyEmpty}>Sin registrar</Text>}

                      <Text style={styles.dailyCategory}>💗 Bienestar</Text>
                      {dailyRecords?.wellness ? (
                        <View style={styles.dailyRecord}>
                          <Text style={styles.detailText}>{emotionLabel(dailyRecords.wellness.emotion)}</Text>
                          <Text style={styles.detailText}>{dailyRecords.wellness.note || 'Sin nota'}</Text>
                        </View>
                      ) : <Text style={styles.dailyEmpty}>Sin registrar</Text>}
                    </View>
                  )}
                </>
              )}
              <View style={styles.chartFooter}>
                <View style={styles.footerSquare} />
                <Text style={styles.chartFooterText}>
                  Valores registrados por ti. Consulta con tu equipo de salud para interpretar tus resultados.
                </Text>
              </View>
            </View>
          )}

          {/* ================================= */}
          {/* CALENDARIO DE MEDICIONES */}
          {/* ================================= */}

          {showCalendar && (

            <View style={styles.calendarCard}>

              {/* ENCABEZADO DEL MES */}

              <View style={styles.calendarHeader}>

                <Pressable
                  onPress={() => changeMonth(-1)}
                  style={styles.calendarArrow}
                >
                  <Ionicons
                    name="chevron-back"
                    size={18}
                    color={colors.terracotta}
                  />
                </Pressable>

                <Text style={styles.calendarMonth}>
                  {months[currentMonth.getMonth()]}{' '}
                  {currentMonth.getFullYear()}
                </Text>

                <Pressable
                  onPress={() => changeMonth(1)}
                  style={styles.calendarArrow}
                >
                  <Ionicons
                    name="chevron-forward"
                    size={18}
                    color={colors.terracotta}
                  />
                </Pressable>

              </View>

              {/* DÍAS DE LA SEMANA */}

              <View style={styles.calendarWeekRow}>

                {weekDays.map((day, index) => (

                  <Text
                    key={index}
                    style={styles.calendarWeekDay}
                  >
                    {day}
                  </Text>

                ))}

              </View>

              {/* DÍAS DEL MES */}

              <View style={styles.calendarGrid}>

                {getCalendarDays(currentMonth)
                  .map((day, index) => {

                    if (day === null) {
                      return (
                        <View
                          key={`empty-${index}`}
                          style={styles.calendarDayContainer}
                        />
                      );
                    }

                    const date = new Date(
                      currentMonth.getFullYear(),
                      currentMonth.getMonth(),
                      day
                    );

                    const dateKey = formatDateKey(date);

                    const hasMeasurement =
                      Boolean(measurementDates[dateKey]);

                    const isSelected =
                      formatDateKey(selectedDate) === dateKey;

                    return (

                      <Pressable
                        key={dateKey}
                        style={styles.calendarDayContainer}
                        onPress={() => {
                          setSelectedDate(date);
                          setSelectedPeriod('Día');
                          setShowCalendar(false);
                        }}
                      >

                        <View
                          style={[
                            styles.calendarDayCircle,
                            isSelected &&
                              styles.calendarDaySelected,
                          ]}
                        >

                          <Text
                            style={[
                              styles.calendarDayText,
                              isSelected &&
                                styles.calendarDayTextSelected,
                            ]}
                          >
                            {day}
                          </Text>

                        </View>

                        {hasMeasurement && (

                          <View
                            style={[
                              styles.calendarMeasurementDot,
                              isSelected && {
                                backgroundColor: colors.white,
                              },
                            ]}
                          />

                        )}

                      </Pressable>

                    );

                  })}

              </View>

              {/* RESUMEN DEL DÍA */}

              <View style={styles.calendarFooter}>

                <Text style={styles.calendarSelectedDate}>
                  {selectedDate.getDate()} de{' '}
                  {months[
                    selectedDate.getMonth()
                  ].toLowerCase()}
                </Text>

                <Text style={styles.calendarMeasurementCount}>
                  {measurementDates[
                    formatDateKey(selectedDate)
                  ] || 0}{' '}
                  mediciones registradas
                </Text>

              </View>

            </View>

          )}

          {/* ================================= */}
          {/* INDICADORES */}
          {/* ================================= */}

          <View style={styles.statsRow}>
            <View style={styles.statCard}>
              <Text style={styles.statValue}>{filtered.length}</Text>
              <Text style={styles.statLabel}>Mediciones del período</Text>
            </View>
            <View style={styles.statCard}>
              <Text style={styles.statValue}>{average ?? '—'}</Text>
              <Text style={styles.statLabel}>Promedio mg/dL</Text>
            </View>
          </View>

          {/* ================================= */}
          {/* HISTORIAL */}
          {/* ================================= */}

          <View style={styles.historyHeader}>

            <Text style={styles.historyTitle}>
              Historial
            </Text>

            <Pressable
              onPress={() =>
                setShowAllHistory(!showAllHistory)
              }
            >
              <Text style={styles.seeAll}>
                {showAllHistory
                  ? 'Ver menos'
                  : 'Ver todo'}
              </Text>
            </Pressable>

          </View>

          <View style={styles.historyCard}>
            {visibleHistory.length === 0 ? (
              <Text style={[styles.historyDate, { padding: 18 }]}>Aún no hay mediciones registradas.</Text>
            ) : visibleHistory.map((item, index) => (
              <View key={item.id} style={[
                styles.historyItem,
                index !== visibleHistory.length - 1 && styles.historyBorder,
              ]}>
                <View style={styles.historyIcon}>
                  <Ionicons name="pencil" size={13} color={colors.terracotta} />
                </View>
                <View style={styles.historyInfo}>
                  <Text style={styles.historyItemTitle}>{item.moment}</Text>
                  <Text style={styles.historyDate}>{item.date} · {item.time}</Text>
                  {!!item.food && <Text style={styles.historyDate}>{item.food}</Text>}
                </View>
                <View style={styles.historyResult}>
                  <Text style={styles.historyValue}>{item.glucose}</Text>
                  <Text style={styles.historyUnit}>mg/dL</Text>
                </View>
              </View>
            ))}
          </View>

        </View>
      )}

      {/* ===================================== */}
      {/* CONTENIDO HÁBITOS */}
      {/* ===================================== */}

      {activeTab === 'Hábitos' && (

        <View style={styles.habitsContent}>

          {habits.map((habit) => {

            const selected =
              selectedHabits.includes(habit.id);

            return (

              <Pressable
                key={habit.id}
                style={[
                  styles.habitCard,
                  {
                    backgroundColor: habit.background,
                  },
                ]}
onPress={() => {
  router.push({
    pathname: '/(tabs)/tu_progreso',
    params: {
      tipo: habit.id,
    },
  });
}}
              >

                <View style={styles.habitLetterBox}>

                  <Text style={styles.habitLetter}>
                    {habit.letter}
                  </Text>

                </View>

                <View style={styles.habitInfo}>

                  <Text style={styles.habitTitle}>
                    {habit.title}
                  </Text>

                  <Text style={styles.habitSubtitle}>
                    {habit.subtitle}
                  </Text>

                </View>

                <View style={styles.habitAddButton}>

                  <Ionicons
                    name={
                      selected
                        ? 'checkmark'
                        : 'add'
                    }
                    size={19}
                    color={colors.brown}
                  />

                </View>

              </Pressable>

            );
          })}

          <Text style={styles.habitsNote}>
            Estos registros son opcionales y están para ayudarte a
            encontrar patrones con calma.
          </Text>

        </View>
      )}

      {/* ===================================== */}
      {/* CONTENIDO BIENESTAR */}
      {/* ===================================== */}

      {activeTab === 'Bienestar' && (

        <View style={styles.wellnessContent}>

          <View style={styles.wellnessCard}>

            <Text style={styles.wellnessEyebrow}>
              HOY
            </Text>

            <Text style={styles.wellnessTitle}>
              ¿Cómo te has sentido?
            </Text>

            <Text style={styles.wellnessSubtitle}>
              Un momento para escucharte, sin juicios.
            </Text>

            <Pressable
              style={styles.wellnessButton}
              onPress={() =>
                router.push('/registrar-bienestar')
              }
            >

              <Text style={styles.wellnessButtonText}>
                Registrar cómo me siento
              </Text>

              <Ionicons
                name="chevron-forward"
                size={18}
                color={colors.brown}
              />

            </Pressable>

          </View>

          <Text style={styles.diaryTitle}>
            Mi diario
          </Text>

          <View style={styles.diaryCard}>
            <Text style={styles.diaryEmoji}>{latestWellness ? '💗' : '🌿'}</Text>
            <View style={styles.diaryInfo}>
              <Text style={styles.diaryMood}>
                {latestWellness ? emotionLabel(latestWellness.emotion) : 'Sin registros todavía'}
              </Text>
              <Text style={styles.diaryText}>
                {latestWellness
                  ? `${latestWellness.date} · ${latestWellness.note || 'Sin nota'}`
                  : 'Registra cómo te sientes para comenzar tu diario.'}
              </Text>
            </View>
          </View>

        </View>
      )}

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
    paddingTop: 28,
    paddingBottom: 40,
  },

  header: {
    marginBottom: 20,
  },

  title: {
    fontSize: 30,
    fontFamily: 'serif',
    color: colors.brown,
  },

  subtitle: {
    fontSize: 11,
    color: colors.muted,
    marginTop: 3,
  },

  // =====================================
  // PESTAÑAS
  // =====================================

  tabsContainer: {
    flexDirection: 'row',
    backgroundColor: colors.beige,
    borderRadius: 13,
    padding: 5,
    marginBottom: 18,
  },

  tabButton: {
    flex: 1,
    paddingVertical: 11,
    alignItems: 'center',
    borderRadius: 10,
  },

  tabSelected: {
    backgroundColor: colors.white,
  },

  tabText: {
    fontSize: 11,
    color: colors.text,
  },

  tabTextSelected: {
    color: colors.brown,
    fontWeight: '600',
  },

  tabContent: {
    gap: 14,
  },

  // =====================================
  // PERÍODOS
  // =====================================

  periodRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  periodSelector: {
    flexDirection: 'row',
    gap: 5,
  },

  periodButton: {
    paddingHorizontal: 12,
    paddingVertical: 9,
    borderRadius: 20,
  },

  periodSelected: {
    backgroundColor: colors.terracotta,
  },

  periodText: {
    fontSize: 10,
    color: colors.brown,
  },

  periodTextSelected: {
    color: colors.white,
  },

  calendarButton: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: colors.white,
    alignItems: 'center',
    justifyContent: 'center',
  },

  // =====================================
  // GRÁFICA
  // =====================================

  chartCard: {
    backgroundColor: colors.white,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: colors.border,
    padding: 15,
  },

  chartHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  chartEyebrow: {
    fontSize: 10,
    color: colors.muted,
    fontFamily: 'serif',
  },

  legend: {
    flexDirection: 'row',
    gap: 8,
  },

  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
  },

  legendDot: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: colors.terracotta,
  },

  legendText: {
    fontSize: 8,
    color: colors.muted,
  },

  averageRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: 5,
    marginTop: 5,
  },

  averageLabel: {
    fontSize: 19,
    fontFamily: 'serif',
    color: colors.brown,
  },

  averageValue: {
    fontSize: 23,
    fontFamily: 'serif',
    color: colors.brown,
  },

  averageUnit: {
    fontSize: 9,
    color: colors.muted,
  },

  graph: {
    flexDirection: 'row',
    height: 135,
    marginTop: 15,
  },

  graphLabels: {
    width: 25,
    justifyContent: 'space-between',
  },

  axisText: {
    fontSize: 8,
    color: colors.muted,
  },

  graphArea: {
    flex: 1,
    justifyContent: 'space-between',
    position: 'relative',
  },

  gridLine: {
    height: 1,
    backgroundColor: '#F0EBE6',
  },

  graphPoints: {
    ...StyleSheet.absoluteFillObject,
    flexDirection: 'row',
  },

  graphColumn: {
    flex: 1,
    position: 'relative',
  },

  graphPoint: {
    position: 'absolute',
    width: 7,
    height: 7,
    borderRadius: 4,
    backgroundColor: colors.white,
    borderWidth: 1.5,
    borderColor: colors.terracotta,
    alignSelf: 'center',
  },

  pointTouchTarget: {
    position: 'absolute',
    width: 28,
    height: 28,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 2,
  },

  graphPointSelected: {
    width: 13,
    height: 13,
    borderRadius: 7,
    borderWidth: 3,
    backgroundColor: colors.beige,
  },

  measurementDetailCard: {
    marginTop: 16,
    padding: 14,
    borderRadius: 13,
    borderWidth: 1,
    borderColor: colors.terracotta,
    backgroundColor: '#FCF5EE',
    gap: 5,
  },

  detailHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  detailHeading: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 7,
  },

  detailMarker: {
    width: 9,
    height: 9,
    borderRadius: 5,
    backgroundColor: colors.terracotta,
  },

  detailTitle: {
    fontSize: 12,
    fontWeight: '700',
    color: colors.brown,
  },

  detailValue: {
    fontSize: 22,
    fontFamily: 'serif',
    color: colors.terracotta,
  },

  detailUnit: {
    fontSize: 11,
    color: colors.muted,
  },

  detailText: {
    fontSize: 11,
    lineHeight: 17,
    color: colors.text,
  },

  dailyDivider: {
    height: 1,
    backgroundColor: colors.border,
    marginTop: 10,
    marginBottom: 8,
  },
  dailySectionTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: colors.brown,
    marginBottom: 5,
  },
  dailyCategory: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.terracotta,
    marginTop: 9,
    marginBottom: 2,
  },
  dailyRecord: {
    paddingLeft: 9,
    paddingVertical: 3,
    borderLeftWidth: 2,
    borderLeftColor: colors.border,
    marginBottom: 3,
  },
  dailyEmpty: {
    fontSize: 11,
    color: colors.muted,
    fontStyle: 'italic',
  },

  daysRow: {
    height: 16,
    marginLeft: 25,
    marginTop: 8,
    position: 'relative',
  },

  dayLabel: {
    fontSize: 9,
    color: colors.muted,
  },

  chartFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginTop: 15,
  },

  footerSquare: {
    width: 8,
    height: 8,
    backgroundColor: colors.paleGreen,
  },

  chartFooterText: {
    fontSize: 8,
    color: colors.muted,
    flex: 1,
  },

  // =====================================
  // CALENDARIO
  // =====================================

  calendarCard: {
    backgroundColor: colors.white,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: colors.border,
    padding: 16,
    marginTop: 2,
  },

  calendarHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },

  calendarArrow: {
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },

  calendarMonth: {
    fontSize: 17,
    fontWeight: '600',
    color: colors.brown,
  },

  calendarWeekRow: {
    flexDirection: 'row',
    marginBottom: 8,
  },

  calendarWeekDay: {
    width: '14.2857%',
    textAlign: 'center',
    fontSize: 10,
    color: colors.muted,
    fontWeight: '600',
  },

  calendarGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },

  calendarDayContainer: {
    width: '14.2857%',
    height: 39,
    alignItems: 'center',
    justifyContent: 'center',
  },

  calendarDayCircle: {
    width: 30,
    height: 30,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },

  calendarDaySelected: {
    backgroundColor: colors.terracotta,
  },

  calendarDayText: {
    fontSize: 11,
    color: colors.brown,
  },

  calendarDayTextSelected: {
    color: colors.white,
    fontWeight: '700',
  },

  calendarMeasurementDot: {
    position: 'absolute',
    bottom: 2,
    width: 3,
    height: 3,
    borderRadius: 2,
    backgroundColor: colors.terracotta,
  },

  calendarFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: colors.border,
    marginTop: 15,
    paddingTop: 13,
  },

  calendarSelectedDate: {
    fontSize: 10,
    fontWeight: '600',
    color: colors.brown,
  },

  calendarMeasurementCount: {
    fontSize: 9,
    color: colors.muted,
  },

  // =====================================
  // INDICADORES
  // =====================================

  statsRow: {
    flexDirection: 'row',
    gap: 8,
  },

  statCard: {
    flex: 1,
    backgroundColor: colors.beige,
    borderRadius: 13,
    padding: 12,
  },

  statValue: {
    fontSize: 21,
    fontFamily: 'serif',
    color: colors.brown,
  },

  statLabel: {
    fontSize: 9,
    color: colors.muted,
  },

  // =====================================
  // HISTORIAL
  // =====================================

  historyHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 8,
  },

  historyTitle: {
    fontSize: 23,
    fontFamily: 'serif',
    color: colors.brown,
  },

  seeAll: {
    fontSize: 10,
    color: colors.terracotta,
  },

  historyCard: {
    backgroundColor: colors.white,
    borderRadius: 17,
    borderWidth: 1,
    borderColor: colors.border,
    overflow: 'hidden',
  },

  historyItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    minHeight: 65,
    gap: 10,
  },

  historyBorder: {
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },

  historyIcon: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: colors.softPink,
    alignItems: 'center',
    justifyContent: 'center',
  },

  historyInfo: {
    flex: 1,
    gap: 4,
  },

  historyItemTitle: {
    fontSize: 11,
    fontWeight: '600',
    color: colors.brown,
  },

  historyDate: {
    fontSize: 9,
    color: colors.muted,
  },

  historyResult: {
    alignItems: 'flex-end',
  },

  historyValue: {
    fontSize: 17,
    fontFamily: 'serif',
    color: colors.brown,
  },

  historyUnit: {
    fontSize: 8,
    color: colors.muted,
  },

  // =====================================
  // HÁBITOS
  // =====================================

  habitsContent: {
    gap: 10,
  },

  habitCard: {
    borderRadius: 17,
    minHeight: 78,
    paddingHorizontal: 13,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },

  habitLetterBox: {
    width: 43,
    height: 43,
    borderRadius: 13,
    backgroundColor: 'rgba(255,255,255,0.55)',
    alignItems: 'center',
    justifyContent: 'center',
  },

  habitLetter: {
    fontSize: 24,
    fontFamily: 'serif',
    color: colors.terracotta,
  },

  habitInfo: {
    flex: 1,
    gap: 4,
  },

  habitTitle: {
    fontSize: 19,
    fontFamily: 'serif',
    color: colors.brown,
  },

  habitSubtitle: {
    fontSize: 10,
    color: colors.text,
  },

  habitAddButton: {
    width: 31,
    height: 31,
    borderRadius: 16,
    backgroundColor: colors.white,
    alignItems: 'center',
    justifyContent: 'center',
  },

  habitsNote: {
    textAlign: 'center',
    fontSize: 11,
    color: colors.muted,
    lineHeight: 17,
    marginTop: 20,
    paddingHorizontal: 25,
  },

  // =====================================
  // BIENESTAR
  // =====================================

  wellnessContent: {
    gap: 20,
  },

  wellnessCard: {
    backgroundColor: colors.terracotta,
    borderRadius: 20,
    padding: 20,
    gap: 10,
  },

  wellnessEyebrow: {
    fontSize: 9,
    color: colors.white,
    letterSpacing: 1,
  },

  wellnessTitle: {
    fontSize: 25,
    fontFamily: 'serif',
    color: colors.white,
  },

  wellnessSubtitle: {
    fontSize: 11,
    color: '#F2DED1',
  },

  wellnessButton: {
    backgroundColor: colors.white,
    borderRadius: 12,
    paddingHorizontal: 13,
    minHeight: 43,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 8,
  },

  wellnessButtonText: {
    fontSize: 11,
    color: colors.brown,
  },

  diaryTitle: {
    fontSize: 23,
    fontFamily: 'serif',
    color: colors.brown,
  },

  diaryCard: {
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 16,
    padding: 14,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },

  diaryEmoji: {
    fontSize: 23,
  },

  diaryInfo: {
    flex: 1,
    gap: 4,
  },

  diaryMood: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.brown,
  },

  diaryText: {
    fontSize: 9,
    color: colors.muted,
  },

});