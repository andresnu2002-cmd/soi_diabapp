import { Ionicons } from '@expo/vector-icons';
import { useMemo, useState } from 'react';

import {
  Alert,
  ImageBackground,
  Linking,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import {
  articles,
  Article,
  ArticleCategory,
} from '@/data/articles';

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
  softBeige: '#F2EAE3',
};

// ============================================
// CATEGORÍAS
// ============================================

type FilterCategory =
  | 'Todo'
  | ArticleCategory;

const categories: FilterCategory[] = [
  'Todo',
  'Diabetes',
  'Embarazo',
  'Bienestar',
];

// ============================================
// FUNCIÓN PARA ABRIR ENLACES
// ============================================

async function openArticle(url: string) {

  try {

    const supported = await Linking.canOpenURL(url);

    if (supported) {
      await Linking.openURL(url);
    } else {
      Alert.alert(
        'No se puede abrir',
        'El enlace no está disponible.'
      );
    }

  } catch (error) {

    Alert.alert(
      'Error',
      'No fue posible abrir el artículo.'
    );

  }

}

// ============================================
// COMPONENTE PRINCIPAL
// ============================================

export default function AprenderScreen() {

  const [selectedCategory, setSelectedCategory] =
    useState<FilterCategory>('Todo');

  // ============================================
  // FILTRAR ARTÍCULOS
  // ============================================

  const filteredArticles = useMemo(() => {

    if (selectedCategory === 'Todo') {
      return articles;
    }

    return articles.filter(
      article => article.category === selectedCategory
    );

  }, [selectedCategory]);

  // ============================================
  // ORDEN DE ARTÍCULOS
  // ============================================

  const orderedArticles = useMemo(() => {

    if (selectedCategory !== 'Todo') {
      return filteredArticles;
    }

    const order = [1, 4, 7, 2, 3, 5, 6, 8, 9];

    return [...filteredArticles].sort(
      (a, b) =>
        order.indexOf(a.id) - order.indexOf(b.id)
    );

  }, [filteredArticles, selectedCategory]);

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
          Aprender
        </Text>

        <Text style={styles.subtitle}>
          Información clara, a tu propio ritmo.
        </Text>

      </View>

      {/* ===================================== */}
      {/* LECTURA DESTACADA */}
      {/* ===================================== */}

      <Pressable
        style={styles.featuredCard}
        onPress={() =>
          openArticle(
            'https://medlineplus.gov/spanish/gestationaldiabetes.html'
          )
        }
      >

        <ImageBackground
          source={{
            uri: 'https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?w=900',
          }}
          style={styles.featuredImage}
          imageStyle={styles.featuredImageStyle}
        >

          {/* OSCURECIMIENTO */}

          <View style={styles.featuredOverlay} />

          <View style={styles.featuredContent}>

            <Text style={styles.featuredEyebrow}>
              LECTURA DESTACADA · 5 MIN
            </Text>

            <Text style={styles.featuredTitle}>
              Comprender tu glucosa puede sentirse más sencillo
            </Text>

            <View style={styles.featuredLink}>

              <Text style={styles.featuredLinkText}>
                Leer ahora
              </Text>

              <Ionicons
                name="chevron-forward"
                size={14}
                color={colors.white}
              />

            </View>

          </View>

        </ImageBackground>

      </Pressable>

      {/* ===================================== */}
      {/* EXPLORAR */}
      {/* ===================================== */}

      <Text style={styles.sectionTitle}>
        Explorar
      </Text>

      {/* FILTROS */}

      <View style={styles.filtersContainer}>

        {categories.map(category => {

          const selected =
            selectedCategory === category;

          return (

            <Pressable
              key={category}
              style={[
                styles.filterButton,
                selected && styles.filterSelected,
              ]}
              onPress={() =>
                setSelectedCategory(category)
              }
            >

              <Text
                style={[
                  styles.filterText,
                  selected && styles.filterTextSelected,
                ]}
              >
                {category}
              </Text>

            </Pressable>

          );

        })}

      </View>

      {/* ===================================== */}
      {/* LISTA DE ARTÍCULOS */}
      {/* ===================================== */}

      <View style={styles.articlesContainer}>

        {orderedArticles.map((article, index) => (

          <ArticleCard
            key={article.id}
            article={article}
            number={index + 1}
          />

        ))}

      </View>

      {/* ===================================== */}
      {/* AYUDA MÉDICA */}
      {/* ===================================== */}

      <Pressable
        style={styles.helpCard}
        onPress={() =>
          openArticle(
            'https://medlineplus.gov/spanish/gestationaldiabetes.html'
          )
        }
      >

        <View style={styles.helpIcon}>

          <Text style={styles.helpIconText}>
            !
          </Text>

        </View>

        <View style={styles.helpContent}>

          <Text style={styles.helpTitle}>
            ¿Cuándo debo buscar ayuda médica?
          </Text>

          <Text style={styles.helpSubtitle}>
            Consulta señales y pasos claros
          </Text>

        </View>

        <Ionicons
          name="chevron-forward"
          size={17}
          color={colors.terracotta}
        />

      </Pressable>

    </ScrollView>

  );
}

// ============================================
// COMPONENTE TARJETA DE ARTÍCULO
// ============================================

function ArticleCard({
  article,
  number,
}: {
  article: Article;
  number: number;
}) {

  return (

    <Pressable
      style={styles.articleCard}
      onPress={() => openArticle(article.url)}
    >

      {/* NÚMERO */}

      <View
        style={[
          styles.articleNumberBox,
          {
            backgroundColor: article.color,
          },
        ]}
      >

        <Text style={styles.articleNumber}>
          {String(number).padStart(2, '0')}
        </Text>

      </View>

      {/* INFORMACIÓN */}

      <View style={styles.articleContent}>

        <Text style={styles.articleCategory}>
          {article.category.toUpperCase()} · {article.readTime.toUpperCase()}
        </Text>

        <Text style={styles.articleTitle}>
          {article.title}
        </Text>

        <View style={styles.articleLinkRow}>

          <Text style={styles.articleLinkText}>
            Leer artículo
          </Text>

          <Ionicons
            name="chevron-forward"
            size={12}
            color={colors.brown}
          />

        </View>

      </View>

    </Pressable>

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
    paddingTop: 28,
    paddingBottom: 35,
  },

  // =====================================
  // ENCABEZADO
  // =====================================

  header: {
    marginBottom: 20,
  },

  title: {
    fontSize: 31,
    fontFamily: 'serif',
    color: colors.brown,
  },

  subtitle: {
    fontSize: 11,
    color: colors.muted,
    marginTop: 4,
  },

  // =====================================
  // LECTURA DESTACADA
  // =====================================

  featuredCard: {
    height: 220,
    borderRadius: 20,
    overflow: 'hidden',
    marginBottom: 23,
  },

  featuredImage: {
    flex: 1,
    justifyContent: 'flex-end',
  },

  featuredImageStyle: {
    borderRadius: 20,
  },

  featuredOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(55,35,25,0.35)',
  },

  featuredContent: {
    padding: 18,
  },

  featuredEyebrow: {
    fontSize: 9,
    fontWeight: '700',
    letterSpacing: 1.4,
    color: '#F4E3D6',
    marginBottom: 9,
  },

  featuredTitle: {
    fontSize: 23,
    fontFamily: 'serif',
    color: colors.white,
    lineHeight: 27,
    marginBottom: 12,
  },

  featuredLink: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },

  featuredLinkText: {
    fontSize: 11,
    fontWeight: '600',
    color: colors.white,
  },

  // =====================================
  // EXPLORAR
  // =====================================

  sectionTitle: {
    fontSize: 24,
    fontFamily: 'serif',
    color: colors.brown,
    marginBottom: 12,
  },

  filtersContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 7,
    marginBottom: 15,
  },

  filterButton: {
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 22,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.white,
  },

  filterSelected: {
    backgroundColor: colors.selected,
    borderColor: colors.terracotta,
  },

  filterText: {
    fontSize: 11,
    color: colors.brown,
  },

  filterTextSelected: {
    color: colors.terracotta,
    fontWeight: '600',
  },

  // =====================================
  // ARTÍCULOS
  // =====================================

  articlesContainer: {
    gap: 9,
  },

  articleCard: {
    flexDirection: 'row',
    backgroundColor: colors.white,
    borderRadius: 17,
    padding: 7,
    minHeight: 91,
    alignItems: 'center',
    gap: 12,
  },

  articleNumberBox: {
    width: 72,
    height: 76,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },

  articleNumber: {
    fontSize: 24,
    fontFamily: 'serif',
    fontStyle: 'italic',
    color: colors.white,
  },

  articleContent: {
    flex: 1,
    paddingRight: 8,
  },

  articleCategory: {
    fontSize: 8,
    fontWeight: '700',
    letterSpacing: 0.6,
    color: colors.terracotta,
    marginBottom: 6,
  },

  articleTitle: {
    fontSize: 15,
    fontFamily: 'serif',
    color: colors.brown,
    lineHeight: 18,
    marginBottom: 7,
  },

  articleLinkRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },

  articleLinkText: {
    fontSize: 9,
    color: colors.muted,
  },

  // =====================================
  // AYUDA MÉDICA
  // =====================================

  helpCard: {
    backgroundColor: colors.selected,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#E3BFAF',
    padding: 14,
    marginTop: 14,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },

  helpIcon: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: colors.terracotta,
    alignItems: 'center',
    justifyContent: 'center',
  },

  helpIconText: {
    fontSize: 17,
    fontWeight: '700',
    color: colors.white,
  },

  helpContent: {
    flex: 1,
  },

  helpTitle: {
    fontSize: 11,
    fontWeight: '600',
    color: colors.brown,
    marginBottom: 3,
  },

  helpSubtitle: {
    fontSize: 9,
    color: colors.terracotta,
  },

});