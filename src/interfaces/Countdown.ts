interface Countdown {
  requestId?: number;
  started?: number;
  lastInterval?: number;
  timeLeft: number;
  timeToCount: number;
}

export default Countdown;
