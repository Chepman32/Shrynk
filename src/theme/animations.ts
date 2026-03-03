import { Easing } from 'react-native-reanimated';

export const animationConfig = {
  springs: {
    gentle: {
      damping: 20,
      mass: 1,
      stiffness: 100,
    },
    responsive: {
      damping: 15,
      mass: 0.8,
      stiffness: 150,
    },
    bouncy: {
      damping: 10,
      mass: 0.6,
      stiffness: 180,
    },
    snappy: {
      damping: 20,
      mass: 0.5,
      stiffness: 300,
    },
    stiff: {
      damping: 25,
      mass: 1,
      stiffness: 400,
    },
  },
  
  timing: {
    instant: 100,
    fast: 200,
    normal: 300,
    slow: 500,
    slower: 800,
    slowest: 1200,
  },
  
  easing: {
    easeInOut: Easing.bezier(0.4, 0, 0.2, 1),
    easeOut: Easing.bezier(0, 0, 0.2, 1),
    easeIn: Easing.bezier(0.4, 0, 1, 1),
    overshoot: Easing.bezier(0.34, 1.56, 0.64, 1),
    anticipate: Easing.bezier(0.36, 0, 0.66, -0.56),
  },
};
