import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
} from 'react';

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
}

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

  const updatePregnancy = (data: PregnancyData) => {
    setPregnancy(data);
  };

  return (
    <PregnancyContext.Provider
      value={{
        pregnancy,
        updatePregnancy,
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