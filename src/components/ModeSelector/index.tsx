
import { DynamicIcon } from 'lucide-react/dynamic';
import { useCallback, useMemo } from 'react';

import { MODES } from '@/utils/constants';

import { toKebabCase } from '@/utils/helpers';

function ModeSelector(props: any) {
    const { currentMode, onChangeMode } = props;

    const handleValueChange = useCallback((e: any) => {
        onChangeMode(e.target.value);
    }, [onChangeMode]);

    const getIcon = useCallback((mode: any) => {
        switch (mode) {
            case MODES.FOCUS:
                return "crosshair";
            case MODES.SHORT_BREAK:
                return "coffee"
            case MODES.LONG_BREAK:
                return "footprints"
            default:
                return "smile"
        }
    }, [])

    return (
        <div className="flex justify-center space-x-2 bg-gray-100 dark:bg-black dark:border-gray-100 rounded-full p-1">
            {Object.values(MODES).map((mode) => {
                const modeKey = toKebabCase(mode);
                return (
                    <div key={modeKey}>
                        <input
                            type="radio"
                            id={modeKey}
                            name="pomodoro-mode"
                            value={mode}
                            checked={currentMode === mode}
                            onChange={handleValueChange}
                            className="peer hidden"
                        />
                        <label
                            htmlFor={modeKey}
                            className={`
                            px-4 py-1.5 text-sm font-medium rounded-full cursor-pointer 
                            transition-colors duration-200 w-full text-center
                            text-gray-700
                            dark:text-gray-100 
                            peer-checked:bg-stone-950 
                            peer-checked:text-white
                            peer-checked:dark:bg-zinc-100
                            peer-checked:dark:text-black
                            flex gap-2 justify-center items-center
                        `}
                        >
                            <DynamicIcon name={getIcon(mode)} />
                            <span className="hidden sm:inline">{mode}</span>
                        </label>
                    </div>
                )
            })}
        </div>
    )
}

export default ModeSelector
