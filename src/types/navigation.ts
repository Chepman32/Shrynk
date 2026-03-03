import type { VideoMetadata } from './video';

export type RootStackParamList = {
  Splash: undefined;
  Main: undefined;
  Compression: { videoUri: string; videoId: string; originalSizeBytes: number };
  Preview: { originalUri: string; compressedUri: string; metadata: VideoMetadata };
  Trimming: { videoUri: string; duration: number };
  Export: { videoUri: string; metadata: VideoMetadata };
  PresetDetail: { presetId: string };
};

export type MainTabParamList = {
  Home: undefined;
  History: undefined;
  Settings: undefined;
};

export type HomeStackParamList = {
  HomeMain: undefined;
  Import: undefined;
  Batch: undefined;
};
