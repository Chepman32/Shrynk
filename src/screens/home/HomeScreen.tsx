import React from 'react';
import { View, StyleSheet, Text, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Animated, { FadeInUp } from 'react-native-reanimated';
import LinearGradient from 'react-native-linear-gradient';
import { Icon } from '../../components/common/Icon';
import { Button } from '../../components/common/Button';
import { colors, spacing, textStyles, layout, shadows } from '../../theme';
import { useHistoryStore } from '../../store/useHistoryStore';
import { formatBytes } from '../../utils/formatters';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { HomeStackParamList } from '../../types/navigation';

type Props = NativeStackScreenProps<HomeStackParamList, 'HomeMain'>;

export const HomeScreen: React.FC<Props> = ({ navigation }) => {
  const records = useHistoryStore(state => state.records);
  const recentRecords = records.slice(0, 3);
  
  const totalSaved = records.reduce((acc, r) => 
    acc + (r.originalSize - r.compressedSize), 0
  );
  
  const handleImport = () => {
    navigation.navigate('Import');
  };
  
  const handleBatch = () => {
    navigation.navigate('Batch');
  };
  
  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Shrynk</Text>
        <TouchableOpacity>
          <Icon name="menu" set="Feather" size={24} color={colors.text.primary} />
        </TouchableOpacity>
      </View>
      
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Statistics Card */}
        <Animated.View 
          entering={FadeInUp.delay(100).springify()}
          style={styles.statsCard}
        >
          <LinearGradient
            colors={colors.gradients.primary}
            style={styles.statsGradient}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          >
            <View style={styles.statsContent}>
              <Text style={styles.statsLabel}>Total Space Saved</Text>
              <Text style={styles.statsValue}>{formatBytes(totalSaved)}</Text>
              <Text style={styles.statsSubtext}>
                {records.length} videos compressed
              </Text>
            </View>
          </LinearGradient>
        </Animated.View>
        
        {/* Quick Actions */}
        <Animated.View 
          entering={FadeInUp.delay(200).springify()}
          style={styles.section}
        >
          <Text style={styles.sectionTitle}>Quick Actions</Text>
          <View style={styles.actionsRow}>
            <TouchableOpacity 
              style={styles.actionButton}
              onPress={handleImport}
            >
              <LinearGradient
                colors={colors.gradients.primary}
                style={styles.actionGradient}
              >
                <Icon name="plus" set="Feather" size={28} color="#FFFFFF" />
                <Text style={styles.actionLabel}>Import</Text>
              </LinearGradient>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.actionButton}
              onPress={handleBatch}
            >
              <LinearGradient
                colors={colors.gradients.premium}
                style={styles.actionGradient}
              >
                <Icon name="layers-triple" set="MaterialCommunityIcons" size={28} color="#FFFFFF" />
                <Text style={styles.actionLabel}>Batch</Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </Animated.View>
        
        {/* Recent Compressions */}
        <Animated.View 
          entering={FadeInUp.delay(300).springify()}
          style={styles.section}
        >
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Recent</Text>
            <TouchableOpacity>
              <Icon name="arrow-right" set="Feather" size={20} color={colors.primary[500]} />
            </TouchableOpacity>
          </View>
          
          {recentRecords.length === 0 ? (
            <View style={styles.emptyState}>
              <Icon name="video" set="Feather" size={48} color={colors.neutral[600]} />
              <Text style={styles.emptyText}>No compressions yet</Text>
              <Text style={styles.emptySubtext}>Import a video to get started</Text>
            </View>
          ) : (
            <View style={styles.recentList}>
              {recentRecords.map((record, index) => (
                <View key={record.id} style={styles.recentItem}>
                  <View style={styles.recentThumbnail}>
                    <Icon name="video" set="Feather" size={24} color={colors.primary[500]} />
                  </View>
                  <View style={styles.recentContent}>
                    <Text style={styles.recentTitle} numberOfLines={1}>
                      {record.fileName}
                    </Text>
                    <View style={styles.recentMeta}>
                      <Text style={styles.recentSize}>
                        {formatBytes(record.originalSize)}
                      </Text>
                      <Icon name="arrow-right" set="Feather" size={12} color={colors.neutral[400]} />
                      <Text style={styles.recentSizeCompressed}>
                        {formatBytes(record.compressedSize)}
                      </Text>
                      <View style={styles.savingsBadge}>
                        <Text style={styles.savingsText}>
                          -{Math.round((1 - record.compressedSize / record.originalSize) * 100)}%
                        </Text>
                      </View>
                    </View>
                  </View>
                  <Icon name="chevron-right" set="Feather" size={20} color={colors.neutral[300]} />
                </View>
              ))}
            </View>
          )}
        </Animated.View>
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
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
  statsCard: {
    borderRadius: layout.borderRadius.xl,
    overflow: 'hidden',
    marginBottom: spacing[6],
    ...shadows.lg,
  },
  statsGradient: {
    padding: spacing[6],
  },
  statsContent: {
    alignItems: 'center',
  },
  statsLabel: {
    ...textStyles.labelMedium,
    color: 'rgba(255, 255, 255, 0.8)',
    marginBottom: spacing[2],
  },
  statsValue: {
    ...textStyles.displayMedium,
    color: '#FFFFFF',
    marginBottom: spacing[1],
  },
  statsSubtext: {
    ...textStyles.bodySmall,
    color: 'rgba(255, 255, 255, 0.7)',
  },
  section: {
    marginBottom: spacing[6],
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing[3],
  },
  sectionTitle: {
    ...textStyles.headingSmall,
    color: colors.text.primary,
  },
  actionsRow: {
    flexDirection: 'row',
    gap: spacing[3],
  },
  actionButton: {
    flex: 1,
    borderRadius: layout.borderRadius.xl,
    overflow: 'hidden',
    ...shadows.md,
  },
  actionGradient: {
    padding: spacing[5],
    alignItems: 'center',
    justifyContent: 'center',
  },
  actionLabel: {
    ...textStyles.labelLarge,
    color: '#FFFFFF',
    marginTop: spacing[2],
  },
  recentList: {
    gap: spacing[2],
  },
  recentItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing[3],
    backgroundColor: colors.surface.primary,
    borderRadius: layout.borderRadius.lg,
    gap: spacing[3],
  },
  recentThumbnail: {
    width: 64,
    height: 64,
    borderRadius: layout.borderRadius.md,
    backgroundColor: colors.surface.secondary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  recentContent: {
    flex: 1,
  },
  recentTitle: {
    ...textStyles.bodyMedium,
    color: colors.text.primary,
    marginBottom: spacing[1],
  },
  recentMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing[1],
  },
  recentSize: {
    ...textStyles.bodySmall,
    color: colors.text.secondary,
  },
  recentSizeCompressed: {
    ...textStyles.bodySmall,
    color: colors.primary[500],
    fontWeight: '600',
  },
  savingsBadge: {
    backgroundColor: colors.semantic.success,
    paddingHorizontal: spacing[2],
    paddingVertical: spacing[0.5],
    borderRadius: layout.borderRadius.sm,
    marginLeft: spacing[1],
  },
  savingsText: {
    ...textStyles.caption,
    color: '#FFFFFF',
    fontWeight: '600',
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: spacing[10],
  },
  emptyText: {
    ...textStyles.bodyLarge,
    color: colors.text.secondary,
    marginTop: spacing[3],
  },
  emptySubtext: {
    ...textStyles.bodySmall,
    color: colors.text.tertiary,
    marginTop: spacing[1],
  },
});
