<script setup lang="ts">
import { portfolio } from '@/content/portfolio';

const { profile } = portfolio;
</script>

<template>
  <div class="back">
    <p class="eyebrow">{{ profile.name }}</p>
    <h2 class="back__title">Thank you for reading.</h2>
    <p class="back__text">{{ profile.title }}, based in {{ profile.location }}.</p>
    <a class="btn btn--primary back__cv" :href="profile.cvHref" :download="profile.cvFilename">
      Download CV (PDF)
    </a>
  </div>
</template>

<style scoped>
.back {
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  gap: 0.8rem;
  padding: clamp(1.5rem, 4vw, 2.5rem);
  background: linear-gradient(200deg, var(--teal) 0%, var(--forest) 100%);
  color: var(--ivory);
}

.back .eyebrow {
  color: var(--coral-soft);
}

.back__title {
  font-size: clamp(1.6rem, 3vw, 2.1rem);
  color: var(--ivory);
}

.back__text {
  color: rgba(247, 241, 227, 0.85);
}

.back__cv {
  margin-top: 0.5rem;
  background: var(--ivory);
  color: var(--forest-deep);
}

.back__cv:hover {
  background: #fff;
}
</style>
