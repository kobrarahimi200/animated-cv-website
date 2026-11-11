<script setup lang="ts">
import { computed } from 'vue';
import BookLeaf from '@/components/book/BookLeaf.vue';
import { useBook } from '@/composables/useBook';
import { leafCount } from '@/book/bookState';

const { face, faceCount } = useBook();

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
</script>

<template>
  <div class="book-desktop" :style="{ '--book-shift': shift }" data-testid="book-desktop">
    <div class="book">
      <BookLeaf
        v-for="leaf in leaves"
        :key="leaf.index"
        :front="leaf.front"
        :back="leaf.back"
        :flipped="leaf.flipped"
        :z-index="leaf.zIndex"
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
