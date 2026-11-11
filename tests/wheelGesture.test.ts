import { describe, expect, it } from 'vitest';
import { createWheelGesture } from '@/book/wheelGesture';

const make = () => createWheelGesture({ threshold: 90, cooldownMs: 1000 });

describe('createWheelGesture', () => {
  it('ignores zero deltas', () => {
    expect(make().feed(0, 0)).toBeNull();
  });

  it('accumulates small deltas until the threshold is crossed', () => {
    const gesture = make();
    expect(gesture.feed(30, 0)).toBeNull();
    expect(gesture.feed(30, 16)).toBeNull();
    expect(gesture.feed(30, 32)).toBe(1);
  });

  it('turns backward for negative deltas', () => {
    const gesture = make();
    expect(gesture.feed(-120, 0)).toBe(-1);
  });

  it('starts a cooldown after a turn so one gesture turns one page', () => {
    const gesture = make();
    expect(gesture.feed(200, 0)).toBe(1);
    expect(gesture.feed(200, 500)).toBeNull();
    expect(gesture.feed(200, 1000)).toBe(1);
  });

  it('clears accumulated delta when the direction reverses', () => {
    const gesture = make();
    gesture.feed(80, 0);
    expect(gesture.feed(-20, 16)).toBeNull();
    expect(gesture.feed(-60, 32)).toBeNull();
    expect(gesture.feed(-40, 48)).toBe(-1);
  });

  it('does not carry deltas accumulated during cooldown into the next turn', () => {
    const gesture = make();
    expect(gesture.feed(100, 0)).toBe(1);
    expect(gesture.feed(80, 500)).toBeNull();
    expect(gesture.feed(20, 1100)).toBeNull();
  });

  it('reset clears the cooldown and the accumulator', () => {
    const gesture = make();
    gesture.feed(100, 0);
    gesture.reset();
    expect(gesture.feed(100, 10)).toBe(1);
  });
});
