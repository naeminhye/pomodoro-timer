import { create } from 'zustand';

interface HistoryEntry {
  // Define fields for a single history item, e.g.:
  timestamp: number;
  duration: number;
  type: 'focus' | 'shortBreak' | 'longBreak';
}
interface TimerSettingsState {
  focusTime: number;
  shortBreakTime: number;
  longBreakTime: number;
  autoBreak: boolean;
  autoFocus: boolean;
  longBreakInterval: number;

  // Data (Object/Map)
  history: Record<string, HistoryEntry>; // A map of string keys to HistoryEntry objects

  // Actions
  setSetting: <K extends keyof Omit<TimerSettingsState, 'history' | 'setSetting' | 'addHistory'>>(key: K, value: TimerSettingsState[K]) => void;
  setSettings: (updates: Partial<Omit<TimerSettingsState, 'history' | 'setSettings' | 'addHistory'>>) => void;
  addHistory: (entry: HistoryEntry) => void;
}

export const useTimerSettingsStore = create<TimerSettingsState>((set) => ({
  // Initial State
  focusTime: 25,
  shortBreakTime: 5,
  longBreakTime: 15,
  autoBreak: false,
  autoFocus: false,
  longBreakInterval: 4,
  history: {},

  // --- Actions ---

  // Generic action for updating any top-level setting field
  setSetting: (key, value) => {
    // We use the functional form of 'set' to update the state
    set(() => ({
      [key]: value, // TypeScript safely maps the key to the value type
    }));
  },
  setSettings: (updates) => {
    // 'set' automatically merges the new object with the existing state.
    set(updates);
  },
  // Specific action to add an item to the history object
  addHistory: (entry) => {
    set((state) => ({
      history: {
        ...state.history,
        [entry.timestamp.toString()]: entry, // Use timestamp as a unique key
      },
    }));
  },
}));