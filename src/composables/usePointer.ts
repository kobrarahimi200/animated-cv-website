import { onScopeDispose } from 'vue';

export interface PointerState {
  /** Horizontal position, -1 (left edge) to 1 (right edge) */
  x: number;
  /** Vertical position, -1 (top edge) to 1 (bottom edge) */
  y: number;
}

/**
 * Tracks the mouse across the whole window as a plain, non-reactive object.
 * Read every animation frame; no Vue reactivity overhead per pointer move.
 */
export function usePointer(): PointerState {
  const pointer: PointerState = { x: 0, y: 0 };
  const onMove = (event: PointerEvent) => {
    pointer.x = (event.clientX / window.innerWidth) * 2 - 1;
    pointer.y = (event.clientY / window.innerHeight) * 2 - 1;
  };
  window.addEventListener('pointermove', onMove, { passive: true });
  onScopeDispose(() => window.removeEventListener('pointermove', onMove));
  return pointer;
}
