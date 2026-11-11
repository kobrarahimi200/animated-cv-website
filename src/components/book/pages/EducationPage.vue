<script setup lang="ts">
import { portfolio } from '@/content/portfolio';
import BookIcon from '../icons/BookIcon.vue';
</script>

<template>
  <div class="education">
    <p class="eyebrow">Chapter IV</p>
    <h2 class="education__title">Education</h2>
    <ol class="education__list">
      <li v-for="item in portfolio.education" :key="item.degree" class="education__item">
        <p class="education__degree">
          <BookIcon name="graduation" />
          <span>{{ item.degree }}</span>
        </p>
        <p class="education__school">{{ item.institution }} · {{ item.year }}</p>
        <p v-if="item.note" class="education__note">{{ item.note }}</p>
      </li>
    </ol>

    <h3 class="education__subtitle">Languages</h3>
    <ul class="education__languages">
      <li v-for="lang in portfolio.languages" :key="lang.language">
        <span>{{ lang.language }}</span>
        <span class="education__level">{{ lang.level }}</span>
      </li>
    </ul>
  </div>
</template>

<style scoped>
.education {
  display: flex;
  flex-direction: column;
  gap: 0.9rem;
  height: 100%;
}

.education__title {
  font-size: clamp(1.6rem, 3vw, 2.1rem);
}

.education__list {
  margin: 0;
  padding: 0;
  list-style: none;
  display: grid;
  gap: 0.9rem;
}

.education__item {
  padding-left: 0.9rem;
  border-left: 3px solid var(--coral);
}

.education__degree {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  font-weight: 700;
  color: var(--forest-deep);
}

.education__school {
  font-size: 0.9rem;
  color: var(--ink-soft);
}

.education__note {
  margin-top: 0.3rem;
  font-size: 0.88rem;
}

.education__subtitle {
  font-size: 0.8rem;
  font-family: var(--font-mono);
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--teal);
  margin-top: auto;
}

.education__languages {
  list-style: none;
  margin: 0;
  padding: 0;
  display: grid;
  gap: 0.4rem;
}

.education__languages li {
  display: flex;
  justify-content: space-between;
  padding: 0.45rem 0;
  border-bottom: 1px solid var(--line);
}

.education__level {
  font-family: var(--font-mono);
  font-size: 0.85rem;
  color: var(--forest);
}
</style>
