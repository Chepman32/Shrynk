import React, { useState } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { launchImageLibrary } from 'react-native-image-picker';
import { Icon } from '../../components/common/Icon';
import { Button } from '../../components/common/Button';
import { colors, spacing, textStyles, layout } from '../../theme';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { HomeStackParamList } from '../../types/navigation';

type Props = NativeStackScreenProps<HomeStackParamList, 'Import'>;

export const ImportScreen: React.FC<Props> = ({ navigation }) => {
  const [selectedVideos, setSelectedVideos] = useState<any[]>([]);
  
  const handleImportFromGallery = async () => {
    try {
      const result = await launchImageLibrary({
        mediaType: 'video',
        selectionLimit: 0,
      });
      
      if (result.assets && result.assets.length > 0) {
        setSelectedVideos(result.assets);
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to import video');
    }
  };
  
  const handleImport = () => {
    if (selectedVideos.length > 0) {
      // Navigate to compression screen with first video
      navigation.navigate('HomeMain');
      Alert.alert('Success', `${selectedVideos.length} video(s) imported`);
    }
  };
  
  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="chevron-left" set="Feather" size={24} color={colors.text.primary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Import</Text>
        <View style={{ width: 24 }} />
      </View>
      
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
            onPress={() => Alert.alert('Coming Soon', 'Files import will be available soon')}
          >
            <View style={styles.sourceIcon}>
              <Icon name="folder" set="Feather" size={32} color={colors.primary[500]} />
            </View>
            <Text style={styles.sourceLabel}>Files</Text>
          </TouchableOpacity>
        </View>
        
        {selectedVideos.length > 0 && (
          <View style={styles.selectedContainer}>
            <Text style={styles.selectedText}>
              {selectedVideos.length} video(s) selected
            </Text>
          </View>
        )}
      </View>
      
      {selectedVideos.length > 0 && (
        <View style={styles.footer}>
          <Button
            variant="primary"
            label={`Import ${selectedVideos.length} Video(s)`}
            onPress={handleImport}
            fullWidth
          />
        </View>
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
    ...textStyles.headingMedium,
    color: colors.text.primary,
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
  selectedContainer: {
    marginTop: spacing[6],
    padding: spacing[4],
    backgroundColor: colors.primary[500],
    borderRadius: layout.borderRadius.lg,
    alignItems: 'center',
  },
  selectedText: {
    ...textStyles.bodyMedium,
    color: '#FFFFFF',
    fontWeight: '600',
  },
  footer: {
    padding: spacing[4],
    borderTopWidth: 1,
    borderTopColor: colors.border.subtle,
  },
});
