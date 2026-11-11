/**
 * Pure navigation math for the book. No DOM or Vue imports, so it can be unit tested.
 *
 * The canonical state is a face index `f` in [0, faceCount - 1]. On desktop, faces are
 * shown as spreads: spread `k` shows the left face `2k - 1` and the right face `2k`,
 * with spread 0 showing only the cover on the right.
 */

/** Duration of one page turn in ms. Also used as the minimum gap between wheel-driven turns. */
export const PAGE_TURN_MS = 1100;

export function clampFace(face: number, faceCount: number): number {
  return Math.min(Math.max(0, Math.round(face)), faceCount - 1);
}

/** Number of leaves in the book. Each leaf has a front and a back face. */
export function leafCount(faceCount: number): number {
  return Math.ceil(faceCount / 2);
}

/** Desktop spread index (0 = closed cover) for a face index. */
export function spreadForFace(face: number): number {
  return Math.ceil(face / 2);
}

/** Face index to show when a desktop spread is opened. */
export function faceForSpread(spread: number, faceCount: number): number {
  if (spread <= 0) return 0;
  return clampFace(2 * spread, faceCount);
}

/** Total number of desktop spreads, including the closed-cover state. */
export function spreadCount(faceCount: number): number {
  return spreadForFace(faceCount - 1) + 1;
}

export function canGoNext(face: number, faceCount: number): boolean {
  return face < faceCount - 1;
}

export function canGoPrev(face: number): boolean {
  return face > 0;
}

export function nextFace(face: number, faceCount: number, step = 1): number {
  return clampFace(face + step, faceCount);
}

export function prevFace(face: number, faceCount: number, step = 1): number {
  return clampFace(face - step, faceCount);
}

/** Face index for a page id, or -1 when the id does not exist. */
export function faceIndexById(pageIds: readonly string[], id: string): number {
  return pageIds.indexOf(id);
}

/**
 * Printed page number for the page indicator. The cover and back cover are not numbered,
 * so the first interior face is page 1.
 */
export function printedPageNumber(face: number, faceCount: number): number | null {
  if (face === 0 || face === faceCount - 1) return null;
  return face;
}
