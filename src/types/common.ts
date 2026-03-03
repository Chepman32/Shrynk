export interface IconProps {
  name: string;
  set: 'Feather' | 'MaterialCommunityIcons' | 'Ionicons' | 'FontAwesome5';
  size?: number;
  color?: string;
  style?: any;
}

export type ExportDestination = 'photos' | 'files' | 'share' | 'airdrop';

export interface ExportOptions {
  destination: ExportDestination;
  filename: string;
  includeMetadata: boolean;
}

export interface AppSettings {
  defaultQuality: string;
  defaultResolution: string;
  defaultCodec: string;
  defaultFormat: string;
  preserveMetadata: boolean;
  hardwareAcceleration: boolean;
  autoDeleteOriginal: boolean;
  maxCacheSize: number;
  theme: 'light' | 'dark' | 'system';
  hapticFeedback: boolean;
  notifyOnComplete: boolean;
}
