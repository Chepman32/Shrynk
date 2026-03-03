import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { HomeScreen } from '../screens/home/HomeScreen';
import { ImportScreen } from '../screens/import/ImportScreen';
import { BatchScreen } from '../screens/batch/BatchScreen';
import type { HomeStackParamList } from '../types/navigation';

const Stack = createNativeStackNavigator<HomeStackParamList>();

export const HomeStackNavigator: React.FC = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        animation: 'slide_from_right',
      }}
    >
      <Stack.Screen name="HomeMain" component={HomeScreen} />
      <Stack.Screen 
        name="Import" 
        component={ImportScreen}
        options={{ presentation: 'modal' }}
      />
      <Stack.Screen name="Batch" component={BatchScreen} />
    </Stack.Navigator>
  );
};
