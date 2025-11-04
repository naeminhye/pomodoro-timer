import { useMemo } from 'react';
import { BicepsFlexed, Coffee, Footprints, RotateCcw } from 'lucide-react';
import { DynamicIcon } from 'lucide-react/dynamic';

import { Button } from "@/components/ui/button"
import type { PomodoroMode, TimerState } from '@/utils/types';
import { MODES } from '@/utils/constants';

interface ControllerProps {
    state: TimerState;
    mode: PomodoroMode;
    onMainClick: any; // TODO: add interface
    onResetClick: any; // TODO: add interface
    onStartMode: any;
}

function Controller(props: ControllerProps) {
    const { state, mode, onMainClick, onResetClick, onStartMode } = props;

    const mainBtnLabel = useMemo(() => {
        if (state === "PAUSED") {
            return 'Resume';
        }
        if (state === "RUNNING") {
            return 'Pause';
        }
        return 'Start';
    }, [state])

    const mainBtnIcon = useMemo(() => {
        if (state === 'RUNNING') {
            return 'pause';
        }
        if (state === "PAUSED") {
            return 'skip-forward';
        }
        if (state === 'STOPPED') {
            return 'rotate-ccw';
        }
        return 'play';
    }, [state])

    return (
        <div className="flex flex-wrap items-center gap-2 md:flex-row">
            {state !== "STOPPED" && <Button variant="default" aria-label={mainBtnLabel} onClick={onMainClick}>
                <DynamicIcon name={mainBtnIcon} />
                <span className="hidden sm:inline">{mainBtnLabel}</span>
            </Button>}
            {state !== "IDLE" && state !== "STOPPED" && <Button variant="default" aria-label="Reset" onClick={onResetClick}>
                <RotateCcw />
                <span className="hidden sm:inline">Reset</span>
            </Button>}
            {state === "STOPPED" && <>
                {mode === MODES.FOCUS ? <>
                    <Button variant="default" aria-label="Restart Focus" onClick={() => onStartMode(MODES.FOCUS)}>
                        <BicepsFlexed />
                        <span className="hidden sm:inline">Restart Focus</span>
                    </Button>
                    <Button variant="default" aria-label="Short" onClick={() => onStartMode(MODES.SHORT_BREAK)}>
                        <Coffee />
                        <span className="hidden sm:inline">Short</span>
                    </Button>
                    <Button variant="default" aria-label="Long" onClick={() => onStartMode(MODES.LONG_BREAK)}>
                        <Footprints />
                        <span className="hidden sm:inline">Long</span>
                    </Button>
                </> : <>
                    <Button variant="default" aria-label="Start Focus" onClick={() => onStartMode(MODES.FOCUS)}>
                        <BicepsFlexed />
                        <span className="hidden sm:inline">Start Focus</span>
                    </Button>
                    <Button variant="default" aria-label={mode} onClick={() => onStartMode(mode)}>
                        <RotateCcw />
                        <span className="hidden sm:inline">Another {mode}</span>
                    </Button>
                </>}
            </>}
        </div>
    )
}

export default Controller
