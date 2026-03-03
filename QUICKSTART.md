# Shrynk - Quick Start Guide

Get up and running with Shrynk in 5 minutes!

## Prerequisites Check

```bash
# Check Node.js version (should be >= 18.0.0)
node --version

# Check if you have Xcode installed
xcode-select -p

# Check if CocoaPods is installed
pod --version
```

If any of these fail, see [SETUP.md](SETUP.md) for detailed installation instructions.

## Installation (3 steps)

### 1. Install Dependencies

```bash
# Install npm packages
npm install
```

### 2. Install iOS Dependencies

```bash
# Install CocoaPods
cd ios && pod install && cd ..
```

### 3. Link Vector Icons

```bash
# Link icon fonts
npx react-native-asset
```

## Run the App

```bash
# Start the app on iOS simulator
npm run ios
```

That's it! The app should launch on your iOS simulator.

## What You'll See

1. **Splash Screen** - Animated "Shrynk" logo (2-3 seconds)
2. **Home Screen** - Main interface with:
   - Statistics card showing space saved
   - Quick action buttons (Import, Batch)
   - Recent compressions list (empty initially)
3. **Tab Bar** - Navigate between Home, History, and Settings

## Try These Features

### Import a Video
1. Tap the **"Import"** button on Home screen
2. Select **"Photo Library"**
3. Choose a video from your library
4. Tap **"Import"**

### View Settings
1. Tap the **"Settings"** tab
2. Explore compression defaults
3. Toggle preferences
4. Check cache size

### Check History
1. Tap the **"History"** tab
2. View compression history (empty initially)
3. Search functionality available

## Common Issues

### "Command not found: pod"
```bash
sudo gem install cocoapods
```

### "Unable to boot simulator"
```bash
# Open Simulator app first
open -a Simulator
# Then run the app
npm run ios
```

### "Metro bundler not starting"
```bash
# Clear cache and restart
npm start -- --reset-cache
```

### "Build failed in Xcode"
```bash
# Clean and rebuild
cd ios
rm -rf build Pods Podfile.lock
pod install
cd ..
npm run ios
```

## Development Tips

### Hot Reload
- Save any file to see changes instantly
- No need to rebuild for JS/TS changes

### Debug Menu
- Press `Cmd + D` in simulator
- Or shake a physical device
- Access debugging tools

### View Logs
```bash
# In a separate terminal
npm start
```

## Next Steps

1. **Read the Documentation**
   - [README.md](README.md) - Full feature overview
   - [SETUP.md](SETUP.md) - Detailed setup guide
   - [SDD.md](SDD.md) - Complete technical specification

2. **Explore the Code**
   - Start with `App.tsx`
   - Check `src/navigation/RootNavigator.tsx`
   - Browse `src/screens/` for screen implementations

3. **Customize**
   - Modify colors in `src/theme/colors.ts`
   - Adjust spacing in `src/theme/spacing.ts`
   - Update typography in `src/theme/typography.ts`

## Project Structure Overview

```
Shrynk/
├── src/
│   ├── screens/       # All app screens
│   ├── components/    # Reusable components
│   ├── navigation/    # Navigation setup
│   ├── store/         # State management
│   ├── theme/         # Design system
│   └── utils/         # Helper functions
├── ios/               # iOS native code
└── App.tsx            # App entry point
```

## Available Scripts

```bash
npm start          # Start Metro bundler
npm run ios        # Run on iOS
npm run lint       # Run ESLint
npm test           # Run tests
npm run pods       # Install iOS pods
```

## Getting Help

- **Setup Issues:** See [SETUP.md](SETUP.md)
- **Architecture Questions:** See [SDD.md](SDD.md)
- **Implementation Details:** See [IMPLEMENTATION_SUMMARY.md](IMPLEMENTATION_SUMMARY.md)

## Success Checklist

- ✅ App launches without errors
- ✅ Splash screen shows animated logo
- ✅ Home screen displays correctly
- ✅ Can navigate between tabs
- ✅ Import screen opens
- ✅ Settings are accessible

If all items are checked, you're ready to develop! 🎉

---

**Need more help?** Check the detailed [SETUP.md](SETUP.md) guide.

**Ready to build?** Read the [SDD.md](SDD.md) for complete specifications.
