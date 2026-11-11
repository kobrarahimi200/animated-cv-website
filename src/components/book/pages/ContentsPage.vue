<script setup lang="ts">
import { portfolio } from '@/content/portfolio';
import TableOfContents from '@/components/book/TableOfContents.vue';
import { useBook } from '@/composables/useBook';

const { goToChapter } = useBook();
const { chapters } = portfolio;
</script>

<template>
  <div class="contents">
    <p class="eyebrow">Table of contents</p>
    <h2 class="contents__title">Contents</h2>
    <TableOfContents @select="goToChapter" />
    <p class="contents__note">
      {{ chapters.length }} chapters · select one to jump, or turn the pages in order.
    </p>
  </div>
</template>

<style scoped>
.contents {
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.contents__title {
  font-size: clamp(1.6rem, 3vw, 2.1rem);
}

.contents__note {
  margin-top: auto;
  font-size: 0.82rem;
  color: var(--ink-soft);
}
</style>
