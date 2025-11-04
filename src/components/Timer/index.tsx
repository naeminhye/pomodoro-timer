import { useEffect, useMemo } from 'react';

import { timeConverter } from '@/utils/helpers';
import { MODES } from '@/utils/constants';

function Timer(props: any) {
  const { timeRemaining, mode } = props;

  const { h, m, s } = useMemo(() => timeConverter(timeRemaining), [timeRemaining]);

  useEffect(() => {
    const remaining = (h !== '00' ? `${h}:` : '') + m + ':' + s;
    if (mode === MODES.FOCUS) document.title = `Focus ${remaining} ⏱`;
    else if (mode === MODES.SHORT_BREAK) document.title = `Break ${remaining} ☕`;
    else document.title = `Long Break ${remaining} 💤`;
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
