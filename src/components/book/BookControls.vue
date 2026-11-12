<script setup lang="ts">
import { computed } from 'vue';
import { useBook } from '@/composables/useBook';
import { printedPageNumber } from '@/book/bookState';
import { MOBILE_QUERY, useMediaQuery } from '@/composables/useMediaQuery';
import { usePageSound } from '@/composables/usePageSound';

const { face, faceCount, currentPage, currentChapter, canNext, canPrev, forward, backward } = useBook();
const isMobile = useMediaQuery(MOBILE_QUERY);
const { soundEnabled, toggleSound } = usePageSound();

const pageLabel = computed(() => {
  const number = printedPageNumber(face.value, faceCount);
  if (face.value === 0) return 'Cover';
  if (number === null) return 'Back cover';
  return `Page ${number} of ${faceCount - 2}`;
});

const chapterLabel = computed(() => currentChapter.value?.title ?? currentPage.value.label);

function prev() {
  backward(!isMobile.value);
}

function next() {
  forward(!isMobile.value);
}
</script>

<template>
  <nav class="book-controls" aria-label="Book navigation">
    <button
      type="button"
      class="btn btn--icon"
      :disabled="!canPrev"
      aria-label="Previous page"
      @click="prev"
    >
      <span aria-hidden="true">&larr;</span>
    </button>
    <div class="book-controls__status" aria-live="polite">
      <span class="book-controls__chapter">{{ chapterLabel }}</span>
      <span class="book-controls__page">{{ pageLabel }}</span>
    </div>
    <button
      type="button"
      class="btn btn--icon"
      :disabled="!canNext"
      aria-label="Next page"
      @click="next"
    >
      <span aria-hidden="true">&rarr;</span>
    </button>
    <button
      type="button"
      class="btn btn--icon book-controls__sound"
      :aria-pressed="soundEnabled"
      :aria-label="soundEnabled ? 'Mute page turn sound' : 'Unmute page turn sound'"
      @click="toggleSound"
    >
      <span aria-hidden="true">{{ soundEnabled ? '♪' : '✕' }}</span>
    </button>
  </nav>
</template>

<style scoped>
.book-controls {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  margin-top: 1.25rem;
}

.book-controls__status {
  display: flex;
  flex-direction: column;
  align-items: center;
  min-width: 11rem;
  text-align: center;
}

.book-controls__chapter {
  font-weight: 700;
  color: var(--forest);
}

.book-controls__page {
  font-family: var(--font-mono);
  font-size: 0.8rem;
  color: var(--ink-soft);
}

.btn--icon:disabled {
  opacity: 0.35;
  cursor: not-allowed;
}
</style>
