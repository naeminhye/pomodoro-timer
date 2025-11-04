import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { toast } from "sonner"

import type { PomodoroMode, TimerState } from "@/utils/types";
import { Progress } from "@/components/ui/progress"

import { FOCUS_COMPLETE_MESSAGES, MODES } from "@/utils/constants";
import { useTimerSettingsStore } from "@/store/timerSettingsStore";
import { getRandomMessage, playSound } from "@/utils/helpers";

import Timer from "../Timer";
import Controller from "../Controller";
import ModeSelector from "../ModeSelector";
import FireworksCanvas from "../FireworksCanvas";

const ALARM_SOUND_URL = "/sounds/alarm_beep.mp3";
// const TICKING_SOUND_URL = "/sounds/clock_ticking.mp3";

// const audio = new Audio(TICKING_SOUND_URL);
// audio.loop = true;

function PomodoroTimer() {
    const { focusTime, shortBreakTime, longBreakTime, autoBreak, autoFocus, longBreakInterval,
        startSession, completeSession, history, currentSession, cancelSession } = useTimerSettingsStore();

    const timeOfModes = useMemo(() => ({
        [MODES.FOCUS]: focusTime,
        [MODES.SHORT_BREAK]: shortBreakTime,
        [MODES.LONG_BREAK]: longBreakTime
    }), [focusTime, shortBreakTime, longBreakTime]);

    const [currentMode, setCurrentMode] = useState<PomodoroMode>(MODES.FOCUS);
    const [timeRemaining, setTimeRemaining] = useState<number>(0);
    const [timerState, setTimerState] = useState<TimerState>("IDLE");
    const [focusCount, setFocusCount] = useState<number>(0);
    const [showFireworks, setShowFireworks] = useState<boolean>(false);


    const progress = useMemo(() => (100 - Math.floor(timeRemaining / timeOfModes[currentMode] * 100)), [timeRemaining]);
    const intervalRef = useRef<any>(null); // TODO: fix issue

    const handleStartResumeTimer = useCallback((mode: PomodoroMode) => {
        if (intervalRef.current !== null) {
            clearInterval(intervalRef.current);
        }
        if (timerState !== "PAUSED") {
            startSession(mode, `${mode} #${(history?.length || 0) + 1}`);
        }

        setTimerState("RUNNING");

        const id = setInterval(() => {
            setTimeRemaining(prevTime => {
                if (prevTime <= 1) {
                    clearInterval(intervalRef.current);
                    setTimerState('STOPPED');
                    return 0;
                }
                return prevTime - 1;
            });
        }, 1000);
        intervalRef.current = id;
    }, [timerState, timeRemaining, focusCount, currentMode]);

    const handleMainButtonClick = useCallback(() => {
        if (timerState === "IDLE" || timerState === "PAUSED") {
            handleStartResumeTimer(currentMode);
        }
        else {
            setTimerState("PAUSED");
            if (intervalRef.current !== null) {
                clearInterval(intervalRef.current);
                intervalRef.current = null;
            }
        }
    }, [handleStartResumeTimer, timerState, setTimerState, timeRemaining, setTimeRemaining, currentMode]);

    const handleResetButtonClick = useCallback(() => {
        handleResetTimer();
        setFocusCount(0);
        cancelSession();
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
        handleStartResumeTimer(mode);
    }, [handleChangeMode, handleStartResumeTimer]);

    useEffect(() => {
        setTimeRemaining(timeOfModes[currentMode]);
    }, [focusTime, shortBreakTime, longBreakTime, currentMode]);

    // useEffect(() => {
    //     if (timerState === "RUNNING") {
    //         audio.play();
    //     }
    //     else {
    //         audio.pause();
    //     }
    // }, [timerState]);

    // After complete a timer in any mode
    useEffect(() => {
        if (timerState !== 'STOPPED') return;
        completeSession();
        // Handle auto focus/autobreak
        if (currentMode === MODES.FOCUS) {
            setShowFireworks(true);
            playSound(ALARM_SOUND_URL, () => {
                setShowFireworks(false);
            });
            toast(getRandomMessage(FOCUS_COMPLETE_MESSAGES));
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
            playSound(ALARM_SOUND_URL);
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

            <Controller
                state={timerState} mode={currentMode}
                onMainClick={handleMainButtonClick}
                onResetClick={handleResetButtonClick}
                onStartMode={handleStartMode}></Controller>
            {currentSession ?
                < div className="text-gray-400 text-sm mt-4 text-center">
                    <div className="text-lg text-neutral-600 font-semibold">{currentSession?.taskName}</div>
                    {`Started at ${new Date(currentSession.startTime).toLocaleTimeString()}`}
                </div>
                : <div className="text-gray-400 text-sm mt-4 text-center">No active session</div>
            }
            {showFireworks && <FireworksCanvas />}
        </div >
    )
}

export default PomodoroTimer
