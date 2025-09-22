// src/store/ui.store.ts

import { create } from 'zustand';

interface UIState {
  loading: boolean;
  setLoading: (value: boolean) => void;
}

export const useUIStore = create<UIState>((set) => ({
  loading: false,
  setLoading: (value: boolean) => set({ loading: value }),
}));
