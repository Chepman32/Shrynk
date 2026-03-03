import React from 'react';
import { View, StyleSheet, Text, FlatList, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Icon } from '../../components/common/Icon';
import { colors, spacing, textStyles, layout } from '../../theme';
import { useHistoryStore } from '../../store/useHistoryStore';
import { formatBytes } from '../../utils/formatters';

export const HistoryScreen: React.FC = () => {
  const records = useHistoryStore(state => state.getFilteredRecords());
  const deleteRecord = useHistoryStore(state => state.deleteRecord);
  
  const renderItem = ({ item }: any) => (
    <View style={styles.historyItem}>
      <View style={styles.thumbnail}>
        <Icon name="video" set="Feather" size={24} color={colors.primary[500]} />
      </View>
      <View style={styles.itemContent}>
        <Text style={styles.itemTitle} numberOfLines={1}>
          {item.fileName}
        </Text>
        <View style={styles.itemMeta}>
          <Text style={styles.itemSize}>
            {formatBytes(item.originalSize)} → {formatBytes(item.compressedSize)}
          </Text>
          <View style={styles.savingsBadge}>
            <Text style={styles.savingsText}>
              -{Math.round((1 - item.compressedSize / item.originalSize) * 100)}%
            </Text>
          </View>
        </View>
      </View>
      <TouchableOpacity onPress={() => deleteRecord(item.id)}>
        <Icon name="trash-2" set="Feather" size={20} color={colors.semantic.error} />
      </TouchableOpacity>
    </View>
  );
  
  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>History</Text>
        <TouchableOpacity>
          <Icon name="search" set="Feather" size={24} color={colors.text.primary} />
        </TouchableOpacity>
      </View>
      
      {records.length === 0 ? (
        <View style={styles.emptyState}>
          <Icon name="clock" set="Feather" size={64} color={colors.neutral[600]} />
          <Text style={styles.emptyText}>No history yet</Text>
          <Text style={styles.emptySubtext}>Your compression history will appear here</Text>
        </View>
      ) : (
        <FlatList
          data={records}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.list}
          showsVerticalScrollIndicator={false}
        />
      )}
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
  list: {
    paddingHorizontal: spacing[4],
    paddingBottom: spacing[4],
  },
  historyItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing[3],
    backgroundColor: colors.surface.primary,
    borderRadius: layout.borderRadius.lg,
    marginBottom: spacing[2],
    gap: spacing[3],
  },
  thumbnail: {
    width: 64,
    height: 64,
    borderRadius: layout.borderRadius.md,
    backgroundColor: colors.surface.secondary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  itemContent: {
    flex: 1,
  },
  itemTitle: {
    ...textStyles.bodyMedium,
    color: colors.text.primary,
    marginBottom: spacing[1],
  },
  itemMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing[2],
  },
  itemSize: {
    ...textStyles.bodySmall,
    color: colors.text.secondary,
  },
  savingsBadge: {
    backgroundColor: colors.semantic.success,
    paddingHorizontal: spacing[2],
    paddingVertical: spacing[0.5],
    borderRadius: layout.borderRadius.sm,
  },
  savingsText: {
    ...textStyles.caption,
    color: '#FFFFFF',
    fontWeight: '600',
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: spacing[8],
  },
  emptyText: {
    ...textStyles.headingMedium,
    color: colors.text.secondary,
    marginTop: spacing[4],
  },
  emptySubtext: {
    ...textStyles.bodyMedium,
    color: colors.text.tertiary,
    marginTop: spacing[2],
    textAlign: 'center',
  },
});
