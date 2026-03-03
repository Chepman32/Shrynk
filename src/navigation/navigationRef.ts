import { createNavigationContainerRef } from '@react-navigation/native';
import type { RootStackParamList } from '../types/navigation';

export const navigationRef = createNavigationContainerRef<RootStackParamList>();

export const navigateToCompression = (
  params: RootStackParamList['Compression']
) => {
  if (!navigationRef.isReady()) {
    return false;
  }

  navigationRef.navigate('Compression', params);
  return true;
};
