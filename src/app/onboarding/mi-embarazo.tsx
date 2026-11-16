import { useEffect, useState } from 'react';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {
  ActivityIndicator,
  Platform,
  Pressable,
  SafeAreaView,
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
  selected: '#F1DFD3',
};

// ============================================
// TIPOS
// ============================================

type LifeStage =
  | 'pregnant'
  | 'postpartum'
  | 'not_pregnant';

type FirstPregnancy =
  | 'yes'
  | 'no'
  | 'prefer_not';

// ============================================
// PANTALLA 4/8
// ============================================

export default function MiEmbarazoOnboardingScreen() {
  const [loading, setLoading] = useState(true);

  const [lifeStage, setLifeStage] =
    useState<LifeStage | null>(null);

  const [weeks, setWeeks] = useState(24);
  const [days, setDays] = useState(3);

  const [firstPregnancy, setFirstPregnancy] =
    useState<FirstPregnancy | null>(null);

  const [notSure, setNotSure] = useState(false);

  // ==========================================
  // CONSULTAR ETAPA Y DATOS GUARDADOS
  // ==========================================

  useEffect(() => {
    const loadData = async () => {
      try {
        const values = await AsyncStorage.multiGet([
          '@soi_life_stage',
          '@soi_pregnancy_weeks',
          '@soi_pregnancy_days',
          '@soi_first_pregnancy',
          '@soi_pregnancy_not_sure',
        ]);

        const data = Object.fromEntries(values);

        const stage = data['@soi_life_stage'];

        if (
          stage === 'pregnant' ||
          stage === 'postpartum' ||
          stage === 'not_pregnant'
        ) {
          setLifeStage(stage);
        }

        if (data['@soi_pregnancy_weeks'] !== null) {
          const savedWeeks = Number(
            data['@soi_pregnancy_weeks']
          );

          if (
            Number.isInteger(savedWeeks) &&
            savedWeeks >= 0 &&
            savedWeeks <= 42
          ) {
            setWeeks(savedWeeks);
          }
        }

        if (data['@soi_pregnancy_days'] !== null) {
          const savedDays = Number(
            data['@soi_pregnancy_days']
          );

          if (
            Number.isInteger(savedDays) &&
            savedDays >= 0 &&
            savedDays <= 6
          ) {
            setDays(savedDays);
          }
        }

        const savedFirstPregnancy =
          data['@soi_first_pregnancy'];

        if (
          savedFirstPregnancy === 'yes' ||
          savedFirstPregnancy === 'no' ||
          savedFirstPregnancy === 'prefer_not'
        ) {
          setFirstPregnancy(savedFirstPregnancy);
        }

        setNotSure(
          data['@soi_pregnancy_not_sure'] === 'true'
        );

      } catch (error) {
        console.error(
          'Error cargando datos de embarazo:',
          error
        );
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  // ==========================================
  // MODIFICAR SEMANAS
  // ==========================================

  const decreaseWeeks = () => {
    setWeeks((current) => Math.max(0, current - 1));
  };

  const increaseWeeks = () => {
    setWeeks((current) => Math.min(42, current + 1));
  };

  // ==========================================
  // CONTINUAR
  // ==========================================

  const handleContinue = async () => {
    try {
      if (lifeStage === 'pregnant') {
        await AsyncStorage.multiSet([
          ['@soi_pregnancy_weeks', String(weeks)],
          ['@soi_pregnancy_days', String(days)],
          [
            '@soi_first_pregnancy',
            firstPregnancy ?? '',
          ],
          [
            '@soi_pregnancy_not_sure',
            String(notSure),
          ],
        ]);
      }

      console.log('Etapa:', lifeStage);
      console.log('Semanas:', weeks);
      console.log('Días:', days);
      console.log('Primer embarazo:', firstPregnancy);

      router.push('/onboarding/bienestar');

    } catch (error) {
      console.error(
        'Error guardando información:',
        error
      );
    }
  };

  // ==========================================
  // PANTALLA DE CARGA
  // ==========================================

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator
          size="large"
          color={colors.terracotta}
        />
      </View>
    );
  }

  const isPregnant = lifeStage === 'pregnant';

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {/* BARRA DE PROGRESO */}

        <View style={styles.topBar}>
          <Pressable
            style={styles.backButton}
            onPress={() => router.back()}
          >
            <Ionicons
              name="chevron-back"
              size={18}
              color={colors.brown}
            />
          </Pressable>

          <View style={styles.progressTrack}>
            <View style={styles.progressFill} />
          </View>

          <Text style={styles.stepCounter}>
            4/8
          </Text>
        </View>

        {isPregnant ? (
          <>
            {/* ENCABEZADO */}

            <Text style={styles.eyebrow}>
              MI EMBARAZO
            </Text>

            <Text style={styles.title}>
              Acompañándote en cada semana
            </Text>

            <Text style={styles.subtitle}>
              ¿De cuántas semanas estás?
            </Text>

            {/* SELECTOR DE SEMANAS */}

            <View style={styles.weeksCard}>
              <Pressable
                style={styles.circleButton}
                onPress={decreaseWeeks}
                disabled={notSure}
              >
                <Ionicons
                  name="remove"
                  size={17}
                  color={colors.terracotta}
                />
              </Pressable>

              <View style={styles.weeksCenter}>
                <Text style={styles.weeksNumber}>
                  {weeks}
                </Text>

                <Text style={styles.weeksLabel}>
                  semanas
                </Text>
              </View>

              <Pressable
                style={styles.circleButton}
                onPress={increaseWeeks}
                disabled={notSure}
              >
                <Ionicons
                  name="add"
                  size={17}
                  color={colors.terracotta}
                />
              </Pressable>
            </View>

            {/* SELECTOR DE DÍAS */}

            <View style={styles.daysRow}>
              <Text style={styles.andText}>
                y
              </Text>

              <View style={styles.daysSelector}>
                {Array.from({ length: 7 }, (_, day) => (
                  <Pressable
                    key={day}
                    style={[
                      styles.dayOption,
                      days === day && styles.daySelected,
                    ]}
                    onPress={() => setDays(day)}
                    disabled={notSure}
                  >
                    <Text
                      style={[
                        styles.dayText,
                        days === day && styles.dayTextSelected,
                      ]}
                    >
                      {day}
                    </Text>
                  </Pressable>
                ))}
              </View>
            </View>

            <Text style={styles.daysDescription}>
              {days} {days === 1 ? 'día' : 'días'}
            </Text>

            {/* NO ESTOY SEGURA */}

            <Pressable
              style={[
                styles.notSureButton,
                notSure && styles.notSureSelected,
              ]}
              onPress={() => setNotSure(!notSure)}
            >
              <Text style={styles.notSureText}>
                No estoy segura
              </Text>
            </Pressable>

            {/* PRIMER EMBARAZO */}

            <Text style={styles.question}>
              ¿Es tu primer embarazo?
            </Text>

            <View style={styles.answerRow}>
              {[
                { id: 'yes', label: 'Sí' },
                { id: 'no', label: 'No' },
                {
                  id: 'prefer_not',
                  label: 'Prefiero no responder',
                },
              ].map((option) => (
                <Pressable
                  key={option.id}
                  style={[
                    styles.answerButton,
                    firstPregnancy === option.id &&
                      styles.answerSelected,
                  ]}
                  onPress={() =>
                    setFirstPregnancy(
                      option.id as FirstPregnancy
                    )
                  }
                >
                  <Text style={styles.answerText}>
                    {option.label}
                  </Text>
                </Pressable>
              ))}
            </View>

            <Text style={styles.helperText}>
              Es una estimación. Puedes actualizarla
              cuando quieras.
            </Text>
          </>
        ) : (
          <>
            {/* CONTENIDO PARA OTRAS ETAPAS */}

            <Text style={styles.eyebrow}>
              TU ETAPA
            </Text>

            <Text style={styles.title}>
              Cada momento merece su propio cuidado
            </Text>

            <Text style={styles.subtitle}>
              {lifeStage === 'postpartum'
                ? 'Te acompañaremos durante tu etapa de posparto.'
                : 'Adaptaremos tu experiencia a tus necesidades actuales.'}
            </Text>

            <View style={styles.infoCard}>
              <Ionicons
                name="heart-outline"
                size={26}
                color={colors.terracotta}
              />

              <Text style={styles.infoText}>
                No necesitas registrar semanas de
                embarazo. Personalizaremos S.O.I.
                según la etapa que seleccionaste.
              </Text>
            </View>
          </>
        )}
      </ScrollView>

      {/* BOTÓN INFERIOR */}

      <View style={styles.footer}>
        <Pressable
          style={styles.continueButton}
          onPress={handleContinue}
        >
          <Text style={styles.continueText}>
            Continuar
          </Text>

          <Ionicons
            name="chevron-forward"
            size={17}
            color={colors.white}
          />
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

// ============================================
// ESTILOS
// ============================================

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },

  loadingContainer: {
    flex: 1,
    backgroundColor: colors.background,
    justifyContent: 'center',
    alignItems: 'center',
  },

  content: {
    flexGrow: 1,
    paddingHorizontal: 24,
    paddingTop: Platform.OS === 'android' ? 30 : 20,
    paddingBottom: 30,
  },

  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 38,
  },

  backButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.border,
    justifyContent: 'center',
    alignItems: 'center',
  },

  progressTrack: {
    flex: 1,
    height: 2,
    backgroundColor: colors.border,
  },

  progressFill: {
    width: '50%',
    height: '100%',
    backgroundColor: colors.terracotta,
  },

  stepCounter: {
    fontSize: 10,
    color: colors.muted,
  },

  eyebrow: {
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 1.5,
    color: colors.terracotta,
    marginBottom: 8,
  },

  title: {
    fontSize: 29,
    fontFamily: 'serif',
    color: colors.brown,
    lineHeight: 35,
    marginBottom: 10,
  },

  subtitle: {
    fontSize: 12,
    color: colors.muted,
    marginBottom: 24,
  },

  weeksCard: {
    height: 90,
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 17,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 15,
  },

  circleButton: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: colors.background,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
  },

  weeksCenter: {
    alignItems: 'center',
  },

  weeksNumber: {
    fontSize: 28,
    fontFamily: 'serif',
    color: colors.brown,
  },

  weeksLabel: {
    fontSize: 10,
    color: colors.muted,
  },

  daysRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    gap: 10,
  },

  andText: {
    fontSize: 13,
    color: colors.brown,
  },

  daysSelector: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 12,
    padding: 5,
  },

  dayOption: {
    width: 30,
    height: 30,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },

  daySelected: {
    backgroundColor: colors.selected,
  },

  dayText: {
    fontSize: 12,
    color: colors.muted,
  },

  dayTextSelected: {
    color: colors.terracotta,
    fontWeight: '600',
  },

  daysDescription: {
    fontSize: 11,
    color: colors.muted,
    marginTop: 7,
    marginLeft: 20,
  },

  notSureButton: {
    alignSelf: 'flex-start',
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 20,
    backgroundColor: colors.white,
    paddingHorizontal: 13,
    paddingVertical: 9,
    marginTop: 15,
  },

  notSureSelected: {
    borderColor: colors.terracotta,
    backgroundColor: colors.selected,
  },

  notSureText: {
    fontSize: 11,
    color: colors.brown,
  },

  question: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.brown,
    marginTop: 24,
    marginBottom: 12,
  },

  answerRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 7,
  },

  answerButton: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 20,
    backgroundColor: colors.white,
    paddingHorizontal: 12,
    paddingVertical: 9,
  },

  answerSelected: {
    borderColor: colors.terracotta,
    backgroundColor: colors.selected,
  },

  answerText: {
    fontSize: 11,
    color: colors.brown,
  },

  helperText: {
    fontSize: 10,
    color: colors.muted,
    marginTop: 18,
    lineHeight: 16,
  },

  infoCard: {
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 17,
    padding: 20,
    gap: 15,
    alignItems: 'center',
  },

  infoText: {
    fontSize: 13,
    color: colors.brown,
    textAlign: 'center',
    lineHeight: 21,
  },

  footer: {
    paddingHorizontal: 24,
    paddingTop: 12,
    paddingBottom: Platform.OS === 'ios' ? 35 : 20,
    backgroundColor: colors.background,
  },

  continueButton: {
    height: 52,
    borderRadius: 14,
    backgroundColor: colors.terracotta,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
  },

  continueText: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.white,
  },
});