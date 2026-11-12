<script setup lang="ts">
import PageSheet from '@/components/book/PageSheet.vue';

defineProps<{
  /** Face index shown on the right side of the leaf when closed */
  front: number;
  /** Face index shown on the left side of the leaf when flipped */
  back: number;
  flipped: boolean;
  /** Stacking order: the next leaf to turn must sit on top */
  zIndex: number;
  /** Y-rotation in degrees while the reader drags this leaf; undefined when not dragged */
  dragAngle?: number;
}>();
</script>

<template>
  <div
    class="leaf"
    :class="{ 'is-flipped': flipped, 'is-dragging': dragAngle !== undefined }"
    :style="{
      zIndex,
      transform: dragAngle !== undefined ? `rotateY(${dragAngle}deg)` : undefined,
    }"
    :aria-hidden="undefined"
  >
    <div class="leaf__face leaf__face--front">
      <PageSheet :face="front" side="right" />
    </div>
    <div class="leaf__face leaf__face--back">
      <PageSheet :face="back" side="left" />
    </div>
  </div>
</template>

<style scoped>
.leaf {
  position: absolute;
  top: 0;
  right: 0;
  width: 50%;
  height: 100%;
  transform-origin: left center;
  transform-style: preserve-3d;
  transition: transform 1.1s var(--ease-page);
  will-change: transform;
}

.leaf.is-flipped {
  transform: rotateY(-180deg);
}

/* While dragged, the leaf follows the pointer directly; the transition resumes on release. */
.leaf.is-dragging {
  transition: none;
}

.leaf__face {
  position: absolute;
  inset: 0;
  backface-visibility: hidden;
  -webkit-backface-visibility: hidden;
  box-shadow: var(--shadow-page);
  background: var(--paper);
}

.leaf__face::after {
  content: '';
  position: absolute;
  inset: 0;
  pointer-events: none;
  background: linear-gradient(to right, rgba(35, 48, 43, 0.22), rgba(35, 48, 43, 0) 70%);
  opacity: 0;
}

/* The shade is strongest while the leaf is in the air and fades as it settles. */
.leaf.is-flipped .leaf__face--back::after,
.leaf:not(.is-flipped) .leaf__face--front::after {
  animation: page-shade 1.1s var(--ease-page) both;
}

@keyframes page-shade {
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
}

.leaf__face--back {
  transform: rotateY(180deg);
}

@media (prefers-reduced-motion: reduce) {
  .leaf {
    transition-duration: 0.01ms;
  }

  .leaf__face::after {
    animation: none;
  }
}
</style>
