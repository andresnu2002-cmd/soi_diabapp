import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from 'react';

import AsyncStorage from '@react-native-async-storage/async-storage';

// ============================================
// TIPOS DE DATOS
// ============================================

interface PregnancyData {
  weeks: number;
  days: number;
  pregnancyType: string;
}

interface PregnancyContextType {
  pregnancy: PregnancyData;
  updatePregnancy: (data: PregnancyData) => void;
  pregnancyLoading: boolean;
}

// ============================================
// CLAVES DE ALMACENAMIENTO
// ============================================

const WEEKS_KEY = '@soi_pregnancy_weeks';
const DAYS_KEY = '@soi_pregnancy_days';
const TYPE_KEY = '@soi_pregnancy_type';

// ============================================
// DATOS INICIALES
// ============================================

const initialPregnancy: PregnancyData = {
  weeks: 24,
  days: 3,
  pregnancyType: 'Embarazo único',
};

// ============================================
// CONTEXTO
// ============================================

const PregnancyContext = createContext<
  PregnancyContextType | undefined
>(undefined);

// ============================================
// PROVIDER
// ============================================

export function PregnancyProvider({
  children,
}: {
  children: ReactNode;
}) {

  const [pregnancy, setPregnancy] =
    useState<PregnancyData>(initialPregnancy);

  const [pregnancyLoading, setPregnancyLoading] =
    useState(true);

  // ==========================================
  // RECUPERAR DATOS AL INICIAR
  // ==========================================

  useEffect(() => {

    let active = true;

    const loadPregnancy = async () => {

      try {

        const values = await AsyncStorage.multiGet([
          WEEKS_KEY,
          DAYS_KEY,
          TYPE_KEY,
        ]);

        if (!active) return;

        const data = Object.fromEntries(values);

        const savedWeeks = data[WEEKS_KEY];
        const savedDays = data[DAYS_KEY];
        const savedType = data[TYPE_KEY];

        const weeks = Number(savedWeeks);
        const days = Number(savedDays);

        setPregnancy({

          weeks:
            savedWeeks !== null &&
            Number.isInteger(weeks) &&
            weeks >= 0 &&
            weeks <= 42
              ? weeks
              : initialPregnancy.weeks,

          days:
            savedDays !== null &&
            Number.isInteger(days) &&
            days >= 0 &&
            days <= 6
              ? days
              : initialPregnancy.days,

          pregnancyType:
            savedType || initialPregnancy.pregnancyType,

        });

      } catch (error) {

        console.error(
          'Error cargando información del embarazo:',
          error
        );

      } finally {

        if (active) {
          setPregnancyLoading(false);
        }

      }

    };

    loadPregnancy();

    return () => {
      active = false;
    };

  }, []);

  // ==========================================
  // ACTUALIZAR EMBARAZO
  // ==========================================

  const updatePregnancy = (data: PregnancyData) => {

    // Actualizar el contexto inmediatamente.
    setPregnancy(data);

    // Guardar los cambios para futuros inicios.
    const savePregnancy = async () => {

      try {

        await AsyncStorage.multiSet([
          [WEEKS_KEY, String(data.weeks)],
          [DAYS_KEY, String(data.days)],
          [TYPE_KEY, data.pregnancyType],
        ]);

      } catch (error) {

        console.error(
          'Error guardando información del embarazo:',
          error
        );

      }

    };

    void savePregnancy();

  };

  // ==========================================
  // PROVIDER
  // ==========================================

  return (

    <PregnancyContext.Provider
      value={{
        pregnancy,
        updatePregnancy,
        pregnancyLoading,
      }}
    >

      {children}

    </PregnancyContext.Provider>

  );

}

// ============================================
// HOOK
// ============================================

export function usePregnancy() {

  const context = useContext(PregnancyContext);

  if (!context) {

    throw new Error(
      'usePregnancy debe utilizarse dentro de PregnancyProvider'
    );

  }

  return context;

}