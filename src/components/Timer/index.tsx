import { useMemo } from 'react';

import { timeConverter, zeroPad } from '@/utils/helpers';

function Timer(props: any) {
  const { timeRemaining, } = props;

  const { m, s } = useMemo(() => timeConverter(timeRemaining), [timeRemaining]);

  return (
    <div className="flex flex-row text-6xl sm:text-9xl font-extrabold justify-center items-center">
      <span>{zeroPad(m)}</span>
      <span className="mx-2 sm:mx-4 text-5xl sm:text-8xl">:</span>
      <span>{zeroPad(s)}</span>
    </div>
  )
}

export default Timer
