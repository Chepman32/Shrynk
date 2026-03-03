# Shrynk - Video Size Compressor for iOS

A production-ready iOS mobile application designed to compress video files entirely offline with sophisticated animations powered by React Native Reanimated and React Native Skia.

## Features

- ✨ **Offline Video Compression** - Compress videos without internet connection
- 🎨 **Beautiful Animations** - Smooth, physics-based animations using Reanimated & Skia
- 📱 **Gesture-Driven Interface** - Intuitive swipe, pinch, and tap gestures
- 🎯 **Multiple Quality Presets** - Pre-configured settings for different use cases
- 📊 **Compression Statistics** - Track space saved and compression history
- 🎬 **Video Preview** - Side-by-side comparison before and after compression
- ✂️ **Video Trimming** - Cut unwanted portions before compression
- 📤 **Multiple Export Options** - Save to Photos, Files, or share directly
- 🌙 **Dark Mode** - Beautiful dark theme optimized for OLED displays

## Tech Stack

- **Framework:** React Native 0.73+
- **Language:** TypeScript 5.0+
- **Animation:** React Native Reanimated 3.x, React Native Skia
- **Navigation:** React Navigation 6.x
- **State Management:** Zustand 4.x
- **Storage:** MMKV (fast key-value storage)
- **Video Processing:** FFmpeg Kit
- **UI Components:** Custom components with Gesture Handler

## Prerequisites

- Node.js >= 18.0.0
- Xcode 14.0+ (for iOS development)
- CocoaPods
- iOS 14.0+ device or simulator

## Installation

1. **Clone the repository**
```bash
git clone <repository-url>
cd Shrynk
```

2. **Install dependencies**
```bash
npm install
```

3. **Install iOS dependencies**
```bash
cd ios
pod install
cd ..
```

4. **Link vector icons**
```bash
npx react-native-asset
```

## Running the App

### iOS

```bash
npm run ios
```

Or open `ios/Shrynk.xcworkspace` in Xcode and run from there.

### Development

```bash
# Start Metro bundler
npm start

# Run on iOS
npm run ios

# Run linter
npm run lint

# Run tests
npm test
```

## Project Structure

```
Shrynk/
├── src/
│   ├── components/        # Reusable UI components
│   │   ├── common/       # Common components (Button, Icon, etc.)
│   │   ├── animated/     # Animated components
│   │   └── skia/         # Skia-based components
│   ├── screens/          # Screen components
│   │   ├── splash/       # Splash screen with animations
│   │   ├── home/         # Home screen
│   │   ├── import/       # Video import screen
│   │   ├── compression/  # Compression interface
│   │   ├── preview/      # Video comparison
│   │   ├── export/       # Export options
│   │   ├── history/      # Compression history
│   │   ├── settings/     # App settings
│   │   └── batch/        # Batch processing
│   ├── navigation/       # Navigation configuration
│   ├── services/         # Business logic services
│   │   ├── compression/  # Video compression engine
│   │   ├── storage/      # File and data storage
│   │   └── video/        # Video utilities
│   ├── store/            # Zustand state management
│   ├── hooks/            # Custom React hooks
│   ├── theme/            # Design system (colors, typography, etc.)
│   ├── types/            # TypeScript type definitions
│   └── utils/            # Utility functions
├── ios/                  # iOS native code
├── android/              # Android native code (future)
└── assets/               # Static assets
```

## Key Features Implementation

### 1. Video Compression
- Uses FFmpeg Kit for high-quality video compression
- Supports H.264 and H.265 codecs
- Hardware acceleration on iOS
- Multiple quality presets (Low, Medium, High, Maximum)
- Custom compression settings

### 2. Animations
- Splash screen with physics-based logo animation
- Smooth screen transitions
- Gesture-driven interactions
- Progress indicators with Skia
- Micro-interactions throughout the app

### 3. Offline Capability
- All features work without internet
- Local storage using MMKV
- File system management with React Native FS
- Persistent compression history

### 4. User Experience
- Intuitive gesture controls
- Haptic feedback
- Pull-to-refresh
- Swipeable list items
- Bottom sheet modals
- Smooth tab bar animations

## Configuration

### Compression Settings

Default compression settings can be modified in `src/store/useSettingsStore.ts`:

```typescript
const defaultSettings = {
  defaultQuality: 'medium',
  defaultResolution: '1080p',
  defaultCodec: 'h264',
  preserveMetadata: true,
  hardwareAcceleration: true,
  // ... more settings
};
```

### Theme Customization

Colors and design tokens are defined in `src/theme/`:
- `colors.ts` - Color palette
- `typography.ts` - Font styles
- `spacing.ts` - Spacing system
- `shadows.ts` - Shadow definitions
- `animations.ts` - Animation configurations

## Performance Optimization

- Optimized list rendering with FlashList
- Image caching with FastImage
- Lazy loading of screens
- Memory-efficient video processing
- Native driver for animations
- Reduced motion support for accessibility

## Accessibility

- VoiceOver support
- Dynamic Type support
- Minimum touch target sizes (44x44)
- High contrast mode support
- Reduced motion option
- Semantic labels for all interactive elements

## Security

- Secure storage with MMKV encryption
- Automatic temp file cleanup
- No data collection or analytics
- All processing happens locally
- Secure file handling

## Troubleshooting

### Common Issues

1. **Pod install fails**
   ```bash
   cd ios
   pod deintegrate
   pod install
   ```

2. **Metro bundler issues**
   ```bash
   npm start -- --reset-cache
   ```

3. **Build errors**
   - Clean build folder in Xcode
   - Delete `node_modules` and reinstall
   - Clear Metro cache

### iOS Specific

- Ensure Xcode Command Line Tools are installed
- Check iOS deployment target is set to 14.0+
- Verify signing certificates are configured

## Contributing

Contributions are welcome! Please read the contributing guidelines before submitting PRs.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- React Native team for the amazing framework
- FFmpeg team for the powerful video processing library
- React Native Reanimated & Skia teams for animation capabilities
- All open-source contributors

## Support

For issues, questions, or suggestions:
- Open an issue on GitHub
- Check the documentation in `SDD.md`

## Roadmap

- [ ] Android support
- [ ] Batch processing
- [ ] Video trimming interface
- [ ] Advanced compression presets
- [ ] Cloud backup integration (optional)
- [ ] Video filters and effects
- [ ] Multi-language support

---

**Version:** 1.0.0  
**Platform:** iOS 14.0+  
**Last Updated:** 2024
