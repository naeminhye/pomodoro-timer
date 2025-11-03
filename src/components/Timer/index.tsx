import { useMemo } from 'react';

import { timeConverter, zeroPad } from '@/utils/helpers';

function Timer(props: any) {
  const { timeRemaining, } = props;

  const { m, s } = useMemo(() => timeConverter(timeRemaining), [timeRemaining]);

  return (
    <div className="flex flex-row text-9xl font-extrabold justify-center items-center">
      <span>{zeroPad(m)}</span>
      <span className="text-8xl mx-4">:</span>
      <span>{zeroPad(s)}</span>
    </div>
  )
}

export default Timer
