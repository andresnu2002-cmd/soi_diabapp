import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
} from 'react';

// ============================================
// TIPOS DE REGISTROS DIARIOS
// ============================================

export interface FoodRecord {
  id: string;
  date: string;
  mealType: string;
  time: string;
  description: string;
}

export interface SleepRecord {
  id: string;
  date: string;
  hours: string;
  quality: string;
}

export interface ActivityRecord {
  id: string;
  date: string;
  activity: string;
  duration: string;
  feeling: string;
}

export interface WellnessRecord {
  id: string;
  date: string;
  emotion: string;
  note: string;
}

// ============================================
// ESTRUCTURA DE LOS DATOS
// ============================================

interface DailyRecordsContextType {
  foodRecords: FoodRecord[];
  sleepRecords: SleepRecord[];
  activityRecords: ActivityRecord[];
  wellnessRecords: WellnessRecord[];

  addFoodRecord: (record: FoodRecord) => void;
  addSleepRecord: (record: SleepRecord) => void;
  addActivityRecord: (record: ActivityRecord) => void;
  addWellnessRecord: (record: WellnessRecord) => void;

  getRecordsByDate: (date: string) => {
    food: FoodRecord[];
    sleep: SleepRecord | null;
    activities: ActivityRecord[];
    wellness: WellnessRecord | null;
  };
}

// ============================================
// CREAR CONTEXTO
// ============================================

const DailyRecordsContext = createContext<
  DailyRecordsContextType | undefined
>(undefined);

// ============================================
// PROVIDER
// ============================================

export function DailyRecordsProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [foodRecords, setFoodRecords] =
    useState<FoodRecord[]>([]);

  const [sleepRecords, setSleepRecords] =
    useState<SleepRecord[]>([]);

  const [activityRecords, setActivityRecords] =
    useState<ActivityRecord[]>([]);

  const [wellnessRecords, setWellnessRecords] =
    useState<WellnessRecord[]>([]);

  // ============================================
  // ALIMENTACIÓN
  // Permite varias comidas por día
  // ============================================

  const addFoodRecord = (record: FoodRecord) => {
    setFoodRecords(previous => [
      ...previous,
      record,
    ]);
  };

  // ============================================
  // SUEÑO
  // Un registro por fecha
  // ============================================

  const addSleepRecord = (record: SleepRecord) => {
    setSleepRecords(previous => {
      const filtered = previous.filter(
        item => item.date !== record.date
      );

      return [...filtered, record];
    });
  };

  // ============================================
  // ACTIVIDAD FÍSICA
  // Permite varias actividades por día
  // ============================================

  const addActivityRecord = (record: ActivityRecord) => {
    setActivityRecords(previous => [
      ...previous,
      record,
    ]);
  };

  // ============================================
  // BIENESTAR
  // Un registro por fecha
  // ============================================

  const addWellnessRecord = (record: WellnessRecord) => {
    setWellnessRecords(previous => {
      const filtered = previous.filter(
        item => item.date !== record.date
      );

      return [...filtered, record];
    });
  };

  // ============================================
  // CONSULTAR REGISTROS POR FECHA
  // ============================================

  const getRecordsByDate = (date: string) => {
    const food = foodRecords.filter(
      item => item.date === date
    );

    const sleep =
      sleepRecords.find(
        item => item.date === date
      ) ?? null;

    const activities = activityRecords.filter(
      item => item.date === date
    );

    const wellness =
      wellnessRecords.find(
        item => item.date === date
      ) ?? null;

    return {
      food,
      sleep,
      activities,
      wellness,
    };
  };

  // ============================================
  // COMPARTIR INFORMACIÓN
  // ============================================

  return (
    <DailyRecordsContext.Provider
      value={{
        foodRecords,
        sleepRecords,
        activityRecords,
        wellnessRecords,

        addFoodRecord,
        addSleepRecord,
        addActivityRecord,
        addWellnessRecord,

        getRecordsByDate,
      }}
    >
      {children}
    </DailyRecordsContext.Provider>
  );
}

// ============================================
// HOOK PERSONALIZADO
// ============================================

export function useDailyRecords() {
  const context = useContext(DailyRecordsContext);

  if (!context) {
    throw new Error(
      'useDailyRecords debe utilizarse dentro de DailyRecordsProvider'
    );
  }

  return context;
}