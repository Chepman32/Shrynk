import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SplashScreen } from '../screens/splash/SplashScreen';
import { MainTabNavigator } from './TabNavigator';
import { CompressionScreen } from '../screens/compression/CompressionScreen';
import { PreviewScreen } from '../screens/preview/PreviewScreen';
import { ExportScreen } from '../screens/export/ExportScreen';
import { colors } from '../theme';
import type { RootStackParamList } from '../types/navigation';

const Stack = createNativeStackNavigator<RootStackParamList>();

const navigationTheme = {
  dark: true,
  colors: {
    primary: colors.primary[500],
    background: colors.background.primary,
    card: colors.surface.primary,
    text: colors.text.primary,
    border: colors.border.subtle,
    notification: colors.primary[500],
  },
};

export const RootNavigator: React.FC = () => {
  return (
    <NavigationContainer theme={navigationTheme}>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          gestureEnabled: true,
          animation: 'slide_from_right',
        }}
      >
        <Stack.Screen
          name="Splash"
          component={SplashScreen}
          options={{ animation: 'none' }}
        />
        <Stack.Screen
          name="Main"
          component={MainTabNavigator}
          options={{ animation: 'fade' }}
        />
        <Stack.Screen
          name="Compression"
          component={CompressionScreen}
        />
        <Stack.Screen
          name="Preview"
          component={PreviewScreen}
        />
        <Stack.Screen
          name="Export"
          component={ExportScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
