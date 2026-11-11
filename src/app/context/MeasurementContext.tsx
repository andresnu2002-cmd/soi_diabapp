import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
} from 'react';

export interface Measurement {
  id: string;
  glucose: number;
  unit: 'mg/dL';
  moment: string;
  date: string;
  time: string;
  food: string;
  note: string;
}

interface MeasurementContextType {
  measurements: Measurement[];
  addMeasurement: (measurement: Measurement) => void;
}

const MeasurementContext = createContext<
  MeasurementContextType | undefined
>(undefined);

export function MeasurementProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [measurements, setMeasurements] =
    useState<Measurement[]>([]);

  const addMeasurement = (measurement: Measurement) => {
    setMeasurements(previous => {
      const updated = [...previous, measurement];

      return updated.sort((a, b) => {
        const dateA = `${a.date}T${a.time}`;
        const dateB = `${b.date}T${b.time}`;

        return dateA.localeCompare(dateB);
      });
    });
  };

  return (
    <MeasurementContext.Provider
      value={{
        measurements,
        addMeasurement,
      }}
    >
      {children}
    </MeasurementContext.Provider>
  );
}

export function useMeasurements() {
  const context = useContext(MeasurementContext);

  if (!context) {
    throw new Error(
      'useMeasurements debe utilizarse dentro de MeasurementProvider'
    );
  }

  return context;
}