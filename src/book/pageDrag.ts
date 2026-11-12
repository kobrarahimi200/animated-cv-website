/**
 * Pure maths for dragging a page corner with the mouse. No DOM or Vue imports, so it can be unit tested.
 *
 * `direction` 1 turns a page forward (the right-hand leaf lifts over to the left);
 * `direction` -1 turns a page backward (the left-hand leaf lowers back to the right).
 */

export type DragDirection = 1 | -1;

/** Pointer distance in px before a press becomes a drag, so plain clicks still work. */
export const DRAG_START_PX = 6;
/** Fraction of the half-book the page must travel before a release completes the turn. */
export const DRAG_COMMIT_RATIO = 0.4;
/** Release speed in px/ms that completes the turn even if the threshold was not reached. */
export const DRAG_FLICK_PX_PER_MS = 0.5;

function clamp01(value: number): number {
  return Math.min(Math.max(value, 0), 1);
}

/** Progress in [0, 1] of the drag towards the far side of the book. */
export function dragProgress(direction: DragDirection, dxPx: number, halfWidthPx: number): number {
  if (halfWidthPx <= 0) return 0;
  const travelled = direction > 0 ? -dxPx : dxPx;
  return clamp01(travelled / halfWidthPx);
}

/** Y-rotation in degrees of the dragged leaf: 0 is lying on the right, -180 is lying on the left. */
export function leafAngleForDrag(direction: DragDirection, progress: number): number {
  return direction > 0 ? -180 * progress : -180 + 180 * progress;
}

/** Whether a release should complete the turn (true) or spring the page back (false). */
export function shouldCommitDrag(
  direction: DragDirection,
  progress: number,
  velocityPxPerMs: number,
): boolean {
  const towardsTurn = direction > 0 ? -velocityPxPerMs : velocityPxPerMs;
  if (progress >= DRAG_COMMIT_RATIO) return true;
  return progress > 0.05 && towardsTurn > DRAG_FLICK_PX_PER_MS;
}
