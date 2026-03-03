export type QualityLevel = 'low' | 'medium' | 'high' | 'maximum';
export type Resolution = '480p' | '720p' | '1080p' | '4k' | 'original';
export type VideoFormat = 'mp4' | 'mov' | 'mkv';
export type VideoCodec = 'h264' | 'h265';
export type EncodingSpeed = 'ultrafast' | 'fast' | 'medium' | 'slow';
export type CompressionStatus = 'pending' | 'processing' | 'completed' | 'error';

export interface CompressionOptions {
  quality: QualityLevel;
  resolution?: Resolution;
  format?: VideoFormat;
  targetSizeMb?: number;
  codec: VideoCodec;
  fps?: number;
  targetBitrate?: number;
  audioBitrate?: number;
  removeAudio?: boolean;
  preserveMetadata?: boolean;
  encodingSpeed?: EncodingSpeed;
  useHardwareAcceleration?: boolean;
  duration?: number;
}

export interface CompressionResult {
  success: boolean;
  outputUri: string;
  metadata: any;
  error?: string;
}

export interface CompressionRecord {
  id: string;
  originalUri: string;
  compressedUri: string;
  thumbnailUri: string;
  fileName: string;
  originalSize: number;
  compressedSize: number;
  compressionRatio: number;
  options: CompressionOptions;
  status: CompressionStatus;
  errorMessage?: string;
  startedAt: string;
  completedAt?: string;
  duration: number;
}

export interface CompressionPreset {
  id: string;
  name: string;
  description: string;
  icon: { set: string; name: string };
  options: Partial<CompressionOptions>;
  isBuiltIn: boolean;
}
