<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue';
import BookDesktop from '@/components/book/BookDesktop.vue';
import BookMobile from '@/components/book/BookMobile.vue';
import BookControls from '@/components/book/BookControls.vue';
import { useBook } from '@/composables/useBook';
import { MOBILE_QUERY, useMediaQuery } from '@/composables/useMediaQuery';
import { canGoNext, canGoPrev, PAGE_TURN_MS } from '@/book/bookState';
import { createWheelGesture, type WheelDirection } from '@/book/wheelGesture';

const TURN_COOLDOWN_MS = PAGE_TURN_MS;
const WHEEL_THRESHOLD = 90;
const WHEEL_LINE_PX = 16;
/** The book counts as "in the middle" while its centre sits inside this band of the viewport. */
const CENTRE_BAND = { min: 0.3, max: 0.7 };
const SWIPE_THRESHOLD = 40;

const { face, faceCount, forward, backward, goToFace } = useBook();
const isMobile = useMediaQuery(MOBILE_QUERY);

const stage = ref<HTMLElement | null>(null);
const inView = ref(false);
const wheelGesture = createWheelGesture({ threshold: WHEEL_THRESHOLD, cooldownMs: TURN_COOLDOWN_MS });
let lastTurnAt = 0;
let observer: IntersectionObserver | null = null;
let touchStartX: number | null = null;
let touchStartY: number | null = null;

function canTurn(direction: WheelDirection): boolean {
  return direction > 0 ? canGoNext(face.value, faceCount) : canGoPrev(face.value);
}

/** Performs one page turn in the given direction if the book has room. */
function step(direction: WheelDirection): boolean {
  if (!canTurn(direction)) return false;
  if (direction > 0) forward(!isMobile.value);
  else backward(!isMobile.value);
  lastTurnAt = performance.now();
  return true;
}

/** Keyboard and swipe turns, rate-limited by the turn duration. */
function turn(direction: WheelDirection): boolean {
  if (performance.now() - lastTurnAt < TURN_COOLDOWN_MS) return false;
  return step(direction);
}

function isBookCentred(): boolean {
  const el = stage.value;
  if (!el) return false;
  const rect = el.getBoundingClientRect();
  const centre = (rect.top + rect.height / 2) / window.innerHeight;
  return centre > CENTRE_BAND.min && centre < CENTRE_BAND.max;
}

function wheelDeltaPx(event: WheelEvent): number {
  if (event.deltaMode === WheelEvent.DOM_DELTA_LINE) return event.deltaY * WHEEL_LINE_PX;
  if (event.deltaMode === WheelEvent.DOM_DELTA_PAGE) return event.deltaY * window.innerHeight;
  return event.deltaY;
}

/**
 * While the book is centred and can still turn in the scroll direction, wheel input turns pages
 * instead of scrolling the page. At either end, or away from the centre, the page scrolls normally.
 */
function onWheel(event: WheelEvent) {
  if (!isBookCentred()) return;
  const deltaY = wheelDeltaPx(event);
  if (deltaY === 0 || !canTurn(deltaY > 0 ? 1 : -1)) return;
  event.preventDefault();
  const direction = wheelGesture.feed(deltaY, performance.now());
  if (direction !== null) step(direction);
}

function onKeydown(event: KeyboardEvent) {
  if (!inView.value) return;
  const target = event.target as HTMLElement | null;
  if (target && (target.isContentEditable || /^(INPUT|TEXTAREA|SELECT)$/.test(target.tagName))) return;

  switch (event.key) {
    case 'ArrowRight':
    case 'ArrowDown':
    case 'PageDown':
      if (turn(1)) event.preventDefault();
      break;
    case 'ArrowLeft':
    case 'ArrowUp':
    case 'PageUp':
      if (turn(-1)) event.preventDefault();
      break;
    case 'Home':
      event.preventDefault();
      goToFace(0);
      break;
    case 'End':
      event.preventDefault();
      goToFace(faceCount - 1);
      break;
  }
}

function onTouchStart(event: TouchEvent) {
  const touch = event.touches[0];
  touchStartX = touch?.clientX ?? null;
  touchStartY = touch?.clientY ?? null;
}

function onTouchEnd(event: TouchEvent) {
  const touch = event.changedTouches[0];
  if (touchStartX === null || touchStartY === null || !touch) return;
  const dx = touch.clientX - touchStartX;
  const dy = touch.clientY - touchStartY;
  touchStartX = touchStartY = null;
  if (Math.abs(dx) < SWIPE_THRESHOLD || Math.abs(dx) < Math.abs(dy)) return;
  turn(dx < 0 ? 1 : -1);
}

onMounted(() => {
  window.addEventListener('keydown', onKeydown);
  window.addEventListener('wheel', onWheel, { passive: false });

  if (stage.value) {
    observer = new IntersectionObserver(([entry]) => (inView.value = !!entry?.isIntersecting), {
      threshold: 0.5,
    });
    observer.observe(stage.value);
  }
});

onBeforeUnmount(() => {
  window.removeEventListener('keydown', onKeydown);
  window.removeEventListener('wheel', onWheel);
  observer?.disconnect();
});
</script>

<template>
  <section class="book-stage" aria-label="Interactive book">
    <div
      ref="stage"
      class="book-stage__surface"
      tabindex="0"
      role="region"
      aria-label="Book pages. Use arrow keys, scroll or swipe to turn pages."
      @touchstart.passive="onTouchStart"
      @touchend.passive="onTouchEnd"
    >
      <BookMobile v-if="isMobile" />
      <BookDesktop v-else />
    </div>
    <BookControls />
  </section>
</template>

<style scoped>
.book-stage {
  width: 100%;
}

.book-stage__surface {
  position: relative;
  /* Width is capped by viewport height so the whole book (plus controls) fits on large screens. */
  width: min(80vw, calc((100svh - 240px) * 1.42));
  margin-inline: auto;
  aspect-ratio: 1.42 / 1;
  border-radius: 10px;
  outline: none;
  touch-action: pan-y;
}

.book-stage__surface:focus-visible {
  box-shadow: 0 0 0 3px var(--teal);
}

@media (max-width: 900px) {
  .book-stage__surface {
    width: 100%;
    aspect-ratio: auto;
    height: min(74vh, 680px);
  }
}
</style>
