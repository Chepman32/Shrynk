export interface VideoMetadata {
  duration: number;
  size: number;
  width: number;
  height: number;
  bitrate: number;
  codec: string;
  fps: number;
}

export interface ImportedVideo {
  id: string;
  uri: string;
  thumbnailUri: string;
  metadata: VideoMetadata;
  importedAt: string;
}

export interface SavedVideo {
  id: string;
  uri: string;
  thumbnailUri: string;
  metadata: VideoMetadata;
  savedAt: string;
}
