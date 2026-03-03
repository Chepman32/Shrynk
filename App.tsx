import React, { useEffect } from 'react';
import { StatusBar } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { RootNavigator } from './src/navigation/RootNavigator';
import { useAppStore } from './src/store/useAppStore';
import { useHistoryStore } from './src/store/useHistoryStore';
import { useSettingsStore } from './src/store/useSettingsStore';

function App() {
  const initialize = useAppStore(state => state.initialize);
  const loadHistory = useHistoryStore(state => state.loadHistory);
  const loadSettings = useSettingsStore(state => state.loadSettings);
  
  useEffect(() => {
    const initApp = async () => {
      await initialize();
      loadHistory();
      loadSettings();
    };
    
    initApp();
  }, []);
  
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <StatusBar barStyle="light-content" backgroundColor="#0A0A0B" />
        <RootNavigator />
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}

export default App;
