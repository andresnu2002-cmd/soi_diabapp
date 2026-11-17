import { useEffect, useState } from 'react';import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';

const colors = {
  background: '#F8F4EF',
  white: '#FFFFFF',
  brown: '#704832',
  terracotta: '#A85F3D',
  muted: '#B99B86',
  beige: '#EDE1D4',
  border: '#E8DDD3',
};

export default function SobreTiScreen() {
  const [name, setName] = useState('');
  const [addPhoto, setAddPhoto] = useState(false);
// ============================================
// RECUPERAR NOMBRE GUARDADO
// ============================================

useEffect(() => {

  const loadName = async () => {

    try {

      const savedName = await AsyncStorage.getItem(
        '@soi_preferred_name'
      );

      if (savedName) {
        setName(savedName);
      }

    } catch (error) {

      console.error(
        'Error recuperando el nombre:',
        error
      );

    }

  };

  loadName();

}, []);
 // ============================================
// GUARDAR NOMBRE Y CONTINUAR
// ============================================

const handleContinue = async () => {

  const preferredName = name.trim();

  if (!preferredName) {
    return;
  }

  try {

    // Guardar nombre de la usuaria.
    await AsyncStorage.setItem(
      '@soi_preferred_name',
      preferredName
    );

    console.log('Nombre guardado:', preferredName);

    console.log(
      'Desea agregar foto:',
      addPhoto
    );

    // Continuar al paso 2/8.
    router.push('/onboarding/tu-momento');

  } catch (error) {

    console.error(
      'Error guardando el nombre:',
      error
    );

  }

};
  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView
        contentContainerStyle={styles.content}
        keyboardShouldPersistTaps="handled"
      >
        {/* NAVEGACIÓN SUPERIOR */}

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

          <Text style={styles.stepCounter}>1/8</Text>
        </View>

        {/* ENCABEZADO */}

        <Text style={styles.eyebrow}>SOBRE TI</Text>

        <Text style={styles.title}>
          Primero, hablemos de ti
        </Text>

        <Text style={styles.subtitle}>
          Queremos que este espacio se sienta cercano.
        </Text>

        {/* NOMBRE */}

        <Text style={styles.label}>
          ¿Cómo te gustaría que te llamemos?
        </Text>

        <TextInput
          style={styles.input}
          value={name}
          onChangeText={setName}
          placeholder="Tu nombre"
          placeholderTextColor={colors.muted}
          autoCapitalize="words"
          returnKeyType="done"
        />

        {/* FOTOGRAFÍA */}

        <Text style={styles.photoLabel}>
          ¿Quieres agregar una foto?
        </Text>

        <View style={styles.photoRow}>
          <Pressable
            style={styles.photoCircle}
            onPress={() => setAddPhoto(true)}
          >
            <Ionicons
              name="camera-outline"
              size={20}
              color={colors.terracotta}
            />
          </Pressable>

          <View style={styles.photoActions}>
            <Pressable onPress={() => setAddPhoto(true)}>
              <Text style={styles.addPhoto}>
                Agregar foto
              </Text>
            </Pressable>

            <Pressable onPress={() => setAddPhoto(false)}>
              <Text style={styles.skipPhoto}>
                Ahora no
              </Text>
            </Pressable>
          </View>
        </View>

        {addPhoto && (
          <Text style={styles.helper}>
            La selección de imágenes se habilitará
            al integrar la galería del celular.
          </Text>
        )}
      </ScrollView>

      {/* BOTÓN INFERIOR */}

      <View style={styles.footer}>
        <Pressable
          style={[
            styles.continueButton,
            !name.trim() && styles.disabledButton,
          ]}
          onPress={handleContinue}
          disabled={!name.trim()}
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
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },

  content: {
    paddingHorizontal: 24,
    paddingTop: Platform.OS === 'android' ? 48 : 55,
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
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: colors.border,
  },

  progressTrack: {
    flex: 1,
    height: 2,
    backgroundColor: colors.border,
  },

  progressFill: {
    width: '12.5%',
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
    marginBottom: 8,
  },

  subtitle: {
    fontSize: 12,
    color: colors.muted,
    marginBottom: 30,
  },

  label: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.brown,
    marginBottom: 10,
  },

  input: {
    height: 48,
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 12,
    paddingHorizontal: 15,
    fontSize: 14,
    color: colors.brown,
  },

  photoLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.brown,
    marginTop: 24,
    marginBottom: 14,
  },

  photoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 15,
  },

  photoCircle: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: colors.beige,
    alignItems: 'center',
    justifyContent: 'center',
  },

  photoActions: {
    gap: 10,
  },

  addPhoto: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.terracotta,
  },

  skipPhoto: {
    fontSize: 12,
    color: colors.muted,
  },

  helper: {
    fontSize: 11,
    color: colors.muted,
    marginTop: 15,
    lineHeight: 17,
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

  disabledButton: {
    opacity: 0.55,
  },

  continueText: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.white,
  },
});