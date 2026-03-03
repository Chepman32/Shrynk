import React from 'react';
import { View, StyleSheet, Alert, InteractionManager, Text, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { launchImageLibrary } from 'react-native-image-picker';
import { Icon } from '../../components/common/Icon';
import { colors, spacing, textStyles, layout } from '../../theme';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { HomeStackParamList } from '../../types/navigation';
import type { CompositeScreenProps } from '@react-navigation/native';
import type { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import type { MainTabParamList, RootStackParamList } from '../../types/navigation';
import { navigateToCompression as navigateToCompressionScreen, navigationRef } from '../../navigation/navigationRef';

type Props = CompositeScreenProps<
  NativeStackScreenProps<HomeStackParamList, 'Import'>,
  CompositeScreenProps<
    BottomTabScreenProps<MainTabParamList>,
    NativeStackScreenProps<RootStackParamList>
  >
>;

export const ImportScreen: React.FC<Props> = ({ navigation }) => {
  const openCompressionScreen = (params: RootStackParamList['Compression']) => {
    if (!navigationRef.isReady()) {
      Alert.alert('Error', 'Unable to open conversion settings');
      return;
    }

    // Avoid iOS picker/modal transition race by closing Import first,
    // then navigating once interactions are settled.
    if (navigation.canGoBack()) {
      navigation.goBack();
    }

    InteractionManager.runAfterInteractions(() => {
      setTimeout(() => {
        const didNavigate = navigateToCompressionScreen(params);
        if (!didNavigate) {
          Alert.alert('Error', 'Unable to open conversion settings');
        }
      }, 100);
    });
  };

  const handleImportFromGallery = async () => {
    try {
      const result = await launchImageLibrary({
        mediaType: 'video',
        selectionLimit: 1, // Only allow 1 video
      });

      if (result.didCancel) {
        return;
      }

      if (result.errorCode) {
        Alert.alert('Error', result.errorMessage ?? 'Failed to import video');
        return;
      }

      const video = result.assets?.[0];

      if (!video?.uri) {
        Alert.alert('Error', 'Selected video is unavailable');
        return;
      }

      const videoId = `video_${Date.now()}`;
      const compressionParams = {
        videoUri: video.uri,
        videoId,
        originalSizeBytes: video.fileSize ?? 0,
      };

      openCompressionScreen(compressionParams);
    } catch (error) {
      console.error('Import error:', error);
      Alert.alert('Error', 'Failed to import video');
    }
  };

  const handleImportFromFiles = () => {
    Alert.alert('Coming Soon', 'Files import will be available soon');
  };

  return (
    <SafeAreaView style={styles.container} edges={[]}>
      <View style={styles.content}>
        <View style={styles.sourceContainer}>
          <Text style={styles.sectionTitle}>Import From</Text>

          <TouchableOpacity
            style={styles.sourceButton}
            onPress={handleImportFromGallery}
          >
            <View style={styles.sourceIcon}>
              <Icon name="image" set="Feather" size={32} color={colors.primary[500]} />
            </View>
            <Text style={styles.sourceLabel}>Photo Library</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.sourceButton}
            onPress={handleImportFromFiles}
          >
            <View style={styles.sourceIcon}>
              <Icon name="folder" set="Feather" size={32} color={colors.primary[500]} />
            </View>
            <Text style={styles.sourceLabel}>Files</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background.primary,
  },
  content: {
    flex: 1,
    paddingHorizontal: spacing[4],
  },
  sectionTitle: {
    ...textStyles.labelLarge,
    color: colors.text.secondary,
    marginBottom: spacing[4],
    textTransform: 'uppercase',
  },
  sourceContainer: {
    marginTop: spacing[6],
  },
  sourceButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing[4],
    backgroundColor: colors.surface.primary,
    borderRadius: layout.borderRadius.xl,
    marginBottom: spacing[3],
    gap: spacing[4],
  },
  sourceIcon: {
    width: 64,
    height: 64,
    borderRadius: layout.borderRadius.lg,
    backgroundColor: colors.surface.secondary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sourceLabel: {
    ...textStyles.bodyLarge,
    color: colors.text.primary,
    fontWeight: '600',
  },
});
