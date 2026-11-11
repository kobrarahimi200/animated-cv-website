<script setup lang="ts">
import { portfolio } from '@/content/portfolio';
import BookIcon from '../icons/BookIcon.vue';
</script>

<template>
  <div class="skills">
    <p class="eyebrow">Chapter III</p>
    <h2 class="skills__title">Skills</h2>
    <section v-for="group in portfolio.skills" :key="group.label" class="skills__group">
      <h3 class="skills__label">
        <BookIcon :name="group.icon" />
        <span>{{ group.label }}</span>
      </h3>
      <ul class="skills__items">
        <li v-for="item in group.items" :key="item" class="chip">{{ item }}</li>
      </ul>
    </section>
  </div>
</template>

<style scoped>
.skills {
  display: flex;
  flex-direction: column;
  gap: 0.9rem;
  height: 100%;
}

.skills__title {
  font-size: clamp(1.6rem, 3vw, 2.1rem);
}

.skills__label {
  font-size: 0.8rem;
  font-family: var(--font-mono);
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--teal);
  margin-bottom: 0.4rem;
  display: flex;
  align-items: center;
  gap: 0.4rem;
}

.skills__items {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
}
</style>
