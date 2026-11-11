import { describe, expect, it } from 'vitest';
import { createDotGrid, stepDots } from '@/background/pixelField';

const FRAME = 1 / 60;

describe('createDotGrid', () => {
  it('lays dots on a regular grid covering the viewport', () => {
    const dots = createDotGrid(100, 60, 20);
    expect(dots).toHaveLength(5 * 3);
    expect(dots[0]).toMatchObject({ x: 10, y: 10, ox: 10, oy: 10, vx: 0, vy: 0 });
  });
});

describe('stepDots', () => {
  it('reports no motion for a field at rest', () => {
    const dots = createDotGrid(100, 100, 20);
    expect(stepDots(dots, null, FRAME)).toBe(false);
  });

  it('pushes nearby dots away from the pointer', () => {
    const dots = createDotGrid(200, 200, 20);
    const target = dots.find((d) => d.ox === 50 && d.oy === 50)!;
    const pointer = { x: 40, y: 50 };
    for (let i = 0; i < 5; i++) stepDots(dots, pointer, FRAME);
    expect(target.x).toBeGreaterThan(target.ox);
  });

  it('leaves dots outside the pointer radius untouched', () => {
    const dots = createDotGrid(600, 600, 20);
    const far = dots.find((d) => d.ox === 550 && d.oy === 550)!;
    stepDots(dots, { x: 0, y: 0 }, FRAME);
    expect(far.x).toBe(far.ox);
    expect(far.y).toBe(far.oy);
  });

  it('settles back to rest once the pointer is gone', () => {
    const dots = createDotGrid(200, 200, 20);
    for (let i = 0; i < 10; i++) stepDots(dots, { x: 50, y: 50 }, FRAME);
    let moving = true;
    for (let i = 0; i < 600 && moving; i++) moving = stepDots(dots, null, FRAME);
    expect(moving).toBe(false);
    for (const dot of dots) {
      expect(Math.abs(dot.x - dot.ox)).toBeLessThan(0.1);
      expect(Math.abs(dot.y - dot.oy)).toBeLessThan(0.1);
    }
  });
});
