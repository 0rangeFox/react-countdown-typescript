import Actions from './Actions';

interface UseCountdown {
  (timeToCount: number, interval?: number): [number, Actions];
}

export default UseCountdown;
