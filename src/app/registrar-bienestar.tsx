import RegistrarBienestar from '@/components/RegistrarBienestar';
import { SafeAreaView, StyleSheet } from 'react-native';

export default function RegistrarBienestarScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <RegistrarBienestar />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F4EF',
  },
});