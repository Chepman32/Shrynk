import { create } from 'zustand';
import { storage } from '../services/storage/StorageService';
import type { AppSettings } from '../types/common';

const defaultSettings: AppSettings = {
  defaultQuality: 'medium',
  defaultResolution: '1080p',
  defaultCodec: 'h264',
  defaultFormat: 'mp4',
  preserveMetadata: true,
  hardwareAcceleration: true,
  autoDeleteOriginal: false,
  maxCacheSize: 500 * 1024 * 1024,
  theme: 'dark',
  hapticFeedback: true,
  notifyOnComplete: true,
};

interface SettingsState extends AppSettings {
  cacheSize: number;
  
  loadSettings: () => void;
  updateSettings: (settings: Partial<AppSettings>) => void;
  resetSettings: () => void;
  clearCache: () => Promise<void>;
  calculateCacheSize: () => Promise<void>;
}

export const useSettingsStore = create<SettingsState>((set, get) => ({
  ...defaultSettings,
  cacheSize: 0,
  
  loadSettings: () => {
    const settings = storage.get<AppSettings>('settings', defaultSettings);
    set(settings);
    get().calculateCacheSize();
  },
  
  updateSettings: (updates) => {
    set((state) => {
      const newSettings = { ...state, ...updates };
      const settingsToSave: AppSettings = {
        defaultQuality: newSettings.defaultQuality,
        defaultResolution: newSettings.defaultResolution,
        defaultCodec: newSettings.defaultCodec,
        defaultFormat: newSettings.defaultFormat,
        preserveMetadata: newSettings.preserveMetadata,
        hardwareAcceleration: newSettings.hardwareAcceleration,
        autoDeleteOriginal: newSettings.autoDeleteOriginal,
        maxCacheSize: newSettings.maxCacheSize,
        theme: newSettings.theme,
        hapticFeedback: newSettings.hapticFeedback,
        notifyOnComplete: newSettings.notifyOnComplete,
      };
      storage.set('settings', settingsToSave);
      return newSettings;
    });
  },
  
  resetSettings: () => {
    set(defaultSettings);
    storage.set('settings', defaultSettings);
  },
  
  clearCache: async () => {
    await storage.clearCache();
    set({ cacheSize: 0 });
  },
  
  calculateCacheSize: async () => {
    const size = await storage.getCacheSize();
    set({ cacheSize: size });
  },
}));
