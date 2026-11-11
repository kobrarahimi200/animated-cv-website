<script setup lang="ts">
import { computed } from 'vue';
import PageSheet from '@/components/book/PageSheet.vue';
import { useBook } from '@/composables/useBook';

const { face } = useBook();
const key = computed(() => face.value);
</script>

<template>
  <div class="book-mobile" data-testid="book-mobile">
    <Transition name="page" mode="out-in">
      <PageSheet :key="key" :face="face" class="book-mobile__sheet" />
    </Transition>
  </div>
</template>

<style scoped>
.book-mobile {
  position: relative;
  width: 100%;
  height: 100%;
  perspective: 1600px;
}

.book-mobile__sheet {
  position: absolute;
  inset: 0;
  box-shadow: var(--shadow-page);
  border-radius: 6px;
}

.page-enter-active,
.page-leave-active {
  transition:
    transform 0.55s var(--ease-page),
    opacity 0.55s var(--ease-page);
  transform-origin: left center;
  backface-visibility: hidden;
}

.page-enter-from {
  transform: rotateY(-70deg);
  opacity: 0;
}

.page-leave-to {
  transform: rotateY(70deg);
  opacity: 0;
}

@media (prefers-reduced-motion: reduce) {
  .page-enter-active,
  .page-leave-active {
    transition-duration: 0.01ms;
  }
}
</style>
