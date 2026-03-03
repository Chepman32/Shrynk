import React, { useMemo, useState } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Animated, { FadeInDown } from 'react-native-reanimated';
import LinearGradient from 'react-native-linear-gradient';
import { Icon } from '../../components/common/Icon';
import { colors, spacing, textStyles, layout, shadows } from '../../theme';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../../types/navigation';
import type { Resolution, VideoFormat } from '../../types/compression';
import { formatBytes } from '../../utils/formatters';

type Props = NativeStackScreenProps<RootStackParamList, 'Compression'>;

const FORMAT_OPTIONS: { value: VideoFormat; label: string; description: string }[] = [
  { value: 'mp4', label: 'MP4', description: 'Best compatibility' },
  { value: 'mov', label: 'MOV', description: 'High quality' },
  { value: 'mkv', label: 'MKV', description: 'Flexible container' },
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

export const CompressionScreen: React.FC<Props> = ({ navigation, route }) => {
  const { videoUri, originalSizeBytes } = route.params;

  const [format, setFormat] = useState<VideoFormat>('mp4');
  const [resolution, setResolution] = useState<Resolution>('original');

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

  const handleStartCompression = () => {
    // TODO: Implement actual compression logic
    Alert.alert(
      'Conversion Started',
      `Format: ${format.toUpperCase()}\nResolution: ${selectedResolutionLabel}\nEstimated Size: ${estimatedSizeText}`,
      [
        {
          text: 'OK',
          onPress: () => navigation.goBack(),
        },
      ]
    );
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
                ]}
                onPress={() => setFormat(option.value)}
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
        <TouchableOpacity
          style={styles.startButton}
          onPress={handleStartCompression}
        >
          <LinearGradient
            colors={colors.gradients.primary}
            style={styles.startButtonGradient}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
          >
            <Icon name="play" set="Feather" size={24} color="#FFFFFF" />
            <Text style={styles.startButtonText}>Start Conversion</Text>
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
  startButton: {
    borderRadius: layout.borderRadius.xl,
    overflow: 'hidden',
    ...shadows.lg,
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
