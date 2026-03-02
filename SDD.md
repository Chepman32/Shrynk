```markdown
# Software Design Document (SDD)

# Shrynk - Video Size Compressor for iOS

## Mobile Application for Video Compression with Offline Capability

**Version:** 1.0.0
**Platform:** iOS (Primary)
**Framework:** React Native with TypeScript

---

# Table of Contents

1. [Executive Summary](#1-executive-summary)
2. [Product Overview](#2-product-overview)
3. [Technical Architecture](#3-technical-architecture)
4. [Design System](#4-design-system)
5. [Animation Specifications](#5-animation-specifications)
6. [Screen Specifications](#6-screen-specifications)
7. [Component Library](#7-component-library)
8. [Gesture System](#8-gesture-system)
9. [Navigation Architecture](#9-navigation-architecture)
10. [Offline Architecture](#10-offline-architecture)
11. [Compression Engine](#11-compression-engine)
12. [Data Models](#12-data-models)
13. [State Management](#13-state-management)
14. [Asset Management](#14-asset-management)
15. [Accessibility](#15-accessibility)
16. [Security Considerations](#16-security-considerations)
17. [Performance Optimization](#17-performance-optimization)
18. [Testing Strategy](#18-testing-strategy)
19. [Deployment Configuration](#19-deployment-configuration)
20. [Appendices](#20-appendices)

---

# 1. Executive Summary

## 1.1 Purpose

Shrynk is a production-ready iOS mobile application designed to compress video files entirely offline. The application provides an intuitive, gesture-driven interface with sophisticated animations powered by React Native Reanimated and React Native Skia. The app aims to deliver a premium user experience comparable to industry-leading applications such as Facebook and Tinkoff Bank.

## 1.2 Scope

This document provides comprehensive specifications for:
- Complete UI/UX design with all screens, components, and interactions
- Animation specifications using React Native Reanimated and Skia
- Gesture-based navigation and interaction patterns
- Offline video compression architecture
- Technical implementation details
- Component library specifications

## 1.3 Name Rationale: "Shrynk"

The name "Shrynk" is derived from the word "shrink," directly communicating the app's core functionality of reducing video file sizes. The unique spelling with 'y' creates:
- **Brand distinctiveness** - Easily searchable and memorable
- **Modern aesthetic** - Aligns with contemporary tech naming conventions
- **Phonetic clarity** - Pronounced identically to "shrink"
- **Single word simplicity** - Easy to remember and type

---

# 2. Product Overview

## 2.1 Core Features

| Feature | Description |
|---------|-------------|
| Video Compression | Reduce video file size with customizable quality settings |
| Batch Processing | Compress multiple videos simultaneously |
| Preset Profiles | Pre-configured compression settings for common use cases |
| Preview Mode | Side-by-side comparison before and after compression |
| Video Trimming | Cut unwanted portions before compression |
| Export Options | Multiple export formats and destinations |
| History Management | Access previously compressed videos |
| Favorites | Quick access to frequently used settings |

## 2.2 Target Platform

- **Primary:** iOS 14.0+
- **Devices:** iPhone (all supported models from iPhone 8 onwards)
- **Orientation:** Portrait primary, Landscape for video preview

## 2.3 Offline Capability

All core functionality operates without internet connectivity:
- Video compression processing
- Preset management
- History access
- Settings configuration

---

# 3. Technical Architecture

## 3.1 Technology Stack

┌─────────────────────────────────────────────────────────────┐
│                     PRESENTATION LAYER                       │
├─────────────────────────────────────────────────────────────┤
│  React Native 0.73+  │  TypeScript 5.0+  │  React 18.2+     │
├─────────────────────────────────────────────────────────────┤
│         ANIMATION & GRAPHICS LAYER                           │
├─────────────────────────────────────────────────────────────┤
│  React Native Reanimated 3.x  │  React Native Skia 0.1.x    │
│  React Native Gesture Handler 2.x                            │
├─────────────────────────────────────────────────────────────┤
│                   STATE MANAGEMENT                           │
├─────────────────────────────────────────────────────────────┤
│  Zustand 4.x  │  React Query 5.x  │  MMKV Storage           │
├─────────────────────────────────────────────────────────────┤
│                   NATIVE MODULES                             │
├─────────────────────────────────────────────────────────────┤
│  FFmpeg Kit  │  React Native Video  │  React Native FS      │
├─────────────────────────────────────────────────────────────┤
│                     iOS LAYER                                │
├─────────────────────────────────────────────────────────────┤
│  AVFoundation  │  Photos Framework  │  Core Animation       │
└─────────────────────────────────────────────────────────────┘

## 3.2 Dependencies

### Core Dependencies

```json
{
  "dependencies": {
    "react": "18.2.0",
    "react-native": "0.73.x",
    "react-native-reanimated": "^3.6.0",
    "@shopify/react-native-skia": "^0.1.221",
    "react-native-gesture-handler": "^2.14.0",
    "react-native-screens": "^3.29.0",
    "@react-navigation/native": "^6.1.9",
    "@react-navigation/native-stack": "^6.9.17",
    "@react-navigation/bottom-tabs": "^6.5.11",
    "react-native-vector-icons": "^10.0.3",
    "react-native-svg": "^14.1.0",
    "react-native-video": "^6.0.0-beta.8",
    "ffmpeg-kit-react-native": "^6.0.2",
    "react-native-fs": "^2.20.0",
    "react-native-image-picker": "^7.1.0",
    "react-native-mmkv": "^2.11.0",
    "zustand": "^4.4.7",
    "@tanstack/react-query": "^5.17.0",
    "react-native-safe-area-context": "^4.8.2",
    "react-native-haptic-feedback": "^2.2.0",
    "react-native-fast-image": "^8.6.3",
    "lottie-react-native": "^6.5.0",
    "react-native-linear-gradient": "^2.8.3"
  }
}
```

## 3.3 Project Structure

```
shrynk/
├── src/
│   ├── app/
│   │   ├── App.tsx
│   │   ├── navigation/
│   │   │   ├── RootNavigator.tsx
│   │   │   ├── TabNavigator.tsx
│   │   │   ├── StackNavigator.tsx
│   │   │   └── types.ts
│   │   └── providers/
│   │       ├── AppProvider.tsx
│   │       ├── ThemeProvider.tsx
│   │       └── GestureProvider.tsx
│   ├── screens/
│   │   ├── splash/
│   │   │   ├── SplashScreen.tsx
│   │   │   ├── animations/
│   │   │   │   ├── LogoPhysicsAnimation.tsx
│   │   │   │   └── TextTwistAnimation.tsx
│   │   │   └── hooks/
│   │   │       └── useSplashAnimation.ts
│   │   ├── home/
│   │   │   ├── HomeScreen.tsx
│   │   │   ├── components/
│   │   │   │   ├── VideoGrid.tsx
│   │   │   │   ├── QuickActions.tsx
│   │   │   │   ├── RecentCompressions.tsx
│   │   │   │   └── StatisticsCard.tsx
│   │   │   └── hooks/
│   │   │       └── useHomeData.ts
│   │   ├── import/
│   │   │   ├── ImportScreen.tsx
│   │   │   ├── components/
│   │   │   │   ├── GalleryPicker.tsx
│   │   │   │   ├── FilesPicker.tsx
│   │   │   │   └── ImportProgress.tsx
│   │   │   └── hooks/
│   │   │       └── useVideoImport.ts
│   │   ├── compression/
│   │   │   ├── CompressionScreen.tsx
│   │   │   ├── components/
│   │   │   │   ├── VideoPreview.tsx
│   │   │   │   ├── CompressionSlider.tsx
│   │   │   │   ├── PresetSelector.tsx
│   │   │   │   ├── QualityComparison.tsx
│   │   │   │   └── ProcessingOverlay.tsx
│   │   │   └── hooks/
│   │   │       ├── useCompressionEngine.ts
│   │   │       └── useVideoMetadata.ts
│   │   ├── preview/
│   │   │   ├── PreviewScreen.tsx
│   │   │   ├── components/
│   │   │   │   ├── ComparisonSlider.tsx
│   │   │   │   ├── VideoPlayer.tsx
│   │   │   │   └── MetadataPanel.tsx
│   │   │   └── hooks/
│   │   │       └── useVideoComparison.ts
│   │   ├── trimming/
│   │   │   ├── TrimmingScreen.tsx
│   │   │   ├── components/
│   │   │   │   ├── Timeline.tsx
│   │   │   │   ├── TrimHandles.tsx
│   │   │   │   ├── FramePreview.tsx
│   │   │   │   └── PlaybackControls.tsx
│   │   │   └── hooks/
│   │   │       └── useVideoTrimming.ts
│   │   ├── export/
│   │   │   ├── ExportScreen.tsx
│   │   │   ├── components/
│   │   │   │   ├── ExportOptions.tsx
│   │   │   │   ├── DestinationPicker.tsx
│   │   │   │   └── ExportProgress.tsx
│   │   │   └── hooks/
│   │   │       └── useExport.ts
│   │   ├── history/
│   │   │   ├── HistoryScreen.tsx
│   │   │   ├── components/
│   │   │   │   ├── HistoryList.tsx
│   │   │   │   ├── HistoryItem.tsx
│   │   │   │   └── FilterBar.tsx
│   │   │   └── hooks/
│   │   │       └── useHistory.ts
│   │   ├── settings/
│   │   │   ├── SettingsScreen.tsx
│   │   │   ├── components/
│   │   │   │   ├── SettingsSection.tsx
│   │   │   │   ├── SettingsRow.tsx
│   │   │   │   └── PresetManager.tsx
│   │   │   └── hooks/
│   │   │       └── useSettings.ts
│   │   └── batch/
│   │       ├── BatchScreen.tsx
│   │       ├── components/
│   │       │   ├── BatchQueue.tsx
│   │       │   ├── BatchItem.tsx
│   │       │   └── BatchControls.tsx
│   │       └── hooks/
│   │           └── useBatchProcessing.ts
│   ├── components/
│   │   ├── common/
│   │   │   ├── Button/
│   │   │   │   ├── Button.tsx
│   │   │   │   ├── IconButton.tsx
│   │   │   │   └── FloatingButton.tsx
│   │   │   ├── Card/
│   │   │   │   ├── Card.tsx
│   │   │   │   └── SwipeableCard.tsx
│   │   │   ├── Input/
│   │   │   │   ├── TextInput.tsx
│   │   │   │   ├── Slider.tsx
│   │   │   │   └── SegmentedControl.tsx
│   │   │   ├── Modal/
│   │   │   │   ├── BottomSheet.tsx
│   │   │   │   ├── ActionSheet.tsx
│   │   │   │   └── AlertModal.tsx
│   │   │   ├── Progress/
│   │   │   │   ├── ProgressBar.tsx
│   │   │   │   ├── CircularProgress.tsx
│   │   │   │   └── SkeletonLoader.tsx
│   │   │   ├── List/
│   │   │   │   ├── SwipeableList.tsx
│   │   │   │   ├── SwipeableRow.tsx
│   │   │   │   └── SectionList.tsx
│   │   │   └── Typography/
│   │   │       ├── Text.tsx
│   │   │       └── Heading.tsx
│   │   ├── animated/
│   │   │   ├── AnimatedIcon.tsx
│   │   │   ├── AnimatedCard.tsx
│   │   │   ├── AnimatedProgress.tsx
│   │   │   ├── ParticleSystem.tsx
│   │   │   ├── MorphingShape.tsx
│   │   │   └── PulsingDot.tsx
│   │   ├── skia/
│   │   │   ├── SkiaLogo.tsx
│   │   │   ├── SkiaProgress.tsx
│   │   │   ├── SkiaWaveform.tsx
│   │   │   ├── SkiaParticles.tsx
│   │   │   ├── SkiaGradientBackground.tsx
│   │   │   └── SkiaBlurOverlay.tsx
│   │   ├── video/
│   │   │   ├── VideoThumbnail.tsx
│   │   │   ├── VideoPlayer.tsx
│   │   │   ├── VideoTimeline.tsx
│   │   │   └── VideoMetrics.tsx
│   │   └── layout/
│   │       ├── SafeContainer.tsx
│   │       ├── Header.tsx
│   │       ├── TabBar.tsx
│   │       └── GestureContainer.tsx
│   ├── hooks/
│   │   ├── useAnimation.ts
│   │   ├── useGesture.ts
│   │   ├── useHaptic.ts
│   │   ├── useOrientation.ts
│   │   ├── useKeyboard.ts
│   │   └── usePermissions.ts
│   ├── services/
│   │   ├── compression/
│   │   │   ├── CompressionService.ts
│   │   │   ├── FFmpegCommands.ts
│   │   │   ├── PresetManager.ts
│   │   │   └── QualityCalculator.ts
│   │   ├── storage/
│   │   │   ├── StorageService.ts
│   │   │   ├── FileManager.ts
│   │   │   └── CacheManager.ts
│   │   ├── video/
│   │   │   ├── VideoService.ts
│   │   │   ├── MetadataExtractor.ts
│   │   │   └── ThumbnailGenerator.ts
│   │   └── analytics/
│   │       └── OfflineAnalytics.ts
│   ├── store/
│   │   ├── useAppStore.ts
│   │   ├── useCompressionStore.ts
│   │   ├── useHistoryStore.ts
│   │   ├── useSettingsStore.ts
│   │   └── slices/
│   │       ├── compressionSlice.ts
│   │       ├── historySlice.ts
│   │       └── settingsSlice.ts
│   ├── theme/
│   │   ├── colors.ts
│   │   ├── typography.ts
│   │   ├── spacing.ts
│   │   ├── shadows.ts
│   │   ├── animations.ts
│   │   └── index.ts
│   ├── utils/
│   │   ├── formatters.ts
│   │   ├── validators.ts
│   │   ├── helpers.ts
│   │   └── constants.ts
│   └── types/
│       ├── video.ts
│       ├── compression.ts
│       ├── navigation.ts
│       └── common.ts
├── ios/
│   ├── Shrynk/
│   │   ├── AppDelegate.mm
│   │   ├── Info.plist
│   │   └── LaunchScreen.storyboard
│   └── Podfile
├── assets/
│   ├── fonts/
│   ├── icons/
│   └── animations/
└── __tests__/
```

---

# 4. Design System

## 4.1 Color Palette

### Primary Colors

```typescript
const colors = {
  primary: {
    50: '#E8F5FE',
    100: '#C5E4FC',
    200: '#9DD1FA',
    300: '#75BEF8',
    400: '#57AFF6',
    500: '#3AA0F4', // Main primary
    600: '#3490E0',
    700: '#2C7CC7',
    800: '#2568AE',
    900: '#184785',
  },
  
  secondary: {
    50: '#F5F0FF',
    100: '#E8DEFF',
    200: '#D4C4FF',
    300: '#BDA6FF',
    400: '#A98EFF',
    500: '#9575FF', // Main secondary
    600: '#7C5CE5',
    700: '#6344CC',
    800: '#4D2FB3',
    900: '#371B99',
  },

  accent: {
    mint: '#00D9A5',
    coral: '#FF6B6B',
    amber: '#FFB547',
    violet: '#8B5CF6',
  },

  neutral: {
    0: '#FFFFFF',
    50: '#F9FAFB',
    100: '#F3F4F6',
    200: '#E5E7EB',
    300: '#D1D5DB',
    400: '#9CA3AF',
    500: '#6B7280',
    600: '#4B5563',
    700: '#374151',
    800: '#1F2937',
    900: '#111827',
    1000: '#030712',
  },

  semantic: {
    success: '#10B981',
    warning: '#F59E0B',
    error: '#EF4444',
    info: '#3B82F6',
  },

  gradients: {
    primary: ['#3AA0F4', '#9575FF'],
    success: ['#10B981', '#34D399'],
    premium: ['#8B5CF6', '#EC4899'],
    dark: ['#1F2937', '#111827'],
    glass: ['rgba(255,255,255,0.1)', 'rgba(255,255,255,0.05)'],
  },
};
```

### Dark Mode Colors

```typescript
const darkColors = {
  background: {
    primary: '#0A0A0B',
    secondary: '#141416',
    tertiary: '#1C1C1F',
    elevated: '#242428',
  },
  surface: {
    primary: '#1C1C1F',
    secondary: '#242428',
    tertiary: '#2C2C30',
  },
  text: {
    primary: '#FFFFFF',
    secondary: '#A1A1AA',
    tertiary: '#71717A',
    disabled: '#52525B',
  },
  border: {
    subtle: '#27272A',
    default: '#3F3F46',
    strong: '#52525B',
  },
};
```

## 4.2 Typography

### Font Family

```typescript
const typography = {
  fontFamily: {
    regular: 'SF Pro Text',
    medium: 'SF Pro Text Medium',
    semibold: 'SF Pro Text Semibold',
    bold: 'SF Pro Text Bold',
    display: 'SF Pro Display',
    displayBold: 'SF Pro Display Bold',
    mono: 'SF Mono',
  },
  
  fontSize: {
    xs: 11,
    sm: 13,
    base: 15,
    md: 17,
    lg: 20,
    xl: 24,
    '2xl': 28,
    '3xl': 34,
    '4xl': 40,
    '5xl': 48,
  },
  
  lineHeight: {
    tight: 1.1,
    snug: 1.25,
    normal: 1.5,
    relaxed: 1.625,
    loose: 2,
  },
  
  letterSpacing: {
    tighter: -0.8,
    tight: -0.4,
    normal: 0,
    wide: 0.4,
    wider: 0.8,
  },
};
```

### Text Styles

```typescript
const textStyles = {
  // Display styles
  displayLarge: {
    fontFamily: typography.fontFamily.displayBold,
    fontSize: typography.fontSize['5xl'],
    lineHeight: typography.fontSize['5xl'] * typography.lineHeight.tight,
    letterSpacing: typography.letterSpacing.tighter,
  },
  displayMedium: {
    fontFamily: typography.fontFamily.displayBold,
    fontSize: typography.fontSize['4xl'],
    lineHeight: typography.fontSize['4xl'] * typography.lineHeight.tight,
    letterSpacing: typography.letterSpacing.tight,
  },
  displaySmall: {
    fontFamily: typography.fontFamily.display,
    fontSize: typography.fontSize['3xl'],
    lineHeight: typography.fontSize['3xl'] * typography.lineHeight.snug,
    letterSpacing: typography.letterSpacing.tight,
  },
  
  // Heading styles
  headingLarge: {
    fontFamily: typography.fontFamily.bold,
    fontSize: typography.fontSize['2xl'],
    lineHeight: typography.fontSize['2xl'] * typography.lineHeight.snug,
  },
  headingMedium: {
    fontFamily: typography.fontFamily.semibold,
    fontSize: typography.fontSize.xl,
    lineHeight: typography.fontSize.xl * typography.lineHeight.snug,
  },
  headingSmall: {
    fontFamily: typography.fontFamily.semibold,
    fontSize: typography.fontSize.lg,
    lineHeight: typography.fontSize.lg * typography.lineHeight.snug,
  },
  
  // Body styles
  bodyLarge: {
    fontFamily: typography.fontFamily.regular,
    fontSize: typography.fontSize.md,
    lineHeight: typography.fontSize.md * typography.lineHeight.normal,
  },
  bodyMedium: {
    fontFamily: typography.fontFamily.regular,
    fontSize: typography.fontSize.base,
    lineHeight: typography.fontSize.base * typography.lineHeight.normal,
  },
  bodySmall: {
    fontFamily: typography.fontFamily.regular,
    fontSize: typography.fontSize.sm,
    lineHeight: typography.fontSize.sm * typography.lineHeight.normal,
  },
  
  // Label styles
  labelLarge: {
    fontFamily: typography.fontFamily.medium,
    fontSize: typography.fontSize.base,
    lineHeight: typography.fontSize.base * typography.lineHeight.tight,
  },
  labelMedium: {
    fontFamily: typography.fontFamily.medium,
    fontSize: typography.fontSize.sm,
    lineHeight: typography.fontSize.sm * typography.lineHeight.tight,
  },
  labelSmall: {
    fontFamily: typography.fontFamily.medium,
    fontSize: typography.fontSize.xs,
    lineHeight: typography.fontSize.xs * typography.lineHeight.tight,
    letterSpacing: typography.letterSpacing.wide,
    textTransform: 'uppercase',
  },
  
  // Caption styles
  caption: {
    fontFamily: typography.fontFamily.regular,
    fontSize: typography.fontSize.xs,
    lineHeight: typography.fontSize.xs * typography.lineHeight.normal,
  },
  
  // Mono styles
  mono: {
    fontFamily: typography.fontFamily.mono,
    fontSize: typography.fontSize.sm,
    lineHeight: typography.fontSize.sm * typography.lineHeight.normal,
  },
};
```

## 4.3 Spacing System

```typescript
const spacing = {
  0: 0,
  px: 1,
  0.5: 2,
  1: 4,
  1.5: 6,
  2: 8,
  2.5: 10,
  3: 12,
  3.5: 14,
  4: 16,
  5: 20,
  6: 24,
  7: 28,
  8: 32,
  9: 36,
  10: 40,
  11: 44,
  12: 48,
  14: 56,
  16: 64,
  20: 80,
  24: 96,
  28: 112,
  32: 128,
};

const layout = {
  screenPadding: spacing[4],
  cardPadding: spacing[4],
  sectionGap: spacing[6],
  itemGap: spacing[3],
  buttonHeight: spacing[12],
  inputHeight: spacing[12],
  iconSize: {
    xs: 16,
    sm: 20,
    md: 24,
    lg: 28,
    xl: 32,
  },
  borderRadius: {
    none: 0,
    sm: 4,
    md: 8,
    lg: 12,
    xl: 16,
    '2xl': 20,
    '3xl': 24,
    full: 9999,
  },
};
```

## 4.4 Shadows

```typescript
const shadows = {
  none: {
    shadowColor: 'transparent',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0,
    shadowRadius: 0,
    elevation: 0,
  },
  sm: {
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  md: {
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  lg: {
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 5,
  },
  xl: {
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 16,
    elevation: 8,
  },
  '2xl': {
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.25,
    shadowRadius: 24,
    elevation: 12,
  },
  glow: {
    shadowColor: '#3AA0F4',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.4,
    shadowRadius: 20,
    elevation: 0,
  },
};
```

## 4.5 Icon System

All icons are sourced from `react-native-vector-icons` using the following icon sets:

```typescript
const iconSets = {
  primary: 'Feather',
  secondary: 'MaterialCommunityIcons',
  system: 'Ionicons',
  utility: 'FontAwesome5',
};

const icons = {
  // Navigation
  home: { set: 'Feather', name: 'home' },
  history: { set: 'Feather', name: 'clock' },
  settings: { set: 'Feather', name: 'settings' },
  back: { set: 'Feather', name: 'chevron-left' },
  close: { set: 'Feather', name: 'x' },
  menu: { set: 'Feather', name: 'menu' },
  
  // Actions
  compress: { set: 'MaterialCommunityIcons', name: 'arrow-collapse-all' },
  import: { set: 'Feather', name: 'plus' },
  export: { set: 'Feather', name: 'share' },
  delete: { set: 'Feather', name: 'trash-2' },
  edit: { set: 'Feather', name: 'edit-2' },
  save: { set: 'Feather', name: 'save' },
  copy: { set: 'Feather', name: 'copy' },
  
  // Video
  play: { set: 'Feather', name: 'play' },
  pause: { set: 'Feather', name: 'pause' },
  stop: { set: 'Feather', name: 'square' },
  trim: { set: 'MaterialCommunityIcons', name: 'content-cut' },
  video: { set: 'Feather', name: 'video' },
  film: { set: 'Feather', name: 'film' },
  
  // File
  folder: { set: 'Feather', name: 'folder' },
  file: { set: 'Feather', name: 'file' },
  download: { set: 'Feather', name: 'download' },
  upload: { set: 'Feather', name: 'upload' },
  gallery: { set: 'Feather', name: 'image' },
  
  // UI Elements
  check: { set: 'Feather', name: 'check' },
  checkCircle: { set: 'Feather', name: 'check-circle' },
  info: { set: 'Feather', name: 'info' },
  warning: { set: 'Feather', name: 'alert-triangle' },
  error: { set: 'Feather', name: 'alert-circle' },
  chevronRight: { set: 'Feather', name: 'chevron-right' },
  chevronDown: { set: 'Feather', name: 'chevron-down' },
  chevronUp: { set: 'Feather', name: 'chevron-up' },
  more: { set: 'Feather', name: 'more-horizontal' },
  moreVertical: { set: 'Feather', name: 'more-vertical' },
  
  // Quality
  highQuality: { set: 'MaterialCommunityIcons', name: 'quality-high' },
  lowQuality: { set: 'MaterialCommunityIcons', name: 'quality-low' },
  settings2: { set: 'Feather', name: 'sliders' },
  
  // Status
  loading: { set: 'Feather', name: 'loader' },
  success: { set: 'Feather', name: 'check-circle' },
  processing: { set: 'MaterialCommunityIcons', name: 'progress-clock' },
  
  // Misc
  star: { set: 'Feather', name: 'star' },
  heart: { set: 'Feather', name: 'heart' },
  search: { set: 'Feather', name: 'search' },
  filter: { set: 'Feather', name: 'filter' },
  sort: { set: 'MaterialCommunityIcons', name: 'sort' },
  refresh: { set: 'Feather', name: 'refresh-cw' },
  sync: { set: 'Feather', name: 'refresh-ccw' },
  zap: { set: 'Feather', name: 'zap' },
  layers: { set: 'Feather', name: 'layers' },
  maximize: { set: 'Feather', name: 'maximize-2' },
  minimize: { set: 'Feather', name: 'minimize-2' },
};
```

---

# 5. Animation Specifications

## 5.1 Animation Principles

All animations follow these core principles:
- **Physics-based**: Natural movement with spring physics
- **Purposeful**: Every animation serves a functional purpose
- **Performant**: Run at 60fps using native driver
- **Interruptible**: Can be interrupted by user interaction
- **Consistent**: Follow established timing and easing patterns

## 5.2 Animation Constants

```typescript
const animationConfig = {
  // Spring configurations
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
  
  // Timing configurations
  timing: {
    instant: 100,
    fast: 200,
    normal: 300,
    slow: 500,
    slower: 800,
    slowest: 1200,
  },
  
  // Easing functions
  easing: {
    easeInOut: Easing.bezier(0.4, 0, 0.2, 1),
    easeOut: Easing.bezier(0, 0, 0.2, 1),
    easeIn: Easing.bezier(0.4, 0, 1, 1),
    overshoot: Easing.bezier(0.34, 1.56, 0.64, 1),
    anticipate: Easing.bezier(0.36, 0, 0.66, -0.56),
  },
};
```

## 5.3 Splash Screen Animation

### Physics-Based Logo Breakdown Animation

The splash screen features a dramatic physics-based animation where the Shrynk logo explodes into particles and reassembles.

```typescript
// SplashScreen.tsx
interface LogoParticle {
  id: number;
  initialX: number;
  initialY: number;
  targetX: number;
  targetY: number;
  rotation: number;
  scale: number;
  color: string;
  delay: number;
}

const LogoPhysicsAnimation: React.FC = () => {
  // Animation phases
  // Phase 1: Logo appears solid (0-500ms)
  // Phase 2: Logo explodes into particles (500-1000ms)
  // Phase 3: Particles float with gravity (1000-2000ms)
  // Phase 4: Particles attract back to form logo (2000-2800ms)
  // Phase 5: Logo solidifies with glow effect (2800-3200ms)
  
  const progress = useSharedValue(0);
  const particles = useMemo(() => generateLogoParticles(64), []);
  
  // Skia canvas implementation
  return (
    <Canvas style={styles.canvas}>
      <Group>
        {particles.map((particle, index) => (
          <LogoParticle
            key={particle.id}
            particle={particle}
            progress={progress}
          />
        ))}
        <GlowEffect progress={progress} />
      </Group>
    </Canvas>
  );
};
```

### Skia Logo Particle Component

```typescript
// LogoParticle.tsx using React Native Skia
const LogoParticle: React.FC<Props> = ({ particle, progress }) => {
  const { initialX, initialY, targetX, targetY, color, delay } = particle;
  
  // Calculate particle position based on animation phase
  const transform = useDerivedValue(() => {
    const p = progress.value;
    
    if (p < 0.15) {
      // Phase 1: Static
      return {
        x: initialX,
        y: initialY,
        scale: 1,
        rotation: 0,
        opacity: 1,
      };
    } else if (p < 0.35) {
      // Phase 2: Explosion
      const explosionProgress = (p - 0.15) / 0.2;
      const eased = Easing.bezier(0.34, 1.56, 0.64, 1)(explosionProgress);
      return {
        x: initialX + (targetX - initialX) * eased,
        y: initialY + (targetY - initialY) * eased,
        scale: 1 + eased * 0.3,
        rotation: eased * particle.rotation,
        opacity: 1,
      };
    } else if (p < 0.65) {
      // Phase 3: Float with gravity
      const floatProgress = (p - 0.35) / 0.3;
      const gravityOffset = Math.sin(floatProgress * Math.PI) * 20;
      return {
        x: targetX + Math.sin(floatProgress * Math.PI * 2) * 10,
        y: targetY + gravityOffset,
        scale: 1.3 - floatProgress * 0.1,
        rotation: particle.rotation + floatProgress * 45,
        opacity: 1,
      };
    } else if (p < 0.9) {
      // Phase 4: Reassemble
      const assembleProgress = (p - 0.65) / 0.25;
      const eased = Easing.bezier(0.4, 0, 0.2, 1)(assembleProgress);
      return {
        x: targetX + (initialX - targetX) * eased,
        y: targetY + (initialY - targetY) * eased,
        scale: 1.2 - eased * 0.2,
        rotation: particle.rotation * (1 - eased),
        opacity: 1,
      };
    } else {
      // Phase 5: Final glow
      const glowProgress = (p - 0.9) / 0.1;
      return {
        x: initialX,
        y: initialY,
        scale: 1 + Math.sin(glowProgress * Math.PI) * 0.05,
        rotation: 0,
        opacity: 1,
      };
    }
  });
  
  return (
    <Group transform={[
      { translateX: transform.value.x },
      { translateY: transform.value.y },
      { rotate: transform.value.rotation },
      { scale: transform.value.scale },
    ]}>
      <RoundedRect
        x={-4}
        y={-4}
        width={8}
        height={8}
        r={2}
        color={color}
        opacity={transform.value.opacity}
      />
      <Shadow
        dx={0}
        dy={0}
        blur={8}
        color={color}
        opacity={transform.value.opacity * 0.5}
      />
    </Group>
  );
};
```

### Alternative: Text Twist Animation

```typescript
// TextTwistAnimation.tsx
const TextTwistAnimation: React.FC = () => {
  const rotationX = useSharedValue(0);
  const rotationY = useSharedValue(0);
  const scale = useSharedValue(0.5);
  const blur = useSharedValue(10);
  const characters = 'SHRYNK'.split('');
  
  // Animation sequence
  useEffect(() => {
    // Phase 1: Rapid twist from 3D space (0-600ms)
    rotationX.value = withSequence(
      withTiming(720, { duration: 600, easing: Easing.bezier(0.4, 0, 0.2, 1) }),
    );
    rotationY.value = withSequence(
      withTiming(1080, { duration: 800, easing: Easing.bezier(0.4, 0, 0.2, 1) }),
    );
    
    // Phase 2: Scale up with bounce
    scale.value = withSequence(
      withSpring(1.2, { damping: 8, stiffness: 200 }),
      withSpring(1, { damping: 15, stiffness: 300 }),
    );
    
    // Phase 3: Focus (blur to clear)
    blur.value = withTiming(0, { duration: 400, easing: Easing.out(Easing.cubic) });
  }, []);
  
  return (
    <Canvas style={styles.canvas}>
      <Group
        transform={[
          { perspective: 1000 },
          { rotateX: rotationX },
          { rotateY: rotationY },
          { scale: scale },
        ]}
      >
        {characters.map((char, index) => (
          <TwistingCharacter
            key={index}
            character={char}
            index={index}
            total={characters.length}
            blur={blur}
          />
        ))}
      </Group>
    </Canvas>
  );
};

const TwistingCharacter: React.FC<Props> = ({ character, index, total, blur }) => {
  const charRotation = useSharedValue(0);
  const charScale = useSharedValue(0);
  const charOpacity = useSharedValue(0);
  
  const delay = index * 80;
  
  useEffect(() => {
    charRotation.value = withDelay(delay,
      withSpring(0, { damping: 12, stiffness: 150 })
    );
    charScale.value = withDelay(delay,
      withSpring(1, { damping: 10, stiffness: 200 })
    );
    charOpacity.value = withDelay(delay,
      withTiming(1, { duration: 200 })
    );
  }, []);
  
  const xOffset = (index - (total - 1) / 2) * 40;
  
  return (
    <Group
      transform={[
        { translateX: xOffset },
        { rotateZ: charRotation },
        { scale: charScale },
      ]}
    >
      <Text
        text={character}
        x={0}
        y={0}
        font={font}
        color={colors.primary[500]}
        opacity={charOpacity}
      />
      <Blur blur={blur} />
    </Group>
  );
};
```

### Full Splash Screen Implementation

```typescript
// SplashScreen.tsx
const SplashScreen: React.FC = () => {
  const [animationPhase, setAnimationPhase] = useState<
    'logo' | 'tagline' | 'transition'
  >('logo');
  
  const backgroundOpacity = useSharedValue(1);
  const contentScale = useSharedValue(1);
  const contentY = useSharedValue(0);
  
  // Animated gradient background
  const gradientColors = useDerivedValue(() => {
    return [
      interpolateColor(
        backgroundOpacity.value,
        [0, 1],
        [colors.background.primary, colors.primary[900]]
      ),
      interpolateColor(
        backgroundOpacity.value,
        [0, 1],
        [colors.background.secondary, colors.primary[800]]
      ),
    ];
  });
  
  const handleAnimationComplete = useCallback(() => {
    if (animationPhase === 'logo') {
      setAnimationPhase('tagline');
    } else if (animationPhase === 'tagline') {
      // Transition to main app
      contentScale.value = withTiming(0.9, { duration: 300 });
      contentY.value = withTiming(-50, { duration: 300 });
      backgroundOpacity.value = withTiming(0, { duration: 500 }, () => {
        runOnJS(navigateToHome)();
      });
    }
  }, [animationPhase]);
  
  return (
    <View style={styles.container}>
      {/* Animated Gradient Background */}
      <Canvas style={StyleSheet.absoluteFill}>
        <Rect x={0} y={0} width={width} height={height}>
          <LinearGradient
            start={vec(0, 0)}
            end={vec(width, height)}
            colors={gradientColors.value}
          />
        </Rect>
        
        {/* Floating particles background effect */}
        <ParticleField
          count={30}
          color={colors.primary[400]}
          opacity={0.3}
        />
      </Canvas>
      
      {/* Main content */}
      <Animated.View
        style={[
          styles.content,
          useAnimatedStyle(() => ({
            transform: [
              { scale: contentScale.value },
              { translateY: contentY.value },
            ],
          })),
        ]}
      >
        {animationPhase === 'logo' && (
          <LogoPhysicsAnimation
            onComplete={() => handleAnimationComplete()}
          />
        )}
        
        {animationPhase === 'tagline' && (
          <TaglineAnimation
            text="Compress with Confidence"
            onComplete={() => handleAnimationComplete()}
          />
        )}
      </Animated.View>
      
      {/* Loading indicator */}
      <Animated.View style={styles.loadingContainer}>
        <SkiaProgressRing progress={loadProgress} />
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
  canvas: {
    ...StyleSheet.absoluteFillObject,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingContainer: {
    position: 'absolute',
    bottom: 80,
  },
});
```

## 5.4 Micro-Interactions

### Button Press Animation

```typescript
const AnimatedButton: React.FC<Props> = ({ onPress, children, variant }) => {
  const scale = useSharedValue(1);
  const shadowRadius = useSharedValue(8);
  const brightness = useSharedValue(1);
  
  const gesture = Gesture.Tap()
    .onBegin(() => {
      scale.value = withSpring(0.96, animationConfig.springs.snappy);
      shadowRadius.value = withTiming(4, { duration: 100 });
      brightness.value = withTiming(0.9, { duration: 100 });
      runOnJS(triggerHaptic)('impactLight');
    })
    .onFinalize((_, success) => {
      scale.value = withSpring(1, animationConfig.springs.bouncy);
      shadowRadius.value = withTiming(8, { duration: 200 });
      brightness.value = withTiming(1, { duration: 200 });
      if (success) {
        runOnJS(onPress)();
      }
    });
  
  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
    shadowRadius: shadowRadius.value,
    opacity: brightness.value,
  }));
  
  return (
    <GestureDetector gesture={gesture}>
      <Animated.View style={[styles.button, animatedStyle]}>
        {children}
      </Animated.View>
    </GestureDetector>
  );
};
```

### Card Hover/Press Effect

```typescript
const AnimatedCard: React.FC<Props> = ({ children, onPress }) => {
  const pressed = useSharedValue(false);
  const scale = useSharedValue(1);
  const translateY = useSharedValue(0);
  const shadowOpacity = useSharedValue(0.1);
  
  const gesture = Gesture.Tap()
    .onBegin(() => {
      pressed.value = true;
      scale.value = withSpring(0.98, animationConfig.springs.responsive);
      translateY.value = withSpring(2, animationConfig.springs.responsive);
      shadowOpacity.value = withTiming(0.05, { duration: 100 });
    })
    .onFinalize((_, success) => {
      pressed.value = false;
      scale.value = withSpring(1, animationConfig.springs.bouncy);
      translateY.value = withSpring(0, animationConfig.springs.bouncy);
      shadowOpacity.value = withTiming(0.1, { duration: 200 });
      if (success) {
        runOnJS(onPress)();
      }
    });
  
  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      { scale: scale.value },
      { translateY: translateY.value },
    ],
    shadowOpacity: shadowOpacity.value,
  }));
  
  return (
    <GestureDetector gesture={gesture}>
      <Animated.View style={[styles.card, animatedStyle]}>
        {children}
      </Animated.View>
    </GestureDetector>
  );
};
```

### Progress Animation with Skia

```typescript
// SkiaProgressRing.tsx
const SkiaProgressRing: React.FC<Props> = ({ progress, size = 120, strokeWidth = 8 }) => {
  const animatedProgress = useSharedValue(0);
  const rotation = useSharedValue(0);
  
  useEffect(() => {
    animatedProgress.value = withSpring(progress, animationConfig.springs.gentle);
    rotation.value = withRepeat(
      withTiming(360, { duration: 2000, easing: Easing.linear }),
      -1,
      false
    );
  }, [progress]);
  
  const center = size / 2;
  const radius = (size - strokeWidth) / 2;
  
  // Create arc path
  const arcPath = useDerivedValue(() => {
    const path = Skia.Path.Make();
    const sweepAngle = animatedProgress.value * 360;
    
    path.addArc(
      { x: strokeWidth / 2, y: strokeWidth / 2, width: size - strokeWidth, height: size - strokeWidth },
      -90,
      sweepAngle
    );
    
    return path;
  });
  
  return (
    <Canvas style={{ width: size, height: size }}>
      {/* Background circle */}
      <Circle
        cx={center}
        cy={center}
        r={radius}
        color={colors.neutral[200]}
        style="stroke"
        strokeWidth={strokeWidth}
      />
      
      {/* Progress arc with gradient */}
      <Group transform={[{ rotate: rotation.value }]}>
        <Path
          path={arcPath}
          style="stroke"
          strokeWidth={strokeWidth}
          strokeCap="round"
        >
          <LinearGradient
            start={vec(0, 0)}
            end={vec(size, size)}
            colors={colors.gradients.primary}
          />
        </Path>
      </Group>
      
      {/* Glow effect */}
      <Group>
        <Path
          path={arcPath}
          style="stroke"
          strokeWidth={strokeWidth + 4}
          strokeCap="round"
        >
          <LinearGradient
            start={vec(0, 0)}
            end={vec(size, size)}
            colors={colors.gradients.primary}
          />
          <Blur blur={8} />
        </Path>
      </Group>
      
      {/* Percentage text */}
      <Text
        x={center}
        y={center + 8}
        text={`${Math.round(animatedProgress.value * 100)}%`}
        font={font}
        color={colors.text.primary}
        textAlign="center"
      />
    </Canvas>
  );
};
```

### Morphing Icon Animation

```typescript
const MorphingIcon: React.FC<Props> = ({ from, to, trigger }) => {
  const morphProgress = useSharedValue(0);
  
  useEffect(() => {
    morphProgress.value = withTiming(trigger ? 1 : 0, {
      duration: 300,
      easing: Easing.bezier(0.4, 0, 0.2, 1),
    });
  }, [trigger]);
  
  const animatedPath = useDerivedValue(() => {
    const fromPath = Skia.Path.MakeFromSVGString(iconPaths[from]);
    const toPath = Skia.Path.MakeFromSVGString(iconPaths[to]);
    
    if (!fromPath || !toPath) return null;
    
    return fromPath.interpolate(toPath, morphProgress.value);
  });
  
  return (
    <Canvas style={styles.iconCanvas}>
      <Path
        path={animatedPath}
        color={colors.primary[500]}
        style="fill"
      />
    </Canvas>
  );
};
```

## 5.5 Screen Transition Animations

### Stack Navigation Transitions

```typescript
const screenOptions: StackNavigationOptions = {
  animation: 'slide_from_right',
  customAnimationOnGesture: true,
  gestureEnabled: true,
  gestureDirection: 'horizontal',
  transitionSpec: {
    open: {
      animation: 'spring',
      config: {
        damping: 20,
        mass: 0.8,
        stiffness: 200,
        overshootClamping: false,
        restDisplacementThreshold: 0.01,
        restSpeedThreshold: 0.01,
      },
    },
    close: {
      animation: 'spring',
      config: {
        damping: 20,
        mass: 0.8,
        stiffness: 200,
        overshootClamping: false,
        restDisplacementThreshold: 0.01,
        restSpeedThreshold: 0.01,
      },
    },
  },
  cardStyleInterpolator: ({ current, next, layouts }) => {
    return {
      cardStyle: {
        transform: [
          {
            translateX: current.progress.interpolate({
              inputRange: [0, 1],
              outputRange: [layouts.screen.width, 0],
            }),
          },
          {
            scale: next
              ? next.progress.interpolate({
                  inputRange: [0, 1],
                  outputRange: [1, 0.95],
                })
              : 1,
          },
        ],
        opacity: current.progress.interpolate({
          inputRange: [0, 0.5, 1],
          outputRange: [0, 0.5, 1],
        }),
        shadowOpacity: current.progress.interpolate({
          inputRange: [0, 1],
          outputRange: [0, 0.3],
        }),
        shadowRadius: current.progress.interpolate({
          inputRange: [0, 1],
          outputRange: [0, 16],
        }),
      },
      overlayStyle: {
        opacity: current.progress.interpolate({
          inputRange: [0, 1],
          outputRange: [0, 0.15],
        }),
      },
    };
  },
};
```

### Modal Presentation Animation

```typescript
const modalTransition = {
  gestureDirection: 'vertical',
  cardStyleInterpolator: ({ current, layouts }) => ({
    cardStyle: {
      transform: [
        {
          translateY: current.progress.interpolate({
            inputRange: [0, 1],
            outputRange: [layouts.screen.height, 0],
          }),
        },
        {
          scale: current.progress.interpolate({
            inputRange: [0, 1],
            outputRange: [0.9, 1],
          }),
        },
      ],
      borderRadius: current.progress.interpolate({
        inputRange: [0, 0.5, 1],
        outputRange: [40, 24, 0],
      }),
      opacity: current.progress.interpolate({
        inputRange: [0, 0.5, 1],
        outputRange: [0, 0.9, 1],
      }),
    },
    overlayStyle: {
      opacity: current.progress.interpolate({
        inputRange: [0, 1],
        outputRange: [0, 0.5],
      }),
      backgroundColor: 'black',
    },
  }),
};
```

### Tab Bar Animation

```typescript
const AnimatedTabBar: React.FC<BottomTabBarProps> = ({ state, navigation }) => {
  const translateX = useSharedValue(0);
  const indicatorScale = useSharedValue(1);
  
  useEffect(() => {
    const tabWidth = SCREEN_WIDTH / state.routes.length;
    translateX.value = withSpring(
      state.index * tabWidth,
      animationConfig.springs.snappy
    );
    
    // Bounce indicator on tab change
    indicatorScale.value = withSequence(
      withTiming(1.2, { duration: 100 }),
      withSpring(1, animationConfig.springs.bouncy)
    );
  }, [state.index]);
  
  const indicatorStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: translateX.value + INDICATOR_OFFSET },
      { scale: indicatorScale.value },
    ],
  }));
  
  return (
    <View style={styles.tabBar}>
      {/* Animated indicator */}
      <Animated.View style={[styles.indicator, indicatorStyle]}>
        <LinearGradient
          colors={colors.gradients.primary}
          style={styles.indicatorGradient}
        />
      </Animated.View>
      
      {/* Tab items */}
      {state.routes.map((route, index) => (
        <AnimatedTabItem
          key={route.key}
          route={route}
          index={index}
          isFocused={state.index === index}
          onPress={() => navigation.navigate(route.name)}
        />
      ))}
    </View>
  );
};

const AnimatedTabItem: React.FC<Props> = ({ route, isFocused, onPress }) => {
  const scale = useSharedValue(1);
  const iconY = useSharedValue(0);
  const labelOpacity = useSharedValue(isFocused ? 1 : 0);
  
  useEffect(() => {
    if (isFocused) {
      scale.value = withSequence(
        withTiming(1.15, { duration: 100 }),
        withSpring(1.1, animationConfig.springs.bouncy)
      );
      iconY.value = withSpring(-4, animationConfig.springs.responsive);
      labelOpacity.value = withTiming(1, { duration: 200 });
    } else {
      scale.value = withSpring(1, animationConfig.springs.gentle);
      iconY.value = withSpring(0, animationConfig.springs.gentle);
      labelOpacity.value = withTiming(0, { duration: 150 });
    }
  }, [isFocused]);
  
  const containerStyle = useAnimatedStyle(() => ({
    transform: [
      { scale: scale.value },
      { translateY: iconY.value },
    ],
  }));
  
  const labelStyle = useAnimatedStyle(() => ({
    opacity: labelOpacity.value,
    transform: [
      {
        translateY: interpolate(labelOpacity.value, [0, 1], [10, 0]),
      },
    ],
  }));
  
  return (
    <Pressable onPress={onPress} style={styles.tabItem}>
      <Animated.View style={containerStyle}>
        <Icon
          name={tabIcons[route.name]}
          size={24}
          color={isFocused ? colors.primary[500] : colors.neutral[400]}
        />
      </Animated.View>
      <Animated.Text style={[styles.tabLabel, labelStyle]}>
        {route.name}
      </Animated.Text>
    </Pressable>
  );
};
```

## 5.6 List Animations

### Staggered List Entry

```typescript
const StaggeredList: React.FC<Props> = ({ data, renderItem }) => {
  return (
    <Animated.FlatList
      data={data}
      renderItem={({ item, index }) => (
        <StaggeredItem index={index}>
          {renderItem(item)}
        </StaggeredItem>
      )}
      entering={FadeIn}
      exiting={FadeOut}
    />
  );
};

const StaggeredItem: React.FC<{ index: number; children: ReactNode }> = ({
  index,
  children,
}) => {
  const delay = Math.min(index * 50, 400);
  
  return (
    <Animated.View
      entering={FadeInDown.delay(delay).springify().damping(15).stiffness(100)}
      exiting={FadeOutDown.duration(200)}
      layout={LinearTransition.springify()}
    >
      {children}
    </Animated.View>
  );
};
```

### Swipeable List Item

```typescript
const SwipeableRow: React.FC<Props> = ({ children, onDelete, onEdit }) => {
  const translateX = useSharedValue(0);
  const rowHeight = useSharedValue(80);
  const rowOpacity = useSharedValue(1);
  const isDeleting = useSharedValue(false);
  
  const SWIPE_THRESHOLD = 80;
  const DELETE_THRESHOLD = 150;
  
  const gesture = Gesture.Pan()
    .onUpdate((event) => {
      if (isDeleting.value) return;
      
      // Right swipe for edit
      if (event.translationX > 0) {
        translateX.value = Math.min(event.translationX * 0.7, SWIPE_THRESHOLD);
      }
      // Left swipe for delete
      else {
        translateX.value = Math.max(event.translationX, -DELETE_THRESHOLD);
      }
    })
    .onEnd((event) => {
      if (isDeleting.value) return;
      
      // Check for delete action
      if (translateX.value < -DELETE_THRESHOLD * 0.8) {
        isDeleting.value = true;
        translateX.value = withTiming(-SCREEN_WIDTH, { duration: 200 });
        rowHeight.value = withTiming(0, { duration: 200 });
        rowOpacity.value = withTiming(0, { duration: 150 }, () => {
          runOnJS(onDelete)();
        });
        runOnJS(triggerHaptic)('impactMedium');
      }
      // Check for edit action
      else if (translateX.value > SWIPE_THRESHOLD * 0.8) {
        translateX.value = withSpring(0, animationConfig.springs.responsive);
        runOnJS(onEdit)();
        runOnJS(triggerHaptic)('impactLight');
      }
      // Reset position
      else {
        translateX.value = withSpring(0, animationConfig.springs.responsive);
      }
    });
  
  const rowStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
    height: rowHeight.value,
    opacity: rowOpacity.value,
  }));
  
  const deleteActionStyle = useAnimatedStyle(() => ({
    opacity: interpolate(
      translateX.value,
      [-DELETE_THRESHOLD, -SWIPE_THRESHOLD, 0],
      [1, 0.5, 0]
    ),
    width: interpolate(
      translateX.value,
      [-DELETE_THRESHOLD, 0],
      [DELETE_THRESHOLD, 0],
      Extrapolation.CLAMP
    ),
  }));
  
  const editActionStyle = useAnimatedStyle(() => ({
    opacity: interpolate(
      translateX.value,
      [0, SWIPE_THRESHOLD / 2, SWIPE_THRESHOLD],
      [0, 0.5, 1]
    ),
    width: interpolate(
      translateX.value,
      [0, SWIPE_THRESHOLD],
      [0, SWIPE_THRESHOLD],
      Extrapolation.CLAMP
    ),
  }));
  
  return (
    <Animated.View style={[styles.rowContainer, rowStyle]}>
      {/* Left action (Edit) */}
      <Animated.View style={[styles.editAction, editActionStyle]}>
        <Icon name="edit-2" set="Feather" size={24} color="#FFFFFF" />
      </Animated.View>
      
      {/* Content */}
      <GestureDetector gesture={gesture}>
        <Animated.View style={styles.rowContent}>
          {children}
        </Animated.View>
      </GestureDetector>
      
      {/* Right action (Delete) */}
      <Animated.View style={[styles.deleteAction, deleteActionStyle]}>
        <Icon name="trash-2" set="Feather" size={24} color="#FFFFFF" />
      </Animated.View>
    </Animated.View>
  );
};
```

## 5.7 Compression Progress Animation

```typescript
const CompressionProgressOverlay: React.FC<Props> = ({ progress, status }) => {
  const circleProgress = useSharedValue(0);
  const pulseScale = useSharedValue(1);
  const particleSystem = useSharedValue<Particle[]>([]);
  
  useEffect(() => {
    circleProgress.value = withSpring(progress, animationConfig.springs.gentle);
    
    // Pulse animation during processing
    if (status === 'processing') {
      pulseScale.value = withRepeat(
        withSequence(
          withTiming(1.05, { duration: 1000, easing: Easing.inOut(Easing.sine) }),
          withTiming(1, { duration: 1000, easing: Easing.inOut(Easing.sine) })
        ),
        -1,
        true
      );
    }
  }, [progress, status]);
  
  return (
    <View style={styles.overlay}>
      <BlurView intensity={80} style={StyleSheet.absoluteFill} />
      
      <Canvas style={styles.canvas}>
        {/* Background gradient */}
        <Rect x={0} y={0} width={SCREEN_WIDTH} height={SCREEN_HEIGHT}>
          <RadialGradient
            c={vec(SCREEN_WIDTH / 2, SCREEN_HEIGHT / 2)}
            r={SCREEN_WIDTH}
            colors={['rgba(58, 160, 244, 0.1)', 'rgba(0, 0, 0, 0.8)']}
          />
        </Rect>
        
        {/* Particle effects */}
        <CompressionParticles progress={circleProgress} />
        
        {/* Main progress ring */}
        <Group
          transform={[
            { translateX: SCREEN_WIDTH / 2 },
            { translateY: SCREEN_HEIGHT / 2 - 50 },
            { scale: pulseScale },
          ]}
        >
          {/* Outer glow */}
          <Circle cx={0} cy={0} r={80}>
            <RadialGradient
              c={vec(0, 0)}
              r={100}
              colors={[`${colors.primary[500]}40`, 'transparent']}
            />
          </Circle>
          
          {/* Background ring */}
          <Circle
            cx={0}
            cy={0}
            r={60}
            style="stroke"
            strokeWidth={8}
            color={colors.neutral[800]}
          />
          
          {/* Progress arc */}
          <ProgressArc progress={circleProgress} radius={60} strokeWidth={8} />
          
          {/* Center icon */}
          <CompressIcon progress={circleProgress} />
        </Group>
        
        {/* Progress text */}
        <Group transform={[{ translateY: SCREEN_HEIGHT / 2 + 80 }]}>
          <Text
            x={SCREEN_WIDTH / 2}
            y={0}
            text={`${Math.round(circleProgress.value * 100)}%`}
            font={largeFont}
            color={colors.text.primary}
            textAlign="center"
          />
          <Text
            x={SCREEN_WIDTH / 2}
            y={40}
            text={statusText[status]}
            font={mediumFont}
            color={colors.text.secondary}
            textAlign="center"
          />
        </Group>
      </Canvas>
      
      {/* Cancel button */}
      <Animated.View style={styles.cancelButton}>
        <TouchableOpacity onPress={onCancel}>
          <Text style={styles.cancelText}>Cancel</Text>
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
};

const CompressionParticles: React.FC<{ progress: SharedValue<number> }> = ({
  progress,
}) => {
  const particles = useMemo(() => {
    return Array.from({ length: 50 }, (_, i) => ({
      id: i,
      angle: (i / 50) * Math.PI * 2,
      distance: 100 + Math.random() * 100,
      size: 2 + Math.random() * 4,
      speed: 0.5 + Math.random() * 1.5,
      phase: Math.random() * Math.PI * 2,
    }));
  }, []);
  
  return (
    <Group transform={[{ translateX: SCREEN_WIDTH / 2 }, { translateY: SCREEN_HEIGHT / 2 - 50 }]}>
      {particles.map((particle) => (
        <CompressionParticle
          key={particle.id}
          particle={particle}
          progress={progress}
        />
      ))}
    </Group>
  );
};

const CompressionParticle: React.FC<Props> = ({ particle, progress }) => {
  const transform = useDerivedValue(() => {
    const p = progress.value;
    const angle = particle.angle + p * Math.PI * particle.speed;
    const distance = particle.distance * (1 - p * 0.5);
    const size = particle.size * (1 + Math.sin(p * Math.PI * 4 + particle.phase) * 0.3);
    
    return {
      x: Math.cos(angle) * distance,
      y: Math.sin(angle) * distance,
      scale: size / 4,
      opacity: 0.3 + p * 0.4,
    };
  });
  
  return (
    <Circle
      cx={transform.value.x}
      cy={transform.value.y}
      r={transform.value.scale * 4}
      color={colors.primary[400]}
      opacity={transform.value.opacity}
    />
  );
};
```

---

# 6. Screen Specifications

## 6.1 Splash Screen

### Visual Design

┌────────────────────────────────┐
│                                │
│                                │
│                                │
│      ┌─────────────────┐       │
│      │                 │       │
│      │    [SHRYNK]     │       │  ← Logo with physics animation
│      │     LOGO        │       │
│      │                 │       │
│      └─────────────────┘       │
│                                │
│    "Compress with Confidence"  │  ← Tagline with fade-in
│                                │
│                                │
│         ◯──────────────        │  ← Skia progress ring
│                                │
│                                │
└────────────────────────────────┘

### Specifications

| Element | Specification |
|---------|---------------|
| Background | Animated gradient from `primary[900]` to `primary[800]` with floating particles |
| Logo Container | Centered, 200x200pt |
| Logo Animation | Physics-based particle explosion and reassembly (3.2s total) |
| Tagline Font | `displaySmall`, `neutral[0]` |
| Progress Ring | 48pt diameter, 4pt stroke, gradient primary |
| Particle Count | 30 ambient particles, 64 logo particles |

### Animation Timeline

| Phase | Time | Animation |
|-------|------|-----------|
| 1 | 0-500ms | Logo renders solid |
| 2 | 500-1000ms | Logo explodes into 64 particles with physics |
| 3 | 1000-2000ms | Particles float with simulated gravity |
| 4 | 2000-2800ms | Particles attract back using spring physics |
| 5 | 2800-3200ms | Logo solidifies with glow pulse |
| 6 | 3200-3600ms | Tagline fades in with typewriter effect |
| 7 | 3600ms+ | Progress ring appears, transitions to Home |

---

## 6.2 Home Screen

### Visual Design

┌────────────────────────────────┐
│ ◀ Shrynk                   ≡   │  ← Header
├────────────────────────────────┤
│                                │
│  ┌──────────────────────────┐  │
│  │   ╭──────────────────╮   │  │
│  │   │   SAVED SPACE    │   │  │  ← Statistics Card (Skia)
│  │   │     2.4 GB       │   │  │
│  │   │   ◉━━━━━━━━━━━◉  │   │  │  ← Animated progress ring
│  │   ╰──────────────────╯   │  │
│  └──────────────────────────┘  │
│                                │
│  Quick Actions                 │
│  ┌─────────┐ ┌─────────┐      │
│  │  [+]    │ │  [□□]   │      │  ← Import / Batch buttons
│  │ Import  │ │ Batch   │      │
│  └─────────┘ └─────────┘      │
│                                │
│  Recent                    →   │
│  ┌──────────────────────────┐  │
│  │ ┌────┐                   │  │
│  │ │░░░░│ vacation.mp4      │  │  ← SwipeableRow
│  │ │░░░░│ 245MB → 82MB      │  │
│  │ └────┘                   │  │
│  ├──────────────────────────┤  │
│  │ ┌────┐                   │  │
│  │ │░░░░│ birthday.mov      │  │
│  │ │░░░░│ 1.2GB → 340MB     │  │
│  │ └────┘                   │  │
│  └──────────────────────────┘  │
│                                │
├────────────────────────────────┤
│  ⌂      ↻      ⚙             │  ← Tab Bar
│ Home  History Settings        │
└────────────────────────────────┘

### Component Breakdown

#### Statistics Card

```typescript
interface StatisticsCardProps {
  totalSaved: number; // bytes
  compressionCount: number;
  averageRatio: number;
}

const StatisticsCard: React.FC<StatisticsCardProps> = (props) => {
  const { totalSaved, compressionCount, averageRatio } = props;
  const animatedSaved = useSharedValue(0);
  const ringProgress = useSharedValue(0);
  
  useEffect(() => {
    animatedSaved.value = withSpring(totalSaved, animationConfig.springs.gentle);
    ringProgress.value = withSpring(averageRatio, animationConfig.springs.gentle);
  }, [totalSaved, averageRatio]);
  
  return (
    <Animated.View
      entering={FadeInUp.delay(100).springify()}
      style={styles.statsCard}
    >
      <Canvas style={styles.statsCanvas}>
        {/* Gradient background */}
        <RoundedRect x={0} y={0} width={cardWidth} height={cardHeight} r={16}>
          <LinearGradient
            start={vec(0, 0)}
            end={vec(cardWidth, cardHeight)}
            colors={colors.gradients.primary}
          />
        </RoundedRect>
        
        {/* Glass overlay */}
        <RoundedRect x={0} y={0} width={cardWidth} height={cardHeight} r={16}>
          <LinearGradient
            start={vec(0, 0)}
            end={vec(0, cardHeight)}
            colors={['rgba(255,255,255,0.2)', 'rgba(255,255,255,0.05)']}
          />
        </RoundedRect>
        
        {/* Animated ring */}
        <Group transform={[{ translateX: cardWidth - 80 }, { translateY: cardHeight / 2 }]}>
          <SkiaProgressRing progress={ringProgress} size={80} strokeWidth={6} />
        </Group>
      </Canvas>
      
      <View style={styles.statsContent}>
        <Text style={styles.statsLabel}>Total Space Saved</Text>
        <AnimatedText
          text={formatBytes(animatedSaved.value)}
          style={styles.statsValue}
        />
        <Text style={styles.statsSubtext}>
          {compressionCount} videos compressed
        </Text>
      </View>
    </Animated.View>
  );
};
```

#### Quick Actions

```typescript
const QuickActions: React.FC = () => {
  return (
    <Animated.View
      entering={FadeInUp.delay(200).springify()}
      style={styles.actionsContainer}
    >
      <Text style={styles.sectionTitle}>Quick Actions</Text>
      
      <View style={styles.actionsRow}>
        <ActionButton
          icon={{ set: 'Feather', name: 'plus' }}
          label="Import"
          gradient={colors.gradients.primary}
          onPress={handleImport}
        />
        <ActionButton
          icon={{ set: 'MaterialCommunityIcons', name: 'layers-triple' }}
          label="Batch"
          gradient={colors.gradients.secondary}
          onPress={handleBatch}
        />
      </View>
    </Animated.View>
  );
};

const ActionButton: React.FC<ActionButtonProps> = ({
  icon,
  label,
  gradient,
  onPress,
}) => {
  const scale = useSharedValue(1);
  const shadowOpacity = useSharedValue(0.2);
  
  const gesture = Gesture.Tap()
    .onBegin(() => {
      scale.value = withSpring(0.95, animationConfig.springs.snappy);
      shadowOpacity.value = withTiming(0.1, { duration: 100 });
      runOnJS(triggerHaptic)('impactLight');
    })
    .onFinalize((_, success) => {
      scale.value = withSpring(1, animationConfig.springs.bouncy);
      shadowOpacity.value = withTiming(0.2, { duration: 200 });
      if (success) runOnJS(onPress)();
    });
  
  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
    shadowOpacity: shadowOpacity.value,
  }));
  
  return (
    <GestureDetector gesture={gesture}>
      <Animated.View style={[styles.actionButton, animatedStyle]}>
        <LinearGradient colors={gradient} style={styles.actionGradient}>
          <Icon {...icon} size={28} color="#FFFFFF" />
          <Text style={styles.actionLabel}>{label}</Text>
        </LinearGradient>
      </Animated.View>
    </GestureDetector>
  );
};
```

#### Recent Compressions List

```typescript
const RecentCompressions: React.FC = () => {
  const { data: recentItems, isLoading } = useRecentCompressions();
  
  return (
    <Animated.View
      entering={FadeInUp.delay(300).springify()}
      style={styles.recentContainer}
    >
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Recent</Text>
        <TouchableOpacity onPress={navigateToHistory}>
          <Icon name="arrow-right" set="Feather" size={20} color={colors.primary[500]} />
        </TouchableOpacity>
      </View>
      
      {isLoading ? (
        <SkeletonList count={3} />
      ) : (
        <Animated.FlatList
          data={recentItems}
          keyExtractor={(item) => item.id}
          renderItem={({ item, index }) => (
            <SwipeableRow
              onDelete={() => handleDelete(item.id)}
              onEdit={() => handleRecompress(item)}
            >
              <RecentItem item={item} index={index} />
            </SwipeableRow>
          )}
          itemLayoutAnimation={LinearTransition.springify()}
        />
      )}
    </Animated.View>
  );
};

const RecentItem: React.FC<{ item: CompressionRecord; index: number }> = ({
  item,
  index,
}) => {
  return (
    <Animated.View
      entering={FadeInRight.delay(index * 50).springify()}
      style={styles.recentItem}
    >
      <VideoThumbnail
        uri={item.thumbnailUri}
        width={64}
        height={64}
        borderRadius={8}
      />
      
      <View style={styles.recentItemContent}>
        <Text style={styles.recentItemTitle} numberOfLines={1}>
          {item.fileName}
        </Text>
        <View style={styles.recentItemMeta}>
          <Text style={styles.recentItemSize}>
            {formatBytes(item.originalSize)}
          </Text>
          <Icon
            name="arrow-right"
            set="Feather"
            size={12}
            color={colors.neutral[400]}
          />
          <Text style={styles.recentItemSizeCompressed}>
            {formatBytes(item.compressedSize)}
          </Text>
          <View style={styles.savingsBadge}>
            <Text style={styles.savingsText}>
              -{Math.round((1 - item.compressedSize / item.originalSize) * 100)}%
            </Text>
          </View>
        </View>
      </View>
      
      <Icon
        name="chevron-right"
        set="Feather"
        size={20}
        color={colors.neutral[300]}
      />
    </Animated.View>
  );
};
```

### Gesture Interactions

| Gesture | Location | Action |
|---------|----------|--------|
| Pull down | Anywhere | Refresh recent list |
| Swipe left | Recent item | Reveal delete action |
| Swipe right | Recent item | Reveal recompress action |
| Tap | Statistics card | Navigate to detailed stats |
| Long press | Recent item | Show context menu (bottom sheet) |

---

## 6.3 Import Screen

### Visual Design

┌────────────────────────────────┐
│ ←                     Import   │  ← Draggable header
├────────────────────────────────┤
│                                │
│  ┌──────────────────────────┐  │
│  │                          │  │
│  │    ┌──────┐ ┌──────┐    │  │
│  │    │ [F]  │ │ [V]  │    │  │  ← Vector icons
│  │    │Files │ │Photos│    │  │
│  │    └──────┘ └──────┘    │  │
│  │                          │  │
│  └──────────────────────────┘  │
│                                │
│  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━  │  ← Drag indicator
│                                │
│  ┌────┐ ┌────┐ ┌────┐ ┌────┐  │
│  │░░░░│ │░░░░│ │░░░░│ │░░░░│  │
│  │░░░░│ │░░░░│ │░░░░│ │░░░░│  │  ← Photo grid
│  └────┘ └────┘ └────┘ └────┘  │
│  ┌────┐ ┌────┐ ┌────┐ ┌────┐  │
│  │░░░░│ │░░░░│ │░░░░│ │░░░░│  │
│  │░░░░│ │░░░░│ │░░░░│ │░░░░│  │
│  └────┘ └────┘ └────┘ └────┘  │
│  ┌────┐ ┌────┐ ┌────┐ ┌────┐  │
│  │░░░░│ │░░░░│ │░░░░│ │░░░░│  │
│  │░░░░│ │░░░░│ │░░░░│ │░░░░│  │
│  └────┘ └────┘ └────┘ └────┘  │
│                                │
│                                │
│  ┌────────────────────────────┐│
│  │     Import (3 selected)    ││  ← Floating action button
│  └────────────────────────────┘│
└────────────────────────────────┘

### Component Specifications

#### Bottom Sheet Import Modal

```typescript
const ImportBottomSheet: React.FC<Props> = ({ isVisible, onClose, onImport }) => {
  const translateY = useSharedValue(SCREEN_HEIGHT);
  const backdropOpacity = useSharedValue(0);
  const velocityY = useSharedValue(0);
  
  useEffect(() => {
    if (isVisible) {
      translateY.value = withSpring(0, animationConfig.springs.responsive);
      backdropOpacity.value = withTiming(1, { duration: 300 });
    } else {
      translateY.value = withSpring(SCREEN_HEIGHT, animationConfig.springs.responsive);
      backdropOpacity.value = withTiming(0, { duration: 200 });
    }
  }, [isVisible]);
  
  const panGesture = Gesture.Pan()
    .onUpdate((event) => {
      if (event.translationY > 0) {
        translateY.value = event.translationY;
        backdropOpacity.value = interpolate(
          event.translationY,
          [0, SHEET_HEIGHT],
          [1, 0]
        );
      }
      velocityY.value = event.velocityY;
    })
    .onEnd(() => {
      if (translateY.value > SHEET_HEIGHT * 0.3 || velocityY.value > 500) {
        translateY.value = withSpring(SCREEN_HEIGHT, animationConfig.springs.snappy);
        backdropOpacity.value = withTiming(0, { duration: 200 }, () => {
          runOnJS(onClose)();
        });
      } else {
        translateY.value = withSpring(0, animationConfig.springs.responsive);
        backdropOpacity.value = withTiming(1, { duration: 200 });
      }
    });
  
  const sheetStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }],
  }));
  
  const backdropStyle = useAnimatedStyle(() => ({
    opacity: backdropOpacity.value,
  }));
  
  return (
    <>
      <Animated.View style={[styles.backdrop, backdropStyle]}>
        <Pressable style={StyleSheet.absoluteFill} onPress={onClose} />
      </Animated.View>
      
      <GestureDetector gesture={panGesture}>
        <Animated.View style={[styles.sheet, sheetStyle]}>
          {/* Drag handle */}
          <View style={styles.dragHandle}>
            <View style={styles.dragIndicator} />
          </View>
          
          {/* Import source selection */}
          <ImportSourceSelector onSelect={handleSourceSelect} />
          
          {/* Gallery grid */}
          <GalleryPicker
            onSelectionChange={handleSelectionChange}
            selectedIds={selectedIds}
          />
          
          {/* Import button */}
          <ImportButton
            count={selectedIds.length}
            onPress={handleImport}
          />
        </Animated.View>
      </GestureDetector>
    </>
  );
};
```

#### Gallery Picker with Selection Animation

```typescript
const GalleryPicker: React.FC<GalleryPickerProps> = ({
  onSelectionChange,
  selectedIds,
}) => {
  const { data: videos, isLoading } = useGalleryVideos();
  
  return (
    <Animated.FlatList
      data={videos}
      numColumns={4}
      keyExtractor={(item) => item.id}
      renderItem={({ item, index }) => (
        <GalleryItem
          item={item}
          index={index}
          isSelected={selectedIds.includes(item.id)}
          onSelect={() => toggleSelection(item.id)}
        />
      )}
      contentContainerStyle={styles.galleryContent}
    />
  );
};

const GalleryItem: React.FC<GalleryItemProps> = ({
  item,
  index,
  isSelected,
  onSelect,
}) => {
  const scale = useSharedValue(1);
  const checkScale = useSharedValue(isSelected ? 1 : 0);
  const borderOpacity = useSharedValue(isSelected ? 1 : 0);
  
  useEffect(() => {
    checkScale.value = withSpring(
      isSelected ? 1 : 0,
      animationConfig.springs.bouncy
    );
    borderOpacity.value = withTiming(isSelected ? 1 : 0, { duration: 200 });
  }, [isSelected]);
  
  const gesture = Gesture.Tap()
    .onBegin(() => {
      scale.value = withSpring(0.9, animationConfig.springs.snappy);
      runOnJS(triggerHaptic)('selection');
    })
    .onFinalize((_, success) => {
      scale.value = withSpring(1, animationConfig.springs.bouncy);
      if (success) runOnJS(onSelect)();
    });
  
  const containerStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));
  
  const checkStyle = useAnimatedStyle(() => ({
    transform: [{ scale: checkScale.value }],
    opacity: checkScale.value,
  }));
  
  const borderStyle = useAnimatedStyle(() => ({
    borderColor: interpolateColor(
      borderOpacity.value,
      [0, 1],
      ['transparent', colors.primary[500]]
    ),
    borderWidth: 3,
  }));
  
  return (
    <GestureDetector gesture={gesture}>
      <Animated.View style={[styles.galleryItem, containerStyle]}>
        <Animated.View style={borderStyle}>
          <FastImage
            source={{ uri: item.thumbnailUri }}
            style={styles.thumbnail}
            resizeMode="cover"
          />
          
          {/* Duration badge */}
          <View style={styles.durationBadge}>
            <Text style={styles.durationText}>
              {formatDuration(item.duration)}
            </Text>
          </View>
          
          {/* Selection indicator */}
          <Animated.View style={[styles.checkIndicator, checkStyle]}>
            <LinearGradient
              colors={colors.gradients.primary}
              style={styles.checkGradient}
            >
              <Icon name="check" set="Feather" size={14} color="#FFFFFF" />
            </LinearGradient>
          </Animated.View>
          
          {/* File size */}
          <View style={styles.sizeBadge}>
            <Text style={styles.sizeText}>{formatBytes(item.size)}</Text>
          </View>
        </Animated.View>
      </Animated.View>
    </GestureDetector>
  );
};
```

### Gestures

| Gesture | Action |
|---------|--------|
| Swipe down on sheet | Close import modal |
| Tap on video | Toggle selection |
| Long press on video | Preview video in full screen |
| Pinch | Zoom gallery grid (3/4/5 columns) |

---

## 6.4 Compression Screen

### Visual Design

┌────────────────────────────────┐
│ ←  Compress              ⋮    │  ← Header with more options
├────────────────────────────────┤
│                                │
│  ┌──────────────────────────┐  │
│  │                          │  │
│  │                          │  │
│  │     [VIDEO PREVIEW]      │  │  ← Interactive video player
│  │                          │  │
│  │                          │  │
│  │        ▶ 0:00 / 2:34     │  │
│  └──────────────────────────┘  │
│                                │
│  Quality                       │
│  ┌──────────────────────────┐  │
│  │ ○ Low    ◉ Med   ○ High  │  │  ← Segmented control
│  └──────────────────────────┘  │
│                                │
│  Compression                   │
│  ┌──────────────────────────┐  │
│  │◉━━━━━━━━━━━━━━━━━━━━━━●  │  │  ← Skia slider
│  │  Small ←         → Best  │  │
│  └──────────────────────────┘  │
│                                │
│  Resolution                    │
│  ┌──────────────────────────┐  │
│  │  1080p  │  720p  │  480p │  │  ← Resolution pills
│  └──────────────────────────┘  │
│                                │
│  Estimated Result              │
│  ┌──────────────────────────┐  │
│  │  245 MB  →   82 MB       │  │  ← Size preview
│  │          -67%            │  │
│  └──────────────────────────┘  │
│                                │
│  ┌──────────────────────────┐  │
│  │     Start Compression    │  │  ← Primary action
│  └──────────────────────────┘  │
│                                │
└────────────────────────────────┘

### Component Specifications

#### Video Preview Player

```typescript
const VideoPreview: React.FC<Props> = ({ uri, onTrim }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  
  const playPauseScale = useSharedValue(1);
  const controlsOpacity = useSharedValue(1);
  const timelineProgress = useSharedValue(0);
  
  // Auto-hide controls after 3 seconds
  useEffect(() => {
    if (isPlaying) {
      const timer = setTimeout(() => {
        controlsOpacity.value = withTiming(0, { duration: 300 });
      }, 3000);
      return () => clearTimeout(timer);
    } else {
      controlsOpacity.value = withTiming(1, { duration: 200 });
    }
  }, [isPlaying]);
  
  const tapGesture = Gesture.Tap()
    .onEnd(() => {
      if (controlsOpacity.value < 0.5) {
        controlsOpacity.value = withTiming(1, { duration: 200 });
      } else {
        runOnJS(togglePlayback)();
      }
    });
  
  const doubleTapGesture = Gesture.Tap()
    .numberOfTaps(2)
    .onEnd((event) => {
      const isRightSide = event.x > PREVIEW_WIDTH / 2;
      const skipAmount = isRightSide ? 10 : -10;
      runOnJS(skip)(skipAmount);
      runOnJS(showSkipIndicator)(isRightSide);
    });
  
  const composedGestures = Gesture.Exclusive(doubleTapGesture, tapGesture);
  
  const controlsStyle = useAnimatedStyle(() => ({
    opacity: controlsOpacity.value,
    pointerEvents: controlsOpacity.value > 0.5 ? 'auto' : 'none',
  }));
  
  return (
    <View style={styles.previewContainer}>
      <GestureDetector gesture={composedGestures}>
        <View style={styles.videoWrapper}>
          <Video
            ref={videoRef}
            source={{ uri }}
            style={styles.video}
            resizeMode="contain"
            paused={!isPlaying}
            onProgress={handleProgress}
            onLoad={handleLoad}
          />
          
          {/* Gradient overlay */}
          <LinearGradient
            colors={['transparent', 'rgba(0,0,0,0.6)']}
            style={styles.gradient}
          />
          
          {/* Controls overlay */}
          <Animated.View style={[styles.controls, controlsStyle]}>
            {/* Play/Pause button */}
            <TouchableOpacity
              onPress={togglePlayback}
              style={styles.playButton}
            >
              <Animated.View
                style={useAnimatedStyle(() => ({
                  transform: [{ scale: playPauseScale.value }],
                }))}
              >
                <Icon
                  name={isPlaying ? 'pause' : 'play'}
                  set="Feather"
                  size={32}
                  color="#FFFFFF"
                />
              </Animated.View>
            </TouchableOpacity>
            
            {/* Timeline */}
            <View style={styles.timelineContainer}>
              <VideoTimeline
                progress={timelineProgress}
                duration={duration}
                onSeek={handleSeek}
              />
              
              <View style={styles.timeDisplay}>
                <Text style={styles.timeText}>
                  {formatTime(currentTime)}
                </Text>
                <Text style={styles.timeSeparator}>/</Text>
                <Text style={styles.timeText}>
                  {formatTime(duration)}
                </Text>
              </View>
            </View>
            
            {/* Trim button */}
            <TouchableOpacity
              onPress={onTrim}
              style={styles.trimButton}
            >
              <Icon
                name="content-cut"
                set="MaterialCommunityIcons"
                size={20}
                color="#FFFFFF"
              />
            </TouchableOpacity>
          </Animated.View>
        </View>
      </GestureDetector>
    </View>
  );
};
```

#### Skia Compression Slider

```typescript
const CompressionSlider: React.FC<Props> = ({
  value,
  onChange,
  min = 0,
  max = 100,
}) => {
  const translateX = useSharedValue((value / max) * SLIDER_WIDTH);
  const thumbScale = useSharedValue(1);
  const trackHighlight = useSharedValue(value / max);
  const isActive = useSharedValue(false);
  
  const gesture = Gesture.Pan()
    .onBegin(() => {
      isActive.value = true;
      thumbScale.value = withSpring(1.3, animationConfig.springs.responsive);
      runOnJS(triggerHaptic)('impactLight');
    })
    .onUpdate((event) => {
      const newX = clamp(event.x, 0, SLIDER_WIDTH);
      translateX.value = newX;
      trackHighlight.value = newX / SLIDER_WIDTH;
      
      const newValue = Math.round((newX / SLIDER_WIDTH) * max);
      runOnJS(onChange)(newValue);
    })
    .onEnd(() => {
      isActive.value = false;
      thumbScale.value = withSpring(1, animationConfig.springs.bouncy);
      runOnJS(triggerHaptic)('selection');
    });
  
  return (
    <View style={styles.sliderContainer}>
      <Canvas style={styles.sliderCanvas}>
        {/* Background track */}
        <RoundedRect
          x={0}
          y={SLIDER_HEIGHT / 2 - 3}
          width={SLIDER_WIDTH}
          height={6}
          r={3}
          color={colors.neutral[200]}
        />
        
        {/* Active track with gradient */}
        <Group
          clip={
            <RoundedRect
              x={0}
              y={SLIDER_HEIGHT / 2 - 3}
              width={translateX}
              height={6}
              r={3}
            />
          }
        >
          <RoundedRect
            x={0}
            y={SLIDER_HEIGHT / 2 - 3}
            width={SLIDER_WIDTH}
            height={6}
            r={3}
          >
            <LinearGradient
              start={vec(0, 0)}
              end={vec(SLIDER_WIDTH, 0)}
              colors={colors.gradients.primary}
            />
          </RoundedRect>
        </Group>
        
        {/* Thumb */}
        <Group
          transform={[
            { translateX: translateX },
            { translateY: SLIDER_HEIGHT / 2 },
            { scale: thumbScale },
          ]}
        >
          {/* Thumb shadow */}
          <Circle cx={0} cy={0} r={14} color="rgba(0,0,0,0.15)">
            <Blur blur={4} />
          </Circle>
          
          {/* Thumb outer */}
          <Circle cx={0} cy={0} r={12} color="#FFFFFF" />
          
          {/* Thumb inner with gradient */}
          <Circle cx={0} cy={0} r={8}>
            <LinearGradient
              start={vec(-8, -8)}
              end={vec(8, 8)}
              colors={colors.gradients.primary}
            />
          </Circle>
          
          {/* Active glow */}
          <Circle
            cx={0}
            cy={0}
            r={isActive.value ? 20 : 12}
            color={`${colors.primary[500]}30`}
            opacity={isActive.value ? 1 : 0}
          />
        </Group>
        
        {/* Value indicator above thumb */}
        <Group
          transform={[
            { translateX: translateX },
            { translateY: SLIDER_HEIGHT / 2 - 30 },
          ]}
          opacity={isActive.value ? 1 : 0}
        >
          <RoundedRect x={-20} y={-12} width={40} height={24} r={6}>
            <LinearGradient
              start={vec(-20, -12)}
              end={vec(20, 12)}
              colors={colors.gradients.primary}
            />
          </RoundedRect>
          <Text
            x={0}
            y={4}
            text={`${Math.round(trackHighlight.value * 100)}%`}
            font={smallFont}
            color="#FFFFFF"
            textAlign="center"
          />
        </Group>
      </Canvas>
      
      <GestureDetector gesture={gesture}>
        <View style={styles.sliderHitArea} />
      </GestureDetector>
      
      <View style={styles.sliderLabels}>
        <Text style={styles.sliderLabelLeft}>Small Size</Text>
        <Text style={styles.sliderLabelRight}>Best Quality</Text>
      </View>
    </View>
  );
};
```

#### Quality Segmented Control

```typescript
const QualitySelector: React.FC<Props> = ({ value, onChange, options }) => {
  const indicatorX = useSharedValue(0);
  const indicatorWidth = useSharedValue(0);
  const [measurements, setMeasurements] = useState<LayoutMeasurement[]>([]);
  
  useEffect(() => {
    const index = options.findIndex((opt) => opt.value === value);
    if (index >= 0 && measurements[index]) {
      indicatorX.value = withSpring(
        measurements[index].x,
        animationConfig.springs.snappy
      );
      indicatorWidth.value = withSpring(
        measurements[index].width,
        animationConfig.springs.snappy
      );
    }
  }, [value, measurements]);
  
  const indicatorStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: indicatorX.value }],
    width: indicatorWidth.value,
  }));
  
  return (
    <View style={styles.segmentedContainer}>
      {/* Animated indicator */}
      <Animated.View style={[styles.segmentedIndicator, indicatorStyle]}>
        <LinearGradient
          colors={colors.gradients.primary}
          style={StyleSheet.absoluteFill}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        />
      </Animated.View>
      
      {/* Options */}
      {options.map((option, index) => (
        <TouchableOpacity
          key={option.value}
          onPress={() => {
            triggerHaptic('selection');
            onChange(option.value);
          }}
          onLayout={(e) => {
            const { x, width } = e.nativeEvent.layout;
            setMeasurements((prev) => {
              const next = [...prev];
              next[index] = { x, width };
              return next;
            });
          }}
          style={styles.segmentedOption}
        >
          <Text
            style={[
              styles.segmentedText,
              value === option.value && styles.segmentedTextActive,
            ]}
          >
            {option.label}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};
```

#### Estimated Result Card

```typescript
const EstimatedResult: React.FC<Props> = ({ originalSize, estimatedSize }) => {
  const animatedOriginal = useSharedValue(0);
  const animatedEstimated = useSharedValue(0);
  const savings = 1 - estimatedSize / originalSize;
  
  useEffect(() => {
    animatedOriginal.value = withTiming(originalSize, { duration: 500 });
    animatedEstimated.value = withTiming(estimatedSize, { duration: 800 });
  }, [originalSize, estimatedSize]);
  
  const savingsColor = useDerivedValue(() => {
    return interpolateColor(
      savings,
      [0, 0.3, 0.6, 0.9],
      [
        colors.neutral[400],
        colors.accent.amber,
        colors.accent.mint,
        colors.semantic.success,
      ]
    );
  });
  
  return (
    <Animated.View
      entering={FadeInUp.springify()}
      style={styles.resultCard}
    >
      <Text style={styles.resultLabel}>Estimated Result</Text>
      
      <View style={styles.resultContent}>
        <View style={styles.sizeColumn}>
          <Text style={styles.sizeLabel}>Original</Text>
          <ReText
            text={useDerivedValue(() => formatBytes(animatedOriginal.value))}
            style={styles.sizeValue}
          />
        </View>
        
        <Canvas style={styles.arrowCanvas}>
          <AnimatedArrow progress={animatedEstimated} />
        </Canvas>
        
        <View style={styles.sizeColumn}>
          <Text style={styles.sizeLabel}>Compressed</Text>
          <ReText
            text={useDerivedValue(() => formatBytes(animatedEstimated.value))}
            style={[styles.sizeValue, styles.sizeValueHighlight]}
          />
        </View>
      </View>
      
      <Animated.View
        style={[
          styles.savingsBadge,
          useAnimatedStyle(() => ({
            backgroundColor: savingsColor.value,
          })),
        ]}
      >
        <Text style={styles.savingsText}>
          -{Math.round(savings * 100)}%
        </Text>
      </Animated.View>
    </Animated.View>
  );
};
```

### Gestures

| Gesture | Location | Action |
|---------|----------|--------|
| Tap | Video | Toggle play/pause |
| Double tap left | Video | Skip back 10 seconds |
| Double tap right | Video | Skip forward 10 seconds |
| Pan | Slider | Adjust compression level |
| Pan | Video timeline | Seek position |
| Swipe left | Screen edge | Navigate back |
| Long press | Preset option | Show preset details |

---

## 6.5 Preview/Comparison Screen

### Visual Design

┌────────────────────────────────┐
│ ←  Compare                     │
├────────────────────────────────┤
│                                │
│  ┌──────────────────────────┐  │
│  │                          │  │
│  │   ORIGINAL │ COMPRESSED  │  │  ← Split view
│  │            │             │  │
│  │   ←───────●───────→      │  │  ← Draggable divider
│  │            │             │  │
│  │                          │  │
│  └──────────────────────────┘  │
│                                │
│  ┌───────────●───────────┐    │  ← Timeline scrubber
│  └──────────────────────────┘  │
│                                │
│  ┌───────────┬───────────────┐ │
│  │ Original  │  Compressed   │ │
│  ├───────────┼───────────────┤ │
│  │ Size      │    245 MB     │ │  82 MB
│  │ Bitrate   │   12.4 Mbps   │ │ 4.1 Mbps
│  │ Resolution│   1920×1080   │ │ 1920×1080
│  │ Codec     │    H.264      │ │  H.265
│  └───────────┴───────────────┘ │
│                                │
│  ┌────────────────────────────┐│
│  │         Save Video         ││
│  └────────────────────────────┘│
│                                │
└────────────────────────────────┘

### Component Specifications

#### Comparison Slider

```typescript
const ComparisonSlider: React.FC<Props> = ({
  originalUri,
  compressedUri,
  currentTime,
}) => {
  const dividerX = useSharedValue(SCREEN_WIDTH / 2);
  const dividerScale = useSharedValue(1);
  const leftMaskWidth = useDerivedValue(() => dividerX.value);
  
  const panGesture = Gesture.Pan()
    .onBegin(() => {
      dividerScale.value = withSpring(1.2, animationConfig.springs.responsive);
      runOnJS(triggerHaptic)('impactLight');
    })
    .onUpdate((event) => {
      dividerX.value = clamp(event.absoluteX, 40, SCREEN_WIDTH - 40);
    })
    .onEnd(() => {
      dividerScale.value = withSpring(1, animationConfig.springs.bouncy);
    });
  
  const dividerStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: dividerX.value - 2 },
      { scaleX: dividerScale.value },
    ],
  }));
  
  const leftClipStyle = useAnimatedStyle(() => ({
    width: leftMaskWidth.value,
  }));
  
  return (
    <View style={styles.comparisonContainer}>
      {/* Compressed video (full width, underneath) */}
      <Video
        source={{ uri: compressedUri }}
        style={styles.fullVideo}
        resizeMode="contain"
        paused
        seek={currentTime}
      />
      
      {/* Original video (clipped) */}
      <Animated.View style={[styles.leftClip, leftClipStyle]}>
        <Video
          source={{ uri: originalUri }}
          style={styles.fullVideo}
          resizeMode="contain"
          paused
          seek={currentTime}
        />
      </Animated.View>
      
      {/* Labels */}
      <View style={styles.labelLeft}>
        <Text style={styles.labelText}>Original</Text>
      </View>
      <View style={styles.labelRight}>
        <Text style={styles.labelText}>Compressed</Text>
      </View>
      
      {/* Divider */}
      <GestureDetector gesture={panGesture}>
        <Animated.View style={[styles.divider, dividerStyle]}>
          {/* Divider line */}
          <View style={styles.dividerLine} />
          
          {/* Divider handle */}
          <Canvas style={styles.dividerHandle}>
            <RoundedRect x={0} y={0} width={40} height={40} r={20}>
              <LinearGradient
                start={vec(0, 0)}
                end={vec(40, 40)}
                colors={['#FFFFFF', '#E0E0E0']}
              />
            </RoundedRect>
            <Shadow dx={0} dy={2} blur={4} color="rgba(0,0,0,0.2)" />
            
            {/* Arrow icons */}
            <Path
              path="M8,20 L14,15 L14,25 Z"
              color={colors.neutral[500]}
            />
            <Path
              path="M32,20 L26,15 L26,25 Z"
              color={colors.neutral[500]}
            />
          </Canvas>
        </Animated.View>
      </GestureDetector>
    </View>
  );
};
```

#### Metadata Comparison Table

```typescript
const MetadataComparison: React.FC<Props> = ({ original, compressed }) => {
  const rows = [
    { label: 'Size', originalValue: formatBytes(original.size), compressedValue: formatBytes(compressed.size), highlight: true },
    { label: 'Bitrate', originalValue: formatBitrate(original.bitrate), compressedValue: formatBitrate(compressed.bitrate) },
    { label: 'Resolution', originalValue: `${original.width}×${original.height}`, compressedValue: `${compressed.width}×${compressed.height}` },
    { label: 'Codec', originalValue: original.codec, compressedValue: compressed.codec },
    { label: 'Frame Rate', originalValue: `${original.fps} fps`, compressedValue: `${compressed.fps} fps` },
    { label: 'Duration', originalValue: formatDuration(original.duration), compressedValue: formatDuration(compressed.duration) },
  ];
  
  return (
    <View style={styles.metadataContainer}>
      {/* Header */}
      <View style={styles.metadataHeader}>
        <View style={styles.metadataHeaderCell} />
        <Text style={styles.metadataHeaderText}>Original</Text>
        <Text style={styles.metadataHeaderText}>Compressed</Text>
      </View>
      
      {/* Rows */}
      {rows.map((row, index) => (
        <Animated.View
          key={row.label}
          entering={FadeInRight.delay(index * 50).springify()}
          style={[
            styles.metadataRow,
            row.highlight && styles.metadataRowHighlight,
          ]}
        >
          <Text style={styles.metadataLabel}>{row.label}</Text>
          <Text style={styles.metadataValue}>{row.originalValue}</Text>
          <Text
            style={[
              styles.metadataValue,
              row.highlight && styles.metadataValueHighlight,
            ]}
          >
            {row.compressedValue}
          </Text>
        </Animated.View>
      ))}
    </View>
  );
};
```

### Gestures

| Gesture | Location | Action |
|---------|----------|--------|
| Pan horizontal | Comparison divider | Adjust split position |
| Pan | Timeline | Scrub through video |
| Double tap | Divider | Reset to center |
| Pinch | Video area | Zoom in/out |
| Swipe left | Screen | Go back |

---

## 6.6 Video Trimming Screen

### Visual Design

┌────────────────────────────────┐
│ ←  Trim Video          Reset   │
├────────────────────────────────┤
│                                │
│  ┌──────────────────────────┐  │
│  │                          │  │
│  │                          │  │
│  │     [VIDEO PREVIEW]      │  │
│  │                          │  │
│  │                          │  │
│  │        ▶ 0:32 / 2:34     │  │
│  └──────────────────────────┘  │
│                                │
│  ┌──────────────────────────┐  │
│  │┃░░░░░░░░░░░░░░░░░░░░░░░░┃│  │  ← Frame strip
│  │┃████████████████████░░░░┃│  │  ← Selected range
│  │●━━━━━━━━━━━━━━━━━━━━━━●  │  │  ← Trim handles
│  └──────────────────────────┘  │
│                                │
│  Start: 0:00     End: 1:45     │
│                                │
│  Duration: 1:45                │
│                                │
│  ┌────────────────────────────┐│
│  │         Apply Trim         ││
│  └────────────────────────────┘│
│                                │
└────────────────────────────────┘

### Component Specifications

#### Frame Strip Timeline

```typescript
const FrameStripTimeline: React.FC<Props> = ({
  videoUri,
  duration,
  startTime,
  endTime,
  onRangeChange,
  onCurrentTimeChange,
}) => {
  const frames = useVideoFrames(videoUri, FRAME_COUNT);
  const startX = useSharedValue((startTime / duration) * TIMELINE_WIDTH);
  const endX = useSharedValue((endTime / duration) * TIMELINE_WIDTH);
  const playheadX = useSharedValue(0);
  const leftHandleScale = useSharedValue(1);
  const rightHandleScale = useSharedValue(1);
  
  const leftHandleGesture = Gesture.Pan()
    .onBegin(() => {
      leftHandleScale.value = withSpring(1.2, animationConfig.springs.responsive);
      runOnJS(triggerHaptic)('impactLight');
    })
    .onUpdate((event) => {
      const newX = clamp(event.x, 0, endX.value - MIN_SELECTION);
      startX.value = newX;
      const newStartTime = (newX / TIMELINE_WIDTH) * duration;
      runOnJS(onRangeChange)({ startTime: newStartTime, endTime: (endX.value / TIMELINE_WIDTH) * duration });
    })
    .onEnd(() => {
      leftHandleScale.value = withSpring(1, animationConfig.springs.bouncy);
    });
  
  const rightHandleGesture = Gesture.Pan()
    .onBegin(() => {
      rightHandleScale.value = withSpring(1.2, animationConfig.springs.responsive);
      runOnJS(triggerHaptic)('impactLight');
    })
    .onUpdate((event) => {
      const newX = clamp(event.x, startX.value + MIN_SELECTION, TIMELINE_WIDTH);
      endX.value = newX;
      const newEndTime = (newX / TIMELINE_WIDTH) * duration;
      runOnJS(onRangeChange)({ startTime: (startX.value / TIMELINE_WIDTH) * duration, endTime: newEndTime });
    })
    .onEnd(() => {
      rightHandleScale.value = withSpring(1, animationConfig.springs.bouncy);
    });
  
  const playheadGesture = Gesture.Pan()
    .onUpdate((event) => {
      const newX = clamp(event.x, startX.value, endX.value);
      playheadX.value = newX;
      const newTime = (newX / TIMELINE_WIDTH) * duration;
      runOnJS(onCurrentTimeChange)(newTime);
    });
  
  return (
    <View style={styles.timelineContainer}>
      {/* Frame strip */}
      <View style={styles.frameStrip}>
        {frames.map((frame, index) => (
          <FastImage
            key={index}
            source={{ uri: frame.uri }}
            style={styles.frame}
            resizeMode="cover"
          />
        ))}
      </View>
      
      {/* Dimmed areas outside selection */}
      <Animated.View
        style={[
          styles.dimmedArea,
          styles.dimmedLeft,
          useAnimatedStyle(() => ({ width: startX.value })),
        ]}
      />
      <Animated.View
        style={[
          styles.dimmedArea,
          styles.dimmedRight,
          useAnimatedStyle(() => ({
            left: endX.value,
            width: TIMELINE_WIDTH - endX.value,
          })),
        ]}
      />
      
      {/* Selection border */}
      <Animated.View
        style={[
          styles.selectionBorder,
          useAnimatedStyle(() => ({
            left: startX.value,
            width: endX.value - startX.value,
          })),
        ]}
      >
        <LinearGradient
          colors={colors.gradients.primary}
          style={styles.selectionBorderGradient}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
        />
      </Animated.View>
      
      {/* Left handle */}
      <GestureDetector gesture={leftHandleGesture}>
        <Animated.View
          style={[
            styles.handle,
            styles.handleLeft,
            useAnimatedStyle(() => ({
              left: startX.value - HANDLE_WIDTH / 2,
              transform: [{ scale: leftHandleScale.value }],
            })),
          ]}
        >
          <TrimHandle />
        </Animated.View>
      </GestureDetector>
      
      {/* Right handle */}
      <GestureDetector gesture={rightHandleGesture}>
        <Animated.View
          style={[
            styles.handle,
            styles.handleRight,
            useAnimatedStyle(() => ({
              left: endX.value - HANDLE_WIDTH / 2,
              transform: [{ scale: rightHandleScale.value }],
            })),
          ]}
        >
          <TrimHandle />
        </Animated.View>
      </GestureDetector>
      
      {/* Playhead */}
      <GestureDetector gesture={playheadGesture}>
        <Animated.View
          style={[
            styles.playhead,
            useAnimatedStyle(() => ({
              left: playheadX.value - 1,
            })),
          ]}
        >
          <View style={styles.playheadLine} />
          <View style={styles.playheadHead} />
        </Animated.View>
      </GestureDetector>
    </View>
  );
};
```

### Gestures

| Gesture | Location | Action |
|---------|----------|--------|
| Pan | Left handle | Adjust start time |
| Pan | Right handle | Adjust end time |
| Pan | Playhead | Scrub video |
| Tap | Frame | Jump to that frame |
| Pinch | Timeline | Zoom timeline |

---

## 6.7 History Screen

### Visual Design

┌────────────────────────────────┐
│ History                    🔍   │
├────────────────────────────────┤
│                                │
│  ┌──────────────────────────┐  │
│  │ All │ Today │ Week │Month│  │  ← Filter tabs
│  └──────────────────────────┘  │
│                                │
│  Today                         │
│  ┌──────────────────────────┐  │
│  │ ┌────┐                   │  │
│  │ │░░░░│ project_final.mp4 │  │
│  │ │░░░░│ 1.2GB → 340MB     │  │
│  │ └────┘ 2 hours ago       │  │
│  └──────────────────────────┘  │
│  ┌──────────────────────────┐  │
│  │ ┌────┐                   │  │
│  │ │░░░░│ interview.mov     │  │
│  │ │░░░░│ 890MB → 245MB     │  │
│  │ └────┘ 5 hours ago       │  │
│  └──────────────────────────┘  │
│                                │
│  Yesterday                     │
│  ┌──────────────────────────┐  │
│  │ ┌────┐                   │  │
│  │ │░░░░│ vacation_clip.mp4 │  │
│  │ │░░░░│ 2.1GB → 580MB     │  │
│  │ └────┘                   │  │
│  └──────────────────────────┘  │
│                                │
├────────────────────────────────┤
│  ⌂      ↻      ⚙             │
│ Home  History Settings        │
└────────────────────────────────┘

### Component Specifications

```typescript
const HistoryScreen: React.FC = () => {
  const [filter, setFilter] = useState<HistoryFilter>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const { data: historyItems, isLoading } = useHistory(filter, searchQuery);
  
  const groupedHistory = useMemo(() => {
    return groupByDate(historyItems);
  }, [historyItems]);
  
  return (
    <SafeContainer>
      <Header title="History" rightAction={<SearchButton />} />
      
      {/* Filter tabs */}
      <FilterBar
        options={['all', 'today', 'week', 'month']}
        selected={filter}
        onChange={setFilter}
      />
      
      {/* Search bar (animated slide down) */}
      <AnimatedSearchBar
        value={searchQuery}
        onChange={setSearchQuery}
        placeholder="Search videos..."
      />
      
      {/* History list */}
      <Animated.SectionList
        sections={groupedHistory}
        keyExtractor={(item) => item.id}
        renderSectionHeader={({ section }) => (
          <Animated.View
            entering={FadeIn}
            style={styles.sectionHeader}
          >
            <Text style={styles.sectionTitle}>{section.title}</Text>
            <Text style={styles.sectionCount}>
              {section.data.length} videos
            </Text>
          </Animated.View>
        )}
        renderItem={({ item, index }) => (
          <SwipeableRow
            onDelete={() => handleDelete(item.id)}
            onShare={() => handleShare(item)}
          >
            <HistoryItem item={item} index={index} />
          </SwipeableRow>
        )}
        stickySectionHeadersEnabled
        ListEmptyComponent={<EmptyState type="history" />}
      />
    </SafeContainer>
  );
};
```

---

## 6.8 Settings Screen

### Visual Design

┌────────────────────────────────┐
│ Settings                       │
├────────────────────────────────┤
│                                │
│  COMPRESSION                   │
│  ┌──────────────────────────┐  │
│  │ Default Quality      Med │  │
│  ├──────────────────────────┤  │
│  │ Default Resolution 1080p │  │
│  ├──────────────────────────┤  │
│  │ Preserve Metadata    [●] │  │
│  ├──────────────────────────┤  │
│  │ Hardware Accel.      [●] │  │
│  └──────────────────────────┘  │
│                                │
│  PRESETS                       │
│  ┌──────────────────────────┐  │
│  │ Social Media          → │  │
│  ├──────────────────────────┤  │
│  │ Email Friendly        → │  │
│  ├──────────────────────────┤  │
│  │ Maximum Quality       → │  │
│  ├──────────────────────────┤  │
│  │ + Create Preset         │  │
│  └──────────────────────────┘  │
│                                │
│  STORAGE                       │
│  ┌──────────────────────────┐  │
│  │ Cache Size        124 MB │  │
│  ├──────────────────────────┤  │
│  │ Clear Cache             │  │
│  ├──────────────────────────┤  │
│  │ Auto-delete Original [○]│  │
│  └──────────────────────────┘  │
│                                │
│  ABOUT                         │
│  ┌──────────────────────────┐  │
│  │ Version           1.0.0 │  │
│  ├──────────────────────────┤  │
│  │ Privacy Policy       → │  │
│  ├──────────────────────────┤  │
│  │ Terms of Service     → │  │
│  └──────────────────────────┘  │
│                                │
├────────────────────────────────┤
│  ⌂      ↻      ⚙             │
│ Home  History Settings        │
└────────────────────────────────┘

### Component Specifications

```typescript
const SettingsScreen: React.FC = () => {
  const settings = useSettingsStore();
  
  return (
    <SafeContainer>
      <Header title="Settings" />
      
      <ScrollView style={styles.container}>
        {/* Compression Section */}
        <SettingsSection title="COMPRESSION">
          <SettingsRow
            label="Default Quality"
            value={settings.defaultQuality}
            type="select"
            options={['Low', 'Medium', 'High']}
            onChange={(value) => settings.setDefaultQuality(value)}
          />
          <SettingsRow
            label="Default Resolution"
            value={settings.defaultResolution}
            type="select"
            options={['480p', '720p', '1080p', '4K']}
            onChange={(value) => settings.setDefaultResolution(value)}
          />
          <SettingsRow
            label="Preserve Metadata"
            value={settings.preserveMetadata}
            type="toggle"
            onChange={(value) => settings.setPreserveMetadata(value)}
          />
          <SettingsRow
            label="Hardware Acceleration"
            value={settings.hardwareAcceleration}
            type="toggle"
            onChange={(value) => settings.setHardwareAcceleration(value)}
          />
        </SettingsSection>
        
        {/* Presets Section */}
        <SettingsSection title="PRESETS">
          {settings.presets.map((preset) => (
            <SettingsRow
              key={preset.id}
              label={preset.name}
              type="navigation"
              onPress={() => navigateToPreset(preset.id)}
            />
          ))}
          <SettingsRow
            label="Create Preset"
            type="action"
            icon={{ set: 'Feather', name: 'plus' }}
            onPress={handleCreatePreset}
          />
        </SettingsSection>
        
        {/* Storage Section */}
        <SettingsSection title="STORAGE">
          <SettingsRow
            label="Cache Size"
            value={formatBytes(settings.cacheSize)}
            type="info"
          />
          <SettingsRow
            label="Clear Cache"
            type="action"
            destructive
            onPress={handleClearCache}
          />
          <SettingsRow
            label="Auto-delete Original"
            value={settings.autoDeleteOriginal}
            type="toggle"
            onChange={(value) => settings.setAutoDeleteOriginal(value)}
          />
        </SettingsSection>
        
        {/* About Section */}
        <SettingsSection title="ABOUT">
          <SettingsRow
            label="Version"
            value="1.0.0"
            type="info"
          />
          <SettingsRow
            label="Privacy Policy"
            type="navigation"
            onPress={handlePrivacyPolicy}
          />
          <SettingsRow
            label="Terms of Service"
            type="navigation"
            onPress={handleTermsOfService}
          />
        </SettingsSection>
      </ScrollView>
    </SafeContainer>
  );
};

const SettingsRow: React.FC<SettingsRowProps> = ({
  label,
  value,
  type,
  onChange,
  onPress,
  destructive,
  icon,
}) => {
  const scale = useSharedValue(1);
  
  const gesture = Gesture.Tap()
    .onBegin(() => {
      if (type === 'navigation' || type === 'action') {
        scale.value = withSpring(0.98, animationConfig.springs.snappy);
      }
    })
    .onFinalize((_, success) => {
      scale.value = withSpring(1, animationConfig.springs.bouncy);
      if (success && onPress) {
        runOnJS(triggerHaptic)('impactLight');
        runOnJS(onPress)();
      }
    });
  
  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));
  
  return (
    <GestureDetector gesture={gesture}>
      <Animated.View style={[styles.settingsRow, animatedStyle]}>
        {icon && (
          <Icon {...icon} size={20} color={colors.primary[500]} />
        )}
        
        <Text
          style={[
            styles.settingsLabel,
            destructive && styles.settingsLabelDestructive,
          ]}
        >
          {label}
        </Text>
        
        {type === 'toggle' && (
          <AnimatedSwitch
            value={value as boolean}
            onValueChange={onChange}
          />
        )}
        
        {type === 'select' && (
          <Text style={styles.settingsValue}>{value}</Text>
        )}
        
        {type === 'info' && (
          <Text style={styles.settingsValueInfo}>{value}</Text>
        )}
        
        {type === 'navigation' && (
          <Icon
            name="chevron-right"
            set="Feather"
            size={20}
            color={colors.neutral[400]}
          />
        )}
      </Animated.View>
    </GestureDetector>
  );
};
```

---

## 6.9 Batch Processing Screen

### Visual Design

┌────────────────────────────────┐
│ ← Batch Compress        Clear │
├────────────────────────────────┤
│                                │
│  ┌──────────────────────────┐  │
│  │ Apply to all:            │  │
│  │ Quality: [Med ▼]         │  │
│  │ Resolution: [720p ▼]     │  │
│  └──────────────────────────┘  │
│                                │
│  Queue (5 videos)              │
│  ┌──────────────────────────┐  │
│  │ ┌────┐                   │  │
│  │ │░░░░│ video1.mp4        │  │
│  │ │░░░░│ ████████░░ 80%    │  │  ← Processing
│  │ └────┘                   │  │
│  ├──────────────────────────┤  │
│  │ ┌────┐                   │  │
│  │ │░░░░│ video2.mp4        │  │
│  │ │░░░░│ Waiting...        │  │
│  │ └────┘                   │  │
│  ├──────────────────────────┤  │
│  │ ┌────┐                   │  │
│  │ │░░░░│ video3.mp4    [✓] │  │  ←
```markdown
│  │ │░░░░│ video3.mp4    [✓] │  │  ← Completed
│  │ │░░░░│ 245MB → 82MB      │  │
│  │ └────┘                   │  │
│  └──────────────────────────┘  │
│                                │
│  ┌──────────────────────────┐  │
│  │  + Add More Videos       │  │
│  └──────────────────────────┘  │
│                                │
│  Summary                       │
│  ┌──────────────────────────┐  │
│  │ Total: 1.8 GB → ~520 MB  │  │
│  │ Estimated savings: 71%   │  │
│  └──────────────────────────┘  │
│                                │
│  ┌────────────────────────────┐│
│  │     Start Batch (5)        ││
│  └────────────────────────────┘│
│                                │
└────────────────────────────────┘

### Component Specifications

```typescript
const BatchScreen: React.FC = () => {
  const {
    queue,
    globalSettings,
    isProcessing,
    currentIndex,
    addVideos,
    removeVideo,
    reorderQueue,
    updateGlobalSettings,
    startBatch,
    cancelBatch,
  } = useBatchProcessing();
  
  return (
    <SafeContainer>
      <Header
        title="Batch Compress"
        leftAction={<BackButton />}
        rightAction={
          <TouchableOpacity onPress={clearQueue}>
            <Text style={styles.clearText}>Clear</Text>
          </TouchableOpacity>
        }
      />
      
      {/* Global settings */}
      <Animated.View
        entering={FadeInDown.springify()}
        style={styles.globalSettings}
      >
        <Text style={styles.settingsLabel}>Apply to all:</Text>
        <View style={styles.settingsRow}>
          <DropdownSelect
            label="Quality"
            value={globalSettings.quality}
            options={qualityOptions}
            onChange={(value) => updateGlobalSettings({ quality: value })}
          />
          <DropdownSelect
            label="Resolution"
            value={globalSettings.resolution}
            options={resolutionOptions}
            onChange={(value) => updateGlobalSettings({ resolution: value })}
          />
        </View>
      </Animated.View>
      
      {/* Queue header */}
      <View style={styles.queueHeader}>
        <Text style={styles.queueTitle}>Queue ({queue.length} videos)</Text>
      </View>
      
      {/* Draggable queue list */}
      <DraggableFlatList
        data={queue}
        keyExtractor={(item) => item.id}
        onDragEnd={({ data }) => reorderQueue(data)}
        renderItem={({ item, index, drag, isActive }) => (
          <BatchQueueItem
            item={item}
            index={index}
            isActive={isActive}
            isProcessing={isProcessing && currentIndex === index}
            onDrag={drag}
            onRemove={() => removeVideo(item.id)}
          />
        )}
        ListFooterComponent={
          <AddMoreButton onPress={addVideos} />
        }
      />
      
      {/* Summary card */}
      <BatchSummary queue={queue} />
      
      {/* Action button */}
      <View style={styles.actionContainer}>
        {isProcessing ? (
          <Button
            variant="secondary"
            label="Cancel"
            onPress={cancelBatch}
          />
        ) : (
          <Button
            variant="primary"
            label={`Start Batch (${queue.length})`}
            onPress={startBatch}
            disabled={queue.length === 0}
          />
        )}
      </View>
    </SafeContainer>
  );
};

const BatchQueueItem: React.FC<BatchQueueItemProps> = ({
  item,
  index,
  isActive,
  isProcessing,
  onDrag,
  onRemove,
}) => {
  const scale = useSharedValue(1);
  const backgroundColor = useSharedValue(colors.surface.primary);
  
  useEffect(() => {
    if (isActive) {
      scale.value = withSpring(1.02, animationConfig.springs.responsive);
      backgroundColor.value = withTiming(colors.surface.secondary, { duration: 150 });
    } else {
      scale.value = withSpring(1, animationConfig.springs.gentle);
      backgroundColor.value = withTiming(colors.surface.primary, { duration: 150 });
    }
  }, [isActive]);
  
  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
    backgroundColor: backgroundColor.value,
  }));
  
  const longPressGesture = Gesture.LongPress()
    .minDuration(200)
    .onStart(() => {
      runOnJS(triggerHaptic)('impactMedium');
      runOnJS(onDrag)();
    });
  
  return (
    <GestureDetector gesture={longPressGesture}>
      <Animated.View style={[styles.queueItem, animatedStyle]}>
        {/* Drag handle */}
        <View style={styles.dragHandle}>
          <Icon name="menu" set="Feather" size={20} color={colors.neutral[400]} />
        </View>
        
        {/* Thumbnail */}
        <VideoThumbnail
          uri={item.thumbnailUri}
          width={56}
          height={56}
          borderRadius={8}
        />
        
        {/* Content */}
        <View style={styles.queueItemContent}>
          <Text style={styles.queueItemTitle} numberOfLines={1}>
            {item.fileName}
          </Text>
          
          {item.status === 'pending' && (
            <Text style={styles.queueItemStatus}>Waiting...</Text>
          )}
          
          {item.status === 'processing' && (
            <View style={styles.progressContainer}>
              <AnimatedProgressBar progress={item.progress} />
              <Text style={styles.progressText}>
                {Math.round(item.progress * 100)}%
              </Text>
            </View>
          )}
          
          {item.status === 'completed' && (
            <View style={styles.completedRow}>
              <Text style={styles.sizeText}>
                {formatBytes(item.originalSize)} → {formatBytes(item.compressedSize)}
              </Text>
              <View style={styles.checkBadge}>
                <Icon name="check" set="Feather" size={12} color="#FFFFFF" />
              </View>
            </View>
          )}
          
          {item.status === 'error' && (
            <Text style={styles.errorText}>{item.errorMessage}</Text>
          )}
        </View>
        
        {/* Remove button */}
        {item.status !== 'processing' && (
          <TouchableOpacity onPress={onRemove} style={styles.removeButton}>
            <Icon name="x" set="Feather" size={18} color={colors.neutral[400]} />
          </TouchableOpacity>
        )}
      </Animated.View>
    </GestureDetector>
  );
};
```

### Gestures

| Gesture | Location | Action |
|---------|----------|--------|
| Long press + drag | Queue item | Reorder queue |
| Swipe left | Queue item | Remove from queue |
| Tap | Add button | Open video picker |

---

## 6.10 Export Screen

### Visual Design

┌────────────────────────────────┐
│ ← Export                       │
├────────────────────────────────┤
│                                │
│  ┌──────────────────────────┐  │
│  │                          │  │
│  │    [VIDEO THUMBNAIL]     │  │
│  │                          │  │
│  │    vacation_compressed   │  │
│  │    82 MB • 1080p • 2:34  │  │
│  └──────────────────────────┘  │
│                                │
│  Export To                     │
│  ┌─────────┐ ┌─────────┐      │
│  │  [◉]    │ │  [↗]    │      │
│  │ Photos  │ │ Share   │      │
│  └─────────┘ └─────────┘      │
│  ┌─────────┐ ┌─────────┐      │
│  │  [□]    │ │  [≡]    │      │
│  │ Files   │ │ AirDrop │      │
│  └─────────┘ └─────────┘      │
│                                │
│  Options                       │
│  ┌──────────────────────────┐  │
│  │ Filename                 │  │
│  │ [vacation_compressed   ] │  │
│  ├──────────────────────────┤  │
│  │ Include metadata    [●]  │  │
│  ├──────────────────────────┤  │
│  │ Notify on complete  [●]  │  │
│  └──────────────────────────┘  │
│                                │
│  ┌────────────────────────────┐│
│  │         Export Video       ││
│  └────────────────────────────┘│
│                                │
└────────────────────────────────┘

### Component Specifications

```typescript
const ExportScreen: React.FC<Props> = ({ route }) => {
  const { videoUri, metadata } = route.params;
  const [destination, setDestination] = useState<ExportDestination>('photos');
  const [filename, setFilename] = useState(metadata.filename);
  const [includeMetadata, setIncludeMetadata] = useState(true);
  const [notifyOnComplete, setNotifyOnComplete] = useState(true);
  const [isExporting, setIsExporting] = useState(false);
  const [exportProgress, setExportProgress] = useState(0);
  
  const handleExport = async () => {
    setIsExporting(true);
    try {
      await exportVideo({
        uri: videoUri,
        destination,
        filename,
        includeMetadata,
        onProgress: setExportProgress,
      });
      
      if (notifyOnComplete) {
        triggerHaptic('notificationSuccess');
      }
      
      navigateToSuccess();
    } catch (error) {
      handleExportError(error);
    } finally {
      setIsExporting(false);
    }
  };
  
  return (
    <SafeContainer>
      <Header title="Export" leftAction={<BackButton />} />
      
      <ScrollView style={styles.container}>
        {/* Video preview card */}
        <Animated.View
          entering={FadeInUp.springify()}
          style={styles.previewCard}
        >
          <VideoThumbnail
            uri={videoUri}
            width="100%"
            height={180}
            borderRadius={12}
          />
          <View style={styles.previewInfo}>
            <Text style={styles.previewTitle}>{filename}</Text>
            <Text style={styles.previewMeta}>
              {formatBytes(metadata.size)} • {metadata.resolution} • {formatDuration(metadata.duration)}
            </Text>
          </View>
        </Animated.View>
        
        {/* Destination selection */}
        <Text style={styles.sectionTitle}>Export To</Text>
        <View style={styles.destinationGrid}>
          {exportDestinations.map((dest) => (
            <DestinationButton
              key={dest.id}
              destination={dest}
              isSelected={destination === dest.id}
              onSelect={() => setDestination(dest.id)}
            />
          ))}
        </View>
        
        {/* Options */}
        <Text style={styles.sectionTitle}>Options</Text>
        <View style={styles.optionsContainer}>
          <View style={styles.filenameInput}>
            <Text style={styles.inputLabel}>Filename</Text>
            <TextInput
              value={filename}
              onChangeText={setFilename}
              style={styles.textInput}
              placeholder="Enter filename"
            />
          </View>
          
          <SettingsRow
            label="Include metadata"
            value={includeMetadata}
            type="toggle"
            onChange={setIncludeMetadata}
          />
          
          <SettingsRow
            label="Notify on complete"
            value={notifyOnComplete}
            type="toggle"
            onChange={setNotifyOnComplete}
          />
        </View>
      </ScrollView>
      
      {/* Export button / Progress */}
      <View style={styles.actionContainer}>
        {isExporting ? (
          <ExportProgressBar progress={exportProgress} />
        ) : (
          <Button
            variant="primary"
            label="Export Video"
            onPress={handleExport}
            icon={{ set: 'Feather', name: 'share' }}
          />
        )}
      </View>
    </SafeContainer>
  );
};

const DestinationButton: React.FC<DestinationButtonProps> = ({
  destination,
  isSelected,
  onSelect,
}) => {
  const scale = useSharedValue(1);
  const borderColor = useSharedValue(isSelected ? colors.primary[500] : 'transparent');
  const backgroundColor = useSharedValue(
    isSelected ? `${colors.primary[500]}10` : colors.surface.secondary
  );
  
  useEffect(() => {
    borderColor.value = withTiming(
      isSelected ? colors.primary[500] : 'transparent',
      { duration: 200 }
    );
    backgroundColor.value = withTiming(
      isSelected ? `${colors.primary[500]}10` : colors.surface.secondary,
      { duration: 200 }
    );
  }, [isSelected]);
  
  const gesture = Gesture.Tap()
    .onBegin(() => {
      scale.value = withSpring(0.95, animationConfig.springs.snappy);
    })
    .onFinalize((_, success) => {
      scale.value = withSpring(1, animationConfig.springs.bouncy);
      if (success) {
        runOnJS(triggerHaptic)('selection');
        runOnJS(onSelect)();
      }
    });
  
  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
    borderColor: borderColor.value,
    backgroundColor: backgroundColor.value,
  }));
  
  return (
    <GestureDetector gesture={gesture}>
      <Animated.View style={[styles.destinationButton, animatedStyle]}>
        <Icon
          {...destination.icon}
          size={28}
          color={isSelected ? colors.primary[500] : colors.neutral[500]}
        />
        <Text
          style={[
            styles.destinationLabel,
            isSelected && styles.destinationLabelActive,
          ]}
        >
          {destination.label}
        </Text>
      </Animated.View>
    </GestureDetector>
  );
};
```

---

# 7. Component Library

## 7.1 Common Components

### Button Component

```typescript
interface ButtonProps {
  variant: 'primary' | 'secondary' | 'ghost' | 'destructive';
  size: 'sm' | 'md' | 'lg';
  label: string;
  icon?: IconProps;
  iconPosition?: 'left' | 'right';
  disabled?: boolean;
  loading?: boolean;
  fullWidth?: boolean;
  onPress: () => void;
}

const Button: React.FC<ButtonProps> = ({
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
      runOnJS(triggerHaptic)('impactLight');
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
            <Icon {...icon} size={currentSize.fontSize + 2} style={styles.iconLeft} />
          )}
          <Text style={[currentVariant.text, { fontSize: currentSize.fontSize }]}>
            {label}
          </Text>
          {icon && iconPosition === 'right' && (
            <Icon {...icon} size={currentSize.fontSize + 2} style={styles.iconRight} />
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
        {content}
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
  fullWidth: {
    width: '100%',
  },
  primaryContainer: {
    backgroundColor: colors.primary[500],
    ...shadows.md,
  },
  primaryText: {
    color: '#FFFFFF',
    fontFamily: typography.fontFamily.semibold,
  },
  secondaryContainer: {
    backgroundColor: colors.surface.secondary,
    borderWidth: 1,
    borderColor: colors.border.default,
  },
  secondaryText: {
    color: colors.text.primary,
    fontFamily: typography.fontFamily.semibold,
  },
  ghostContainer: {
    backgroundColor: 'transparent',
  },
  ghostText: {
    color: colors.primary[500],
    fontFamily: typography.fontFamily.semibold,
  },
  destructiveContainer: {
    backgroundColor: colors.semantic.error,
  },
  destructiveText: {
    color: '#FFFFFF',
    fontFamily: typography.fontFamily.semibold,
  },
  iconLeft: {
    marginRight: spacing[2],
  },
  iconRight: {
    marginLeft: spacing[2],
  },
});
```

### Icon Button Component

```typescript
interface IconButtonProps {
  icon: IconProps;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'filled' | 'outlined' | 'ghost';
  color?: string;
  backgroundColor?: string;
  onPress: () => void;
  disabled?: boolean;
}

const IconButton: React.FC<IconButtonProps> = ({
  icon,
  size = 'md',
  variant = 'ghost',
  color,
  backgroundColor,
  onPress,
  disabled = false,
}) => {
  const scale = useSharedValue(1);
  const rotation = useSharedValue(0);
  
  const sizeMap = {
    sm: { container: 32, icon: 16 },
    md: { container: 44, icon: 22 },
    lg: { container: 56, icon: 28 },
  };
  
  const currentSize = sizeMap[size];
  
  const gesture = Gesture.Tap()
    .enabled(!disabled)
    .onBegin(() => {
      scale.value = withSpring(0.85, animationConfig.springs.snappy);
      runOnJS(triggerHaptic)('impactLight');
    })
    .onFinalize((_, success) => {
      scale.value = withSpring(1, animationConfig.springs.bouncy);
      if (success) {
        runOnJS(onPress)();
      }
    });
  
  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      { scale: scale.value },
      { rotate: `${rotation.value}deg` },
    ],
    opacity: disabled ? 0.5 : 1,
  }));
  
  return (
    <GestureDetector gesture={gesture}>
      <Animated.View
        style={[
          styles.iconButton,
          {
            width: currentSize.container,
            height: currentSize.container,
            borderRadius: currentSize.container / 2,
          },
          variant === 'filled' && {
            backgroundColor: backgroundColor || colors.primary[500],
          },
          variant === 'outlined' && {
            borderWidth: 1,
            borderColor: color || colors.border.default,
          },
          animatedStyle,
        ]}
      >
        <Icon
          {...icon}
          size={currentSize.icon}
          color={color || (variant === 'filled' ? '#FFFFFF' : colors.text.primary)}
        />
      </Animated.View>
    </GestureDetector>
  );
};
```

### Card Component

```typescript
interface CardProps {
  children: React.ReactNode;
  variant?: 'elevated' | 'outlined' | 'filled';
  padding?: keyof typeof spacing;
  onPress?: () => void;
  disabled?: boolean;
}

const Card: React.FC<CardProps> = ({
  children,
  variant = 'elevated',
  padding = 4,
  onPress,
  disabled = false,
}) => {
  const scale = useSharedValue(1);
  const shadowOpacity = useSharedValue(variant === 'elevated' ? 0.1 : 0);
  
  const gesture = onPress
    ? Gesture.Tap()
        .enabled(!disabled)
        .onBegin(() => {
          scale.value = withSpring(0.98, animationConfig.springs.responsive);
          shadowOpacity.value = withTiming(0.05, { duration: 100 });
        })
        .onFinalize((_, success) => {
          scale.value = withSpring(1, animationConfig.springs.bouncy);
          shadowOpacity.value = withTiming(0.1, { duration: 200 });
          if (success) {
            runOnJS(onPress)();
          }
        })
    : undefined;
  
  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
    shadowOpacity: shadowOpacity.value,
  }));
  
  const variantStyles = {
    elevated: {
      backgroundColor: colors.surface.primary,
      ...shadows.md,
    },
    outlined: {
      backgroundColor: colors.surface.primary,
      borderWidth: 1,
      borderColor: colors.border.subtle,
    },
    filled: {
      backgroundColor: colors.surface.secondary,
    },
  };
  
  const cardContent = (
    <Animated.View
      style={[
        styles.card,
        variantStyles[variant],
        { padding: spacing[padding] },
        animatedStyle,
      ]}
    >
      {children}
    </Animated.View>
  );
  
  if (gesture) {
    return <GestureDetector gesture={gesture}>{cardContent}</GestureDetector>;
  }
  
  return cardContent;
};

const styles = StyleSheet.create({
  card: {
    borderRadius: layout.borderRadius.xl,
    overflow: 'hidden',
  },
});
```

### Bottom Sheet Component

```typescript
interface BottomSheetProps {
  isVisible: boolean;
  onClose: () => void;
  snapPoints?: number[];
  children: React.ReactNode;
  showHandle?: boolean;
  enablePanDownToClose?: boolean;
}

const BottomSheet: React.FC<BottomSheetProps> = ({
  isVisible,
  onClose,
  snapPoints = [0.5, 0.9],
  children,
  showHandle = true,
  enablePanDownToClose = true,
}) => {
  const translateY = useSharedValue(SCREEN_HEIGHT);
  const backdropOpacity = useSharedValue(0);
  const currentSnapIndex = useSharedValue(0);
  const context = useSharedValue({ y: 0 });
  
  const snapPointsPixels = snapPoints.map((p) => SCREEN_HEIGHT * (1 - p));
  
  useEffect(() => {
    if (isVisible) {
      translateY.value = withSpring(
        snapPointsPixels[0],
        animationConfig.springs.responsive
      );
      backdropOpacity.value = withTiming(1, { duration: 300 });
    } else {
      translateY.value = withSpring(SCREEN_HEIGHT, animationConfig.springs.responsive);
      backdropOpacity.value = withTiming(0, { duration: 200 });
    }
  }, [isVisible]);
  
  const panGesture = Gesture.Pan()
    .onStart(() => {
      context.value = { y: translateY.value };
    })
    .onUpdate((event) => {
      translateY.value = Math.max(
        context.value.y + event.translationY,
        snapPointsPixels[snapPointsPixels.length - 1]
      );
      
      backdropOpacity.value = interpolate(
        translateY.value,
        [snapPointsPixels[0], SCREEN_HEIGHT],
        [1, 0],
        Extrapolation.CLAMP
      );
    })
    .onEnd((event) => {
      // Find nearest snap point
      const velocityThreshold = 500;
      let targetSnap: number;
      
      if (event.velocityY > velocityThreshold && enablePanDownToClose) {
        // Fast swipe down - close
        targetSnap = SCREEN_HEIGHT;
        runOnJS(onClose)();
      } else if (event.velocityY < -velocityThreshold) {
        // Fast swipe up - go to highest snap point
        targetSnap = snapPointsPixels[snapPointsPixels.length - 1];
      } else {
        // Find nearest snap point
        const distances = snapPointsPixels.map((p) =>
          Math.abs(translateY.value - p)
        );
        const closestIndex = distances.indexOf(Math.min(...distances));
        
        if (
          enablePanDownToClose &&
          translateY.value > snapPointsPixels[0] + 100
        ) {
          targetSnap = SCREEN_HEIGHT;
          runOnJS(onClose)();
        } else {
          targetSnap = snapPointsPixels[closestIndex];
        }
      }
      
      translateY.value = withSpring(targetSnap, animationConfig.springs.snappy);
      backdropOpacity.value = withTiming(
        targetSnap === SCREEN_HEIGHT ? 0 : 1,
        { duration: 200 }
      );
    });
  
  const sheetStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }],
  }));
  
  const backdropStyle = useAnimatedStyle(() => ({
    opacity: backdropOpacity.value,
    pointerEvents: backdropOpacity.value > 0 ? 'auto' : 'none',
  }));
  
  return (
    <Portal>
      {/* Backdrop */}
      <Animated.View style={[styles.backdrop, backdropStyle]}>
        <Pressable style={StyleSheet.absoluteFill} onPress={onClose} />
      </Animated.View>
      
      {/* Sheet */}
      <GestureDetector gesture={panGesture}>
        <Animated.View style={[styles.sheet, sheetStyle]}>
          {showHandle && (
            <View style={styles.handleContainer}>
              <View style={styles.handle} />
            </View>
          )}
          {children}
        </Animated.View>
      </GestureDetector>
    </Portal>
  );
};

const styles = StyleSheet.create({
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  sheet: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: SCREEN_HEIGHT,
    backgroundColor: colors.background.primary,
    borderTopLeftRadius: layout.borderRadius['2xl'],
    borderTopRightRadius: layout.borderRadius['2xl'],
    ...shadows.xl,
  },
  handleContainer: {
    alignItems: 'center',
    paddingVertical: spacing[3],
  },
  handle: {
    width: 36,
    height: 4,
    borderRadius: 2,
    backgroundColor: colors.neutral[300],
  },
});
```

### Animated Switch Component

```typescript
interface AnimatedSwitchProps {
  value: boolean;
  onValueChange: (value: boolean) => void;
  disabled?: boolean;
}

const AnimatedSwitch: React.FC<AnimatedSwitchProps> = ({
  value,
  onValueChange,
  disabled = false,
}) => {
  const translateX = useSharedValue(value ? 20 : 0);
  const backgroundColor = useSharedValue(
    value ? colors.primary[500] : colors.neutral[300]
  );
  const thumbScale = useSharedValue(1);
  
  useEffect(() => {
    translateX.value = withSpring(value ? 20 : 0, animationConfig.springs.snappy);
    backgroundColor.value = withTiming(
      value ? colors.primary[500] : colors.neutral[300],
      { duration: 200 }
    );
  }, [value]);
  
  const gesture = Gesture.Tap()
    .enabled(!disabled)
    .onBegin(() => {
      thumbScale.value = withSpring(0.9, animationConfig.springs.snappy);
    })
    .onFinalize((_, success) => {
      thumbScale.value = withSpring(1, animationConfig.springs.bouncy);
      if (success) {
        runOnJS(triggerHaptic)('impactLight');
        runOnJS(onValueChange)(!value);
      }
    });
  
  const trackStyle = useAnimatedStyle(() => ({
    backgroundColor: backgroundColor.value,
    opacity: disabled ? 0.5 : 1,
  }));
  
  const thumbStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: translateX.value },
      { scale: thumbScale.value },
    ],
  }));
  
  return (
    <GestureDetector gesture={gesture}>
      <Animated.View style={[styles.track, trackStyle]}>
        <Animated.View style={[styles.thumb, thumbStyle]}>
          <Canvas style={styles.thumbCanvas}>
            <Circle cx={12} cy={12} r={12} color="#FFFFFF" />
            <Shadow dx={0} dy={1} blur={3} color="rgba(0,0,0,0.2)" />
          </Canvas>
        </Animated.View>
      </Animated.View>
    </GestureDetector>
  );
};

const styles = StyleSheet.create({
  track: {
    width: 48,
    height: 28,
    borderRadius: 14,
    justifyContent: 'center',
    paddingHorizontal: 2,
  },
  thumb: {
    width: 24,
    height: 24,
  },
  thumbCanvas: {
    width: 24,
    height: 24,
  },
});
```

### Progress Bar Component

```typescript
interface ProgressBarProps {
  progress: number; // 0-1
  variant?: 'default' | 'gradient' | 'striped';
  height?: number;
  showLabel?: boolean;
  animated?: boolean;
}

const ProgressBar: React.FC<ProgressBarProps> = ({
  progress,
  variant = 'default',
  height = 8,
  showLabel = false,
  animated = true,
}) => {
  const animatedProgress = useSharedValue(0);
  const stripeOffset = useSharedValue(0);
  
  useEffect(() => {
    if (animated) {
      animatedProgress.value = withSpring(progress, animationConfig.springs.gentle);
    } else {
      animatedProgress.value = progress;
    }
  }, [progress, animated]);
  
  // Stripe animation
  useEffect(() => {
    if (variant === 'striped') {
      stripeOffset.value = withRepeat(
        withTiming(20, { duration: 1000, easing: Easing.linear }),
        -1,
        false
      );
    }
  }, [variant]);
  
  const progressStyle = useAnimatedStyle(() => ({
    width: `${animatedProgress.value * 100}%`,
  }));
  
  return (
    <View style={styles.container}>
      <View style={[styles.track, { height }]}>
        <Animated.View style={[styles.progress, progressStyle]}>
          {variant === 'gradient' && (
            <LinearGradient
              colors={colors.gradients.primary}
              style={StyleSheet.absoluteFill}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
            />
          )}
          {variant === 'striped' && (
            <Canvas style={StyleSheet.absoluteFill}>
              <Group>
                <Rect x={0} y={0} width="100%" height={height}>
                  <LinearGradient
                    start={vec(0, 0)}
                    end={vec(100, 0)}
                    colors={colors.gradients.primary}
                  />
                </Rect>
                {/* Stripe pattern */}
                <StripedPattern offset={stripeOffset} height={height} />
              </Group>
            </Canvas>
          )}
          {variant === 'default' && (
            <View
              style={[
                StyleSheet.absoluteFill,
                { backgroundColor: colors.primary[500] },
              ]}
            />
          )}
        </Animated.View>
      </View>
      
      {showLabel && (
        <ReText
          text={useDerivedValue(() => `${Math.round(animatedProgress.value * 100)}%`)}
          style={styles.label}
        />
      )}
    </View>
  );
};
```

### Video Thumbnail Component

```typescript
interface VideoThumbnailProps {
  uri: string;
  width: number | string;
  height: number;
  borderRadius?: number;
  showDuration?: boolean;
  duration?: number;
  showPlayIcon?: boolean;
  onPress?: () => void;
}

const VideoThumbnail: React.FC<VideoThumbnailProps> = ({
  uri,
  width,
  height,
  borderRadius = 8,
  showDuration = false,
  duration,
  showPlayIcon = false,
  onPress,
}) => {
  const scale = useSharedValue(1);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  
  const gesture = onPress
    ? Gesture.Tap()
        .onBegin(() => {
          scale.value = withSpring(0.95, animationConfig.springs.snappy);
        })
        .onFinalize((_, success) => {
          scale.value = withSpring(1, animationConfig.springs.bouncy);
          if (success) {
            runOnJS(onPress)();
          }
        })
    : undefined;
  
  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));
  
  const content = (
    <Animated.View
      style={[
        styles.container,
        { width, height, borderRadius },
        animatedStyle,
      ]}
    >
      {isLoading && (
        <View style={styles.skeleton}>
          <SkeletonLoader width="100%" height="100%" />
        </View>
      )}
      
      {hasError ? (
        <View style={styles.errorContainer}>
          <Icon
            name="image"
            set="Feather"
            size={24}
            color={colors.neutral[400]}
          />
        </View>
      ) : (
        <FastImage
          source={{ uri }}
          style={styles.image}
          resizeMode="cover"
          onLoadStart={() => setIsLoading(true)}
          onLoadEnd={() => setIsLoading(false)}
          onError={() => {
            setIsLoading(false);
            setHasError(true);
          }}
        />
      )}
      
      {/* Gradient overlay */}
      {(showDuration || showPlayIcon) && (
        <LinearGradient
          colors={['transparent', 'rgba(0,0,0,0.6)']}
          style={styles.gradient}
        />
      )}
      
      {/* Duration badge */}
      {showDuration && duration && (
        <View style={styles.durationBadge}>
          <Text style={styles.durationText}>{formatDuration(duration)}</Text>
        </View>
      )}
      
      {/* Play icon */}
      {showPlayIcon && (
        <View style={styles.playIcon}>
          <Icon name="play" set="Feather" size={20} color="#FFFFFF" />
        </View>
      )}
    </Animated.View>
  );
  
  if (gesture) {
    return <GestureDetector gesture={gesture}>{content}</GestureDetector>;
  }
  
  return content;
};

const styles = StyleSheet.create({
  container: {
    overflow: 'hidden',
    backgroundColor: colors.surface.secondary,
  },
  image: {
    ...StyleSheet.absoluteFillObject,
  },
  skeleton: {
    ...StyleSheet.absoluteFillObject,
  },
  errorContainer: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.surface.secondary,
  },
  gradient: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: '50%',
  },
  durationBadge: {
    position: 'absolute',
    bottom: spacing[1],
    right: spacing[1],
    paddingHorizontal: spacing[1.5],
    paddingVertical: spacing[0.5],
    borderRadius: layout.borderRadius.sm,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  },
  durationText: {
    ...textStyles.caption,
    color: '#FFFFFF',
  },
  playIcon: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    width: 40,
    height: 40,
    marginLeft: -20,
    marginTop: -20,
    borderRadius: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
```

## 7.2 Skeleton Loader Component

```typescript
interface SkeletonLoaderProps {
  width: number | string;
  height: number | string;
  borderRadius?: number;
  variant?: 'rectangular' | 'circular' | 'text';
}

const SkeletonLoader: React.FC<SkeletonLoaderProps> = ({
  width,
  height,
  borderRadius = layout.borderRadius.md,
  variant = 'rectangular',
}) => {
  const shimmerTranslate = useSharedValue(-1);
  
  useEffect(() => {
    shimmerTranslate.value = withRepeat(
      withTiming(1, { duration: 1500, easing: Easing.linear }),
      -1,
      false
    );
  }, []);
  
  const calculatedBorderRadius =
    variant === 'circular'
      ? typeof width === 'number'
        ? width / 2
        : 9999
      : variant === 'text'
      ? layout.borderRadius.sm
      : borderRadius;
  
  return (
    <View
      style={[
        styles.skeleton,
        {
          width,
          height,
          borderRadius: calculatedBorderRadius,
        },
      ]}
    >
      <Canvas style={StyleSheet.absoluteFill}>
        <Rect x={0} y={0} width="100%" height="100%">
          <LinearGradient
            start={vec(0, 0)}
            end={vec(typeof width === 'number' ? width : 200, 0)}
            colors={[
              colors.surface.secondary,
              colors.surface.tertiary,
              colors.surface.secondary,
            ]}
            positions={useDerivedValue(() => [
              shimmerTranslate.value - 0.3,
              shimmerTranslate.value,
              shimmerTranslate.value + 0.3,
            ])}
          />
        </Rect>
      </Canvas>
    </View>
  );
};

const styles = StyleSheet.create({
  skeleton: {
    overflow: 'hidden',
    backgroundColor: colors.surface.secondary,
  },
});
```

---

# 8. Gesture System

## 8.1 Core Gesture Patterns

### Swipe Navigation

```typescript
const useSwipeNavigation = (options: SwipeNavigationOptions = {}) => {
  const {
    onSwipeLeft,
    onSwipeRight,
    onSwipeUp,
    onSwipeDown,
    threshold = 50,
    velocityThreshold = 500,
  } = options;
  
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);
  
  const gesture = Gesture.Pan()
    .onUpdate((event) => {
      translateX.value = event.translationX;
      translateY.value = event.translationY;
    })
    .onEnd((event) => {
      const { translationX, translationY, velocityX, velocityY } = event;
      
      // Determine primary direction
      const isHorizontal = Math.abs(translationX) > Math.abs(translationY);
      
      if (isHorizontal) {
        if (translationX < -threshold || velocityX < -velocityThreshold) {
          onSwipeLeft?.();
        } else if (translationX > threshold || velocityX > velocityThreshold) {
          onSwipeRight?.();
        }
      } else {
        if (translationY < -threshold || velocityY < -velocityThreshold) {
          onSwipeUp?.();
        } else if (translationY > threshold || velocityY > velocityThreshold) {
          onSwipeDown?.();
        }
      }
      
      // Reset position
      translateX.value = withSpring(0, animationConfig.springs.responsive);
      translateY.value = withSpring(0, animationConfig.springs.responsive);
    });
  
  return {
    gesture,
    translateX,
    translateY,
  };
};
```

### Pull to Refresh

```typescript
const usePullToRefresh = (onRefresh: () => Promise<void>) => {
  const translateY = useSharedValue(0);
  const isRefreshing = useSharedValue(false);
  const refreshProgress = useSharedValue(0);
  
  const THRESHOLD = 80;
  
  const gesture = Gesture.Pan()
    .onUpdate((event) => {
      if (isRefreshing.value) return;
      
      if (event.translationY > 0) {
        // Apply resistance
        translateY.value = Math.pow(event.translationY, 0.7);
        refreshProgress.value = Math.min(translateY.value / THRESHOLD, 1);
      }
    })
    .onEnd(async () => {
      if (isRefreshing.value) return;
      
      if (translateY.value >= THRESHOLD) {
        isRefreshing.value = true;
        translateY.value = withSpring(THRESHOLD, animationConfig.springs.gentle);
        
        runOnJS(triggerHaptic)('impactMedium');
        await runOnJS(onRefresh)();
        
        isRefreshing.value = false;
        translateY.value = withSpring(0, animationConfig.springs.responsive);
        refreshProgress.value = withTiming(0, { duration: 200 });
      } else {
        translateY.value = withSpring(0, animationConfig.springs.responsive);
        refreshProgress.value = withTiming(0, { duration: 200 });
      }
    });
  
  return {
    gesture,
    translateY,
    isRefreshing,
    refreshProgress,
  };
};
```

### Pinch to Zoom

```typescript
const usePinchToZoom = (options: PinchOptions = {}) => {
  const { minScale = 1, maxScale = 4, onScaleChange } = options;
  
  const scale = useSharedValue(1);
  const savedScale = useSharedValue(1);
  const focalX = useSharedValue(0);
  const focalY = useSharedValue(0);
  
  const pinchGesture = Gesture.Pinch()
    .onStart(() => {
      savedScale.value = scale.value;
    })
    .onUpdate((event) => {
      const newScale = savedScale.value * event.scale;
      scale.value = Math.min(Math.max(newScale, minScale), maxScale);
      focalX.value = event.focalX;
      focalY.value = event.focalY;
      
      if (onScaleChange) {
        runOnJS(onScaleChange)(scale.value);
      }
    })
    .onEnd(() => {
      if (scale.value < minScale) {
        scale.value = withSpring(minScale, animationConfig.springs.responsive);
      } else if (scale.value > maxScale) {
        scale.value = withSpring(maxScale, animationConfig.springs.responsive);
      }
    });
  
  const doubleTapGesture = Gesture.Tap()
    .numberOfTaps(2)
    .onEnd((event) => {
      if (scale.value > 1) {
        scale.value = withSpring(1, animationConfig.springs.responsive);
      } else {
        scale.value = withSpring(2, animationConfig.springs.responsive);
        focalX.value = event.x;
        focalY.value = event.y;
      }
      runOnJS(triggerHaptic)('impactLight');
    });
  
  const composedGesture = Gesture.Simultaneous(pinchGesture, doubleTapGesture);
  
  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: focalX.value },
      { translateY: focalY.value },
      { scale: scale.value },
      { translateX: -focalX.value },
      { translateY: -focalY.value },
    ],
  }));
  
  return {
    gesture: composedGesture,
    scale,
    animatedStyle,
    reset: () => {
      scale.value = withSpring(1, animationConfig.springs.responsive);
    },
  };
};
```

### Long Press with Context Menu

```typescript
const useLongPressMenu = <T extends object>(
  items: T[],
  renderMenu: (item: T, position: { x: number; y: number }) => void
) => {
  const pressedIndex = useSharedValue(-1);
  const menuPosition = useSharedValue({ x: 0, y: 0 });
  
  const createGesture = (index: number) => {
    return Gesture.LongPress()
      .minDuration(400)
      .onStart((event) => {
        pressedIndex.value = index;
        menuPosition.value = { x: event.absoluteX, y: event.absoluteY };
        runOnJS(triggerHaptic)('impactHeavy');
        runOnJS(renderMenu)(items[index], { x: event.absoluteX, y: event.absoluteY });
      })
      .onEnd(() => {
        pressedIndex.value = -1;
      });
  };
  
  const getItemAnimatedStyle = (index: number) => {
    return useAnimatedStyle(() => ({
      transform: [
        {
          scale: pressedIndex.value === index
            ? withSpring(0.95, animationConfig.springs.snappy)
            : withSpring(1, animationConfig.springs.gentle),
        },
      ],
    }));
  };
  
  return {
    createGesture,
    getItemAnimatedStyle,
    pressedIndex,
  };
};
```

## 8.2 Gesture Configuration

```typescript
const gestureConfig = {
  // Thresholds
  swipeThreshold: 50,
  swipeVelocityThreshold: 500,
  longPressDuration: 400,
  doubleTapMaxDelay: 300,
  
  // Pull to refresh
  pullToRefreshThreshold: 80,
  pullToRefreshResistance: 0.7,
  
  // Pinch
  pinchMinScale: 1,
  pinchMaxScale: 4,
  
  // Haptic feedback
  hapticFeedback: {
    selection: 'selection',
    impactLight: 'impactLight',
    impactMedium: 'impactMedium',
    impactHeavy: 'impactHeavy',
    notificationSuccess: 'notificationSuccess',
    notificationWarning: 'notificationWarning',
    notificationError: 'notificationError',
  },
};
```

---

# 9. Navigation Architecture

## 9.1 Navigation Structure

```typescript
// Navigation Types
type RootStackParamList = {
  Splash: undefined;
  Main: undefined;
  Compression: { videoUri: string; videoId: string };
  Preview: { originalUri: string; compressedUri: string; metadata: VideoMetadata };
  Trimming: { videoUri: string; duration: number };
  Export: { videoUri: string; metadata: VideoMetadata };
  PresetDetail: { presetId: string };
};

type MainTabParamList = {
  Home: undefined;
  History: undefined;
  Settings: undefined;
};

type HomeStackParamList = {
  HomeMain: undefined;
  Import: undefined;
  Batch: undefined;
};

// Root Navigator
const RootNavigator: React.FC = () => {
  const [isReady, setIsReady] = useState(false);
  
  return (
    <NavigationContainer
      onReady={() => setIsReady(true)}
      theme={navigationTheme}
    >
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          gestureEnabled: true,
          ...screenTransitionConfig,
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
          options={slideFromRightTransition}
        />
        <Stack.Screen
          name="Preview"
          component={PreviewScreen}
          options={slideFromRightTransition}
        />
        <Stack.Screen
          name="Trimming"
          component={TrimmingScreen}
          options={modalTransition}
        />
        <Stack.Screen
          name="Export"
          component={ExportScreen}
          options={slideFromBottomTransition}
        />
        <Stack.Screen
          name="PresetDetail"
          component={PresetDetailScreen}
          options={slideFromRightTransition}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

// Tab Navigator
const MainTabNavigator: React.FC = () => {
  return (
    <Tab.Navigator
      tabBar={(props) => <AnimatedTabBar {...props} />}
      screenOptions={{
        headerShown: false,
        lazy: true,
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeStackNavigator}
        options={{
          tabBarIcon: ({ focused }) => (
            <Icon
              name="home"
              set="Feather"
              size={24}
              color={focused ? colors.primary[500] : colors.neutral[400]}
            />
          ),
        }}
      />
      <Tab.Screen
        name="History"
        component={HistoryScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <Icon
              name="clock"
              set="Feather"
              size={24}
              color={focused ? colors.primary[500] : colors.neutral[400]}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <Icon
              name="settings"
              set="Feather"
              size={24}
              color={focused ? colors.primary[500] : colors.neutral[400]}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

// Home Stack Navigator
const HomeStackNavigator: React.FC = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        ...slideFromRightTransition,
      }}
    >
      <Stack.Screen name="HomeMain" component={HomeScreen} />
      <Stack.Screen
        name="Import"
        component={ImportScreen}
        options={modalTransition}
      />
      <Stack.Screen name="Batch" component={BatchScreen} />
    </Stack.Navigator>
  );
};
```

## 9.2 Navigation Theme

```typescript
const navigationTheme: Theme = {
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
```

## 9.3 Transition Configurations

```typescript
const slideFromRightTransition: StackNavigationOptions = {
  gestureEnabled: true,
  gestureDirection: 'horizontal',
  transitionSpec: {
    open: {
      animation: 'spring',
      config: animationConfig.springs.responsive,
    },
    close: {
      animation: 'spring',
      config: animationConfig.springs.responsive,
    },
  },
  cardStyleInterpolator: ({ current, next, layouts }) => ({
    cardStyle: {
      transform: [
        {
          translateX: current.progress.interpolate({
            inputRange: [0, 1],
            outputRange: [layouts.screen.width, 0],
          }),
        },
        {
          scale: next
            ? next.progress.interpolate({
                inputRange: [0, 1],
                outputRange: [1, 0.95],
              })
            : 1,
        },
      ],
      opacity: current.progress,
    },
    overlayStyle: {
      opacity: current.progress.interpolate({
        inputRange: [0, 1],
        outputRange: [0, 0.3],
      }),
    },
  }),
};

const modalTransition: StackNavigationOptions = {
  gestureEnabled: true,
  gestureDirection: 'vertical',
  presentation: 'modal',
  cardOverlayEnabled: true,
  transitionSpec: {
    open: {
      animation: 'spring',
      config: animationConfig.springs.responsive,
    },
    close: {
      animation: 'spring',
      config: animationConfig.springs.snappy,
    },
  },
  cardStyleInterpolator: ({ current, layouts }) => ({
    cardStyle: {
      transform: [
        {
          translateY: current.progress.interpolate({
            inputRange: [0, 1],
            outputRange: [layouts.screen.height, 0],
          }),
        },
      ],
      borderTopLeftRadius: current.progress.interpolate({
        inputRange: [0, 1],
        outputRange: [24, 0],
      }),
      borderTopRightRadius: current.progress.interpolate({
        inputRange: [0, 1],
        outputRange: [24, 0],
      }),
    },
    overlayStyle: {
      opacity: current.progress.interpolate({
        inputRange: [0, 1],
        outputRange: [0, 0.5],
      }),
    },
  }),
};

const slideFromBottomTransition: StackNavigationOptions = {
  gestureEnabled: true,
  gestureDirection: 'vertical',
  transitionSpec: {
    open: {
      animation: 'spring',
      config: animationConfig.springs.responsive,
    },
    close: {
      animation: 'spring',
      config: animationConfig.springs.snappy,
    },
  },
  cardStyleInterpolator: ({ current, layouts }) => ({
    cardStyle: {
      transform: [
        {
          translateY: current.progress.interpolate({
            inputRange: [0, 1],
            outputRange: [layouts.screen.height * 0.3, 0],
          }),
        },
      ],
      opacity: current.progress,
    },
  }),
};
```

---

# 10. Offline Architecture

## 10.1 Storage Strategy

```typescript
// Storage configuration
const storageConfig = {
  // MMKV for fast key-value storage
  mmkv: {
    id: 'shrynk-storage',
    encryptionKey: 'shrynk-secure-key',
  },
  
  // File system paths
  paths: {
    temp: `${RNFS.TemporaryDirectoryPath}/shrynk`,
    cache: `${RNFS.CachesDirectoryPath}/shrynk`,
    documents: `${RNFS.DocumentDirectoryPath}/shrynk`,
    thumbnails: `${RNFS.CachesDirectoryPath}/shrynk/thumbnails`,
    compressed: `${RNFS.DocumentDirectoryPath}/shrynk/compressed`,
  },
  
  // Cache limits
  cache: {
    maxThumbnails: 500,
    maxThumbnailSize: 100 * 1024 * 1024, // 100MB
    maxTempFiles: 3,
  },
};

// Storage Service
class StorageService {
  private mmkv: MMKV;
  
  constructor() {
    this.mmkv = new MMKV(storageConfig.mmkv);
    this.initializeDirectories();
  }
  
  private async initializeDirectories(): Promise<void> {
    const paths = Object.values(storageConfig.paths);
    for (const path of paths) {
      const exists = await RNFS.exists(path);
      if (!exists) {
        await RNFS.mkdir(path);
      }
    }
  }
  
  // Key-value storage
  set<T>(key: string, value: T): void {
    this.mmkv.set(key, JSON.stringify(value));
  }
  
  get<T>(key: string, defaultValue?: T): T | undefined {
    const value = this.mmkv.getString(key);
    if (value) {
      return JSON.parse(value) as T;
    }
    return defaultValue;
  }
  
  delete(key: string): void {
    this.mmkv.delete(key);
  }
  
  // File operations
  async saveFile(data: string, filename: string, directory: keyof typeof storageConfig.paths): Promise<string> {
    const path = `${storageConfig.paths[directory]}/${filename}`;
    await RNFS.writeFile(path, data, 'utf8');
    return path;
  }
  
  async readFile(path: string): Promise<string> {
    return RNFS.readFile(path, 'utf8');
  }
  
  async deleteFile(path: string): Promise<void> {
    const exists = await RNFS.exists(path);
    if (exists) {
      await RNFS.unlink(path);
    }
  }
  
  async moveFile(source: string, destination: string): Promise<void> {
    await RNFS.moveFile(source, destination);
  }
  
  async copyFile(source: string, destination: string): Promise<void> {
    await RNFS.copyFile(source, destination);
  }
  
  // Cache management
  async clearCache(): Promise<void> {
    const cachePath = storageConfig.paths.cache;
    const exists = await RNFS.exists(cachePath);
    if (exists) {
      await RNFS.unlink(cachePath);
      await RNFS.mkdir(cachePath);
    }
  }
  
  async getCacheSize(): Promise<number> {
    return this.getDirectorySize(storageConfig.paths.cache);
  }
  
  private async getDirectorySize(path: string): Promise<number> {
    const items = await RNFS.readDir(path);
    let totalSize = 0;
    
    for (const item of items) {
      if (item.isDirectory()) {
        totalSize += await this.getDirectorySize(item.path);
      } else {
        totalSize += parseInt(item.size, 10);
      }
    }
    
    return totalSize;
  }
}

export const storage = new StorageService();
```

## 10.2 Offline Data Persistence

```typescript
// History persistence
interface PersistedHistory {
  items: CompressionRecord[];
  lastUpdated: string;
}

const persistHistory = (history: CompressionRecord[]): void => {
  storage.set<PersistedHistory>('history', {
    items: history,
    lastUpdated: new Date().toISOString(),
  });
};

const loadHistory = (): CompressionRecord[] => {
  const persisted = storage.get<PersistedHistory>('history');
  return persisted?.items ?? [];
};

// Settings persistence
const persistSettings = (settings: AppSettings): void => {
  storage.set('settings', settings);
};

const loadSettings = (): AppSettings => {
  return storage.get<AppSettings>('settings') ?? defaultSettings;
};

// Presets persistence
const persistPresets = (presets: CompressionPreset[]): void => {
  storage.set('presets', presets);
};

const loadPresets = (): CompressionPreset[] => {
  return storage.get<CompressionPreset[]>('presets') ?? defaultPresets;
};
```

## 10.3 Video File Management

```typescript
class VideoFileManager {
  async importVideo(sourceUri: string): Promise<ImportedVideo> {
    const filename = this.generateUniqueFilename(sourceUri);
    const destinationPath = `${storageConfig.paths.temp}/${filename}`;
    
    // Copy to app's temp directory
    await RNFS.copyFile(sourceUri, destinationPath);
    
    // Generate thumbnail
    const thumbnailPath = await this.generateThumbnail(destinationPath);
    
    // Extract metadata
    const metadata = await this.extractMetadata(destinationPath);
    
    return {
      id: generateId(),
      uri: destinationPath,
      thumbnailUri: thumbnailPath,
      metadata,
      importedAt: new Date().toISOString(),
    };
  }
  
  async saveCompressedVideo(
    tempUri: string,
    originalName: string
  ): Promise<SavedVideo> {
    const filename = this.generateCompressedFilename(originalName);
    const destinationPath = `${storageConfig.paths.compressed}/${filename}`;
    
    await RNFS.moveFile(tempUri, destinationPath);
    
    const thumbnailPath = await this.generateThumbnail(destinationPath);
    const metadata = await this.extractMetadata(destinationPath);
    
    return {
      id: generateId(),
      uri: destinationPath,
      thumbnailUri: thumbnailPath,
      metadata,
      savedAt: new Date().toISOString(),
    };
  }
  
  async deleteVideo(uri: string): Promise<void> {
    await storage.deleteFile(uri);
    
    // Also delete associated thumbnail
    const thumbnailPath = this.getThumbnailPath(uri);
    await storage.deleteFile(thumbnailPath);
  }
  
  async generateThumbnail(videoUri: string): Promise<string> {
    const thumbnailFilename = `${this.getBasename(videoUri)}_thumb.jpg`;
    const thumbnailPath = `${storageConfig.paths.thumbnails}/${thumbnailFilename}`;
    
    await FFmpegKit.execute(
      `-i "${videoUri}" -ss 00:00:01 -vframes 1 -q:v 2 -vf scale=320:-1 "${thumbnailPath}"`
    );
    
    return thumbnailPath;
  }
  
  async extractMetadata(videoUri: string): Promise<VideoMetadata> {
    const session = await FFprobeKit.getMediaInformation(videoUri);
    const info = session.getMediaInformation();
    
    const videoStream = info.getStreams().find(
      (s: any) => s.getType() === 'video'
    );
    
    return {
      duration: parseFloat(info.getDuration()),
      size: parseInt(info.getSize(), 10),
      width: videoStream?.getWidth() ?? 0,
      height: videoStream?.getHeight() ?? 0,
      bitrate: parseInt(info.getBitrate(), 10),
      codec: videoStream?.getCodec() ?? 'unknown',
      fps: this.parseFps(videoStream?.getAverageFrameRate()),
    };
  }
  
  private generateUniqueFilename(uri: string): string {
    const extension = this.getExtension(uri);
    return `import_${Date.now()}_${generateId()}.${extension}`;
  }
  
  private generateCompressedFilename(originalName: string): string {
    const basename = this.getBasename(originalName);
    const extension = this.getExtension(originalName);
    return `${basename}_compressed_${Date.now()}.${extension}`;
  }
  
  private getBasename(path: string): string {
    return path.split('/').pop()?.split('.')[0] ?? 'video';
  }
  
  private getExtension(path: string): string {
    return path.split('.').pop() ?? 'mp4';
  }
  
  private getThumbnailPath(videoUri: string): string {
    const basename = this.getBasename(videoUri);
    return `${storageConfig.paths.thumbnails}/${basename}_thumb.jpg`;
  }
  
  private parseFps(frameRate?: string): number {
    if (!frameRate) return 30;
    const parts = frameRate.split('/');
    if (parts.length === 2) {
      return Math.round(parseInt(parts[0], 10) / parseInt(parts[1], 10));
    }
    return parseFloat(frameRate) || 30;
  }
}

export const videoFileManager = new VideoFileManager();
```

---

# 11. Compression Engine

## 11.1 FFmpeg Integration

```typescript
class CompressionEngine {
  private currentSession: FFmpegSession | null = null;
  
  async compress(
    inputUri: string,
    options: CompressionOptions,
    onProgress?: (progress: number) => void
  ): Promise<CompressionResult> {
    const outputUri = this.generateOutputPath(inputUri);
    const command = this.buildFFmpegCommand(inputUri, outputUri, options);
    
    return new Promise((resolve, reject) => {
      FFmpegKit.executeAsync(
        command,
        async (session) => {
          const returnCode = await session.getReturnCode();
          
          if (ReturnCode.isSuccess(returnCode)) {
            const metadata = await videoFileManager.extractMetadata(outputUri);
            resolve({
              success: true,
              outputUri,
              metadata,
            });
          } else if (ReturnCode.isCancel(returnCode)) {
            reject(new Error('Compression cancelled'));
          } else {
            const logs = await session.getOutput();
            reject(new Error(`Compression failed: ${logs}`));
          }
          
          this.currentSession = null;
        },
        (log) => {
          // Log callback
          console.log(log.getMessage());
        },
        (statistics) => {
          // Progress callback
          if (onProgress && options.duration) {
            const time = statistics.getTime();
            const progress = Math.min(time / (options.duration * 1000), 1);
            onProgress(progress);
          }
        }
      ).then((session) => {
        this.currentSession = session;
      });
    });
  }
  
  async cancel(): Promise<void> {
    if (this.currentSession) {
      await FFmpegKit.cancel(this.currentSession.getSessionId());
      this.currentSession = null;
    }
  }
  
  private buildFFmpegCommand(
    inputUri: string,
    outputUri: string,
    options: CompressionOptions
  ): string {
    const parts: string[] = [
      `-i "${inputUri}"`,
    ];
    
    // Video codec
    if (options.codec === 'h265') {
      parts.push('-c:v libx265');
      parts.push('-tag:v hvc1'); // For iOS compatibility
    } else {
      parts.push('-c:v libx264');
    }
    
    // Quality/CRF
    const crf = this.qualityToCrf(options.quality);
    parts.push(`-crf ${crf}`);
    
    // Resolution
    if (options.resolution) {
      const scale = this.getScaleFilter(options.resolution);
      parts.push(`-vf "${scale}"`);
    }
    
    // Frame rate
    if (options.fps) {
      parts.push(`-r ${options.fps}`);
    }
    
    // Bitrate (optional, overrides CRF)
    if (options.targetBitrate) {
      parts.push(`-b:v ${options.targetBitrate}k`);
      parts.push(`-maxrate ${options.targetBitrate * 1.5}k`);
      parts.push(`-bufsize ${options.targetBitrate * 2}k`);
    }
    
    // Audio
    if (options.removeAudio) {
      parts.push('-an');
    } else {
      parts.push('-c:a aac');
      parts.push(`-b:a ${options.audioBitrate || 128}k`);
    }
    
    // Metadata
    if (!options.preserveMetadata) {
      parts.push('-map_metadata -1');
    }
    
    // Preset (encoding speed vs compression ratio)
    parts.push(`-preset ${options.encodingSpeed || 'medium'}`);
    
    // Hardware acceleration (iOS)
    if (options.useHardwareAcceleration) {
      parts.push('-hwaccel videotoolbox');
    }
    
    // Overwrite output
    parts.push('-y');
    
    // Output
    parts.push(`"${outputUri}"`);
    
    return parts.join(' ');
  }
  
  private qualityToCrf(quality: QualityLevel): number {
    const crfMap: Record<QualityLevel, number> = {
      low: 32,
      medium: 26,
      high: 20,
      maximum: 16,
    };
    return crfMap[quality];
  }
  
  private getScaleFilter(resolution: Resolution): string {
    const resolutionMap: Record<Resolution, string> = {
      '480p': 'scale=-2:480',
      '720p': 'scale=-2:720',
      '1080p': 'scale=-2:1080',
      '4k': 'scale=-2:2160',
      original: 'scale=trunc(iw/2)*2:trunc(ih/2)*2', // Ensure even dimensions
    };
    return resolutionMap[resolution];
  }
  
  private generateOutputPath(inputUri: string): string {
    const basename = inputUri.split('/').pop()?.split('.')[0] ?? 'video';
    return `${storageConfig.paths.temp}/${basename}_compressed_${Date.now()}.mp4`;
  }
  
  // Estimate output size
  estimateOutputSize(
    inputMetadata: VideoMetadata,
    options: CompressionOptions
  ): number {
    const durationSeconds = inputMetadata.duration;
    
    // Base bitrate estimation based on quality
    const qualityBitrateMap: Record<QualityLevel, number> = {
      low: 1000, // 1 Mbps
      medium: 2500, // 2.5 Mbps
      high: 5000, // 5 Mbps
      maximum: 8000, // 8 Mbps
    };
    
    let estimatedBitrate = qualityBitrateMap[options.quality];
    
    // Adjust for resolution
    const resolutionFactor: Record<Resolution, number> = {
      '480p': 0.4,
      '720p': 0.6,
      '1080p': 1,
      '4k': 2.5,
      original: 1,
    };
    
    estimatedBitrate *= resolutionFactor[options.resolution || 'original'];
    
    // Calculate size in bytes
    const estimatedSizeBytes = (estimatedBitrate * 1000 * durationSeconds) / 8;
    
    // Add audio (approximately 128kbps)
    const audioSize = options.removeAudio ? 0 : (128 * 1000 * durationSeconds) / 8;
    
    return Math.round(estimatedSizeBytes + audioSize);
  }
}

export const compressionEngine = new CompressionEngine();
```

## 11.2 Compression Presets

```typescript
interface CompressionPreset {
  id: string;
  name: string;
  description: string;
  icon: IconProps;
  options: Partial<CompressionOptions>;
  isBuiltIn: boolean;
}

const defaultPresets: CompressionPreset[] = [
  {
    id: 'social-media',
    name: 'Social Media',
    description: 'Optimized for sharing on social platforms',
    icon: { set: 'Feather', name: 'share-2' },
    options: {
      quality: 'medium',
      resolution: '720p',
      codec: 'h264',
      fps: 30,
      audioBitrate: 128,
    },
    isBuiltIn: true,
  },
  {
    id: 'email-friendly',
    name: 'Email Friendly',
    description: 'Small file size for email attachments',
    icon: { set: 'Feather', name: 'mail' },
    options: {
      quality: 'low',
      resolution: '480p',
      codec: 'h264',
      fps: 24,
      audioBitrate: 96,
    },
    isBuiltIn: true,
  },
  {
    id: 'maximum-quality',
    name: 'Maximum Quality',
    description: 'Best quality with modern codec',
    icon: { set: 'MaterialCommunityIcons', name: 'quality-high' },
    options: {
      quality: 'maximum',
      resolution: 'original',
      codec: 'h265',
      preserveMetadata: true,
    },
    isBuiltIn: true,
  },
  {
    id: 'balanced',
    name: 'Balanced',
    description: 'Good balance of quality and size',
    icon: { set: 'Feather', name: 'sliders' },
    options: {
      quality: 'medium',
      resolution: '1080p',
      codec: 'h264',
    },
    isBuiltIn: true,
  },
  {
    id: 'space-saver',
    name: 'Space Saver',
    description: 'Maximum compression for storage savings',
    icon: { set: 'Feather', name: 'hard-drive' },
    options: {
      quality: 'low',
      resolution: '720p',
      codec: 'h265',
      fps: 24,
      audioBitrate: 64,
    },
    isBuiltIn: true,
  },
];

class PresetManager {
  private presets: CompressionPreset[] = [];
  
  constructor() {
    this.loadPresets();
  }
  
  private loadPresets(): void {
    const customPresets = loadPresets();
    this.presets = [...defaultPresets, ...customPresets.filter(p => !p.isBuiltIn)];
  }
  
  getAll(): CompressionPreset[] {
    return this.presets;
  }
  
  getById(id: string): CompressionPreset | undefined {
    return this.presets.find(p => p.id === id);
  }
  
  create(preset: Omit<CompressionPreset, 'id' | 'isBuiltIn'>): CompressionPreset {
    const newPreset: CompressionPreset = {
      ...preset,
      id: generateId(),
      isBuiltIn: false,
    };
    
    this.presets.push(newPreset);
    this.saveCustomPresets();
    
    return newPreset;
  }
  
  update(id: string, updates: Partial<CompressionPreset>): void {
    const index = this.presets.findIndex(p => p.id === id);
    if (index !== -1 && !this.presets[index].isBuiltIn) {
      this.presets[index] = { ...this.presets[index], ...updates };
      this.saveCustomPresets();
    }
  }
  
  delete(id: string): void {
    const preset = this.getById(id);
    if (preset && !preset.isBuiltIn) {
      this.presets = this.presets.filter(p => p.id !== id);
      this.saveCustomPresets();
    }
  }
  
  private saveCustomPresets(): void {
    const customPresets = this.presets.filter(p => !p.isBuiltIn);
    persistPresets(customPresets);
  }
}

export const presetManager = new PresetManager();
```

## 11.3 Video Trimming

```typescript
class VideoTrimmer {
  async trim(
    inputUri: string,
    startTime: number,
    endTime: number,
    onProgress?: (progress: number) => void
  ): Promise<string> {
    const outputUri = this.generateOutputPath(inputUri);
    const duration = endTime - startTime;
    
    const command = [
      `-ss ${startTime}`,
      `-i "${inputUri}"`,
      `-t ${duration}`,
      '-c copy', // Copy streams without re-encoding for speed
      '-avoid_negative_ts make_zero',
      '-y',
      `"${outputUri}"`,
    ].join(' ');
    
    return new Promise((resolve, reject) => {
      FFmpegKit.executeAsync(
        command,
        async (session) => {
          const returnCode = await session.getReturnCode();
          
          if (ReturnCode.isSuccess(returnCode)) {
            resolve(outputUri);
          } else {
            const logs = await session.getOutput();
            reject(new Error(`Trimming failed: ${logs}`));
          }
        },
        undefined,
        (statistics) => {
          if (onProgress) {
            const time = statistics.getTime();
            const progress = Math.min(time / (duration * 1000), 1);
            onProgress(progress);
          }
        }
      );
    });
  }
  
  async extractFrames(
    videoUri: string,
    count: number
  ): Promise<string[]> {
    const metadata = await videoFileManager.extractMetadata(videoUri);
    const interval = metadata.duration / count;
    const frames: string[] = [];
    
    for (let i = 0; i < count; i++) {
      const timestamp = i * interval;
      const framePath = `${storageConfig.paths.thumbnails}/frame_${Date.now()}_${i}.jpg`;
      
      await FFmpegKit.execute(
        `-ss ${timestamp} -i "${videoUri}" -vframes 1 -q:v 2 -vf scale=80:-1 "${framePath}"`
      );
      
      frames.push(framePath);
    }
    
    return frames;
  }
  
  private generateOutputPath(inputUri: string): string {
    const basename = inputUri.split('/').pop()?.split('.')[0] ?? 'video';
    return `${storageConfig.paths.temp}/${basename}_trimmed_${Date.now()}.mp4`;
  }
}

export const videoTrimmer = new VideoTrimmer();
```

---

# 12. Data Models

## 12.1 Type Definitions

```typescript
// Video Types
interface VideoMetadata {
  duration: number; // seconds
  size: number; // bytes
  width: number;
  height: number;
  bitrate: number; // bits per second
  codec: string;
  fps: number;
}

interface ImportedVideo {
  id: string;
  uri: string;
  thumbnailUri: string;
  metadata: VideoMetadata;
  importedAt: string;
}

interface SavedVideo {
  id: string;
  uri: string;
  thumbnailUri: string;
  metadata: VideoMetadata;
  savedAt: string;
}

// Compression Types
type QualityLevel = 'low' | 'medium' | 'high' | 'maximum';
type Resolution = '480p' | '720p' | '1080p' | '4k' | 'original';
type VideoCodec = 'h264' | 'h265';
type EncodingSpeed = 'ultrafast' | 'fast' | 'medium' | 'slow';

interface CompressionOptions {
  quality: QualityLevel;
  resolution?: Resolution;
  codec: VideoCodec;
  fps?: number;
  targetBitrate?: number; // kbps
  audioBitrate?: number; // kbps
  removeAudio?: boolean;
  preserveMetadata?: boolean;
  encodingSpeed?: EncodingSpeed;
  useHardwareAcceleration?: boolean;
  duration?: number; // for progress calculation
}

interface CompressionResult {
  success: boolean;
  outputUri: string;
  metadata: VideoMetadata;
  error?: string;
}

// History Types
type CompressionStatus = 'pending' | 'processing' | 'completed' | 'error';

interface CompressionRecord {
  id: string;
  originalUri: string;
  compressedUri: string;
  thumbnailUri: string;
  fileName: string;
  originalSize: number;
  compressedSize: number;
  compressionRatio: number;
  options: CompressionOptions;
  status: CompressionStatus;
  errorMessage?: string;
  startedAt: string;
  completedAt?: string;
  duration: number; // processing duration in ms
}

// Batch Processing Types
interface BatchItem {
  id: string;
  videoId: string;
  fileName: string;
  thumbnailUri: string;
  originalSize: number;
  compressedSize?: number;
  status: CompressionStatus;
  progress: number;
  errorMessage?: string;
}

interface BatchJob {
  id: string;
  items: BatchItem[];
  globalOptions: CompressionOptions;
  status: 'idle' | 'processing' | 'paused' | 'completed';
  currentIndex: number;
  startedAt?: string;
  completedAt?: string;
}

// Settings Types
interface AppSettings {
  // Compression defaults
  defaultQuality: QualityLevel;
  defaultResolution: Resolution;
  defaultCodec: VideoCodec;
  preserveMetadata: boolean;
  hardwareAcceleration: boolean;
  
  // Storage
  autoDeleteOriginal: boolean;
  maxCacheSize: number; // bytes
  
  // UI preferences
  theme: 'light' | 'dark' | 'system';
  hapticFeedback: boolean;
  
  // Notifications
  notifyOnComplete: boolean;
}

// Export Types
type ExportDestination = 'photos' | 'files' | 'share' | 'airdrop';

interface ExportOptions {
  destination: ExportDestination;
  filename: string;
  includeMetadata: boolean;
}

// Statistics Types
interface CompressionStatistics {
  totalCompressed: number;
  totalSpaceSaved: number; // bytes
  averageCompressionRatio: number;
  totalProcessingTime: number; // ms
  compressionsByDay: Record<string, number>;
  compressionsByQuality: Record<QualityLevel, number>;
}
```

## 12.2 Default Values

```typescript
const defaultSettings: AppSettings = {
  defaultQuality: 'medium',
  defaultResolution: '1080p',
  defaultCodec: 'h264',
  preserveMetadata: true,
  hardwareAcceleration: true,
  autoDeleteOriginal: false,
  maxCacheSize: 500 * 1024 * 1024, // 500MB
  theme: 'dark',
  hapticFeedback: true,
  notifyOnComplete: true,
};

const defaultCompressionOptions: CompressionOptions = {
  quality: 'medium',
  resolution: '1080p',
  codec: 'h264',
  preserveMetadata: true,
  encodingSpeed: 'medium',
  useHardwareAcceleration: true,
};
```

---

# 13. State Management

## 13.1 Store Configuration

```typescript
// App Store
interface AppState {
  isInitialized: boolean;
  isLoading: boolean;
  error: string | null;
  
  // Actions
  initialize: () => Promise<void>;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  clearError: () => void;
}

const useAppStore = create<AppState>((set, get) => ({
  isInitialized: false,
  isLoading: true,
  error: null,
  
  initialize: async () => {
    try {
      set({ isLoading: true });
      
      // Initialize services
      await storage.initializeDirectories();
      
      // Load persisted data
      useHistoryStore.getState().loadHistory();
      useSettingsStore.getState().loadSettings();
      
      set({ isInitialized: true, isLoading: false });
    } catch (error) {
      set({ error: error.message, isLoading: false });
    }
  },
  
  setLoading: (loading) => set({ isLoading: loading }),
  setError: (error) => set({ error }),
  clearError: () => set({ error: null }),
}));
```

## 13.2 Compression Store

```typescript
interface CompressionState {
  // Current compression
  currentVideo: ImportedVideo | null;
  options: CompressionOptions;
  isCompressing: boolean;
  progress: number;
  estimatedSize: number;
  
  // Actions
  setCurrentVideo: (video: ImportedVideo | null) => void;
  setOptions: (options: Partial<CompressionOptions>) => void;
  resetOptions: () => void;
  startCompression: () => Promise<CompressionResult>;
  cancelCompression: () => Promise<void>;
  updateProgress: (progress: number) => void;
  calculateEstimatedSize: () => void;
}

const useCompressionStore = create<CompressionState>((set, get) => ({
  currentVideo: null,
  options: defaultCompressionOptions,
  isCompressing: false,
  progress: 0,
  estimatedSize: 0,
  
  setCurrentVideo: (video) => {
    set({ currentVideo: video, progress: 0 });
    if (video) {
      get().calculateEstimatedSize();
    }
  },
  
  setOptions: (options) => {
    set((state) => ({
      options: { ...state.options, ...options },
    }));
    get().calculateEstimatedSize();
  },
  
  resetOptions: () => {
    set({ options: defaultCompressionOptions });
    get().calculateEstimatedSize();
  },
  
  startCompression: async () => {
    const { currentVideo, options } = get();
    if (!currentVideo) {
      throw new Error('No video selected');
    }
    
    set({ isCompressing: true, progress: 0 });
    
    try {
      const result = await compressionEngine.compress(
        currentVideo.uri,
        { ...options, duration: currentVideo.metadata.duration },
        (progress) => {
          set({ progress });
        }
      );
      
      // Add to history
      useHistoryStore.getState().addRecord({
        originalUri: currentVideo.uri,
        compressedUri: result.outputUri,
        thumbnailUri: currentVideo.thumbnailUri,
        fileName: currentVideo.uri.split('/').pop() ?? 'video',
        originalSize: currentVideo.metadata.size,
        compressedSize: result.metadata.size,
        compressionRatio: 1 - (result.metadata.size / currentVideo.metadata.size),
        options,
        status: 'completed',
      });
      
      set({ isCompressing: false, progress: 1 });
      return result;
    } catch (error) {
      set({ isCompressing: false });
      throw error;
    }
  },
  
  cancelCompression: async () => {
    await compressionEngine.cancel();
    set({ isCompressing: false, progress: 0 });
  },
  
  updateProgress: (progress) => set({ progress }),
  
  calculateEstimatedSize: () => {
    const { currentVideo, options } = get();
    if (currentVideo) {
      const estimated = compressionEngine.estimateOutputSize(
        currentVideo.metadata,
        options
      );
      set({ estimatedSize: estimated });
    }
  },
}));
```

## 13.3 History Store

```typescript
interface HistoryState {
  records: CompressionRecord[];
  isLoading: boolean;
  filter: HistoryFilter;
  searchQuery: string;
  
  // Computed
  filteredRecords: CompressionRecord[];
  statistics: CompressionStatistics;
  
  // Actions
  loadHistory: () => void;
  addRecord: (record: Omit<CompressionRecord, 'id' | 'startedAt' | 'completedAt' | 'duration'>) => void;
  deleteRecord: (id: string) => void;
  clearHistory: () => void;
  setFilter: (filter: HistoryFilter) => void;
  setSearchQuery: (query: string) => void;
}

type HistoryFilter = 'all' | 'today' | 'week' | 'month';

const useHistoryStore = create<HistoryState>((set, get) => ({
  records: [],
  isLoading: false,
  filter: 'all',
  searchQuery: '',
  
  get filteredRecords() {
    const { records, filter, searchQuery } = get();
    let filtered = [...records];
    
    // Apply date filter
    const now = new Date();
    switch (filter) {
      case 'today':
        filtered = filtered.filter(r => 
          isSameDay(new Date(r.startedAt), now)
        );
        break;
      case 'week':
        filtered = filtered.filter(r =>
          isWithinInterval(new Date(r.startedAt), {
            start: subDays(now, 7),
            end: now,
          })
        );
        break;
      case 'month':
        filtered = filtered.filter(r =>
          isWithinInterval(new Date(r.startedAt), {
            start: subDays(now, 30),
            end: now,
          })
        );
        break;
    }
    
    // Apply search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(r =>
        r.fileName.toLowerCase().includes(query)
      );
    }
    
    // Sort by date descending
    return filtered.sort((a, b) =>
      new Date(b.startedAt).getTime() - new Date(a.startedAt).getTime()
    );
  },
  
  get statistics() {
    const { records } = get();
    const completed = records.filter(r => r.status === 'completed');
    
    return {
      totalCompressed: completed.length,
      totalSpaceSaved: completed.reduce(
        (acc, r) => acc + (r.originalSize - r.compressedSize),
        0
      ),
      averageCompressionRatio: completed.length > 0
        ? completed.reduce((acc, r) => acc + r.compressionRatio, 0) / completed.length
        : 0,
      totalProcessingTime: completed.reduce((acc, r) => acc + r.duration, 0),
      compressionsByDay: groupBy(completed, r => 
        format(new Date(r.startedAt), 'yyyy-MM-dd')
      ),
      compressionsByQuality: groupBy(completed, r => r.options.quality),
    };
  },
  
  loadHistory: () => {
    set({ isLoading: true });
    const records = loadHistory();
    set({ records, isLoading: false });
  },
  
  addRecord: (recordData) => {
    const record: CompressionRecord = {
      ...recordData,
      id: generateId(),
      startedAt: new Date().toISOString(),
      completedAt: new Date().toISOString(),
      duration: 0,
    };
    
    set((state) => {
      const newRecords = [record, ...state.records];
      persistHistory(newRecords);
      return { records: newRecords };
    });
  },
  
  deleteRecord: (id) => {
    set((state) => {
      const newRecords = state.records.filter(r => r.id !== id);
      persistHistory(newRecords);
      return { records: newRecords };
    });
  },
  
  clearHistory: () => {
    set({ records: [] });
    persistHistory([]);
  },
  
  setFilter: (filter) => set({ filter }),
  setSearchQuery: (searchQuery) => set({ searchQuery }),
}));
```

## 13.4 Settings Store

```typescript
interface SettingsState extends AppSettings {
  // Computed
  cacheSize: number;
  
  // Actions
  loadSettings: () => void;
  updateSettings: (settings: Partial<AppSettings>) => void;
  resetSettings: () => void;
  clearCache: () => Promise<void>;
  calculateCacheSize: () => Promise<void>;
}

const useSettingsStore = create<SettingsState>((set, get) => ({
  ...defaultSettings,
  cacheSize: 0,
  
  loadSettings: () => {
    const settings = loadSettings();
    set(settings);
    get().calculateCacheSize();
  },
  
  updateSettings: (updates) => {
    set((state) => {
      const newSettings = { ...state, ...updates };
      persistSettings(newSettings);
      return newSettings;
    });
  },
  
  resetSettings: () => {
    set(defaultSettings);
    persistSettings(defaultSettings);
  },
  
  clearCache: async () => {
    await storage.clearCache();
    set({ cacheSize: 0 });
  },
  
  calculateCacheSize: async () => {
    const size = await storage.getCacheSize();
    set({ cacheSize: size });
  },
}));
```

---

# 14. Asset Management

## 14.1 Remote Image Sources

All graphical assets are sourced from remote image libraries or generated using vector icons:

```typescript
const remoteAssets = {
  // Placeholder images from Pexels/Unsplash
  placeholders: {
    videoThumbnail: 'https://images.pexels.com/photos/2773498/pexels-photo-2773498.jpeg?auto=compress&cs=tinysrgb&w=320',
    emptyState: 'https://images.pexels.com/photos/3184298/pexels-photo-3184298.jpeg?auto=compress&cs=tinysrgb&w=400',
    errorState: 'https://images.pexels.com/photos/3825517/pexels-photo-3825517.jpeg?auto=compress&cs=tinysrgb&w=400',
  },
  
  // Illustrations
  illustrations: {
    welcome: 'https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&cs=tinysrgb&w=600',
    success: 'https://images.pexels.com/photos/3184339/pexels-photo-3184339.jpeg?auto=compress&cs=tinysrgb&w=600',
    compress: 'https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg?auto=compress&cs=tinysrgb&w=600',
  },
  
  // Backgrounds
  backgrounds: {
    gradient1: 'https://images.pexels.com/photos/1103970/pexels-photo-1103970.jpeg?auto=compress&cs=tinysrgb&w=800',
    gradient2: 'https://images.pexels.com/photos/2693212/pexels-photo-2693212.jpeg?auto=compress&cs=tinysrgb&w=800',
  },
};
```

## 14.2 Vector Icons Configuration

```typescript
// Icon component wrapper
interface IconProps {
  name: string;
  set: 'Feather' | 'MaterialCommunityIcons' | 'Ionicons' | 'FontAwesome5';
  size?: number;
  color?: string;
  style?: ViewStyle;
}

const Icon: React.FC<IconProps> = ({
  name,
  set,
  size = 24,
  color = colors.text.primary,
  style,
}) => {
  const IconComponent = {
    Feather: FeatherIcon,
    MaterialCommunityIcons: MaterialCommunityIcon,
    Ionicons: IoniconsIcon,
    FontAwesome5: FontAwesome5Icon,
  }[set];
  
  return (
    <IconComponent
      name={name}
      size={size}
      color={color}
      style={style}
    />
  );
};
```

## 14.3 Image Caching

```typescript
// FastImage configuration for caching
const imageConfig = {
  cacheControl: FastImage.cacheControl.immutable,
  priority: FastImage.priority.normal,
};

// Preload critical images
const preloadImages = async (): Promise<void> => {
  const imagesToPreload = [
    ...Object.values(remoteAssets.placeholders),
    ...Object.values(remoteAssets.illustrations),
  ];
  
  await FastImage.preload(
    imagesToPreload.map(uri => ({ uri }))
  );
};
```

---

# 15. Accessibility

## 15.1 Accessibility Labels

```typescript
const accessibilityLabels = {
  // Buttons
  buttons: {
    import: 'Import video from gallery or files',
    compress: 'Start video compression',
    cancel: 'Cancel current operation',
    save: 'Save compressed video',
    share: 'Share compressed video',
    delete: 'Delete this item',
    settings: 'Open settings',
    back: 'Go back',
    close: 'Close',
  },
  
  // Sliders
  sliders: {
    compression: 'Compression level slider. Lower values mean smaller file size, higher values mean better quality',
    timeline: 'Video timeline. Drag to seek through video',
    trimStart: 'Trim start handle. Drag to adjust video start point',
    trimEnd: 'Trim end handle. Drag to adjust video end point',
  },
  
  // Status
  status: {
    processing: (progress: number) => `Compressing video, ${Math.round(progress * 100)} percent complete`,
    completed: 'Compression completed successfully',
    error: (message: string) => `Error occurred: ${message}`,
  },
  
  // Information
  info: {
    originalSize: (size: string) => `Original file size: ${size}`,
    compressedSize: (size: string) => `Compressed file size: ${size}`,
    savings: (percent: number) => `Space saved: ${percent} percent`,
    duration: (duration: string) => `Video duration: ${duration}`,
  },
};
```

## 15.2 Accessibility Configuration

```typescript
const accessibilityConfig = {
  // Minimum touch target size (44x44 as per Apple guidelines)
  minTouchTarget: 44,
  
  // Text scaling support
  allowFontScaling: true,
  maxFontSizeMultiplier: 1.5,
  
  // Reduce motion support
  useReducedMotion: () => {
    const [reducedMotion, setReducedMotion] = useState(false);
    
    useEffect(() => {
      AccessibilityInfo.isReduceMotionEnabled().then(setReducedMotion);
      
      const subscription = AccessibilityInfo.addEventListener(
        'reduceMotionChanged',
        setReducedMotion
      );
      
      return () => subscription.remove();
    }, []);
    
    return reducedMotion;
  },
  
  // Screen reader detection
  useScreenReader: () => {
    const [screenReaderEnabled, setScreenReaderEnabled] = useState(false);
    
    useEffect(() => {
      AccessibilityInfo.isScreenReaderEnabled().then(setScreenReaderEnabled);
      
      const subscription = AccessibilityInfo.addEventListener(
        'screenReaderChanged',
        setScreenReaderEnabled
      );
      
      return () => subscription.remove();
    }, []);
    
    return screenReaderEnabled;
  },
};

// Accessible component wrapper
const AccessibleTouchable: React.FC<AccessibleTouchableProps> = ({
  children,
  accessibilityLabel,
  accessibilityHint,
  accessibilityRole = 'button',
  onPress,
  style,
}) => {
  return (
    <Pressable
      accessible
      accessibilityLabel={accessibilityLabel}
      accessibilityHint={accessibilityHint}
      accessibilityRole={accessibilityRole}
      onPress={onPress}
      style={[
        {
          minWidth: accessibilityConfig.minTouchTarget,
          minHeight: accessibilityConfig.minTouchTarget,
        },
        style,
      ]}
    >
      {children}
    </Pressable>
  );
};
```

## 15.3 Dynamic Type Support

```typescript
const useDynamicType = () => {
  const [fontScale, setFontScale] = useState(1);
  
  useEffect(() => {
    const updateFontScale = () => {
      setFontScale(PixelRatio.getFontScale());
    };
    
    updateFontScale();
    
    // Listen for changes
    Dimensions.addEventListener('change', updateFontScale);
    
    return () => {
      Dimensions.removeEventListener('change', updateFontScale);
    };
  }, []);
  
  const scaledFontSize = useCallback(
    (baseSize: number) => {
      const scaled = baseSize * fontScale;
      return Math.min(scaled, baseSize * accessibilityConfig.maxFontSizeMultiplier);
    },
    [fontScale]
  );
  
  return { fontScale, scaledFontSize };
};
```

---

# 16. Security Considerations

## 16.1 Data Protection

```typescript
const securityConfig = {
  // File encryption for sensitive data
  encryption: {
    algorithm: 'AES-256-GCM',
    keyDerivation: 'PBKDF2',
  },
  
  // Secure storage keys
  storageKeys: {
    settings: 'com.shrynk.settings',
    history: 'com.shrynk.history',
    presets: 'com.shrynk.presets',
  },
  
  // File handling
  fileHandling: {
    // Clear temp files on app background
    clearTempOnBackground: true,
    
    // Max temp file age (24 hours)
    maxTempFileAge: 24 * 60 * 60 * 1000,
    
    // Secure delete (overwrite before delete)
    secureDelete: false, // iOS handles this internally
  },
};

// Temp file cleanup
const cleanupTempFiles = async (): Promise<void> => {
  const tempPath = storageConfig.paths.temp;
  const files = await RNFS.readDir(tempPath);
  const now = Date.now();
  
  for (const file of files) {
    const fileAge = now - file.mtime.getTime();
    if (fileAge > securityConfig.fileHandling.maxTempFileAge) {
      await RNFS.unlink(file.path);
    }
  }
};

// App lifecycle handlers
const useSecurityHandlers = () => {
  useEffect(() => {
    const handleAppStateChange = (nextAppState: AppStateStatus) => {
      if (nextAppState === 'background') {
        if (securityConfig.fileHandling.clearTempOnBackground) {
          cleanupTempFiles();
        }
      }
    };
    
    const subscription = AppState.addEventListener('change', handleAppStateChange);
    
    return () => subscription.remove();
  }, []);
};
```

## 16.2 Permission Handling

```typescript
const permissions = {
  photoLibrary: {
    ios: PERMISSIONS.IOS.PHOTO_LIBRARY,
    rationale: 'Shrynk needs access to your photo library to import and save videos.',
  },
  photoLibraryAddOnly: {
    ios: PERMISSIONS.IOS.PHOTO_LIBRARY_ADD_ONLY,
    rationale: 'Shrynk needs permission to save compressed videos to your photo library.',
  },
};

const usePermissions = () => {
  const [status, setStatus] = useState<Record<string, PermissionStatus>>({});
  
  const checkPermission = useCallback(async (permission: keyof typeof permissions) => {
    const result = await check(permissions[permission].ios);
    setStatus(prev => ({ ...prev, [permission]: result }));
    return result;
  }, []);
  
  const requestPermission = useCallback(async (permission: keyof typeof permissions) => {
    const currentStatus = await check(permissions[permission].ios);
    
    if (currentStatus === RESULTS.DENIED) {
      const result = await request(permissions[permission].ios);
      setStatus(prev => ({ ...prev, [permission]: result }));
      return result;
    }
    
    if (currentStatus === RESULTS.BLOCKED) {
      // Direct user to settings
      Alert.alert(
        'Permission Required',
        permissions[permission].rationale,
        [
          { text: 'Cancel', style: 'cancel' },
          { text: 'Open Settings', onPress: () => Linking.openSettings() },
        ]
      );
      return currentStatus;
    }
    
    return currentStatus;
  }, []);
  
  return { status, checkPermission, requestPermission };
};
```

---

# 17. Performance Optimization

## 17.1 Memory Management

```typescript
const performanceConfig = {
  // Video thumbnail generation
  thumbnails: {
    maxConcurrent: 3,
    quality: 0.7,
    maxDimension: 320,
  },
  
  // List virtualization
  lists: {
    initialNumToRender: 10,
    maxToRenderPerBatch: 5,
    windowSize: 5,
    removeClippedSubviews: true,
  },
  
  // Image caching
  images: {
    memoryCacheSize: 50 * 1024 * 1024, // 50MB
    diskCacheSize: 200 * 1024 * 1024, // 200MB
  },
  
  // Animation frame rate
  animations: {
    targetFps: 60,
    useNativeDriver: true,
  },
};

// Memory-efficient list component
const OptimizedList: React.FC<OptimizedListProps> = ({
  data,
  renderItem,
  keyExtractor,
}) => {
  const getItemLayout = useCallback((data: any, index: number) => ({
    length: ITEM_HEIGHT,
    offset: ITEM_HEIGHT * index,
    index,
  }), []);
  
  return (
    <FlashList
      data={data}
      renderItem={renderItem}
      keyExtractor={keyExtractor}
      estimatedItemSize={ITEM_HEIGHT}
      drawDistance={performanceConfig.lists.windowSize * ITEM_HEIGHT}
    />
  );
};
```

## 17.2 Animation Performance

```typescript
// Optimized animation hooks
const useOptimizedAnimation = (
  value: number,
  config: AnimationConfig = animationConfig.springs.responsive
) => {
  const animatedValue = useSharedValue(value);
  const reducedMotion = accessibilityConfig.useReducedMotion();
  
  useEffect(() => {
    if (reducedMotion) {
      animatedValue.value = value;
    } else {
      animatedValue.value = withSpring(value, config);
    }
  }, [value, reducedMotion]);
  
  return animatedValue;
};

// Memoized animated styles
const useOptimizedAnimatedStyle = <T extends object>(
  factory: () => T,
  dependencies: any[]
) => {
  return useAnimatedStyle(factory, dependencies);
};
```

## 17.3 FFmpeg Optimization

```typescript
const ffmpegOptimization = {
  // Thread configuration
  threads: {
    default: 0, // Auto-detect
    lowPower: 2,
    highPerformance: 4,
  },
  
  // Memory limit
  memoryLimit: '512M',
  
  // Hardware acceleration
  hwaccel: {
    ios: 'videotoolbox',
    decode: true,
    encode: true,
  },
};

const getOptimizedFFmpegConfig = (powerMode: 'low' | 'normal' | 'high'): string => {
  const threads = ffmpegOptimization.threads[
    powerMode === 'low' ? 'lowPower' : powerMode === 'high' ? 'highPerformance' : 'default'
  ];
  
  return `-threads ${threads}`;
};
```

---

# 18. Testing Strategy

## 18.1 Unit Tests

```typescript
// Compression engine tests
describe('CompressionEngine', () => {
  describe('buildFFmpegCommand', () => {
    it('should build correct command for h264 codec', () => {
      const command = compressionEngine.buildFFmpegCommand(
        '/input.mp4',
        '/output.mp4',
        { quality: 'medium', codec: 'h264' }
      );
      
      expect(command).toContain('-c:v libx264');
      expect(command).toContain('-crf 26');
    });
    
    it('should build correct command for h265 codec', () => {
      const command = compressionEngine.buildFFmpegCommand(
        '/input.mp4',
        '/output.mp4',
        { quality: 'high', codec: 'h265' }
      );
      
      expect(command).toContain('-c:v libx265');
      expect(command).toContain('-tag:v hvc1');
    });
    
    it('should handle resolution scaling', () => {
      const command = compressionEngine.buildFFmpegCommand(
        '/input.mp4',
        '/output.mp4',
        { quality: 'medium', codec: 'h264', resolution: '720p' }
      );
      
      expect(command).toContain('-vf "scale=-2:720"');
    });
  });
  
  describe('estimateOutputSize', () => {
    it('should estimate size based on quality', () => {
      const metadata: VideoMetadata = {
        duration: 60,
        size: 100 * 1024 * 1024,
        width: 1920,
        height: 1080,
        bitrate: 12000000,
        codec: 'h264',
        fps: 30,
      };
      
      const lowEstimate = compressionEngine.estimateOutputSize(metadata, { quality: 'low' });
      const highEstimate = compressionEngine.estimateOutputSize(metadata, { quality: 'high' });
      
      expect(lowEstimate).toBeLessThan(highEstimate);
    });
  });
});

// Store tests
describe('useCompressionStore', () => {
  beforeEach(() => {
    useCompressionStore.getState().resetOptions();
  });
  
  it('should update options correctly', () => {
    const { setOptions } = useCompressionStore.getState();
    
    setOptions({ quality: 'high' });
    
    expect(useCompressionStore.getState().options.quality).toBe('high');
  });
  
  it('should calculate estimated size when video is set', () => {
    const { setCurrentVideo } = useCompressionStore.getState();
    
    setCurrentVideo({
      id: '1',
      uri: '/test.mp4',
      thumbnailUri: '/thumb.jpg',
      metadata: {
        duration: 60,
        size: 100 * 1024 * 1024,
        width: 1920,
        height: 1080,
        bitrate: 12000000,
        codec: 'h264',
        fps: 30,
      },
      importedAt: new Date().toISOString(),
    });
    
    expect(useCompressionStore.getState().estimatedSize).toBeGreaterThan(0);
  });
});
```

## 18.2 Component Tests

```typescript
// Button component tests
describe('Button', () => {
  it('should render with correct label', () => {
    const { getByText } = render(
      <Button variant="primary" label="Test Button" onPress={() => {}} />
    );
    
    expect(getByText('Test Button')).toBeTruthy();
  });
  
  it('should call onPress when tapped', () => {
    const onPress = jest.fn();
    const { getByText } = render(
      <Button variant="primary" label="Test Button" onPress={onPress} />
    );
    
    fireEvent.press(getByText('Test Button'));
    
    expect(onPress).toHaveBeenCalled();
  });
  
  it('should not call onPress when disabled', () => {
    const onPress = jest.fn();
    const { getByText } = render(
      <Button variant="primary" label="Test Button" onPress={onPress} disabled />
    );
    
    fireEvent.press(getByText('Test Button'));
    
    expect(onPress).not.toHaveBeenCalled();
  });
});

// VideoThumbnail component tests
describe('VideoThumbnail', () => {
  it('should display duration badge when showDuration is true', () => {
    const { getByText } = render(
      <VideoThumbnail
        uri="https://example.com/thumb.jpg"
        width={100}
        height={100}
        showDuration
        duration={125}
      />
    );
    
    expect(getByText('2:05')).toBeTruthy();
  });
});
```

## 18.3 Integration Tests

```typescript
// Compression flow integration test
describe('Compression Flow', () => {
  it('should complete full compression flow', async () => {
    // Import video
    const importedVideo = await videoFileManager.importVideo(
      '/test-assets/sample.mp4'
    );
    
    expect(importedVideo.id).toBeTruthy();
    expect(importedVideo.thumbnailUri).toBeTruthy();
    
    // Set compression options
    useCompressionStore.getState().setCurrentVideo(importedVideo);
    useCompressionStore.getState().setOptions({
      quality: 'medium',
      resolution: '720p',
    });
    
    // Start compression
    const result = await useCompressionStore.getState().startCompression();
    
    expect(result.success).toBe(true);
    expect(result.metadata.size).toBeLessThan(importedVideo.metadata.size);
    
    // Verify history record
    const history = useHistoryStore.getState().records;
    expect(history.length).toBeGreaterThan(0);
    expect(history[0].status).toBe('completed');
  });
});
```

## 18.4 E2E Tests

```typescript
// Detox E2E tests
describe('Shrynk App', () => {
  beforeAll(async () => {
    await device.launchApp();
  });
  
  beforeEach(async () => {
    await device.reloadReactNative();
  });
  
  it('should show splash screen and navigate to home', async () => {
    await waitFor(element(by.id('splash-logo')))
      .toBeVisible()
      .withTimeout(2000);
    
    await waitFor(element(by.id('home-screen')))
      .toBeVisible()
      .withTimeout(5000);
  });
  
  it('should open import screen when tapping import button', async () => {
    await element(by.id('import-button')).tap();
    
    await expect(element(by.id('import-screen'))).toBeVisible();
  });
  
  it('should complete video compression flow', async () => {
    // Open import
    await element(by.id('import-button')).tap();
    
    // Select video
    await element(by.id('gallery-item-0')).tap();
    await element(by.id('import-confirm-button')).tap();
    
    // Adjust settings
    await element(by.id('quality-medium')).tap();
    
    // Start compression
    await element(by.id('start-compression-button')).tap();
    
    // Wait for completion
    await waitFor(element(by.id('compression-complete')))
      .toBeVisible()
      .withTimeout(60000);
    
    // Verify success
    await expect(element(by.text('Compression Complete'))).toBeVisible();
  });
});
```

---

# 19. Deployment Configuration

## 19.1 iOS Configuration

```xml
<!-- Info.plist -->
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
    <key>CFBundleDisplayName</key>
    <string>Shrynk</string>
    
    <key>CFBundleIdentifier</key>
    <string>com.shrynk.app</string>
    
    <key>CFBundleVersion</key>
    <string>1</string>
    
    <key>CFBundleShortVersionString</key>
    <string>1.0.0</string>
    
    <key>LSRequiresIPhoneOS</key>
    <true/>
    
    <key>UILaunchStoryboardName</key>
    <string>LaunchScreen</string>
    
    <key>UIRequiredDeviceCapabilities</key>
    <array>
        <string>armv7</string>
    </array>
    
    <key>UISupportedInterfaceOrientations</key>
    <array>
        <string>UIInterfaceOrientationPortrait</string>
        <string>UIInterfaceOrientationLandscapeLeft</string>
        <string>UIInterfaceOrientationLandscapeRight</string>
    </array>
    
    <key>NSPhotoLibraryUsageDescription</key>
    <string>Shrynk needs access to your photo library to import videos for compression.</string>
    
    <key>NSPhotoLibraryAddUsageDescription</key>
    <string>Shrynk needs permission to save compressed videos to your photo library.</string>
    
    <key>UIBackgroundModes</key>
    <array>
        <string>processing</string>
    </array>
    
    <key>BGTaskSchedulerPermittedIdentifiers</key>
    <array>
        <string>com.shrynk.compression</string>
    </array>
    
    <key>UIStatusBarStyle</key>
    <string>UIStatusBarStyleLightContent</string>
    
    <key>UIViewControllerBasedStatusBarAppearance</key>
    <false/>
</dict>
</plist>
```

## 19.2 Build Configuration

```ruby
# Podfile
platform :ios, '14.0'
use_frameworks! :linkage => :static

target 'Shrynk' do
  config = use_native_modules!
  
  use_react_native!(
    :path => config[:reactNativePath],
    :hermes_enabled => true,
    :fabric_enabled => false,
    :app_path => "#{Pod::Config.instance.installation_root}/.."
  )
  
  # FFmpeg
  pod 'ffmpeg-kit-ios-full', '~> 6.0'
  
  # Performance
  pod 'react-native-mmkv', :path => '../node_modules/react-native-mmkv'
  
  post_install do |installer|
    react_native_post_install(installer)
    
    installer.pods_project.targets.each do |target|
      target.build_configurations.each do |config|
        config.build_settings['IPHONEOS_DEPLOYMENT_TARGET'] = '14.0'
        config.build_settings['ENABLE_BITCODE'] = 'NO'
      end
    end
  end
end
```

## 19.3 Release Configuration

```typescript
// app.config.ts
export default {
  name: 'Shrynk',
  slug: 'shrynk',
  version: '1.0.0',
  orientation: 'default',
  icon: './assets/icon.png',
  splash: {
    image: './assets/splash.png',
    resizeMode: 'contain',
    backgroundColor: '#0A0A0B',
  },
  ios: {
    bundleIdentifier: 'com.shrynk.app',
    buildNumber: '1',
    supportsTablet: false,
    infoPlist: {
      NSPhotoLibraryUsageDescription: 'Shrynk needs access to your photo library to import videos for compression.',
      NSPhotoLibraryAddUsageDescription: 'Shrynk needs permission to save compressed videos to your photo library.',
      UIBackgroundModes: ['processing'],
    },
  },
  plugins: [
    'react-native-reanimated',
    [
      'react-native-ffmpeg-kit',
      {
        package: 'full',
      },
    ],
  ],
};
```

---

# 20. Appendices

## 20.1 Glossary

| Term | Definition |
|------|------------|
| CRF | Constant Rate Factor - Quality control parameter for video encoding |
| FFmpeg | Open-source multimedia framework for video processing |
| H.264/AVC | Video compression standard, widely compatible |
| H.265/HEVC | High Efficiency Video Coding, better compression than H.264 |
| Bitrate | Amount of data processed per unit of time in video |
| Codec | Software for encoding/decoding video |
| Skia | 2D graphics library used for custom rendering |
| Reanimated | React Native library for performant animations |

## 20.2 Keyboard Shortcuts

| Shortcut | Action |
|----------|--------|
| Space | Play/Pause video |
| Left Arrow | Seek backward 10 seconds |
| Right Arrow | Seek forward 10 seconds |
| Escape | Cancel current operation |

## 20.3 Error Codes

| Code | Description | Resolution |
|------|-------------|------------|
| E001 | Video import failed | Check file format compatibility |
| E002 | Compression failed | Verify sufficient storage space |
| E003 | Export failed | Check photo library permissions |
| E004 | FFmpeg error | Retry with different settings |
| E005 | Storage full | Free up device storage |
| E006 | Permission denied | Grant required permissions in Settings |
| E007 | Invalid video format | Convert to supported format |
| E008 | Memory limit exceeded | Try lower resolution settings |

## 20.4 Supported Video Formats

| Format | Import | Export |
|--------|--------|--------|
| MP4 | Yes | Yes |
| MOV | Yes | Yes |
| M4V | Yes | Yes |
| AVI | Yes | No |
| MKV | Yes | No |
| WebM | Yes | No |
| 3GP | Yes | No |

## 20.5 Version History

| Version | Date | Changes |
|---------|------|---------|
| 1.0.0 | - | Initial release |

---

**Document End**

*This Software Design Document is a living document and will be updated as the application evolves.*
```