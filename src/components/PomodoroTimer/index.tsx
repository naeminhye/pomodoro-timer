import { useCallback, useEffect, useMemo, useRef, useState } from "react";

import type { PomodoroMode, TimerState } from "@/utils/types";
import { Progress } from "@/components/ui/progress"

import { DEFAULT_TIMES_IN_SECONDS, MODES } from "@/utils/constants";

import Timer from "../Timer";
import Controller from "../Controller";
import ModeSelector from "../ModeSelector";

function PomodoroTimer() {
    const [currentMode, setCurrentMode] = useState<PomodoroMode>(MODES.FOCUS);
    const [timeRemaining, setTimeRemaining] = useState<number>(DEFAULT_TIMES_IN_SECONDS[MODES.FOCUS]);
    const [timerState, setTimerState] = useState<TimerState>("IDLE");

    const progress = useMemo(() => (100 - Math.floor(timeRemaining / DEFAULT_TIMES_IN_SECONDS[currentMode] * 100)), [timeRemaining]);
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
                    setTimerState('STOPPED');
                    return 0;
                }
                return prevTime - 1;
            });
        }, 1000);
        intervalRef.current = id;
    }, [timerState, setTimerState, timeRemaining, setTimeRemaining])

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

    const handleResetTimer = useCallback(() => {
        if (intervalRef.current !== null) {
            clearInterval(intervalRef.current);
            intervalRef.current = null;
        }
        setTimerState("IDLE");
        setTimeRemaining(DEFAULT_TIMES_IN_SECONDS[currentMode]);
    }, [setTimerState]);

    const handleChangeMode = useCallback((mode: PomodoroMode) => {
        handleResetTimer();
        setCurrentMode(mode);
        setTimeRemaining(DEFAULT_TIMES_IN_SECONDS[mode]);
    }, [setCurrentMode]);

    const handleStartMode = useCallback((mode: PomodoroMode) => {
        handleChangeMode(mode);
        handleStartResumeTimer();
    }, [handleChangeMode, handleStartResumeTimer])

    return (
        <div className="flex flex-1 flex-col items-center justify-center gap-4">
            <ModeSelector currentMode={currentMode} onChangeMode={handleChangeMode} />
            <Timer timeRemaining={timeRemaining} mode={currentMode} isRunning={timerState === "RUNNING"} />

            <Progress value={progress} className="w-3xs h-1 mb-2" />

            <Controller state={timerState} mode={currentMode}
                onMainClick={handleMainButtonClick}
                onResetClick={handleResetTimer}
                onStartMode={handleStartMode}></Controller>
        </div>
    )
}

export default PomodoroTimer
