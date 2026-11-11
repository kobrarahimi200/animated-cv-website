import { describe, expect, it } from 'vitest';
import { layoutTimeline, monthIndex } from '@/book/timeline';

describe('timeline', () => {
  it('converts YYYY-MM to a continuous month index', () => {
    expect(monthIndex('2018-10')).toBe(2018 * 12 + 9);
    expect(monthIndex('2019-01') - monthIndex('2018-12')).toBe(1);
  });

  it('returns an empty layout for no items', () => {
    expect(layoutTimeline([])).toEqual({ bars: [], ticks: [] });
  });

  it('rounds the span out to whole years and keeps bars inside it', () => {
    const layout = layoutTimeline([
      { id: 'a', label: 'A', from: '2018-10', to: '2019-04' },
      { id: 'b', label: 'B', from: '2022-06', to: '2026-08' },
    ]);

    expect(layout.bars).toHaveLength(2);
    for (const bar of layout.bars) {
      expect(bar.leftPct).toBeGreaterThanOrEqual(0);
      expect(bar.leftPct + bar.widthPct).toBeLessThanOrEqual(100 + 1e-9);
      expect(bar.widthPct).toBeGreaterThan(0);
    }
    const [first, second] = layout.bars;
    expect(first?.leftPct).toBeGreaterThan(0);
    expect(first?.leftPct).toBeLessThan(second?.leftPct ?? 0);
  });

  it('includes the end month of a bar, so a one-month role still has width', () => {
    const [bar] = layoutTimeline([{ id: 'x', label: 'X', from: '2021-06', to: '2021-06' }], 1).bars;
    expect(bar?.widthPct).toBeGreaterThan(0);
  });

  it('places year ticks at the requested interval', () => {
    const { ticks } = layoutTimeline(
      [
        { id: 'a', label: 'A', from: '2018-10', to: '2019-04' },
        { id: 'b', label: 'B', from: '2022-06', to: '2026-08' },
      ],
      2,
    );
    const years = ticks.map((tick) => tick.year);
    expect(years[0]).toBe(2018);
    expect(years.slice(1).every((year, i) => year - (years[i] ?? 0) === 2)).toBe(true);
    expect(ticks.every((tick) => tick.leftPct >= 0 && tick.leftPct <= 100)).toBe(true);
  });
});
