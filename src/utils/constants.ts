import type { PomodoroMode } from "./types";

export const MODES = {
    FOCUS: 'Focus' as PomodoroMode,
    SHORT_BREAK: 'Short Break' as PomodoroMode,
    LONG_BREAK: 'Long Break' as PomodoroMode,
};

export const DEFAULT_TIMES_IN_SECONDS = {
    // 25 minutes * 60 seconds/minute = 1500 seconds
    // FOCUS: 1500,
    [MODES.FOCUS]: 1500,

    // 5 minutes * 60 seconds/minute = 300 seconds
    [MODES.SHORT_BREAK]: 300,

    // 15 minutes * 60 seconds/minute = 900 seconds
    [MODES.LONG_BREAK]: 900,
};

export const DEFAULT_LONG_BREAK_INTERVAL = 4;

export const MODE_COLORS = {
    [MODES.FOCUS]: '#dc3545',       // A red/tomato color
    [MODES.SHORT_BREAK]: '#28a745',  // A green color
    [MODES.LONG_BREAK]: '#007bff',   // A blue color
};