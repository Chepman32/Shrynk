import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Icon } from '../../components/common/Icon';
import { colors, spacing, textStyles } from '../../theme';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { HomeStackParamList } from '../../types/navigation';

type Props = NativeStackScreenProps<HomeStackParamList, 'Batch'>;

export const BatchScreen: React.FC<Props> = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="chevron-left" set="Feather" size={24} color={colors.text.primary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Batch Compression</Text>
        <View style={{ width: 24 }} />
      </View>
      
      <View style={styles.emptyState}>
        <Icon name="layers-triple" set="MaterialCommunityIcons" size={64} color={colors.neutral[600]} />
        <Text style={styles.emptyText}>Batch Processing</Text>
        <Text style={styles.emptySubtext}>Compress multiple videos at once</Text>
        <Text style={styles.comingSoon}>Coming Soon</Text>
      </View>
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
    ...textStyles.headingMedium,
    color: colors.text.primary,
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
  comingSoon: {
    ...textStyles.labelLarge,
    color: colors.primary[500],
    marginTop: spacing[4],
    paddingHorizontal: spacing[4],
    paddingVertical: spacing[2],
    backgroundColor: colors.surface.primary,
    borderRadius: 20,
  },
});
