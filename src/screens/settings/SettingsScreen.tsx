import React from 'react';
import { View, StyleSheet, Text, ScrollView, TouchableOpacity, Switch } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Icon } from '../../components/common/Icon';
import { colors, spacing, textStyles, layout } from '../../theme';
import { useSettingsStore } from '../../store/useSettingsStore';
import { formatBytes } from '../../utils/formatters';

export const SettingsScreen: React.FC = () => {
  const settings = useSettingsStore();
  
  const SettingsRow = ({ 
    label, 
    value, 
    onPress, 
    showChevron = true 
  }: { 
    label: string; 
    value?: string; 
    onPress?: () => void;
    showChevron?: boolean;
  }) => (
    <TouchableOpacity 
      style={styles.settingsRow}
      onPress={onPress}
      disabled={!onPress}
    >
      <Text style={styles.settingsLabel}>{label}</Text>
      <View style={styles.settingsValue}>
        {value && <Text style={styles.settingsValueText}>{value}</Text>}
        {showChevron && onPress && (
          <Icon name="chevron-right" set="Feather" size={20} color={colors.neutral[400]} />
        )}
      </View>
    </TouchableOpacity>
  );
  
  const SettingsToggle = ({ 
    label, 
    value, 
    onValueChange 
  }: { 
    label: string; 
    value: boolean; 
    onValueChange: (value: boolean) => void;
  }) => (
    <View style={styles.settingsRow}>
      <Text style={styles.settingsLabel}>{label}</Text>
      <Switch
        value={value}
        onValueChange={onValueChange}
        trackColor={{ false: colors.neutral[700], true: colors.primary[500] }}
        thumbColor={colors.neutral[0]}
      />
    </View>
  );
  
  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Settings</Text>
      </View>
      
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Compression Defaults */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Compression Defaults</Text>
          <View style={styles.card}>
            <SettingsRow 
              label="Default Quality" 
              value={settings.defaultQuality}
              onPress={() => {}}
            />
            <SettingsRow 
              label="Default Resolution" 
              value={settings.defaultResolution}
              onPress={() => {}}
            />
            <SettingsRow 
              label="Default Codec" 
              value={settings.defaultCodec.toUpperCase()}
              onPress={() => {}}
            />
          </View>
        </View>
        
        {/* Processing */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Processing</Text>
          <View style={styles.card}>
            <SettingsToggle
              label="Hardware Acceleration"
              value={settings.hardwareAcceleration}
              onValueChange={(value) => settings.updateSettings({ hardwareAcceleration: value })}
            />
            <SettingsToggle
              label="Preserve Metadata"
              value={settings.preserveMetadata}
              onValueChange={(value) => settings.updateSettings({ preserveMetadata: value })}
            />
            <SettingsToggle
              label="Auto Delete Original"
              value={settings.autoDeleteOriginal}
              onValueChange={(value) => settings.updateSettings({ autoDeleteOriginal: value })}
            />
          </View>
        </View>
        
        {/* Storage */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Storage</Text>
          <View style={styles.card}>
            <SettingsRow 
              label="Cache Size" 
              value={formatBytes(settings.cacheSize)}
              showChevron={false}
            />
            <TouchableOpacity 
              style={styles.clearCacheButton}
              onPress={settings.clearCache}
            >
              <Text style={styles.clearCacheText}>Clear Cache</Text>
            </TouchableOpacity>
          </View>
        </View>
        
        {/* Preferences */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Preferences</Text>
          <View style={styles.card}>
            <SettingsToggle
              label="Haptic Feedback"
              value={settings.hapticFeedback}
              onValueChange={(value) => settings.updateSettings({ hapticFeedback: value })}
            />
            <SettingsToggle
              label="Notify on Complete"
              value={settings.notifyOnComplete}
              onValueChange={(value) => settings.updateSettings({ notifyOnComplete: value })}
            />
          </View>
        </View>
        
        {/* About */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>About</Text>
          <View style={styles.card}>
            <SettingsRow 
              label="Version" 
              value="1.0.0"
              showChevron={false}
            />
            <SettingsRow 
              label="Privacy Policy" 
              onPress={() => {}}
            />
            <SettingsRow 
              label="Terms of Service" 
              onPress={() => {}}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background.primary,
  },
  header: {
    paddingHorizontal: spacing[4],
    paddingVertical: spacing[3],
  },
  headerTitle: {
    ...textStyles.headingLarge,
    color: colors.text.primary,
  },
  content: {
    flex: 1,
    paddingHorizontal: spacing[4],
  },
  section: {
    marginBottom: spacing[6],
  },
  sectionTitle: {
    ...textStyles.labelLarge,
    color: colors.text.secondary,
    marginBottom: spacing[2],
    textTransform: 'uppercase',
  },
  card: {
    backgroundColor: colors.surface.primary,
    borderRadius: layout.borderRadius.xl,
    overflow: 'hidden',
  },
  settingsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: spacing[4],
    borderBottomWidth: 1,
    borderBottomColor: colors.border.subtle,
  },
  settingsLabel: {
    ...textStyles.bodyMedium,
    color: colors.text.primary,
  },
  settingsValue: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing[2],
  },
  settingsValueText: {
    ...textStyles.bodyMedium,
    color: colors.text.secondary,
  },
  clearCacheButton: {
    padding: spacing[4],
    alignItems: 'center',
  },
  clearCacheText: {
    ...textStyles.bodyMedium,
    color: colors.semantic.error,
    fontWeight: '600',
  },
});
