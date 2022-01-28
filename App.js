import 'react-native-gesture-handler';

import React from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';

import {LogBox} from 'react-native';

import {PreferencesProvider} from './src/context/preferences';

import Main from './src/Main';

LogBox.ignoreLogs(['new NativeEventEmitter']); // Ignore log notification by message
LogBox.ignoreAllLogs(); //Ignore all log notifications

const App = () => {
  return (
    <PreferencesProvider>
      <SafeAreaProvider>
        <Main />
      </SafeAreaProvider>
    </PreferencesProvider>
  );
};

export default App;
