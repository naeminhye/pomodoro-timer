export type TimerState = 'IDLE' | 'RUNNING' | 'PAUSED' | 'STOPPED';
export type PomodoroMode = 'Focus' | 'Short Break' | 'Long Break';

export interface PomodoroSession {
    id: string;
    type: PomodoroMode;
    startTime: string;
    taskName: string;
    endTime?: string;
    duration?: number;
    completed?: boolean;
    notes?: string;
    productivity?: number;
    tags?: string[];
}
