import { useLocalSearchParams } from 'expo-router';

import RegistrarComida from '@/components/RegistrarComida';
import RegistrarSueno from '@/components/RegistrarSueno';
import RegistrarActividad from '@/components/RegistrarActividad';

import {
  View,
  Text,
  StyleSheet,
} from 'react-native';

// ============================================
// PANTALLA DE HÁBITOS
// ============================================

export default function TuProgresoScreen() {

  const { tipo } = useLocalSearchParams<{
    tipo?: 'alimentacion' | 'sueno' | 'actividad';
  }>();

  // ============================================
  // ALIMENTACIÓN
  // ============================================

  if (tipo === 'alimentacion') {
    return <RegistrarComida />;
  }

  // ============================================
  // SUEÑO
  // ============================================

  if (tipo === 'sueno') {
    return <RegistrarSueno />;
  }

  // ============================================
  // ACTIVIDAD FÍSICA
  // ============================================

  if (tipo === 'actividad') {
    return <RegistrarActividad />;
  }

  // ============================================
  // SIN PARÁMETRO
  // ============================================

  return (
    <View style={styles.container}>

      <Text style={styles.text}>
        Selecciona un hábito desde Progreso.
      </Text>

    </View>
  );
}

// ============================================
// ESTILOS
// ============================================

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#F8F4EF',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },

  text: {
    fontSize: 14,
    color: '#704832',
    textAlign: 'center',
  },

});