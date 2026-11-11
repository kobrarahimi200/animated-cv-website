import { onScopeDispose, ref, type Ref } from 'vue';

/** Reactive wrapper around `matchMedia`. Returns false when matchMedia is unavailable. */
export function useMediaQuery(query: string): Ref<boolean> {
  const mql = typeof window !== 'undefined' && 'matchMedia' in window ? window.matchMedia(query) : null;
  const matches = ref(mql?.matches ?? false);
  const onChange = (event: MediaQueryListEvent) => {
    matches.value = event.matches;
  };
  mql?.addEventListener('change', onChange);
  onScopeDispose(() => mql?.removeEventListener('change', onChange));
  return matches;
}

export const MOBILE_QUERY = '(max-width: 900px)';
export const REDUCED_MOTION_QUERY = '(prefers-reduced-motion: reduce)';
