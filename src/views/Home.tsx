import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const MAX_ATTEMPTS = 6;
const WORD_LENGTH = 5;

export const Home = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Wordle</Text>
      <Text style={styles.subtitle}>
        Trouvez le mot en {MAX_ATTEMPTS} essais
      </Text>

      <View style={styles.grid}>
        {Array.from({ length: MAX_ATTEMPTS }).map((_, row) => (
          <View key={row} style={styles.row}>
            {Array.from({ length: WORD_LENGTH }).map((_, index) => (
              <View key={index} style={styles.cell}></View>
            ))}
          </View>
        ))}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
    alignItems: 'center',
  },
  title: {
    color: '#fff',
    fontSize: 28,
    fontWeight: 'bold',
  },
  subtitle: {
    color: '#B3B3B3',
    fontSize: 16,
  },
  grid: {
    gap: 8,
  },
  row: {
    flexDirection: 'row',
    gap: 8,
  },
  cell: {
    width: 56,
    height: 56,
    borderWidth: 2,
    borderColor: '#3a3a3a',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
