import PersonalizarSOI from '@/components/PersonalizarSOI';
import { SafeAreaView, StyleSheet } from 'react-native';

export default function PersonalizarSOIScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <PersonalizarSOI />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F4EF',
  },
});