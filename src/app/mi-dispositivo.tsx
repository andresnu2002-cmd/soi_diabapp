import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useEffect, useRef, useState } from 'react';

import {
  ActivityIndicator,
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
  softBeige: '#EFEEE9',
  green: '#899B89',
};

// ============================================
// COMPONENTE PRINCIPAL
// ============================================

export default function MiDispositivo() {

  const [searching, setSearching] = useState(false);
  const [showSearchMessage, setShowSearchMessage] =
    useState(false);

  const searchTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (searchTimer.current) {
        clearTimeout(searchTimer.current);
      }
    };
  }, []);

  // ============================================
  // SIMULACIÓN DE BÚSQUEDA
  // ============================================

  const handleSearchDevice = () => {

    if (searching) return;

    setSearching(true);
    setShowSearchMessage(false);

    searchTimer.current = setTimeout(() => {

      setSearching(false);
      setShowSearchMessage(true);
      searchTimer.current = null;

    }, 2000);

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
            Mi dispositivo S.O.I.
          </Text>

          <Text style={styles.subtitle}>
            Una demostración conceptual.
          </Text>

        </View>

      </View>

      {/* ===================================== */}
      {/* AVISO DE PROTOTIPO */}
      {/* ===================================== */}

      <View style={styles.prototypeBanner}>

        <Text style={styles.prototypeText}>
          CONCEPTO DE PRODUCTO · NO VALIDADO CLÍNICAMENTE
        </Text>

      </View>

      {/* ===================================== */}
      {/* REPRESENTACIÓN DEL DISPOSITIVO */}
      {/* ===================================== */}

      <View style={styles.deviceShowcase}>

        <View style={styles.deviceShadow}>

          <View style={styles.deviceBody}>

            {/* BRILLO DECORATIVO */}

            <View style={styles.deviceHighlight} />

            {/* LOGO */}

            <Text style={styles.deviceLogo}>
              S.O.I.
            </Text>

            {/* INDICADOR */}

            <View style={styles.deviceIndicator} />

          </View>

        </View>

        {/* INDICADOR DECORATIVO EXTERNO */}

        <View style={styles.smallIndicator} />

      </View>

      {/* ===================================== */}
      {/* ESTADO DE CONEXIÓN */}
      {/* ===================================== */}

      <View style={styles.connectionCard}>

        <Text style={styles.connectionEyebrow}>
          ESTADO DE CONEXIÓN
        </Text>

        <Text style={styles.connectionStatus}>
          Sin conectar
        </Text>

        <Text style={styles.connectionDescription}>
          La conexión Bluetooth es una simulación del prototipo.
        </Text>

        {/* BOTÓN BUSCAR */}

        <Pressable
          style={[
            styles.searchButton,
            searching && styles.searchButtonDisabled,
          ]}
          onPress={handleSearchDevice}
          disabled={searching}
        >

          {searching ? (

            <View style={styles.searchingRow}>

              <ActivityIndicator
                size="small"
                color={colors.white}
              />

              <Text style={styles.searchButtonText}>
                Buscando dispositivo...
              </Text>

            </View>

          ) : (

            <Text style={styles.searchButtonText}>
              Buscar dispositivo
            </Text>

          )}

        </Pressable>

        {/* RESULTADO DE LA SIMULACIÓN */}

        {showSearchMessage && (

          <View style={styles.searchResult}>

            <Ionicons
              name="information-circle-outline"
              size={17}
              color={colors.terracotta}
            />

            <Text style={styles.searchResultText}>
              Búsqueda de demostración finalizada.
              La conexión Bluetooth real aún no está disponible.
            </Text>

          </View>

        )}

      </View>

      {/* ===================================== */}
      {/* MENSAJE INFORMATIVO */}
      {/* ===================================== */}

      <View style={styles.infoCard}>

        <Ionicons
          name="bluetooth"
          size={20}
          color={colors.green}
        />

        <Text style={styles.infoText}>
          Este flujo muestra una posible experiencia futura.
          No afirma que la medición salival esté clínicamente validada.
        </Text>

      </View>

    </ScrollView>

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
    paddingTop: 22,
    paddingBottom: 40,
  },

  // =====================================
  // ENCABEZADO
  // =====================================

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    gap: 12,
  },

  backButton: {
    width: 39,
    height: 39,
    borderRadius: 20,
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
  },

  headerText: {
    flex: 1,
  },

  title: {
    fontSize: 26,
    fontFamily: 'serif',
    color: colors.brown,
  },

  subtitle: {
    fontSize: 11,
    color: colors.muted,
    marginTop: 4,
  },

  // =====================================
  // AVISO DE PROTOTIPO
  // =====================================

  prototypeBanner: {
    backgroundColor: '#E9E4DE',
    borderRadius: 8,
    paddingVertical: 9,
    paddingHorizontal: 8,
    alignItems: 'center',
  },

  prototypeText: {
    fontSize: 8,
    fontWeight: '600',
    letterSpacing: 0.7,
    color: '#9E8D82',
    textAlign: 'center',
  },

  // =====================================
  // REPRESENTACIÓN DEL DISPOSITIVO
  // =====================================

  deviceShowcase: {
    height: 215,
    alignItems: 'center',
    justifyContent: 'center',
  },

  deviceShadow: {
    width: 95,
    height: 145,
    alignItems: 'center',
    justifyContent: 'center',

    transform: [
      { rotate: '9deg' },
    ],

    shadowColor: '#70402D',
    shadowOffset: {
      width: 8,
      height: 14,
    },
    shadowOpacity: 0.28,
    shadowRadius: 14,
    elevation: 10,
  },

  deviceBody: {
    width: 82,
    height: 140,
    borderRadius: 42,
    backgroundColor: '#A85F3D',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },

  deviceHighlight: {
    position: 'absolute',
    top: 0,
    left: 8,
    width: 35,
    height: 135,
    borderRadius: 40,
    backgroundColor: 'rgba(255,255,255,0.07)',
  },

  deviceLogo: {
    fontSize: 15,
    fontFamily: 'serif',
    letterSpacing: 3,
    color: '#F7E8DA',

    transform: [
      { rotate: '-90deg' },
    ],
  },

  deviceIndicator: {
    position: 'absolute',
    bottom: 13,
    width: 13,
    height: 13,
    borderRadius: 7,
    backgroundColor: '#F0C5AC',
  },

  smallIndicator: {
    position: 'absolute',
    right: '19%',
    bottom: 38,
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: '#AEB7B5',
    borderWidth: 4,
    borderColor: colors.white,
  },

  // =====================================
  // ESTADO DE CONEXIÓN
  // =====================================

  connectionCard: {
    backgroundColor: colors.white,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: colors.border,
    padding: 18,
    alignItems: 'center',
    marginBottom: 14,
  },

  connectionEyebrow: {
    fontSize: 9,
    fontWeight: '700',
    letterSpacing: 1.4,
    color: colors.terracotta,
    marginBottom: 10,
  },

  connectionStatus: {
    fontSize: 27,
    fontFamily: 'serif',
    color: colors.brown,
    marginBottom: 10,
  },

  connectionDescription: {
    fontSize: 10,
    color: colors.muted,
    textAlign: 'center',
    marginBottom: 16,
  },

  // =====================================
  // BOTÓN BUSCAR
  // =====================================

  searchButton: {
    width: '100%',
    minHeight: 49,
    backgroundColor: colors.terracotta,
    borderRadius: 13,
    alignItems: 'center',
    justifyContent: 'center',
  },

  searchButtonDisabled: {
    opacity: 0.7,
  },

  searchButtonText: {
    fontSize: 13,
    fontWeight: '600',
    color: colors.white,
  },

  searchingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },

  // =====================================
  // RESULTADO DE BÚSQUEDA
  // =====================================

  searchResult: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: '#F8F1EB',
    borderRadius: 10,
    padding: 12,
    marginTop: 12,
    gap: 8,
    width: '100%',
  },

  searchResultText: {
    flex: 1,
    fontSize: 10,
    color: colors.brown,
    lineHeight: 16,
  },

  // =====================================
  // MENSAJE INFORMATIVO
  // =====================================

  infoCard: {
    backgroundColor: colors.softBeige,
    borderRadius: 14,
    padding: 15,
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 10,
  },

  infoText: {
    flex: 1,
    fontSize: 11,
    lineHeight: 17,
    color: colors.text,
  },

});