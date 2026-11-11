<script setup lang="ts">
import { ref } from 'vue';
import { useBook } from '@/composables/useBook';
import { portfolio } from '@/content/portfolio';
import type { ChapterId } from '@/types/portfolio';

const { goToChapter, currentChapter } = useBook();
const open = ref(false);

function jumpTo(id: ChapterId) {
  goToChapter(id);
  open.value = false;
  document.getElementById('book')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function onKeydown(event: KeyboardEvent) {
  if (event.key === 'Escape') open.value = false;
}
</script>

<template>
  <div class="quick-nav" @keydown="onKeydown">
    <button
      type="button"
      class="btn btn--ghost quick-nav__toggle"
      :aria-expanded="open"
      aria-controls="quick-nav-list"
      @click="open = !open"
    >
      <span>{{ currentChapter?.title ?? 'Contents' }}</span>
      <span aria-hidden="true">{{ open ? '×' : '☰' }}</span>
    </button>
    <ul v-if="open" id="quick-nav-list" class="quick-nav__list" role="list">
      <li v-for="chapter in portfolio.chapters" :key="chapter.id">
        <button type="button" class="quick-nav__item" @click="jumpTo(chapter.id)">
          <span class="quick-nav__numeral">{{ chapter.numeral }}</span>
          <span>{{ chapter.title }}</span>
        </button>
      </li>
    </ul>
  </div>
</template>

<style scoped>
.quick-nav {
  position: relative;
}

.quick-nav__toggle {
  display: inline-flex;
  align-items: center;
  gap: 0.6rem;
}

.quick-nav__list {
  position: absolute;
  right: 0;
  top: calc(100% + 0.5rem);
  min-width: 220px;
  margin: 0;
  padding: 0.4rem;
  list-style: none;
  background: var(--paper, #fffdf7);
  border: 1px solid rgba(35, 48, 43, 0.12);
  border-radius: var(--radius, 12px);
  box-shadow: var(--shadow-page);
  z-index: 20;
}

.quick-nav__item {
  all: unset;
  box-sizing: border-box;
  display: flex;
  gap: 0.75rem;
  width: 100%;
  padding: 0.6rem 0.75rem;
  border-radius: 8px;
  cursor: pointer;
  color: var(--ink, #23302b);
}

.quick-nav__item:hover,
.quick-nav__item:focus-visible {
  background: rgba(47, 93, 74, 0.08);
}

.quick-nav__numeral {
  font-family: var(--font-mono);
  color: var(--coral, #e5846b);
  min-width: 2ch;
}
</style>
