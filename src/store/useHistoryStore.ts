import { create } from 'zustand';
import { storage } from '../services/storage/StorageService';
import { generateId } from '../utils/formatters';
import type { CompressionRecord } from '../types/compression';

interface PersistedHistory {
  items: CompressionRecord[];
  lastUpdated: string;
}

type HistoryFilter = 'all' | 'today' | 'week' | 'month';

interface HistoryState {
  records: CompressionRecord[];
  isLoading: boolean;
  filter: HistoryFilter;
  searchQuery: string;
  
  loadHistory: () => void;
  addRecord: (record: Omit<CompressionRecord, 'id' | 'startedAt' | 'completedAt' | 'duration'>) => void;
  deleteRecord: (id: string) => void;
  clearHistory: () => void;
  setFilter: (filter: HistoryFilter) => void;
  setSearchQuery: (query: string) => void;
  getFilteredRecords: () => CompressionRecord[];
}

export const useHistoryStore = create<HistoryState>((set, get) => ({
  records: [],
  isLoading: false,
  filter: 'all',
  searchQuery: '',
  
  loadHistory: () => {
    set({ isLoading: true });
    const persisted = storage.get<PersistedHistory>('history');
    const records = persisted?.items ?? [];
    set({ records, isLoading: false });
  },
  
  addRecord: (recordData) => {
    const record: CompressionRecord = {
      ...recordData,
      id: generateId(),
      startedAt: new Date().toISOString(),
      completedAt: new Date().toISOString(),
      duration: 0,
    };
    
    set((state) => {
      const newRecords = [record, ...state.records];
      const persisted: PersistedHistory = {
        items: newRecords,
        lastUpdated: new Date().toISOString(),
      };
      storage.set('history', persisted);
      return { records: newRecords };
    });
  },
  
  deleteRecord: (id) => {
    set((state) => {
      const newRecords = state.records.filter(r => r.id !== id);
      const persisted: PersistedHistory = {
        items: newRecords,
        lastUpdated: new Date().toISOString(),
      };
      storage.set('history', persisted);
      return { records: newRecords };
    });
  },
  
  clearHistory: () => {
    set({ records: [] });
    const persisted: PersistedHistory = {
      items: [],
      lastUpdated: new Date().toISOString(),
    };
    storage.set('history', persisted);
  },
  
  setFilter: (filter) => set({ filter }),
  setSearchQuery: (searchQuery) => set({ searchQuery }),
  
  getFilteredRecords: () => {
    const { records, filter, searchQuery } = get();
    let filtered = [...records];
    
    // Apply search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(r =>
        r.fileName.toLowerCase().includes(query)
      );
    }
    
    // Sort by date descending
    return filtered.sort((a, b) =>
      new Date(b.startedAt).getTime() - new Date(a.startedAt).getTime()
    );
  },
}));
