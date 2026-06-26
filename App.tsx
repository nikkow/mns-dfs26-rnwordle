/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import { StatusBar } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Home } from './src/views/Home';

function App() {
  return (
    <SafeAreaProvider>
      <StatusBar barStyle="light-content" />
      <Home />
    </SafeAreaProvider>
  );
}

export default App;
