interface Actions {
  start(ttc?: number): void;
  pause(): void;
  resume(): void;
  reset(): void;
}

export default Actions;
