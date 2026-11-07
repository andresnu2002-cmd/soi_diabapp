import { useLocalSearchParams, router } from 'expo-router';


const { tipo } = useLocalSearchParams<{
  tipo?: 'alimentacion' | 'sueno' | 'actividad';
}>();


export default function TuProgresoScreen() {

  const { tipo } = useLocalSearchParams<{
    tipo?: 'alimentacion' | 'sueno' | 'actividad';
  }>();

  return (
    <>
      {tipo === 'alimentacion' && (
        <RegistrarComida />
      )}

      {tipo === 'sueno' && (
        <RegistrarSueno />
      )}

      {tipo === 'actividad' && (
        <RegistrarActividad />
      )}
    </>
  );
}