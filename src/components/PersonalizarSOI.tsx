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
  View,
} from 'react-native';

// ============================================
// COLORES GENERALES S.O.I.
// ============================================

const theme = {
  background: '#F8F4EF',
  white: '#FFFFFF',
  brown: '#704832',
  terracotta: '#A85F3D',
  muted: '#B99B86',
  beige: '#EDE1D4',
  border: '#E8DDD3',
  text: '#654B3D',
  dark: '#242424',
};

// ============================================
// COLORES DISPONIBLES
// ============================================

const deviceColors = [
  {
    id: 'terracota',
    name: 'Terracota',
    hex: '#A85F3D',
  },
  {
    id: 'crema',
    name: 'Crema',
    hex: '#EDE1D4',
  },
  {
    id: 'verde',
    name: 'Verde oliva',
    hex: '#788674',
  },
  {
    id: 'marron',
    name: 'Marrón',
    hex: '#70402D',
  },
  {
    id: 'rosa',
    name: 'Rosa empolvado',
    hex: '#D6AAA3',
  },
];

// ============================================
// PERSONALIDADES S.O.I.
// ============================================

const personalities = [
  {
    id: 'serena',
    name: 'Serena',
    description: 'Voy a mi ritmo',
    meaning: 'Tranquila y equilibrada.',
  },
  {
    id: 'curiosa',
    name: 'Curiosa',
    description: 'Quiero descubrir',
    meaning: 'Exploradora y observadora.',
  },
  {
    id: 'coqueta',
    name: 'Coqueta',
    description: 'Sigo siendo yo',
    meaning: 'Segura y femenina.',
  },
  {
    id: 'rebelde',
    name: 'Rebelde',
    description: 'A mi manera',
    meaning: 'Libre y auténtica.',
  },
  {
    id: 'amorosa',
    name: 'Amorosa',
    description: 'Me elijo a mí',
    meaning: 'Cariñosa y cercana.',
  },
  {
    id: 'sonadora',
    name: 'Soñadora',
    description: 'Un día a la vez',
    meaning: 'Creativa y esperanzada.',
  },
  {
    id: 'sensible',
    name: 'Sensible',
    description: 'Hoy necesito un abrazo',
    meaning: 'Empática y emocional.',
  },
  {
    id: 'decidida',
    name: 'Decidida',
    description: 'Yo puedo',
    meaning: 'Fuerte y perseverante.',
  },
];

// ============================================
// CARITA S.O.I.
// Representación temporal con expresiones
// ============================================

function SOIFace({
  personality,
  size = 70,
}: {
  personality: string;
  size?: number;
}) {
  const expressions: Record<
    string,
    { eyes: string; mouth: string }
  > = {
    serena: {
      eyes: '⌣  ⌣',
      mouth: 'ᴗ',
    },
    curiosa: {
      eyes: '◕  ◕',
      mouth: 'ᴗ',
    },
    coqueta: {
      eyes: '◕  ⌣',
      mouth: 'ᴗ',
    },
    rebelde: {
      eyes: '⌐  ⌐',
      mouth: '⌣',
    },
    amorosa: {
      eyes: '♡  ♡',
      mouth: 'ᴗ',
    },
    sonadora: {
      eyes: '◡  ◡',
      mouth: 'ᴗ',
    },
    sensible: {
      eyes: '﹀  ﹀',
      mouth: '﹏',
    },
    decidida: {
      eyes: '•  •',
      mouth: '⌣',
    },
  };

  const expression =
    expressions[personality] ?? expressions.serena;

  return (
    <View
      style={[
        styles.face,
        {
          width: size,
          height: size,
          borderRadius: size / 2,
        },
      ]}
    >
      <Text
        style={[
          styles.faceEyes,
          { fontSize: size * 0.23 },
        ]}
      >
        {expression.eyes}
      </Text>

      <Text
        style={[
          styles.faceMouth,
          { fontSize: size * 0.22 },
        ]}
      >
        {expression.mouth}
      </Text>
    </View>
  );
}

// ============================================
// COMPONENTE PRINCIPAL
// ============================================

export default function PersonalizarSOI() {
  const [selectedColor, setSelectedColor] =
    useState('terracota');

  const [selectedPersonality, setSelectedPersonality] =
    useState('serena');

  // ============================================
  // OBTENER SELECCIONES
  // ============================================

  const currentColor =
    deviceColors.find(
      color => color.id === selectedColor
    ) ?? deviceColors[0];

  const currentPersonality =
    personalities.find(
      personality =>
        personality.id === selectedPersonality
    ) ?? personalities[0];

  // ============================================
  // CONFIRMAR PERSONALIZACIÓN
  // ============================================

  const handleConfirm = () => {
    const title = '¡Esta es tu S.O.I.!';

    const message =
      `Color: ${currentColor.name}\n` +
      `Personalidad: ${currentPersonality.name}\n\n` +
      '¿Quieres confirmar tu elección?';

    if (Platform.OS === 'web') {
      const confirmed = window.confirm(
        `${title}\n\n${message}`
      );

      if (confirmed) {
        router.replace('/(tabs)');
      }

      return;
    }

    Alert.alert(title, message, [
      {
        text: 'Cancelar',
        style: 'cancel',
      },
      {
        text: 'Confirmar',
        onPress: () => router.replace('/(tabs)'),
      },
    ]);
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
      {/* ENCABEZADO */}

      <View style={styles.header}>
        <Pressable
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <Ionicons
            name="chevron-back"
            size={20}
            color={theme.terracotta}
          />
        </Pressable>

        <View>
          <Text style={styles.headerTitle}>
            Hazlo tuyo
          </Text>

          <Text style={styles.headerSubtitle}>
            Personaliza tu S.O.I.
          </Text>
        </View>
      </View>

      {/* COLOR SELECCIONADO */}

      <View style={styles.selectedColorBanner}>
        <Text style={styles.eyebrow}>
          ELIGE TU COLOR
        </Text>

        <Text style={styles.selectedColorName}>
          {currentColor.name}
        </Text>
      </View>

      {/* COLORES */}

      <Text style={styles.sectionTitle}>
        Colores que se sienten tuyos
      </Text>

      <View style={styles.colorsRow}>
        {deviceColors.map(color => {
          const selected =
            selectedColor === color.id;

          return (
            <Pressable
              key={color.id}
              style={styles.colorOption}
              onPress={() =>
                setSelectedColor(color.id)
              }
            >
              <View
                style={[
                  styles.colorCircleBorder,
                  selected && styles.colorSelected,
                ]}
              >
                <View
                  style={[
                    styles.colorCircle,
                    {
                      backgroundColor: color.hex,
                    },
                  ]}
                />
              </View>

              <Text style={styles.colorName}>
                {color.name}
              </Text>
            </Pressable>
          );
        })}
      </View>

      {/* DIVISOR */}

      <View style={styles.divider} />

      {/* PERSONALIDAD */}

      <Text style={styles.eyebrow}>
        TU PANTALLA
      </Text>

      <Text style={styles.sectionTitle}>
        Elige la expresión de tu S.O.I.
      </Text>

      <Text style={styles.sectionDescription}>
        No hay una sola manera de ser tú.
        Elige la carita que más conecte contigo.
      </Text>

      {/* TARJETAS */}

      <View style={styles.personalitiesGrid}>
        {personalities.map(personality => {
          const selected =
            selectedPersonality === personality.id;

          return (
            <Pressable
              key={personality.id}
              style={[
                styles.personalityCard,
                selected &&
                  styles.personalitySelected,
              ]}
              onPress={() =>
                setSelectedPersonality(
                  personality.id
                )
              }
            >
              <SOIFace
                personality={personality.id}
                size={66}
              />

              <Text style={styles.personalityName}>
                {personality.name}
              </Text>

              <Text
                style={
                  styles.personalityDescription
                }
              >
                «{personality.description}»
              </Text>
            </Pressable>
          );
        })}
      </View>

      {/* RESUMEN DE PERSONALIDAD */}

      <View style={styles.selectionSummary}>
        <SOIFace
          personality={selectedPersonality}
          size={48}
        />

        <View style={styles.summaryText}>
          <Text style={styles.summaryTitle}>
            {currentPersonality.name}
          </Text>

          <Text style={styles.summarySubtitle}>
            «{currentPersonality.description}»
          </Text>

          <Text style={styles.summaryMeaning}>
            {currentPersonality.meaning}
          </Text>
        </View>
      </View>

      {/* BAG CHARM */}

      <View style={styles.charmCard}>
        <View style={styles.charmPreview}>
          <View style={styles.charmRing} />

          <View
            style={[
              styles.charmBody,
              {
                backgroundColor:
                  currentColor.hex,
              },
            ]}
          >
            <SOIFace
              personality={
                selectedPersonality
              }
              size={33}
            />
          </View>
        </View>

        <View style={styles.charmText}>
          <Text style={styles.charmTitle}>
            Tu bag charm
          </Text>

          <Text style={styles.charmSubtitle}>
            La misma expresión que elegiste
            para tu S.O.I.
          </Text>
        </View>
      </View>

      {/* BOTÓN CONFIRMAR */}

      <Pressable
        onPress={handleConfirm}
        style={({ hovered, pressed }) => [
          styles.confirmButton,
          hovered &&
            styles.confirmButtonHover,
          pressed &&
            styles.confirmButtonPressed,
        ]}
      >
        <Text style={styles.confirmButtonText}>
          Esta es mi S.O.I.
        </Text>
      </Pressable>
    </ScrollView>
  );
}

// ============================================
// ESTILOS
// ============================================

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: theme.background,
  },

  content: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 45,
  },

  // ENCABEZADO

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    gap: 12,
  },

  backButton: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: theme.white,
    borderWidth: 1,
    borderColor: theme.border,
    alignItems: 'center',
    justifyContent: 'center',
  },

  headerTitle: {
    fontSize: 25,
    fontFamily: 'serif',
    color: theme.brown,
  },

  headerSubtitle: {
    fontSize: 10,
    color: theme.muted,
    marginTop: 3,
  },

  // COLOR SELECCIONADO

  selectedColorBanner: {
    backgroundColor: theme.beige,
    borderRadius: 15,
    padding: 15,
    marginBottom: 20,
  },

  eyebrow: {
    fontSize: 9,
    fontWeight: '700',
    letterSpacing: 1.3,
    color: theme.terracotta,
    marginBottom: 7,
  },

  selectedColorName: {
    fontSize: 21,
    fontFamily: 'serif',
    color: theme.brown,
  },

  // COLORES

  sectionTitle: {
    fontSize: 22,
    fontFamily: 'serif',
    color: theme.brown,
    marginBottom: 10,
  },

  colorsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },

  colorOption: {
    alignItems: 'center',
    width: '19%',
  },

  colorCircleBorder: {
    width: 45,
    height: 45,
    borderRadius: 23,
    borderWidth: 2,
    borderColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'center',
  },

  colorSelected: {
    borderColor: theme.terracotta,
  },

  colorCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: '#D4C4B7',
    elevation: 2,
  },

  colorName: {
    fontSize: 8,
    color: theme.muted,
    marginTop: 5,
    textAlign: 'center',
  },

  divider: {
    height: 1,
    backgroundColor: theme.border,
    marginBottom: 22,
  },

  sectionDescription: {
    fontSize: 11,
    color: theme.muted,
    lineHeight: 17,
    marginBottom: 17,
  },

  // TARJETAS DE PERSONALIDAD

  personalitiesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    rowGap: 8,
    marginBottom: 12,
  },

  personalityCard: {
    width: '48.5%',
    backgroundColor: theme.white,
    borderWidth: 1,
    borderColor: theme.border,
    borderRadius: 15,
    paddingVertical: 12,
    paddingHorizontal: 6,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 125,
  },

  personalitySelected: {
    backgroundColor: '#F2E1D6',
    borderColor: theme.terracotta,
    borderWidth: 1.5,
  },

  // CARITAS

  face: {
    backgroundColor: theme.dark,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 7,
    overflow: 'hidden',
  },

  faceEyes: {
    color: '#F8E8D8',
    textAlign: 'center',
    lineHeight: 22,
  },

  faceMouth: {
    color: '#F8E8D8',
    textAlign: 'center',
    lineHeight: 15,
  },

  personalityName: {
    fontSize: 16,
    fontFamily: 'serif',
    color: theme.brown,
  },

  personalityDescription: {
    fontSize: 9,
    color: theme.muted,
    marginTop: 3,
    textAlign: 'center',
  },

  // RESUMEN

  selectionSummary: {
    backgroundColor: theme.brown,
    borderRadius: 15,
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 8,
  },

  summaryText: {
    flex: 1,
    justifyContent: 'center',
  },

  summaryTitle: {
    fontSize: 17,
    fontFamily: 'serif',
    color: theme.white,
  },

  summarySubtitle: {
    fontSize: 9,
    color: '#E6C9B8',
    marginTop: 3,
  },

  summaryMeaning: {
    fontSize: 9,
    color: '#E6C9B8',
    marginTop: 2,
  },

  // BAG CHARM

  charmCard: {
    backgroundColor: theme.beige,
    borderRadius: 14,
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 10,
  },

  charmPreview: {
    width: 48,
    height: 55,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },

  charmRing: {
    position: 'absolute',
    top: 0,
    width: 13,
    height: 15,
    borderRadius: 7,
    borderWidth: 1.5,
    borderColor: theme.terracotta,
  },

  charmBody: {
    width: 42,
    height: 42,
    borderRadius: 21,
    borderWidth: 2,
    borderColor: theme.white,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },

  charmText: {
    flex: 1,
    justifyContent: 'center',
  },

  charmTitle: {
    fontSize: 16,
    fontFamily: 'serif',
    color: theme.brown,
  },

  charmSubtitle: {
    fontSize: 9,
    color: theme.muted,
    marginTop: 3,
    lineHeight: 13,
  },

  // BOTÓN CONFIRMAR

  confirmButton: {
    backgroundColor: theme.terracotta,
    borderRadius: 12,
    paddingVertical: 15,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 46,
    marginBottom: 10,
  },

  confirmButtonHover: {
    backgroundColor: theme.brown,
  },

  confirmButtonPressed: {
    backgroundColor: '#563626',
    opacity: 0.9,
  },

  confirmButtonText: {
    fontSize: 12,
    fontWeight: '600',
    color: theme.white,
  },
});