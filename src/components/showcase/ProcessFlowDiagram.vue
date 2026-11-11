<script setup lang="ts">
defineProps<{ steps: string[] }>();
</script>

<template>
  <figure class="flow" aria-label="Process overview">
    <ol class="flow__list">
      <li v-for="(step, index) in steps" :key="step" class="flow__item">
        <span class="flow__node">
          <span class="flow__index">{{ String(index + 1).padStart(2, '0') }}</span>
          {{ step }}
        </span>
      </li>
    </ol>
  </figure>
</template>

<style scoped>
.flow {
  margin: 0;
  padding: clamp(1.25rem, 2.5vw, 1.75rem);
  background: #fffdf7;
  border: 2px solid var(--ink, #1d2a24);
  border-radius: 18px;
  box-shadow: 8px 8px 0 var(--ink, #1d2a24);
}

.flow__list {
  list-style: none;
  margin: 0;
  padding: 0;
  display: grid;
  gap: 0.6rem;
}

.flow__item {
  position: relative;
}

.flow__item:not(:last-child)::after {
  content: '↓';
  position: absolute;
  left: 1.1rem;
  bottom: -0.85rem;
  color: var(--coral, #e98b6f);
  font-family: var(--font-mono, monospace);
  font-size: 0.9rem;
}

.flow__node {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.7rem 1rem;
  border-radius: 14px;
  border: 1.5px solid var(--forest, #1f4d3a);
  background: #f3efe2;
  color: var(--forest, #1f4d3a);
  font-weight: 600;
  transition: transform 0.25s ease, background 0.25s ease;
}

.flow__node:hover {
  transform: translateX(6px);
  background: rgba(94, 143, 138, 0.18);
}

.flow__index {
  display: grid;
  place-items: center;
  width: 2rem;
  height: 2rem;
  flex: none;
  border-radius: 50%;
  background: var(--forest, #1f4d3a);
  color: var(--ivory, #fbf6ea);
  font-family: var(--font-mono, monospace);
  font-size: 0.75rem;
}

@media (prefers-reduced-motion: reduce) {
  .flow__node {
    transition: none;
  }
}
</style>
