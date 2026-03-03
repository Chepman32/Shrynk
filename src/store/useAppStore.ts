import { create } from 'zustand';
import { storage } from '../services/storage/StorageService';

interface AppState {
  isInitialized: boolean;
  isLoading: boolean;
  error: string | null;
  
  initialize: () => Promise<void>;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  clearError: () => void;
}

export const useAppStore = create<AppState>((set, get) => ({
  isInitialized: false,
  isLoading: true,
  error: null,
  
  initialize: async () => {
    try {
      set({ isLoading: true });
      
      // Initialize services
      // Storage is already initialized in constructor
      
      set({ isInitialized: true, isLoading: false });
    } catch (error: any) {
      set({ error: error.message, isLoading: false });
    }
  },
  
  setLoading: (loading) => set({ isLoading: loading }),
  setError: (error) => set({ error }),
  clearError: () => set({ error: null }),
}));
