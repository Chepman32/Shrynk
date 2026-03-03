import { MMKV } from 'react-native-mmkv';
import RNFS from 'react-native-fs';

const storageConfig = {
  mmkv: {
    id: 'shrynk-storage',
    encryptionKey: 'shrynk-secure-key',
  },
  
  paths: {
    temp: `${RNFS.TemporaryDirectoryPath}/shrynk`,
    cache: `${RNFS.CachesDirectoryPath}/shrynk`,
    documents: `${RNFS.DocumentDirectoryPath}/shrynk`,
    thumbnails: `${RNFS.CachesDirectoryPath}/shrynk/thumbnails`,
    compressed: `${RNFS.DocumentDirectoryPath}/shrynk/compressed`,
  },
  
  cache: {
    maxThumbnails: 500,
    maxThumbnailSize: 100 * 1024 * 1024,
    maxTempFiles: 3,
  },
};

class StorageService {
  private mmkv: MMKV;
  
  constructor() {
    this.mmkv = new MMKV(storageConfig.mmkv);
    this.initializeDirectories();
  }
  
  private async initializeDirectories(): Promise<void> {
    const paths = Object.values(storageConfig.paths);
    for (const path of paths) {
      const exists = await RNFS.exists(path);
      if (!exists) {
        await RNFS.mkdir(path);
      }
    }
  }
  
  set<T>(key: string, value: T): void {
    this.mmkv.set(key, JSON.stringify(value));
  }
  
  get<T>(key: string, defaultValue?: T): T | undefined {
    const value = this.mmkv.getString(key);
    if (value) {
      return JSON.parse(value) as T;
    }
    return defaultValue;
  }
  
  delete(key: string): void {
    this.mmkv.delete(key);
  }
  
  async saveFile(data: string, filename: string, directory: keyof typeof storageConfig.paths): Promise<string> {
    const path = `${storageConfig.paths[directory]}/${filename}`;
    await RNFS.writeFile(path, data, 'utf8');
    return path;
  }
  
  async readFile(path: string): Promise<string> {
    return RNFS.readFile(path, 'utf8');
  }
  
  async deleteFile(path: string): Promise<void> {
    const exists = await RNFS.exists(path);
    if (exists) {
      await RNFS.unlink(path);
    }
  }
  
  async moveFile(source: string, destination: string): Promise<void> {
    await RNFS.moveFile(source, destination);
  }
  
  async copyFile(source: string, destination: string): Promise<void> {
    await RNFS.copyFile(source, destination);
  }
  
  async clearCache(): Promise<void> {
    const cachePath = storageConfig.paths.cache;
    const exists = await RNFS.exists(cachePath);
    if (exists) {
      await RNFS.unlink(cachePath);
      await RNFS.mkdir(cachePath);
    }
  }
  
  async getCacheSize(): Promise<number> {
    return this.getDirectorySize(storageConfig.paths.cache);
  }
  
  private async getDirectorySize(path: string): Promise<number> {
    const items = await RNFS.readDir(path);
    let totalSize = 0;
    
    for (const item of items) {
      if (item.isDirectory()) {
        totalSize += await this.getDirectorySize(item.path);
      } else {
        totalSize += parseInt(item.size, 10);
      }
    }
    
    return totalSize;
  }

  getPaths() {
    return storageConfig.paths;
  }
}

export const storage = new StorageService();
