// ============================================
// ARTÍCULOS EDUCATIVOS S.O.I.
// ============================================

export type ArticleCategory =
  | 'Diabetes'
  | 'Embarazo'
  | 'Bienestar';

export interface Article {
  id: number;
  title: string;
  category: ArticleCategory;
  readTime: string;
  url: string;
  color: string;
  source: string;
}

export const articles: Article[] = [

  // ==========================================
  // DIABETES
  // ==========================================

  {
    id: 1,
    title: '¿Qué significan mis resultados de glucosa?',
    category: 'Diabetes',
    readTime: '5 min',
    source: 'MedlinePlus',
    url: 'https://medlineplus.gov/spanish/bloodglucose.html',
    color: '#AD6848',
  },

  {
    id: 2,
    title: '¿La diabetes gestacional significa que hice algo mal?',
    category: 'Diabetes',
    readTime: '6 min',
    source: 'NIDDK',
    url: 'https://www.niddk.nih.gov/health-information/informacion-de-la-salud/diabetes/informacion-general/que-es/gestacional',
    color: '#795342',
  },

  {
    id: 3,
    title: 'Comprender la diabetes gestacional',
    category: 'Diabetes',
    readTime: '7 min',
    source: 'MedlinePlus',
    url: 'https://medlineplus.gov/spanish/gestationaldiabetes.html',
    color: '#C69A89',
  },

  // ==========================================
  // EMBARAZO
  // ==========================================

  {
    id: 4,
    title: 'Cambios durante cada trimestre',
    category: 'Embarazo',
    readTime: '7 min',
    source: 'MedlinePlus',
    url: 'https://medlineplus.gov/spanish/pregnancy.html',
    color: '#899B89',
  },

  {
    id: 5,
    title: 'Cuidarte durante el embarazo',
    category: 'Embarazo',
    readTime: '6 min',
    source: 'MedlinePlus',
    url: 'https://medlineplus.gov/spanish/prenatalcare.html',
    color: '#BBA48E',
  },

  {
    id: 6,
    title: 'Alimentación durante el embarazo',
    category: 'Embarazo',
    readTime: '5 min',
    source: 'MedlinePlus',
    url: 'https://medlineplus.gov/spanish/pregnancyandnutrition.html',
    color: '#A6B1A0',
  },

  // ==========================================
  // BIENESTAR
  // ==========================================

  {
    id: 7,
    title: 'Descansar también es cuidarme',
    category: 'Bienestar',
    readTime: '5 min',
    source: 'MedlinePlus',
    url: 'https://medlineplus.gov/spanish/healthysleep.html',
    color: '#C99F92',
  },

  {
    id: 8,
    title: 'Mi bienestar emocional también importa',
    category: 'Bienestar',
    readTime: '6 min',
    source: 'MedlinePlus',
    url: 'https://medlineplus.gov/spanish/mentalhealth.html',
    color: '#A6B6A5',
  },

  {
    id: 9,
    title: 'Moverme a mi propio ritmo',
    category: 'Bienestar',
    readTime: '5 min',
    source: 'MedlinePlus',
    url: 'https://medlineplus.gov/spanish/exerciseandphysicalfitness.html',
    color: '#D3B09F',
  },

];