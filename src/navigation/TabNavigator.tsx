import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Animated, { useSharedValue, useAnimatedStyle, withSpring } from 'react-native-reanimated';
import LinearGradient from 'react-native-linear-gradient';
import { HomeStackNavigator } from './HomeStackNavigator';
import { HistoryScreen } from '../screens/history/HistoryScreen';
import { Icon } from '../components/common/Icon';
import { colors, spacing, textStyles, animationConfig } from '../theme';
import { SCREEN_WIDTH } from '../utils/constants';
import type { MainTabParamList } from '../types/navigation';
import type { BottomTabBarProps } from '@react-navigation/bottom-tabs';

const Tab = createBottomTabNavigator<MainTabParamList>();

const tabIcons: Record<string, any> = {
  Home: { set: 'Feather', name: 'home' },
  History: { set: 'Feather', name: 'clock' },
};

const AnimatedTabBar: React.FC<BottomTabBarProps> = ({ state, navigation }) => {
  const tabWidth = SCREEN_WIDTH / state.routes.length;
  const translateX = useSharedValue(state.index * tabWidth);

  React.useEffect(() => {
    translateX.value = withSpring(
      state.index * tabWidth,
      animationConfig.springs.snappy
    );
  }, [state.index]);

  const indicatorStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
    width: tabWidth,
  }));

  return (
    <View style={styles.tabBar}>
      <Animated.View style={[styles.indicator, indicatorStyle]}>
        <LinearGradient
          colors={colors.gradients.primary}
          style={styles.indicatorGradient}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
        />
      </Animated.View>

      {state.routes.map((route, index) => {
        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        return (
          <TouchableOpacity
            key={route.key}
            onPress={onPress}
            style={styles.tabItem}
          >
            <Icon
              {...tabIcons[route.name]}
              size={24}
              color={isFocused ? colors.primary[500] : colors.neutral[400]}
            />
            {isFocused && (
              <Text style={styles.tabLabel}>{route.name}</Text>
            )}
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

export const MainTabNavigator: React.FC = () => {
  return (
    <Tab.Navigator
      tabBar={(props) => <AnimatedTabBar {...props} />}
      screenOptions={{
        headerShown: false,
        lazy: true,
      }}
    >
      <Tab.Screen name="Home" component={HomeStackNavigator} />
      <Tab.Screen name="History" component={HistoryScreen} />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  tabBar: {
    flexDirection: 'row',
    backgroundColor: colors.surface.primary,
    borderTopWidth: 1,
    borderTopColor: colors.border.subtle,
    paddingBottom: spacing[6],
    paddingTop: spacing[2],
  },
  indicator: {
    position: 'absolute',
    top: 0,
    height: 3,
  },
  indicatorGradient: {
    flex: 1,
  },
  tabItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: spacing[2],
    gap: spacing[1],
  },
  tabLabel: {
    ...textStyles.caption,
    color: colors.primary[500],
    fontWeight: '600',
  },
});
