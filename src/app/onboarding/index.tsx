import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

import {
  ImageBackground,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

// ============================================
// IMAGEN DE BIENVENIDA S.O.I.
// ============================================

const welcomeImage = {
  uri: 'https://res.cloudinary.com/dcwt59fom/image/upload/v1794789995/mariasoi/descarga_23_odvg9t.jpg',
};

// ============================================
// PANTALLA DE BIENVENIDA
// ============================================

export default function OnboardingScreen() {

  const handleContinue = () => {
  router.push('/onboarding/sobre-ti');
};

  return (
    <ImageBackground
      source={welcomeImage}
      style={styles.background}
      resizeMode="cover"
    >
      <StatusBar style="light" />

      {/* Capa para mejorar la lectura */}

      <View style={styles.overlay} />

      <SafeAreaView style={styles.safeArea}>

        <View style={styles.content}>

          {/* Logotipo */}

          <View style={styles.brandContainer}>

            <Text style={styles.logo}>
              S.O.I.
            </Text>

            <Text style={styles.tagline}>
              Cuidarte sin dejar de ser tú.
            </Text>

          </View>

          {/* Contenido inferior */}

          <View style={styles.bottomContainer}>

        

            <Text style={styles.description}>
              Un espacio pensado para acompañarte
              en cada etapa, a tu ritmo y a tu manera.
            </Text>

            <Pressable
              style={styles.button}
              onPress={handleContinue}
            >
              <Text style={styles.buttonText}>
                Comenzar
              </Text>
            </Pressable>

          </View>

        </View>

      </SafeAreaView>
    </ImageBackground>
  );
}

// ============================================
// ESTILOS
// ============================================

const styles = StyleSheet.create({

  background: {
    flex: 1,
    width: '100%',
    height: '100%',
  },

  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(60, 28, 15, 0.30)',
  },

  safeArea: {
    flex: 1,
  },

  content: {
    flex: 1,
    justifyContent: 'space-between',
    paddingHorizontal: 30,
    paddingTop: 55,
    paddingBottom: 45,
  },

  brandContainer: {
    alignItems: 'center',
  },

  logo: {
    fontSize: 57,
    fontFamily: 'serif',
    color: '#FFFFFF',
    letterSpacing: 6,
    textAlign: 'center',
  },

  tagline: {
    fontSize: 14,
    color: '#FFFFFF',
    textAlign: 'center',
    marginTop: 12,
    letterSpacing: 0.5,
  },

  bottomContainer: {
    alignItems: 'center',
  },

  welcomeText: {
    fontSize: 30,
    fontFamily: 'serif',
    color: '#FFFFFF',
    textAlign: 'center',
    lineHeight: 37,
    marginBottom: 15,
  },

  description: {
    fontSize: 14,
    color: '#FFFFFF',
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: 35,
    opacity: 0.95,
  },

  button: {
    width: '100%',
    backgroundColor: '#FFFFFF',
    borderRadius: 30,
    paddingVertical: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },

  buttonText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#A85F3D',
    letterSpacing: 0.5,
  },

});