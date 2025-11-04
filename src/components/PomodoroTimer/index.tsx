import { useCallback, useEffect, useMemo, useRef, useState } from "react";

import type { PomodoroMode, TimerState } from "@/utils/types";
import { Progress } from "@/components/ui/progress"

import { MODES } from "@/utils/constants";
import { useTimerSettingsStore } from "@/store/timerSettingsStore";

import Timer from "../Timer";
import Controller from "../Controller";
import ModeSelector from "../ModeSelector";
import { playSound } from "@/utils/helpers";

const ALARM_SOUND_URL = "/sounds/alarm_beep.mp3";
// const TICKING_SOUND_URL = "/sounds/clock_ticking.mp3";

// const audio = new Audio(TICKING_SOUND_URL);
// audio.loop = true;

function PomodoroTimer() {
    const focusTime = useTimerSettingsStore((state) => state.focusTime);
    const shortBreakTime = useTimerSettingsStore((state) => state.shortBreakTime);
    const longBreakTime = useTimerSettingsStore((state) => state.longBreakTime);
    const autoFocus = useTimerSettingsStore((state) => state.autoFocus);
    const autoBreak = useTimerSettingsStore((state) => state.autoBreak);
    const longBreakInterval = useTimerSettingsStore((state) => state.longBreakInterval);

    const timeOfModes = useMemo(() => ({
        [MODES.FOCUS]: focusTime,
        [MODES.SHORT_BREAK]: shortBreakTime,
        [MODES.LONG_BREAK]: longBreakTime
    }), [focusTime, shortBreakTime, longBreakTime]);

    const [currentMode, setCurrentMode] = useState<PomodoroMode>(MODES.FOCUS);
    const [timeRemaining, setTimeRemaining] = useState<number>(0);
    const [timerState, setTimerState] = useState<TimerState>("IDLE");
    const [focusCount, setFocusCount] = useState<number>(0);

    const progress = useMemo(() => (100 - Math.floor(timeRemaining / timeOfModes[currentMode] * 100)), [timeRemaining]);
    const intervalRef = useRef<any>(null); // TODO: fix issue

    const handleStartResumeTimer = useCallback(() => {
        if (intervalRef.current !== null) {
            clearInterval(intervalRef.current);
        }

        setTimerState("RUNNING");

        const id = setInterval(() => {
            setTimeRemaining(prevTime => {
                if (prevTime <= 1) {
                    clearInterval(intervalRef.current);
                    playSound(ALARM_SOUND_URL, () => {
                        setTimerState('STOPPED');
                    });
                    return 0;
                }
                return prevTime - 1;
            });
        }, 1000);
        intervalRef.current = id;
    }, [timerState, timeRemaining, focusCount, currentMode]);

    const handleMainButtonClick = useCallback(() => {
        if (timerState === "IDLE" || timerState === "PAUSED") {
            handleStartResumeTimer();
        }
        else {
            setTimerState("PAUSED");
            if (intervalRef.current !== null) {
                clearInterval(intervalRef.current);
                intervalRef.current = null;
            }
        }
    }, [handleStartResumeTimer, timerState, setTimerState, timeRemaining, setTimeRemaining]);

    const handleResetButtonClick = useCallback(() => {
        handleResetTimer();
        setFocusCount(0);
    }, []);

    const handleResetTimer = useCallback(() => {
        if (intervalRef.current !== null) {
            clearInterval(intervalRef.current);
            intervalRef.current = null;
        }
        setTimerState("IDLE");
        setTimeRemaining(timeOfModes[currentMode]);
    }, [setTimerState]);

    const handleChangeMode = useCallback((mode: PomodoroMode) => {
        handleResetTimer();
        setCurrentMode(mode);
        setTimeRemaining(timeOfModes[mode]);
    }, [setCurrentMode]);

    const handleStartMode = useCallback((mode: PomodoroMode) => {
        handleChangeMode(mode);
        handleStartResumeTimer();
    }, [handleChangeMode, handleStartResumeTimer]);

    useEffect(() => {
        setTimeRemaining(timeOfModes[currentMode]);
        console.log(">>>", currentMode)
    }, [focusTime, shortBreakTime, longBreakTime, currentMode]);

    // useEffect(() => {
    //     if (timerState === "RUNNING") {
    //         audio.play();
    //     }
    //     else {
    //         audio.pause();
    //     }
    // }, [timerState]);

    useEffect(() => {
        if (timerState !== 'STOPPED') return;

        // Handle auto focus/autobreak
        if (currentMode === MODES.FOCUS) {
            const count = focusCount + 1;
            setFocusCount(count);
            if (autoBreak) {
                if (count < longBreakInterval) {
                    // Auto run Short Break
                    handleStartMode(MODES.SHORT_BREAK);
                }
                else {
                    // Auto run Long Break
                    handleStartMode(MODES.LONG_BREAK);
                    setFocusCount(0);
                }
            }
        }
        else {
            if (autoFocus) {
                handleStartMode(MODES.FOCUS);
            }
        }
    }, [timerState, currentMode]);

    return (
        <div className="flex flex-1 flex-col items-center justify-center gap-4">
            <ModeSelector currentMode={currentMode} onChangeMode={handleChangeMode} />
            <Timer timeRemaining={timeRemaining} mode={currentMode} />

            <Progress value={progress} className="w-3xs h-1 mb-2" />

            <Controller state={timerState} mode={currentMode}
                onMainClick={handleMainButtonClick}
                onResetClick={handleResetButtonClick}
                onStartMode={handleStartMode}></Controller>
        </div>
    )
}

export default PomodoroTimer
