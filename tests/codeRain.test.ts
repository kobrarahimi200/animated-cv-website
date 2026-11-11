import { describe, expect, it } from 'vitest';
import { createRainColumns, stepRain } from '@/background/codeRain';

const half = () => 0.5;

describe('createRainColumns', () => {
  it('creates one column per spacing step across the width', () => {
    const columns = createRainColumns(100, 300, 20, half);
    expect(columns).toHaveLength(5);
    expect(columns[0]?.x).toBe(10);
  });

  it('gives every column a trail whose glyph count matches its length', () => {
    for (const column of createRainColumns(200, 300, 20, half)) {
      expect(column.glyphs).toHaveLength(column.length);
      expect(column.length).toBeGreaterThanOrEqual(6);
    }
  });
});

describe('stepRain', () => {
  it('moves the head down by speed × dt', () => {
    const column = createRainColumns(20, 400, 20, half)[0]!;
    const before = column.head;
    stepRain([column], 0.5, 1, 400, 18, half);
    expect(column.head - before).toBeCloseTo(column.speed * 0.5);
  });

  it('scales movement by the boost factor', () => {
    const a = createRainColumns(20, 400, 20, half)[0]!;
    const b = createRainColumns(20, 400, 20, half)[0]!;
    const startA = a.head;
    const startB = b.head;
    stepRain([a], 0.1, 1, 400, 18, half);
    stepRain([b], 0.1, 3, 400, 18, half);
    expect(b.head - startB).toBeCloseTo((a.head - startA) * 3);
  });

  it('respawns a column above the top once its trail leaves the bottom', () => {
    const column = createRainColumns(20, 400, 20, half)[0]!;
    column.head = 1000;
    stepRain([column], 0.001, 1, 400, 18, half);
    expect(column.head).toBeLessThan(0);
  });
});
