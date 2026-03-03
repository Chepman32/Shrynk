# Shrynk - Setup Guide

Complete setup instructions for the Shrynk video compression app.

## Prerequisites

Before you begin, ensure you have the following installed:

### Required Software

1. **Node.js** (v18.0.0 or higher)
   ```bash
   node --version  # Should be >= 18.0.0
   ```

2. **Xcode** (14.0 or higher) - For iOS development
   - Download from Mac App Store
   - Install Xcode Command Line Tools:
     ```bash
     xcode-select --install
     ```

3. **CocoaPods** - iOS dependency manager
   ```bash
   sudo gem install cocoapods
   ```

4. **Watchman** (Optional but recommended)
   ```bash
   brew install watchman
   ```

## Step-by-Step Setup

### 1. Install Node Dependencies

```bash
# Install all npm packages
npm install

# This will install:
# - React Native and core dependencies
# - Navigation libraries
# - Animation libraries (Reanimated, Skia)
# - State management (Zustand)
# - Video processing (FFmpeg Kit)
# - Storage (MMKV)
# - And all other dependencies
```

### 2. Install iOS Dependencies

```bash
# Navigate to iOS directory
cd ios

# Install CocoaPods dependencies
pod install

# This may take several minutes as it downloads:
# - React Native iOS libraries
# - FFmpeg Kit (large library ~100MB)
# - All other native dependencies

# Return to project root
cd ..
```

### 3. Link Vector Icons

The app uses react-native-vector-icons which requires linking fonts:

```bash
# Link icon fonts to iOS project
npx react-native-asset
```

### 4. Configure iOS Project

Open the project in Xcode:

```bash
open ios/Shrynk.xcworkspace
```

**Important:** Always open `.xcworkspace`, NOT `.xcodeproj`

In Xcode:
1. Select the Shrynk project in the navigator
2. Select the Shrynk target
3. Go to "Signing & Capabilities"
4. Select your development team
5. Ensure bundle identifier is unique (e.g., com.yourname.shrynk)

### 5. Run the App

#### Option A: Using npm script

```bash
npm run ios
```

#### Option B: Using Xcode

1. Open `ios/Shrynk.xcworkspace` in Xcode
2. Select a simulator or connected device
3. Click the Run button (▶️) or press Cmd+R

#### Option C: Specific simulator

```bash
# List available simulators
xcrun simctl list devices

# Run on specific simulator
npm run ios -- --simulator="iPhone 15 Pro"
```

## Verification

After the app launches, you should see:

1. **Splash Screen** - Animated logo with "Shrynk" text
2. **Home Screen** - With "Quick Actions" and empty state
3. **Tab Bar** - Home, History, Settings tabs at the bottom

### Test Basic Functionality

1. **Navigate between tabs** - Tap Home, History, Settings
2. **Open Import** - Tap the "Import" button on Home screen
3. **Check Settings** - Verify all settings are accessible
4. **View History** - Should show empty state initially

## Troubleshooting

### Common Issues and Solutions

#### 1. Pod Install Fails

```bash
cd ios
rm -rf Pods Podfile.lock
pod deintegrate
pod install
cd ..
```

#### 2. Metro Bundler Issues

```bash
# Clear Metro cache
npm start -- --reset-cache

# Or manually clear
rm -rf $TMPDIR/metro-*
rm -rf $TMPDIR/haste-*
```

#### 3. Build Errors in Xcode

- **Clean Build Folder:** Product → Clean Build Folder (Cmd+Shift+K)
- **Derived Data:** Delete derived data
  ```bash
  rm -rf ~/Library/Developer/Xcode/DerivedData
  ```

#### 4. Node Modules Issues

```bash
# Remove and reinstall
rm -rf node_modules package-lock.json
npm install
```

#### 5. FFmpeg Kit Issues

FFmpeg Kit is a large dependency. If installation fails:

```bash
cd ios
pod cache clean --all
pod install --repo-update
cd ..
```

#### 6. Reanimated Build Errors

Ensure babel.config.js has the Reanimated plugin:

```javascript
module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    'react-native-reanimated/plugin', // Must be last
  ],
};
```

#### 7. Vector Icons Not Showing

```bash
# Re-link fonts
npx react-native-asset

# Clean and rebuild
cd ios
rm -rf build
cd ..
npm run ios
```

## Development Workflow

### Running in Development

```bash
# Terminal 1: Start Metro bundler
npm start

# Terminal 2: Run iOS app
npm run ios
```

### Hot Reloading

- **Fast Refresh** is enabled by default
- Changes to JS/TS files will auto-reload
- Shake device or press Cmd+D for dev menu

### Debugging

1. **Chrome DevTools**
   - Open dev menu (Cmd+D)
   - Select "Debug"
   - Opens Chrome DevTools

2. **React Native Debugger**
   ```bash
   brew install --cask react-native-debugger
   ```

3. **Flipper** (Optional)
   - Built-in debugging tool
   - Automatically opens when running in debug mode

### Linting and Formatting

```bash
# Run ESLint
npm run lint

# Fix auto-fixable issues
npm run lint -- --fix

# Format with Prettier (if configured)
npx prettier --write "src/**/*.{ts,tsx}"
```

## Project Configuration Files

### Key Files to Know

- **package.json** - Node dependencies and scripts
- **babel.config.js** - Babel configuration (includes Reanimated plugin)
- **metro.config.js** - Metro bundler configuration
- **tsconfig.json** - TypeScript configuration
- **ios/Podfile** - iOS native dependencies
- **ios/Shrynk/Info.plist** - iOS app configuration and permissions

### Environment Variables

Create `.env` file in project root if needed:

```env
# Example environment variables
API_URL=https://api.example.com
DEBUG_MODE=true
```

## Performance Tips

### Development

1. **Use Release Build for Testing Performance**
   ```bash
   npm run ios -- --configuration Release
   ```

2. **Enable Hermes** (already enabled)
   - Faster startup time
   - Reduced memory usage

3. **Profile with Xcode Instruments**
   - Product → Profile (Cmd+I)
   - Use Time Profiler, Allocations, etc.

### Production

1. **Optimize Images**
   - Use appropriate resolutions
   - Compress images before adding

2. **Code Splitting**
   - Lazy load screens
   - Use React.lazy() for heavy components

3. **Bundle Size**
   - Analyze bundle with Metro
   - Remove unused dependencies

## Testing

### Unit Tests

```bash
npm test
```

### E2E Tests (if configured)

```bash
# Using Detox
npm run test:e2e:ios
```

## Building for Production

### Create Archive

1. Open Xcode
2. Select "Any iOS Device" as target
3. Product → Archive
4. Wait for archive to complete
5. Upload to App Store Connect

### Command Line Build

```bash
cd ios
xcodebuild -workspace Shrynk.xcworkspace \
  -scheme Shrynk \
  -configuration Release \
  -archivePath build/Shrynk.xcarchive \
  archive
```

## Next Steps

After successful setup:

1. **Read the SDD.md** - Understand the complete architecture
2. **Explore the codebase** - Start with `src/navigation/RootNavigator.tsx`
3. **Test all features** - Import videos, compress, view history
4. **Customize theme** - Modify colors in `src/theme/colors.ts`
5. **Add features** - Follow the existing patterns

## Getting Help

If you encounter issues:

1. Check this setup guide
2. Review error messages carefully
3. Search GitHub issues
4. Check React Native documentation
5. Verify all prerequisites are installed correctly

## Useful Commands

```bash
# Start fresh
npm run ios -- --reset-cache

# Clean everything
rm -rf node_modules ios/Pods ios/Podfile.lock
npm install
cd ios && pod install && cd ..

# Check React Native environment
npx react-native doctor

# List iOS simulators
xcrun simctl list devices

# Open iOS simulator
open -a Simulator

# View Metro logs
npm start -- --verbose
```

## Additional Resources

- [React Native Documentation](https://reactnative.dev/)
- [React Navigation](https://reactnavigation.org/)
- [React Native Reanimated](https://docs.swmansion.com/react-native-reanimated/)
- [React Native Skia](https://shopify.github.io/react-native-skia/)
- [FFmpeg Kit](https://github.com/arthenica/ffmpeg-kit)
- [Zustand](https://github.com/pmndrs/zustand)

---

**Happy Coding! 🚀**

If you successfully set up the project, you're ready to start developing amazing features for Shrynk!
