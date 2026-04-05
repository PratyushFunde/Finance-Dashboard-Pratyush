// store/useInsightsStore.ts
import { create } from "zustand";

interface InsightsState {
  startDate: string | null;
  endDate: string | null;
  setDateRange: (start: string, end: string) => void;
}

export const useInsightsStore = create<InsightsState>((set) => ({
  startDate: new Date("2024-01-01").toISOString(),
  endDate: new Date("2024-10-31").toISOString(),

  setDateRange: (start, end) =>
    set({ startDate: start, endDate: end }),
}));