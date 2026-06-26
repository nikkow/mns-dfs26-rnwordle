import { Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Keyboard } from '../components/Keyboard';
import { useMemo, useState } from 'react';

const WORD = 'REACT';
const MAX_ATTEMPTS = 6;
const WORD_LENGTH = 5;

export const Home = () => {
  const [attempts, setAttempts] = useState<string[]>([]);
  const [currentWord, setCurrentWord] = useState('');

  const grid = useMemo(() => {
    const rows = [...attempts];

    if (rows.length < MAX_ATTEMPTS) {
      rows.push(currentWord);
    }

    while (rows.length < MAX_ATTEMPTS) {
      rows.push('');
    }

    return rows;
  }, [attempts, currentWord]);

  const onKeyPress = (key: string) => {
    if (key === 'DEL') {
      setCurrentWord(currentWord.slice(0, -1));
      return;
    }

    if (key === 'ENTER') {
      validateWord();
      return;
    }

    if (currentWord.length < WORD_LENGTH) {
      setCurrentWord(current => current + key);
    }
  };

  const validateWord = () => {
    if (currentWord.length !== WORD_LENGTH) {
      Alert.alert(
        'Mot incomplet',
        `Le mot doit contenir ${WORD_LENGTH} lettres`,
      );
      return;
    }
    const newAttempts = [...attempts, currentWord];
    setAttempts(newAttempts);

    if (currentWord === WORD) {
      Alert.alert('Bravo !', 'Vous avez trouvé le mot !');
    }

    if (newAttempts.length >= MAX_ATTEMPTS) {
      Alert.alert('Perdu !', `Le mot était ${WORD}`);
    }

    setCurrentWord('');
  };

  const getLetterStatus = (letter: string, index: number, word: string) => {
    if (!word || word.length < WORD_LENGTH || !attempts.includes(word)) {
      return 'empty';
    }

    if (WORD[index] === letter) {
      return 'correct';
    }

    if (WORD.includes(letter)) {
      return 'present';
    }

    return 'absent';
  };

  const resetGame = () => {
    setAttempts([]);
    setCurrentWord('');
  };

  return (
    <>
      <SafeAreaView style={styles.container}>
        <View style={{ alignItems: 'center' }}>
          <Text style={styles.title}>Wordle</Text>
          <Text style={styles.subtitle}>
            Trouvez le mot en {MAX_ATTEMPTS} essais
          </Text>

          <View style={styles.grid}>
            {grid.map((word, row) => (
              <View key={row} style={styles.row}>
                {Array.from({ length: WORD_LENGTH }).map((_, index) => {
                  const letter = word[index] ?? '';
                  const status = getLetterStatus(letter, index, word);

                  return (
                    <View key={index} style={[styles.cell, styles[status]]}>
                      <Text style={styles.cellText}>{letter}</Text>
                    </View>
                  );
                })}
              </View>
            ))}
          </View>
        </View>
        <View style={{ gap: 16 }}>
          <TouchableOpacity
            style={styles.resetButton}
            onPress={() => resetGame()}
          >
            <Text style={styles.resetButtonText}>Nouvelle partie</Text>
          </TouchableOpacity>
          <Keyboard onKeyPress={onKeyPress} />
        </View>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
    alignItems: 'center',
    justifyContent: 'space-around',
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
    marginTop: 24,
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
  cellText: {
    color: '#FFFFFF',
    fontSize: 24,
    fontWeight: 'bold',
  },
  resetButton: {
    backgroundColor: '#818181',
    paddingVertical: 14,
    paddingHorizontal: 10,
    borderRadius: 6,
    alignItems: 'center',
  },
  resetButtonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 12,
  },
  correct: {
    backgroundColor: '#538d4e',
    borderColor: '#538d4e',
  },
  present: {
    backgroundColor: '#b59f3b',
    borderColor: '#b59f3b',
  },
  absent: {
    backgroundColor: '#3a3a3a',
    borderColor: '#3a3a3a',
  },
  empty: {
    backgroundColor: 'transparent',
  },
});
