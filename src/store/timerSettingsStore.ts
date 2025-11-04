import { create } from 'zustand';
import { devtools, persist, createJSONStorage } from 'zustand/middleware';

import { DEFAULT_LONG_BREAK_INTERVAL, DEFAULT_TIMES_IN_SECONDS, MODES } from '@/utils/constants';
import type { PomodoroMode, PomodoroSession } from '@/utils/types';

interface TimerSettingsState {
  // Timer setting
  focusTime: number;
  shortBreakTime: number;
  longBreakTime: number;
  autoBreak: boolean;
  autoFocus: boolean;
  longBreakInterval: number;
  history: PomodoroSession[];
  currentSession: PomodoroSession | null;

  setSetting: <K extends keyof Omit<TimerSettingsState, 'history' | 'setSetting' | 'addHistory' | 'setSettings'>>(
    key: K,
    value: TimerSettingsState[K]
  ) => void;
  setSettings: (updates: Partial<Omit<TimerSettingsState, 'history' | 'setSetting' | 'addHistory' | 'setSettings'>>) => void;
  getTimerSettings: () => any;

  startSession: (type: PomodoroMode, name: string) => void;
  completeSession: () => void;
  cancelSession: () => void;
  clearHistory: () => void;

  resetTimerSetting: () => void;
}

const initialTimerSetting = {
  focusTime: DEFAULT_TIMES_IN_SECONDS[MODES.FOCUS],
  shortBreakTime: DEFAULT_TIMES_IN_SECONDS[MODES.SHORT_BREAK],
  longBreakTime: DEFAULT_TIMES_IN_SECONDS[MODES.LONG_BREAK],
  autoBreak: false,
  autoFocus: false,
  longBreakInterval: DEFAULT_LONG_BREAK_INTERVAL,
};

export const useTimerSettingsStore = create<TimerSettingsState>()(
  devtools(
    persist(
      (set, get) => ({
        ...initialTimerSetting,
        history: [],
        currentSession: null,

        setSetting: (key, value) => set({ [key]: value }),
        setSettings: (updates) => set(updates),

        getTimerSettings: () => ({
          focusTime: get().focusTime,
          shortBreakTime: get().shortBreakTime,
          longBreakTime: get().longBreakTime,
          autoBreak: get().autoBreak,
          autoFocus: get().autoFocus,
          longBreakInterval: get().longBreakInterval,
        }),

        // History
        startSession: (type, name) => {
          const newSession: PomodoroSession = {
            id: Date.now().toString(),
            type,
            startTime: new Date().toISOString(),
            taskName: name
          };
          set({ currentSession: newSession });
        },
        cancelSession: () => {
          const { currentSession } = get();
          if (!currentSession) return;
          set({
            currentSession: null,
          });
        },
        completeSession: () => {
          const { currentSession, history } = get();
          if (!currentSession) return;

          const endTime = new Date().toISOString();
          
          const duration = Math.floor((new Date(endTime).getTime() -
              new Date(currentSession.startTime).getTime()) /
              1000);

          const completedSession: PomodoroSession = {
            ...currentSession,
            endTime,
            duration,
            completed: true,
          };

          set({
            history: [...(history?.length ? history : []), completedSession],
            currentSession: null,
          });
        },
        clearHistory: () => set({ history: [] }),
        resetTimerSetting: () => set({ ...initialTimerSetting }),
      }),
      // Save settings to session storage
      {
        name: 'pomodoro-timer-storage',
        storage: createJSONStorage(() => sessionStorage),
      },
    )
  )
);
