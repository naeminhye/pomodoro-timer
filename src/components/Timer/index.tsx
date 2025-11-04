import { useEffect, useMemo } from 'react';

import { timeConverter } from '@/utils/helpers';
import { MODES } from '@/utils/constants';

const titles = ["Focus Time ⏱", "Short Break ☕️", "Long Break 💤"];


function Timer(props: any) {
  const { timeRemaining, mode } = props;

  const { h, m, s } = useMemo(() => timeConverter(timeRemaining), [timeRemaining]);
  const modeTitle = useMemo(() => {
    if (mode === MODES.FOCUS) {
      return titles[0];
    }
    if (mode === MODES.SHORT_BREAK) {
      return titles[1];
    }
    return titles[3];
  }, [mode])

  useEffect(() => {
    document.title = (h !== '00' ? `${h}:` : '') + m + ':' + s + ` - ${modeTitle}`;
  }, [h, m, s]);

  return (
    <div className="flex flex-row text-6xl sm:text-9xl lg:text-[180px] font-extrabold justify-center items-center">
      {h !== '00' && <>
        <span>{h}</span>
        <span className="mx-2 sm:mx-4 text-5xl sm:text-8xl lg:text-[160px]">:</span>
      </>}
      <span>{m}</span>
      <span className="mx-2 sm:mx-4 text-5xl sm:text-8xl lg:text-[160px]">:</span>
      <span>{s}</span>
    </div>
  )
}

export default Timer
