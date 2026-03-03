import React, { useMemo, useState } from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  ScrollView,
  Alert,
  ActivityIndicator,
  Platform,
  NativeModules,
  PermissionsAndroid,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Animated, { FadeInDown } from 'react-native-reanimated';
import LinearGradient from 'react-native-linear-gradient';
import RNFS from 'react-native-fs';
import { Icon } from '../../components/common/Icon';
import { colors, spacing, textStyles, layout, shadows } from '../../theme';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../../types/navigation';
import type { Resolution, VideoFormat } from '../../types/compression';
import { formatBytes } from '../../utils/formatters';
import { useHistoryStore } from '../../store/useHistoryStore';

type Props = NativeStackScreenProps<RootStackParamList, 'Compression'>;

const FORMAT_OPTIONS: { value: VideoFormat; label: string; description: string; supported: boolean }[] = [
  { value: 'mp4', label: 'MP4', description: 'Best compatibility', supported: true },
  {
    value: 'mov',
    label: 'MOV',
    description: Platform.OS === 'ios' ? 'QuickTime (Apple)' : 'iOS only',
    supported: Platform.OS === 'ios',
  },
  { value: 'mkv', label: 'MKV', description: 'Coming soon', supported: false },
];

const RESOLUTION_OPTIONS: { value: Resolution; label: string }[] = [
  { value: '480p', label: '480p (SD)' },
  { value: '720p', label: '720p (HD)' },
  { value: '1080p', label: '1080p (Full HD)' },
  { value: '4k', label: '4K (Ultra HD)' },
  { value: 'original', label: 'Original' },
];

const RESOLUTION_SIZE_FACTORS: Record<Resolution, number> = {
  '480p': 0.3,
  '720p': 0.5,
  '1080p': 0.75,
  '4k': 1.35,
  original: 1,
};

const FORMAT_SIZE_FACTORS: Record<VideoFormat, number> = {
  mp4: 0.85,
  mov: 1.1,
  mkv: 0.95,
};

type MovExporterModule = {
  exportToMov: (sourceUri: string) => Promise<string>;
  compressToMov: (sourceUri: string, presetName: string) => Promise<string>;
};

const MOVExporter = NativeModules.MOVExporter as MovExporterModule | undefined;

const toFileUri = (pathOrUri: string): string => {
  return pathOrUri.startsWith('file://') ? pathOrUri : `file://${pathOrUri}`;
};

const toAbsolutePath = (fileUri: string): string => {
  return fileUri.replace(/^file:\/\//, '');
};

const APP_COMPRESSED_DIR = `${RNFS.DocumentDirectoryPath}/shrynk/compressed`;

const IOS_MOV_PRESET_BY_RESOLUTION: Record<Resolution, string> = {
  '480p': 'AVAssetExportPreset640x480',
  '720p': 'AVAssetExportPreset1280x720',
  '1080p': 'AVAssetExportPreset1920x1080',
  '4k': 'AVAssetExportPreset3840x2160',
  original: 'AVAssetExportPresetMediumQuality',
};

const IOS_MOV_COMPRESSION_FALLBACK_PRESETS = [
  'AVAssetExportPresetLowQuality',
  'AVAssetExportPreset960x540',
  'AVAssetExportPreset640x480',
];

const IOS_MOV_MIN_SIZE_REDUCTION_FACTOR = 0.99;

export const CompressionScreen: React.FC<Props> = ({ navigation, route }) => {
  const { videoUri, videoId, originalSizeBytes } = route.params;
  const addHistoryRecord = useHistoryStore(state => state.addRecord);

  const [format, setFormat] = useState<VideoFormat>('mp4');
  const [resolution, setResolution] = useState<Resolution>('original');
  const [isConverting, setIsConverting] = useState(false);
  const [conversionProgress, setConversionProgress] = useState(0);

  const selectedResolutionLabel = useMemo(() => {
    return RESOLUTION_OPTIONS.find(option => option.value === resolution)?.label ?? 'Original';
  }, [resolution]);

  const selectedVideoName = useMemo(() => {
    const rawName = videoUri.split('/').pop() ?? 'Selected video';

    try {
      return decodeURIComponent(rawName);
    } catch {
      return rawName;
    }
  }, [videoUri]);

  const estimatedSizeBytes = useMemo(() => {
    if (!originalSizeBytes) {
      return 0;
    }

    const estimated = Math.round(
      originalSizeBytes * RESOLUTION_SIZE_FACTORS[resolution] * FORMAT_SIZE_FACTORS[format]
    );
    return Math.max(estimated, 1);
  }, [format, originalSizeBytes, resolution]);

  const estimatedSizeText = useMemo(() => {
    if (!estimatedSizeBytes) {
      return 'Unavailable';
    }
    return formatBytes(estimatedSizeBytes);
  }, [estimatedSizeBytes]);

  const originalSizeText = useMemo(() => {
    if (!originalSizeBytes) {
      return 'Unavailable';
    }
    return formatBytes(originalSizeBytes);
  }, [originalSizeBytes]);

  const estimatedDeltaText = useMemo(() => {
    if (!originalSizeBytes || !estimatedSizeBytes) {
      return 'Unknown';
    }

    const changeRatio = estimatedSizeBytes / originalSizeBytes;
    const percent = Math.abs((1 - changeRatio) * 100).toFixed(0);

    if (changeRatio < 1) {
      return `${percent}% smaller`;
    }

    if (changeRatio > 1) {
      return `${percent}% larger`;
    }

    return 'Same size';
  }, [estimatedSizeBytes, originalSizeBytes]);

  const handleStartCompression = async () => {
    if (isConverting) {
      return;
    }

    if (format === 'mkv') {
      Alert.alert('Not Supported Yet', 'MKV export will be available soon. Please use MP4 or MOV.');
      return;
    }

    if (format === 'mov' && Platform.OS !== 'ios') {
      Alert.alert('Not Supported Yet', 'MOV export is currently available on iOS only.');
      return;
    }

    const ensureAndroidGalleryPermission = async () => {
      if (Platform.OS !== 'android') {
        return true;
      }

      const apiLevel = Number(Platform.Version);
      const permission =
        apiLevel >= 33
          ? PermissionsAndroid.PERMISSIONS.READ_MEDIA_VIDEO
          : PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE;

      const granted = await PermissionsAndroid.request(permission);
      return granted === PermissionsAndroid.RESULTS.GRANTED;
    };

    try {
      const permissionGranted = await ensureAndroidGalleryPermission();
      if (!permissionGranted) {
        Alert.alert('Permission Required', 'Please allow media access to save video to gallery.');
        return;
      }

      setIsConverting(true);
      setConversionProgress(0);

      const maxSize = (() => {
        switch (resolution) {
          case '480p':
            return 854;
          case '720p':
            return 1280;
          case '1080p':
            return 1920;
          case '4k':
            return 3840;
          case 'original':
          default:
            return undefined;
        }
      })();

      let saveVideo: (
        uri: string,
        options: { type: 'video' }
      ) => Promise<
        string | { node?: { image?: { uri?: string } } }
      >;
      let compressVideo: (
        uri: string,
        options: Record<string, unknown>,
        onProgress?: (progress: number) => void
      ) => Promise<string>;

      try {
        const cameraRollModule = require('@react-native-camera-roll/camera-roll') as {
          CameraRoll?: {
            save?: typeof saveVideo;
            saveAsset?: typeof saveVideo;
          };
        };

        if (!cameraRollModule.CameraRoll) {
          throw new Error('Native modules are unavailable');
        }

        if (cameraRollModule.CameraRoll.saveAsset) {
          saveVideo = cameraRollModule.CameraRoll.saveAsset;
        } else if (cameraRollModule.CameraRoll.save) {
          saveVideo = cameraRollModule.CameraRoll.save.bind(cameraRollModule.CameraRoll);
        } else {
          throw new Error('CameraRoll save API is unavailable');
        }

        const shouldUseIOSMovNativePath = Platform.OS === 'ios' && format === 'mov';
        if (!shouldUseIOSMovNativePath) {
          const compressorModule = require('react-native-compressor') as {
            Video?: { compress?: typeof compressVideo };
          };

          if (!compressorModule.Video?.compress) {
            throw new Error('Video compressor module is unavailable');
          }

          compressVideo = compressorModule.Video.compress;
        }
      } catch {
        throw new Error(
          'Native modules are not linked in the installed app binary. Rebuild the iOS app and try again.'
        );
      }

      let compressedUri: string | undefined;
      let outputUri: string;
      const shouldUseIOSMovNativePath = Platform.OS === 'ios' && format === 'mov';
      if (shouldUseIOSMovNativePath) {
        if (!MOVExporter?.compressToMov) {
          throw new Error(
            'MOV exporter is unavailable in this app build. Rebuild the iOS app and try again.'
          );
        }
        setConversionProgress(0.1);
        const exportMovWithPreset = async (presetName: string) => {
          const uri = toFileUri(await MOVExporter.compressToMov(videoUri, presetName));
          const path = toAbsolutePath(uri);
          const stats = await RNFS.stat(path);
          const size = Number(stats.size ?? 0);
          return { uri, path, size };
        };

        const basePreset = IOS_MOV_PRESET_BY_RESOLUTION[resolution];
        const attemptedPresets = new Set<string>([basePreset]);
        let selectedResult = await exportMovWithPreset(basePreset);

        const shouldTryStrongerCompression =
          originalSizeBytes > 0 &&
          selectedResult.size >= originalSizeBytes * IOS_MOV_MIN_SIZE_REDUCTION_FACTOR;

        if (shouldTryStrongerCompression) {
          const fallbackPresets = IOS_MOV_COMPRESSION_FALLBACK_PRESETS.filter(
            preset => !attemptedPresets.has(preset)
          );

          for (const [index, fallbackPreset] of fallbackPresets.entries()) {
            setConversionProgress(0.35 + index * 0.15);
            attemptedPresets.add(fallbackPreset);
            const candidateResult = await exportMovWithPreset(fallbackPreset);

            if (candidateResult.size > 0 && candidateResult.size < selectedResult.size) {
              if (await RNFS.exists(selectedResult.path)) {
                await RNFS.unlink(selectedResult.path);
              }
              selectedResult = candidateResult;
            } else if (await RNFS.exists(candidateResult.path)) {
              await RNFS.unlink(candidateResult.path);
            }

            if (
              originalSizeBytes > 0 &&
              selectedResult.size < originalSizeBytes * IOS_MOV_MIN_SIZE_REDUCTION_FACTOR
            ) {
              break;
            }
          }
        }

        if (!selectedResult.path.toLowerCase().endsWith('.mov')) {
          throw new Error('MOV export produced an invalid output file type.');
        }

        outputUri = selectedResult.uri;
        setConversionProgress(0.7);
      } else {
        const compressedRawPath = await compressVideo(
          videoUri,
          {
            compressionMethod: 'auto',
            maxSize,
            bitrate: undefined,
            minimumFileSizeForCompress: 0,
          },
          (progress: number) => {
            setConversionProgress(Math.min(1, Math.max(0, progress)));
          }
        );
        compressedUri = toFileUri(compressedRawPath);
        outputUri = compressedUri;
      }

      const sourceName = selectedVideoName;
      const normalizedName = sourceName.replace(/\.[^/.]+$/, '');
      const fileName = `${normalizedName}_${videoId}.${format}`;

      await RNFS.mkdir(APP_COMPRESSED_DIR);
      const persistentOutputPath = `${APP_COMPRESSED_DIR}/${fileName}`;

      if (await RNFS.exists(persistentOutputPath)) {
        await RNFS.unlink(persistentOutputPath);
      }

      await RNFS.copyFile(toAbsolutePath(outputUri), persistentOutputPath);
      const persistentOutputUri = toFileUri(persistentOutputPath);

      await saveVideo(persistentOutputUri, { type: 'video' });

      const statPath = persistentOutputPath;
      const compressedStats = await RNFS.stat(statPath);
      const compressedSize = Number(compressedStats.size ?? 0);

      const temporaryOutputPath = toAbsolutePath(outputUri);
      if (temporaryOutputPath !== persistentOutputPath && await RNFS.exists(temporaryOutputPath)) {
        await RNFS.unlink(temporaryOutputPath);
      }

      if (compressedUri && outputUri !== compressedUri) {
        const intermediatePath = toAbsolutePath(compressedUri);
        if (intermediatePath !== persistentOutputPath && await RNFS.exists(intermediatePath)) {
          await RNFS.unlink(intermediatePath);
        }
      }

      const originalSize = originalSizeBytes || compressedSize;
      const ratio = originalSize > 0 ? compressedSize / originalSize : 1;

      addHistoryRecord({
        originalUri: videoUri,
        compressedUri: persistentOutputUri,
        thumbnailUri: '',
        fileName,
        originalSize,
        compressedSize,
        compressionRatio: ratio,
        options: {
          quality: 'medium',
          resolution,
          format,
          codec: 'h264',
        },
        status: 'completed',
      });

      setConversionProgress(1);
      Alert.alert(
        'Conversion Complete',
        format === 'mov'
          ? `Saved to gallery as .MOV (container).\nCodec may display as H.264.\nOutput size: ${formatBytes(compressedSize)}`
          : `Saved to gallery.\nOutput size: ${formatBytes(compressedSize)}`
      );
      navigation.goBack();
    } catch (error) {
      console.error('Compression error:', error);
      Alert.alert(
        'Conversion Failed',
        error instanceof Error ? error.message : 'Unable to convert video.'
      );
    } finally {
      setIsConverting(false);
    }
  };
  
  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Video Preview */}
        <Animated.View
          entering={FadeInDown.delay(100).springify()}
          style={styles.previewCard}
        >
          <View style={styles.previewPlaceholder}>
            <Icon name="video" set="Feather" size={48} color={colors.primary[500]} />
            <Text style={styles.previewText}>Selected Video</Text>
            <Text numberOfLines={1} style={styles.previewSubtext}>
              {selectedVideoName}
            </Text>
          </View>
        </Animated.View>

        {/* Format Selection */}
        <Animated.View
          entering={FadeInDown.delay(200).springify()}
          style={styles.section}
        >
          <Text style={styles.sectionTitle}>Format</Text>
          <View style={styles.optionsList}>
            {FORMAT_OPTIONS.map((option) => (
              <TouchableOpacity
                key={option.value}
                style={[
                  styles.listOption,
                  format === option.value && styles.listOptionSelected,
                  !option.supported && styles.listOptionDisabled,
                ]}
                onPress={() => {
                  if (!option.supported) {
                    Alert.alert('Coming Soon', `${option.label} export is not available yet.`);
                    return;
                  }
                  setFormat(option.value);
                }}
              >
                <View style={styles.listOptionContent}>
                  <Text style={[
                    styles.listOptionLabel,
                    format === option.value && styles.listOptionLabelSelected,
                  ]}>
                    {option.label}
                  </Text>
                  <Text style={styles.listOptionDescription}>
                    {option.description}
                  </Text>
                </View>
                {format === option.value && (
                  <Icon name="check" set="Feather" size={20} color={colors.primary[500]} />
                )}
              </TouchableOpacity>
            ))}
          </View>
        </Animated.View>

        {/* Resolution Selection */}
        <Animated.View
          entering={FadeInDown.delay(300).springify()}
          style={styles.section}
        >
          <Text style={styles.sectionTitle}>Resolution</Text>
          <View style={styles.optionsList}>
            {RESOLUTION_OPTIONS.map((option) => (
              <TouchableOpacity
                key={option.value}
                style={[
                  styles.listOption,
                  resolution === option.value && styles.listOptionSelected,
                ]}
                onPress={() => setResolution(option.value)}
              >
                <Text style={[
                  styles.listOptionLabel,
                  resolution === option.value && styles.listOptionLabelSelected,
                ]}>
                  {option.label}
                </Text>
                {resolution === option.value && (
                  <Icon name="check" set="Feather" size={20} color={colors.primary[500]} />
                )}
              </TouchableOpacity>
            ))}
          </View>
        </Animated.View>

        {/* Estimated Size */}
        <Animated.View
          entering={FadeInDown.delay(400).springify()}
          style={styles.section}
        >
          <Text style={styles.sectionTitle}>Estimated Output</Text>
          <View style={styles.estimateCard}>
            <View style={styles.estimateRow}>
              <Text style={styles.estimateLabel}>Original</Text>
              <Text style={styles.estimateValue}>{originalSizeText}</Text>
            </View>
            <View style={styles.estimateRow}>
              <Text style={styles.estimateLabel}>Output</Text>
              <Text style={styles.estimateValue}>{format.toUpperCase()} • {selectedResolutionLabel}</Text>
            </View>
            <View style={styles.estimateDivider} />
            <View style={styles.estimateRow}>
              <Text style={styles.estimatePrimaryLabel}>Estimated Size</Text>
              <Text style={styles.estimatePrimaryValue}>{estimatedSizeText}</Text>
            </View>
            <Text style={styles.estimateFootnote}>{estimatedDeltaText}</Text>
          </View>
        </Animated.View>

        <View style={styles.scrollSpacer} />
      </ScrollView>

      {/* Bottom Action */}
      <View style={styles.bottomAction}>
        {isConverting && (
          <View style={styles.progressBlock}>
            <View style={styles.progressHeader}>
              <Text style={styles.progressTitle}>Converting...</Text>
              <Text style={styles.progressPercent}>{Math.round(conversionProgress * 100)}%</Text>
            </View>
            <View style={styles.progressTrack}>
              <View style={[styles.progressFill, { width: `${conversionProgress * 100}%` }]} />
            </View>
          </View>
        )}
        <TouchableOpacity
          style={[styles.startButton, isConverting && styles.startButtonDisabled]}
          onPress={handleStartCompression}
          disabled={isConverting}
        >
          <LinearGradient
            colors={colors.gradients.primary}
            style={styles.startButtonGradient}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
          >
            {isConverting ? (
              <ActivityIndicator color="#FFFFFF" />
            ) : (
              <Icon name="play" set="Feather" size={24} color="#FFFFFF" />
            )}
            <Text style={styles.startButtonText}>
              {isConverting ? 'Converting...' : 'Start Conversion'}
            </Text>
          </LinearGradient>
        </TouchableOpacity>
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
  previewCard: {
    borderRadius: layout.borderRadius.xl,
    overflow: 'hidden',
    marginBottom: spacing[6],
    backgroundColor: colors.surface.primary,
    ...shadows.md,
  },
  previewPlaceholder: {
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.surface.secondary,
  },
  previewText: {
    ...textStyles.bodyMedium,
    color: colors.text.secondary,
    marginTop: spacing[2],
  },
  previewSubtext: {
    ...textStyles.bodySmall,
    color: colors.text.tertiary,
    marginTop: spacing[1],
    maxWidth: '90%',
  },
  section: {
    marginBottom: spacing[6],
  },
  sectionTitle: {
    ...textStyles.labelLarge,
    color: colors.text.secondary,
    marginBottom: spacing[3],
    textTransform: 'uppercase',
  },
  estimateCard: {
    padding: spacing[4],
    backgroundColor: colors.surface.primary,
    borderRadius: layout.borderRadius.lg,
    borderWidth: 1,
    borderColor: colors.border.subtle,
    gap: spacing[2],
  },
  estimateRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: spacing[2],
  },
  estimateLabel: {
    ...textStyles.bodySmall,
    color: colors.text.secondary,
  },
  estimateValue: {
    ...textStyles.bodyMedium,
    color: colors.text.primary,
    fontWeight: '500',
  },
  estimateDivider: {
    height: 1,
    backgroundColor: colors.border.subtle,
    marginVertical: spacing[1],
  },
  estimatePrimaryLabel: {
    ...textStyles.bodyMedium,
    color: colors.text.primary,
    fontWeight: '600',
  },
  estimatePrimaryValue: {
    ...textStyles.bodyLarge,
    color: colors.primary[500],
    fontWeight: '700',
  },
  estimateFootnote: {
    ...textStyles.bodySmall,
    color: colors.text.tertiary,
  },
  optionsList: {
    gap: spacing[2],
  },
  listOption: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: spacing[4],
    backgroundColor: colors.surface.primary,
    borderRadius: layout.borderRadius.lg,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  listOptionSelected: {
    borderColor: colors.primary[500],
    backgroundColor: colors.surface.secondary,
  },
  listOptionDisabled: {
    opacity: 0.55,
  },
  listOptionContent: {
    flex: 1,
  },
  listOptionLabel: {
    ...textStyles.bodyLarge,
    color: colors.text.primary,
    fontWeight: '600',
  },
  listOptionLabelSelected: {
    color: colors.primary[500],
  },
  listOptionDescription: {
    ...textStyles.bodySmall,
    color: colors.text.tertiary,
    marginTop: spacing[0.5],
  },
  scrollSpacer: {
    height: spacing[20],
  },
  bottomAction: {
    padding: spacing[4],
    paddingBottom: spacing[6],
    backgroundColor: colors.background.primary,
    borderTopWidth: 1,
    borderTopColor: colors.border.subtle,
  },
  progressBlock: {
    marginBottom: spacing[3],
    padding: spacing[3],
    backgroundColor: colors.surface.primary,
    borderRadius: layout.borderRadius.lg,
    borderWidth: 1,
    borderColor: colors.border.subtle,
    gap: spacing[2],
  },
  progressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  progressTitle: {
    ...textStyles.bodyMedium,
    color: colors.text.primary,
    fontWeight: '600',
  },
  progressPercent: {
    ...textStyles.bodySmall,
    color: colors.primary[500],
    fontWeight: '600',
  },
  progressTrack: {
    width: '100%',
    height: 8,
    borderRadius: 6,
    backgroundColor: colors.surface.secondary,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: 6,
    backgroundColor: colors.primary[500],
  },
  startButton: {
    borderRadius: layout.borderRadius.xl,
    overflow: 'hidden',
    ...shadows.lg,
  },
  startButtonDisabled: {
    opacity: 0.8,
  },
  startButtonGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: spacing[4],
    gap: spacing[2],
  },
  startButtonText: {
    ...textStyles.labelLarge,
    color: '#FFFFFF',
    fontWeight: '600',
  },
});
