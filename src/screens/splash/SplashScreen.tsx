import React, { useEffect } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import Animated, { 
  useSharedValue, 
  useAnimatedStyle, 
  withSpring, 
  withTiming,
  withSequence,
  runOnJS,
} from 'react-native-reanimated';
import LinearGradient from 'react-native-linear-gradient';
import { colors, textStyles, animationConfig } from '../../theme';
import { SCREEN_WIDTH, SCREEN_HEIGHT } from '../../utils/constants';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../../types/navigation';

type Props = NativeStackScreenProps<RootStackParamList, 'Splash'>;

export const SplashScreen: React.FC<Props> = ({ navigation }) => {
  const logoScale = useSharedValue(0.5);
  const logoOpacity = useSharedValue(0);
  const taglineOpacity = useSharedValue(0);
  const taglineY = useSharedValue(20);
  
  useEffect(() => {
    // Logo animation
    logoOpacity.value = withTiming(1, { duration: 400 });
    logoScale.value = withSequence(
      withSpring(1.1, animationConfig.springs.bouncy),
      withSpring(1, animationConfig.springs.gentle)
    );
    
    // Tagline animation after logo
    setTimeout(() => {
      taglineOpacity.value = withTiming(1, { duration: 600 });
      taglineY.value = withSpring(0, animationConfig.springs.responsive);
    }, 800);
    
    // Navigate to main after animations
    setTimeout(() => {
      runOnJS(navigateToMain)();
    }, 2500);
  }, []);
  
  const navigateToMain = () => {
    navigation.replace('Main');
  };
  
  const logoStyle = useAnimatedStyle(() => ({
    transform: [{ scale: logoScale.value }],
    opacity: logoOpacity.value,
  }));
  
  const taglineStyle = useAnimatedStyle(() => ({
    opacity: taglineOpacity.value,
    transform: [{ translateY: taglineY.value }],
  }));
  
  return (
    <View style={styles.container}>
      <LinearGradient
        colors={[colors.primary[900], colors.primary[800]]}
        style={StyleSheet.absoluteFill}
      />
      
      <Animated.View style={[styles.logoContainer, logoStyle]}>
        <View style={styles.logoBox}>
          <Text style={styles.logoText}>SHRYNK</Text>
        </View>
      </Animated.View>
      
      <Animated.View style={[styles.taglineContainer, taglineStyle]}>
        <Text style={styles.tagline}>Compress with Confidence</Text>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.background.primary,
  },
  logoContainer: {
    marginBottom: 40,
  },
  logoBox: {
    width: 200,
    height: 200,
    borderRadius: 40,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  logoText: {
    ...textStyles.displayLarge,
    color: colors.neutral[0],
    letterSpacing: 4,
  },
  taglineContainer: {
    position: 'absolute',
    bottom: 100,
  },
  tagline: {
    ...textStyles.bodyLarge,
    color: colors.neutral[0],
    opacity: 0.8,
  },
});
