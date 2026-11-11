````<script setup lang="ts">
import { portfolio } from '@/content/portfolio';
import { useBook } from '@/composables/useBook';
import TableOfContents from '@/components/book/TableOfContents.vue';

const { profile } = portfolio;
const { forward, goToChapter } = useBook();
</script>

<template>
  <div class="cover">
    <p class="eyebrow">Portfolio · {{ profile.location }}</p>
    <h2 class="cover__name">{{ profile.name }}</h2>
    <p class="cover__title">{{ profile.title }}</p>
    <div class="cover__rule" aria-hidden="true" />
    <p class="cover__hint">Turn the page to begin</p>
    <button type="button" class="btn btn--primary cover__cta" @click="forward(true)">
      Open the book
    </button>
    <TableOfContents compact @select="goToChapter" />
  </div>
</template>

<style scoped>
.cover {
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  gap: 0.75rem;
  padding: clamp(1.5rem, 4vw, 2.5rem);
  background:
    linear-gradient(160deg, var(--forest) 0%, var(--forest-deep) 100%);
  color: var(--ivory);
}

.cover .eyebrow {
  color: var(--coral);
}

.cover__name {
  font-size: clamp(2rem, 4.2vw, 3rem);
  color: var(--ivory);
  font-weight: 800;
}

.cover__title {
  font-size: 1.05rem;
  color: rgba(247, 241, 227, 0.85);
}

.cover__rule {
  width: 56px;
  height: 2px;
  background: var(--coral);
  margin: 0.5rem 0;
}

.cover__hint {
  font-family: var(--font-mono);
  font-size: 0.78rem;
  letter-spacing: 0.06em;
  color: rgba(247, 241, 227, 0.7);
}

.cover__cta {
  margin-top: 0.5rem;
  background: var(--coral);
  color: var(--forest-deep);
}

.cover__cta:hover {
  background: #f09a84;
}

.cover :deep(.toc) {
  margin-top: 1rem;
  width: 100%;
}
</style>
