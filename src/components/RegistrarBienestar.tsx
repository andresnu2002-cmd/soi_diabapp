import { Ionicons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
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
  border: '#E8DDD3',
  selected: '#F0DFD5',
  softBeige: '#EFEEE9',
};

// ============================================
// EMOCIONES
// ============================================

const emotions = [
  {
    id: 'emocionada',
    emoji: '🤩',
    label: 'Emocionada',
  },
  {
    id: 'feliz',
    emoji: '😊',
    label: 'Feliz',
  },
  {
    id: 'tranquila',
    emoji: '🌿',
    label: 'Tranquila',
  },
  {
    id: 'segura',
    emoji: '💪',
    label: 'Segura',
  },
  {
    id: 'ansiosa',
    emoji: '😰',
    label: 'Ansiosa',
  },
  {
    id: 'miedo',
    emoji: '😟',
    label: 'Con miedo',
  },
];

// ============================================
// COMPONENTE
// ============================================

export default function RegistrarBienestar() {

  const [selectedEmotion, setSelectedEmotion] =
    useState<string>('tranquila');

  const [note, setNote] = useState('');

  // ============================================
  // GUARDAR REGISTRO
  // ============================================

  const handleSave = async () => {

    if (!selectedEmotion) {
      Alert.alert(
        'Selecciona una emoción',
        'Cuéntanos cómo te sientes hoy.'
      );
      return;
    }

    await Haptics.notificationAsync(
      Haptics.NotificationFeedbackType.Success
    );

    Alert.alert(
      'Registro completado',
      'Tu emoción ha sido registrada en tu diario.',
      [
        {
          text: 'Aceptar',
          onPress: () => router.back(),
        },
      ]
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

        <View style={styles.headerText}>

          <Text style={styles.title}>
            ¿Cómo te sientes?
          </Text>

          <Text style={styles.subtitle}>
            No hay respuestas correctas.
          </Text>

        </View>

      </View>

      {/* CONTENIDO */}

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >

        {/* SELECCIÓN DE EMOCIONES */}

        <View style={styles.emotionsGrid}>

          {emotions.map((emotion) => {

            const selected =
              selectedEmotion === emotion.id;

            return (

              <Pressable
                key={emotion.id}
                style={[
                  styles.emotionCard,
                  selected && styles.emotionSelected,
                ]}
                onPress={() => {
                  setSelectedEmotion(emotion.id);

                  Haptics.selectionAsync();
                }}
              >

                <Text style={styles.emotionEmoji}>
                  {emotion.emoji}
                </Text>

                <Text style={styles.emotionLabel}>
                  {emotion.label}
                </Text>

              </Pressable>

            );

          })}

        </View>

        {/* NOTA PERSONAL */}

        <View style={styles.noteCard}>

          <View style={styles.noteHeader}>

            <Text style={styles.noteTitle}>
              ¿Quieres dejar una nota?
            </Text>

            <Text style={styles.optionalText}>
              Opcional
            </Text>

          </View>

          <TextInput
            style={styles.noteInput}
            placeholder="Escribe con libertad..."
            placeholderTextColor={colors.muted}
            value={note}
            onChangeText={setNote}
            multiline
            textAlignVertical="top"
          />

        </View>

        {/* MENSAJE INFORMATIVO */}

        <View style={styles.messageCard}>

          <Text style={styles.messageText}>
            Sea lo que sea que sientas hoy, puedes ir a tu propio ritmo.
          </Text>

        </View>

      </ScrollView>

      {/* BOTÓN GUARDAR */}

      <View style={styles.footer}>

        <Pressable
          style={styles.saveButton}
          onPress={handleSave}
        >

          <Text style={styles.saveButtonText}>
            Guardar en mi diario
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

  // ENCABEZADO

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

  // CONTENIDO

  scroll: {
    flex: 1,
  },

  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 30,
  },

  // EMOCIONES

  emotionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    rowGap: 8,
  },

  emotionCard: {
    width: '31.5%',
    height: 88,
    backgroundColor: colors.white,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 9,
  },

  emotionSelected: {
    backgroundColor: colors.selected,
    borderColor: colors.terracotta,
  },

  emotionEmoji: {
    fontSize: 26,
  },

  emotionLabel: {
    fontSize: 10,
    color: colors.brown,
    textAlign: 'center',
  },

  // NOTA PERSONAL

  noteCard: {
    backgroundColor: colors.white,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: colors.border,
    padding: 15,
    marginTop: 18,
  },

  noteHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
  },

  noteTitle: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.brown,
  },

  optionalText: {
    fontSize: 11,
    color: colors.muted,
  },

  noteInput: {
    height: 105,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 12,
    padding: 13,
    fontSize: 12,
    color: colors.brown,
    backgroundColor: '#FFFCF9',
  },

  // MENSAJE

  messageCard: {
    backgroundColor: colors.softBeige,
    borderRadius: 13,
    padding: 15,
    marginTop: 15,
  },

  messageText: {
    fontSize: 11,
    color: colors.muted,
    lineHeight: 17,
  },

  // BOTÓN GUARDAR

  footer: {
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 18,
    backgroundColor: colors.background,
  },

  saveButton: {
    backgroundColor: colors.terracotta,
    minHeight: 50,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },

  saveButtonText: {
    fontSize: 13,
    fontWeight: '600',
    color: colors.white,
  },

});