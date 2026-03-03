import React from 'react';
import { StyleSheet, Text, ActivityIndicator, View } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, { useSharedValue, useAnimatedStyle, withSpring, withTiming, runOnJS } from 'react-native-reanimated';
import LinearGradient from 'react-native-linear-gradient';
import { Icon } from './Icon';
import { colors, spacing, layout, textStyles, animationConfig } from '../../theme';
import type { IconProps } from '../../types/common';

interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'ghost' | 'destructive';
  size?: 'sm' | 'md' | 'lg';
  label: string;
  icon?: IconProps;
  iconPosition?: 'left' | 'right';
  disabled?: boolean;
  loading?: boolean;
  fullWidth?: boolean;
  onPress: () => void;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  label,
  icon,
  iconPosition = 'left',
  disabled = false,
  loading = false,
  fullWidth = false,
  onPress,
}) => {
  const scale = useSharedValue(1);
  const opacity = useSharedValue(1);
  
  const gesture = Gesture.Tap()
    .enabled(!disabled && !loading)
    .onBegin(() => {
      scale.value = withSpring(0.96, animationConfig.springs.snappy);
      opacity.value = withTiming(0.8, { duration: 100 });
    })
    .onFinalize((_, success) => {
      scale.value = withSpring(1, animationConfig.springs.bouncy);
      opacity.value = withTiming(1, { duration: 150 });
      if (success) {
        runOnJS(onPress)();
      }
    });
  
  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
    opacity: disabled ? 0.5 : opacity.value,
  }));
  
  const variantStyles = {
    primary: {
      container: styles.primaryContainer,
      text: styles.primaryText,
      gradient: colors.gradients.primary,
    },
    secondary: {
      container: styles.secondaryContainer,
      text: styles.secondaryText,
      gradient: null,
    },
    ghost: {
      container: styles.ghostContainer,
      text: styles.ghostText,
      gradient: null,
    },
    destructive: {
      container: styles.destructiveContainer,
      text: styles.destructiveText,
      gradient: null,
    },
  };
  
  const sizeStyles = {
    sm: { height: 36, paddingHorizontal: 12, fontSize: 14 },
    md: { height: 48, paddingHorizontal: 20, fontSize: 16 },
    lg: { height: 56, paddingHorizontal: 24, fontSize: 18 },
  };
  
  const currentVariant = variantStyles[variant];
  const currentSize = sizeStyles[size];
  
  const content = (
    <>
      {loading ? (
        <ActivityIndicator
          size="small"
          color={variant === 'primary' ? '#FFFFFF' : colors.primary[500]}
        />
      ) : (
        <>
          {icon && iconPosition === 'left' && (
            <View style={styles.iconLeft}>
              <Icon {...icon} size={currentSize.fontSize + 2} />
            </View>
          )}
          <Text style={[currentVariant.text, { fontSize: currentSize.fontSize }]}>
            {label}
          </Text>
          {icon && iconPosition === 'right' && (
            <View style={styles.iconRight}>
              <Icon {...icon} size={currentSize.fontSize + 2} />
            </View>
          )}
        </>
      )}
    </>
  );
  
  return (
    <GestureDetector gesture={gesture}>
      <Animated.View
        style={[
          styles.buttonBase,
          currentVariant.container,
          { height: currentSize.height, paddingHorizontal: currentSize.paddingHorizontal },
          fullWidth && styles.fullWidth,
          animatedStyle,
        ]}
      >
        {currentVariant.gradient ? (
          <LinearGradient
            colors={currentVariant.gradient}
            style={StyleSheet.absoluteFill}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          />
        ) : null}
        <View style={styles.contentContainer}>{content}</View>
      </Animated.View>
    </GestureDetector>
  );
};

const styles = StyleSheet.create({
  buttonBase: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: layout.borderRadius.lg,
    overflow: 'hidden',
  },
  contentContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  fullWidth: {
    width: '100%',
  },
  primaryContainer: {
    backgroundColor: colors.primary[500],
  },
  primaryText: {
    color: '#FFFFFF',
    fontFamily: 'System',
    fontWeight: '600',
  },
  secondaryContainer: {
    backgroundColor: colors.surface.secondary,
    borderWidth: 1,
    borderColor: colors.border.default,
  },
  secondaryText: {
    color: colors.text.primary,
    fontFamily: 'System',
    fontWeight: '600',
  },
  ghostContainer: {
    backgroundColor: 'transparent',
  },
  ghostText: {
    color: colors.primary[500],
    fontFamily: 'System',
    fontWeight: '600',
  },
  destructiveContainer: {
    backgroundColor: colors.semantic.error,
  },
  destructiveText: {
    color: '#FFFFFF',
    fontFamily: 'System',
    fontWeight: '600',
  },
  iconLeft: {
    marginRight: spacing[2],
  },
  iconRight: {
    marginLeft: spacing[2],
  },
});
