/**
 * Turns accumulated wheel deltas into discrete page-turn steps. No DOM imports, so it can be unit tested.
 *
 * Small deltas add up until they pass the threshold, so a gentle scroll and a fast flick both work.
 * Reversing direction clears the accumulator, and a turn starts a cooldown so one gesture flips one page.
 */

export interface WheelGestureOptions {
  /** Accumulated pixels needed to trigger a turn. */
  threshold: number;
  /** Minimum time between turns in ms. */
  cooldownMs: number;
}

export type WheelDirection = 1 | -1;

export interface WheelGesture {
  /** Returns the turn direction when the gesture crosses the threshold, otherwise null. */
  feed(deltaY: number, now: number): WheelDirection | null;
  reset(): void;
}

export function createWheelGesture({ threshold, cooldownMs }: WheelGestureOptions): WheelGesture {
  let accumulated = 0;
  let lastTurnAt = Number.NEGATIVE_INFINITY;

  return {
    feed(deltaY, now) {
      if (deltaY === 0) return null;
      const direction: WheelDirection = deltaY > 0 ? 1 : -1;
      if (Math.sign(accumulated) !== 0 && Math.sign(accumulated) !== direction) accumulated = 0;
      if (now - lastTurnAt < cooldownMs) return null;

      accumulated += deltaY;
      if (Math.abs(accumulated) < threshold) return null;

      accumulated = 0;
      lastTurnAt = now;
      return direction;
    },
    reset() {
      accumulated = 0;
      lastTurnAt = Number.NEGATIVE_INFINITY;
    },
  };
}
