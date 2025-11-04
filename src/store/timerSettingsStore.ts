import { create } from 'zustand';
import { devtools, persist, createJSONStorage } from 'zustand/middleware';

import { DEFAULT_LONG_BREAK_INTERVAL, DEFAULT_TIMES_IN_SECONDS, MODES } from '@/utils/constants';

interface HistoryEntry {
  timestamp: number;
  duration: number;
  type: 'focus' | 'shortBreak' | 'longBreak';
}

interface TimerSettingsState {
  // Timer setting
  focusTime: number;
  shortBreakTime: number;
  longBreakTime: number;
  autoBreak: boolean;
  autoFocus: boolean;
  longBreakInterval: number;
  history: Record<string, HistoryEntry>;

  setSetting: <K extends keyof Omit<TimerSettingsState, 'history' | 'setSetting' | 'addHistory' | 'setSettings'>>(
    key: K,
    value: TimerSettingsState[K]
  ) => void;
  setSettings: (updates: Partial<Omit<TimerSettingsState, 'history' | 'setSetting' | 'addHistory' | 'setSettings'>>) => void;
  addHistory: (entry: HistoryEntry) => void;
  getTimerSettings: () => any;
}

export const useTimerSettingsStore = create<TimerSettingsState>()(
  devtools(
    persist(
      (set, get) => ({
        focusTime: DEFAULT_TIMES_IN_SECONDS[MODES.FOCUS],
        shortBreakTime: DEFAULT_TIMES_IN_SECONDS[MODES.SHORT_BREAK],
        longBreakTime: DEFAULT_TIMES_IN_SECONDS[MODES.LONG_BREAK],
        autoBreak: false,
        autoFocus: false,
        longBreakInterval: DEFAULT_LONG_BREAK_INTERVAL,
        history: {},

        setSetting: (key, value) => set({ [key]: value }),
        setSettings: (updates) => {
          set(updates);
        },
        addHistory: (entry) =>
          set((state) => ({
            history: {
              ...state.history,
              [entry.timestamp.toString()]: entry,
            },
          })),
        getTimerSettings: () => ({
          focusTime: get().focusTime,
          shortBreakTime: get().shortBreakTime,
          longBreakTime: get().longBreakTime,
          autoBreak: get().autoBreak,
          autoFocus: get().autoFocus,
          longBreakInterval: get().longBreakInterval,
        })
      }),
      // Save settings to session storage
      {
        name: 'pomodoro-timer-storage',
        storage: createJSONStorage(() => sessionStorage),
      },
    )
  )
);
