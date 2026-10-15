import { create } from 'zustand';

type StatusSettings = {
  autoRefresh: boolean;
  toggleAutoRefresh: () => void;
};

/** Shared UI state: any component can read or flip auto-refresh. */
export const useStatusSettings = create<StatusSettings>()((set) => ({
  autoRefresh: false,
  toggleAutoRefresh: () => set((state) => ({ autoRefresh: !state.autoRefresh })),
}));
