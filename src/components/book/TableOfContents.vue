<script setup lang="ts">
import { computed } from 'vue';
import { portfolio } from '@/content/portfolio';
import { useBook } from '@/composables/useBook';
import type { ChapterId } from '@/types/portfolio';

defineProps<{
  compact?: boolean;
}>();

const emit = defineEmits<{
  select: [chapterId: ChapterId];
}>();

const { currentChapter, firstFaceOfChapter } = useBook();

const items = computed(() =>
  portfolio.chapters.map((chapter) => ({
    ...chapter,
    startFace: firstFaceOfChapter(chapter.id),
  })),
);

function isActive(chapterId: ChapterId): boolean {
  return currentChapter.value?.id === chapterId;
}
</script>

<template>
  <nav class="toc" :class="{ 'toc--compact': compact }" aria-label="Table of contents">
    <ol class="toc__list">
      <li v-for="item in items" :key="item.id">
        <button
          type="button"
          class="toc__item"
          :class="{ 'is-active': isActive(item.id) }"
          :aria-current="isActive(item.id) ? 'true' : undefined"
          :data-face="item.startFace"
          @click="emit('select', item.id)"
        >
          <span class="toc__numeral">{{ item.numeral }}</span>
          <span class="toc__text">
            <span class="toc__title">{{ item.title }}</span>
            <span v-if="!compact" class="toc__summary">{{ item.summary }}</span>
          </span>
        </button>
      </li>
    </ol>
  </nav>
</template>

<style scoped>
.toc__list {
  list-style: none;
  margin: 0;
  padding: 0;
  display: grid;
  gap: 0.4rem;
}

.toc__item {
  width: 100%;
  display: flex;
  align-items: center;
  gap: 0.8rem;
  padding: 0.6rem 0.8rem;
  border: 1px solid transparent;
  border-radius: var(--radius);
  background: transparent;
  color: inherit;
  font: inherit;
  text-align: left;
  cursor: pointer;
  transition:
    background-color 0.2s ease,
    border-color 0.2s ease;
}

.toc__item:hover {
  background: rgba(94, 143, 138, 0.12);
}

.toc__item.is-active {
  border-color: var(--coral);
  background: rgba(229, 132, 107, 0.12);
}

.toc__numeral {
  font-family: var(--font-mono);
  font-size: 0.85rem;
  min-width: 2rem;
  color: var(--coral);
}

.toc__text {
  display: flex;
  flex-direction: column;
}

.toc__title {
  font-weight: 700;
}

.toc__summary {
  font-size: 0.85rem;
  color: var(--ink-soft);
}

.toc--compact .toc__item {
  color: var(--ivory);
  padding: 0.45rem 0.6rem;
}

.toc--compact .toc__item:hover {
  background: rgba(247, 241, 227, 0.1);
}

.toc--compact .toc__item.is-active {
  background: rgba(229, 132, 107, 0.25);
}
</style>
