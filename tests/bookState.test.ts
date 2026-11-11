import { describe, expect, it } from 'vitest';
import {
  canGoNext,
  canGoPrev,
  clampFace,
  faceForSpread,
  faceIndexById,
  leafCount,
  nextFace,
  prevFace,
  printedPageNumber,
  spreadCount,
  spreadForFace,
} from '@/book/bookState';
import { bookPages } from '@/content/bookPages';

const N = bookPages.length;

describe('bookState', () => {
  it('has an even number of faces so leaves pair up', () => {
    expect(N % 2).toBe(0);
    expect(leafCount(N)).toBe(N / 2);
  });

  it('clamps faces into range', () => {
    expect(clampFace(-3, N)).toBe(0);
    expect(clampFace(99, N)).toBe(N - 1);
    expect(clampFace(2.4, N)).toBe(2);
  });

  it('maps faces to spreads and back', () => {
    expect(spreadForFace(0)).toBe(0);
    expect(spreadForFace(1)).toBe(1);
    expect(spreadForFace(2)).toBe(1);
    expect(spreadForFace(3)).toBe(2);
    expect(faceForSpread(0, N)).toBe(0);
    expect(faceForSpread(1, N)).toBe(2);
    expect(faceForSpread(2, N)).toBe(4);
    expect(faceForSpread(99, N)).toBe(N - 1);
  });

  it('counts spreads including the closed cover', () => {
    expect(spreadCount(N)).toBe(N / 2 + 1);
  });

  it('reports navigation bounds', () => {
    expect(canGoPrev(0)).toBe(false);
    expect(canGoNext(N - 1, N)).toBe(false);
    expect(nextFace(N - 1, N)).toBe(N - 1);
    expect(prevFace(0, N)).toBe(0);
    expect(nextFace(0, N, 2)).toBe(2);
  });

  it('finds faces by id and numbers interior pages only', () => {
    const ids = bookPages.map((p) => p.id);
    expect(faceIndexById(ids, 'about')).toBe(2);
    expect(faceIndexById(ids, 'missing')).toBe(-1);
    expect(printedPageNumber(0, N)).toBeNull();
    expect(printedPageNumber(N - 1, N)).toBeNull();
    expect(printedPageNumber(3, N)).toBe(3);
  });

  it('gives every chapter a page in the book', () => {
    const chapters = new Set(bookPages.map((p) => p.chapterId).filter(Boolean));
    expect(chapters).toEqual(new Set(['about', 'experience', 'skills', 'education', 'contact']));
  });
});
