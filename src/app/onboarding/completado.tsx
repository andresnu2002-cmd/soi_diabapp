import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

import {
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

export default function OnboardingCompletadoScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Ionicons
          name="heart-circle-outline"
          size={75}
          color="#A85F3D"
        />

        <Text style={styles.title}>
          Ya eres parte de S.O.I.
        </Text>

        <Text style={styles.subtitle}>
          Este espacio comienza contigo.
        </Text>

        <Text style={styles.description}>
          Gracias por compartir un poquito de ti.
          Estamos listas para acompañarte en cada paso.
        </Text>

        <Pressable
          style={styles.button}
          onPress={() => router.replace('/(tabs)')}
        >
          <Text style={styles.buttonText}>
            Comenzar mi experiencia
          </Text>

          <Ionicons
            name="chevron-forward"
            size={17}
            color="#FFFFFF"
          />
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F4EF',
  },

  content: {
    flex: 1,
    paddingHorizontal: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },

  title: {
    fontSize: 32,
    fontFamily: 'serif',
    color: '#704832',
    textAlign: 'center',
    marginTop: 25,
  },

  subtitle: {
    fontSize: 16,
    color: '#A85F3D',
    textAlign: 'center',
    marginTop: 15,
  },

  description: {
    fontSize: 13,
    color: '#B99B86',
    textAlign: 'center',
    lineHeight: 21,
    marginTop: 20,
    marginBottom: 40,
  },

  button: {
    width: '100%',
    height: 54,
    backgroundColor: '#A85F3D',
    borderRadius: 14,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
  },

  buttonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FFFFFF',
  },
});