<script setup lang="ts">
import type { IconName } from '@/types/portfolio';
import { ICON_SHAPES } from './iconShapes';

defineProps<{ name: IconName }>();
</script>

<template>
  <svg class="book-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">
    <template v-for="(shape, index) in ICON_SHAPES[name]" :key="index">
      <path v-if="shape.tag === 'path'" :d="String(shape.attrs.d)" />
      <circle v-else-if="shape.tag === 'circle'" :cx="shape.attrs.cx" :cy="shape.attrs.cy" :r="shape.attrs.r" />
      <rect v-else-if="shape.tag === 'rect'" :x="shape.attrs.x" :y="shape.attrs.y" :width="shape.attrs.width" :height="shape.attrs.height" :rx="shape.attrs.rx" />
      <line v-else :x1="shape.attrs.x1" :y1="shape.attrs.y1" :x2="shape.attrs.x2" :y2="shape.attrs.y2" />
    </template>
  </svg>
</template>

<style scoped>
.book-icon {
  width: 1.25em;
  height: 1.25em;
  flex: none;
}
</style>
