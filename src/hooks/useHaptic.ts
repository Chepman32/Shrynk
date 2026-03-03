import ReactNativeHapticFeedback from 'react-native-haptic-feedback';

type HapticType = 
  | 'selection'
  | 'impactLight'
  | 'impactMedium'
  | 'impactHeavy'
  | 'notificationSuccess'
  | 'notificationWarning'
  | 'notificationError';

const options = {
  enableVibrateFallback: true,
  ignoreAndroidSystemSettings: false,
};

export const triggerHaptic = (type: HapticType) => {
  ReactNativeHapticFeedback.trigger(type, options);
};

export const useHaptic = () => {
  return { triggerHaptic };
};
