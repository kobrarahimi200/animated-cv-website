<script setup lang="ts">
import { computed, ref } from 'vue';
import BookLeaf from '@/components/book/BookLeaf.vue';
import { useBook } from '@/composables/useBook';
import { leafCount, canGoNext, canGoPrev } from '@/book/bookState';
import {
  DRAG_START_PX,
  dragProgress,
  leafAngleForDrag,
  shouldCommitDrag,
  type DragDirection,
} from '@/book/pageDrag';

const { face, faceCount, spread, forward, backward } = useBook();
const bookEl = ref<HTMLElement | null>(null);

interface DragState {
  pointerId: number;
  startX: number;
  startY: number;
  lastX: number;
  lastT: number;
  velocity: number;
  halfWidth: number;
  direction: DragDirection | null;
  leafIndex: number;
  progress: number;
}

const drag = ref<DragState | null>(null);
/** Set after a drag so the click that follows the release does not activate a link on the page. */
let suppressClick = false;

const activeDrag = computed(() => {
  const d = drag.value;
  if (!d || d.direction === null) return null;
  return { leafIndex: d.leafIndex, angle: leafAngleForDrag(d.direction, d.progress) };
});

interface LeafModel {
  index: number;
  front: number;
  back: number;
  flipped: boolean;
  zIndex: number;
}

const leaves = computed<LeafModel[]>(() => {
  const count = leafCount(faceCount);
  return Array.from({ length: count }, (_, i) => {
    const flipped = 2 * i + 1 <= face.value;
    return {
      index: i,
      front: 2 * i,
      back: 2 * i + 1,
      flipped,
      // Flipped leaves stack upward from the left; unflipped leaves stack downward,
      // so the next leaf to turn is always on top.
      zIndex: flipped ? i + 1 : count - i,
    };
  });
});

/** Closed book: shift so the cover sits centred. Fully open: shift so the back cover sits centred. */
const shift = computed(() => {
  if (face.value === 0) return '-25%';
  if (face.value === faceCount - 1) return '25%';
  return '0%';
});

/** Only mouse and pen drag here; touch swipes are handled by the stage. */
function onPointerDown(event: PointerEvent) {
  if (event.button !== 0 || event.pointerType === 'touch' || !bookEl.value) return;
  drag.value = {
    pointerId: event.pointerId,
    startX: event.clientX,
    startY: event.clientY,
    lastX: event.clientX,
    lastT: event.timeStamp,
    velocity: 0,
    halfWidth: bookEl.value.getBoundingClientRect().width / 2,
    direction: null,
    leafIndex: -1,
    progress: 0,
  };
}

function onPointerMove(event: PointerEvent) {
  const d = drag.value;
  if (!d || event.pointerId !== d.pointerId) return;

  const dx = event.clientX - d.startX;
  const dy = event.clientY - d.startY;
  const dt = event.timeStamp - d.lastT;
  if (dt > 0) d.velocity = (event.clientX - d.lastX) / dt;
  d.lastX = event.clientX;
  d.lastT = event.timeStamp;

  if (d.direction === null) {
    if (Math.abs(dx) < DRAG_START_PX || Math.abs(dx) < Math.abs(dy)) return;
    const direction: DragDirection = dx < 0 ? 1 : -1;
    const possible = direction > 0 ? canGoNext(face.value, faceCount) : canGoPrev(face.value);
    if (!possible) {
      drag.value = null;
      return;
    }
    d.direction = direction;
    // Forward turns lift the right-hand leaf (index = spread); backward turns lower the one before it.
    d.leafIndex = direction > 0 ? spread.value : spread.value - 1;
    suppressClick = true;
    (event.currentTarget as HTMLElement).setPointerCapture(event.pointerId);
  }

  d.progress = dragProgress(d.direction, dx, d.halfWidth);
}

function endDrag(event: PointerEvent) {
  const d = drag.value;
  if (!d || event.pointerId !== d.pointerId) return;
  drag.value = null;
  if (d.direction === null) return;

  if (shouldCommitDrag(d.direction, d.progress, d.velocity)) {
    if (d.direction > 0) forward(true);
    else backward(true);
  }
  // A click event follows pointerup in the same task, so clear the flag after it has fired.
  setTimeout(() => (suppressClick = false), 0);
}

function onClickCapture(event: MouseEvent) {
  if (!suppressClick) return;
  suppressClick = false;
  event.preventDefault();
  event.stopPropagation();
}
</script>

<template>
  <div
    ref="bookEl"
    class="book-desktop"
    :class="{ 'is-dragging': activeDrag !== null }"
    :style="{ '--book-shift': shift }"
    data-testid="book-desktop"
    @pointerdown="onPointerDown"
    @pointermove="onPointerMove"
    @pointerup="endDrag"
    @pointercancel="endDrag"
    @click.capture="onClickCapture"
  >
    <div class="book">
      <BookLeaf
        v-for="leaf in leaves"
        :key="leaf.index"
        :front="leaf.front"
        :back="leaf.back"
        :flipped="leaf.flipped"
        :z-index="leaf.zIndex"
        :drag-angle="activeDrag?.leafIndex === leaf.index ? activeDrag.angle : undefined"
      />
    </div>
  </div>
</template>

<style scoped>
.book-desktop {
  position: relative;
  width: 100%;
  height: 100%;
  perspective: 2400px;
  cursor: grab;
}

.book-desktop.is-dragging {
  cursor: grabbing;
  user-select: none;
}


.book {
  position: relative;
  width: 100%;
  height: 100%;
  transform: translateX(var(--book-shift));
  transition: transform 1.1s var(--ease-page);
  transform-style: preserve-3d;
}
</style>
