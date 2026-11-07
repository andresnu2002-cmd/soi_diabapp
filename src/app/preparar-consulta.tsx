import PrepararConsulta from '@/components/PrepararConsulta';
import { SafeAreaView, StyleSheet } from 'react-native';

export default function PrepararConsultaScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <PrepararConsulta />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F4EF',
  },
});