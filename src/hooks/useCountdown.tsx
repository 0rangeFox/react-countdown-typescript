import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Actions, Countdown, UseCountdown } from '../interfaces';

const useCountdown: UseCountdown = (timeToCount = 60000, interval = 1000) => {
  const defaultCountdown: Countdown = {
    requestId: undefined,
    started: undefined,
    lastInterval: undefined,
    timeLeft: 0,
    timeToCount,
  };

  const [timeLeft, setTimeLeft] = useState<number>(timeToCount);
  const timer = useRef<Countdown>(defaultCountdown);

  const run = (ts: number) => {
    if (!timer.current.started) {
      timer.current.started = ts;
      timer.current.lastInterval = ts;
    }

    const localInterval = Math.min(
      interval,
      timer.current.timeLeft || Number.POSITIVE_INFINITY
    );
    if (ts - timer.current.lastInterval! >= localInterval) {
      timer.current.lastInterval! += localInterval;
      setTimeLeft(
        (timeLeft) => (timer.current.timeLeft = timeLeft - localInterval)
      );
    }

    if (ts - timer.current.started < timer.current.timeToCount) {
      timer.current.requestId = window.requestAnimationFrame(run);
    } else {
      timer.current = defaultCountdown;
      setTimeLeft(0);
    }
  };

  const start = useCallback((newTimeToCount?: number) => {
    if (timer.current.requestId)
      window.cancelAnimationFrame(timer.current.requestId);

    const ttc: number = newTimeToCount !== undefined ? newTimeToCount : timeToCount;
    timer.current.started = undefined;
    timer.current.lastInterval = undefined;
    timer.current.timeToCount = ttc;
    timer.current.requestId = window.requestAnimationFrame(run);

    setTimeLeft(ttc);
  }, []);

  const pause = useCallback(() => {
    if (timer.current.requestId)
      window.cancelAnimationFrame(timer.current.requestId);
    timer.current.started = undefined;
    timer.current.lastInterval = undefined;
    timer.current.timeToCount = timer.current.timeLeft;
  }, []);

  const resume = useCallback(() => {
    if (!timer.current.started && timer.current.timeLeft > 0) {
      if (timer.current.requestId)
        window.cancelAnimationFrame(timer.current.requestId);
      timer.current.requestId = window.requestAnimationFrame(run);
    }
  }, []);

  const reset = useCallback(() => {
    if (timer.current.timeLeft) {
      if (timer.current.requestId)
        window.cancelAnimationFrame(timer.current.requestId);
      timer.current = defaultCountdown;
      setTimeLeft(0);
    }
  }, []);

  const actions: Actions = useMemo(() => ({ start, pause, resume, reset }), []);

  useEffect(
    () => () => {
      if (timer.current.requestId)
        window.cancelAnimationFrame(timer.current.requestId);
    },
    []
  );

  return [timeLeft, actions];
};

export default useCountdown;
