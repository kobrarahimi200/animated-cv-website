import { describe, expect, it } from 'vitest';
import {
  dragProgress,
  leafAngleForDrag,
  shouldCommitDrag,
  DRAG_COMMIT_RATIO,
} from '@/book/pageDrag';

describe('dragProgress', () => {
  it('measures forward drags leftwards and backward drags rightwards', () => {
    expect(dragProgress(1, -100, 400)).toBeCloseTo(0.25);
    expect(dragProgress(-1, 100, 400)).toBeCloseTo(0.25);
  });

  it('ignores movement in the wrong direction and clamps to [0, 1]', () => {
    expect(dragProgress(1, 50, 400)).toBe(0);
    expect(dragProgress(1, -900, 400)).toBe(1);
  });

  it('returns 0 for a zero-width book', () => {
    expect(dragProgress(1, -100, 0)).toBe(0);
  });
});

describe('leafAngleForDrag', () => {
  it('lifts a forward leaf from 0 to -180 degrees', () => {
    expect(leafAngleForDrag(1, 0)).toBeCloseTo(0);
    expect(leafAngleForDrag(1, 0.5)).toBe(-90);
    expect(leafAngleForDrag(1, 1)).toBe(-180);
  });

  it('lowers a backward leaf from -180 back to 0 degrees', () => {
    expect(leafAngleForDrag(-1, 0)).toBe(-180);
    expect(leafAngleForDrag(-1, 1)).toBe(0);
  });
});

describe('shouldCommitDrag', () => {
  it('commits once the page passes the commit ratio', () => {
    expect(shouldCommitDrag(1, DRAG_COMMIT_RATIO, 0)).toBe(true);
    expect(shouldCommitDrag(1, DRAG_COMMIT_RATIO - 0.01, 0)).toBe(false);
  });

  it('commits a fast flick in the turn direction even below the ratio', () => {
    expect(shouldCommitDrag(1, 0.2, -1)).toBe(true);
    expect(shouldCommitDrag(-1, 0.2, 1)).toBe(true);
  });

  it('does not commit a flick in the opposite direction or a near-zero drag', () => {
    expect(shouldCommitDrag(1, 0.2, 1)).toBe(false);
    expect(shouldCommitDrag(1, 0.01, -1)).toBe(false);
  });
});
