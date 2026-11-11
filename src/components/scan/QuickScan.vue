<script setup lang="ts">
import { portfolio } from '@/content/portfolio';

const { profile, experience, skills, languages } = portfolio;
</script>

<template>
  <section class="quick-scan" aria-labelledby="quick-scan-title">
    <p class="eyebrow">At a glance</p>
    <h2 id="quick-scan-title" class="quick-scan__title">Quick scan for recruiters</h2>

    <div class="quick-scan__grid">
      <article class="quick-scan__card">
        <h3>Focus</h3>
        <ul class="quick-scan__chips">
          <li v-for="item in profile.focus" :key="item" class="chip">{{ item }}</li>
        </ul>
      </article>

      <article class="quick-scan__card">
        <h3>Experience</h3>
        <ol class="quick-scan__list">
          <li v-for="job in experience" :key="job.id">
            <strong>{{ job.role }}</strong>, {{ job.company }}
            <span class="quick-scan__meta">{{ job.period }}</span>
          </li>
        </ol>
      </article>

      <article class="quick-scan__card">
        <h3>Stack</h3>
        <ul class="quick-scan__list">
          <li v-for="group in skills" :key="group.label">
            <strong>{{ group.label }}:</strong> {{ group.items.join(', ') }}
          </li>
        </ul>
      </article>

      <article class="quick-scan__card">
        <h3>Languages</h3>
        <ul class="quick-scan__list">
          <li v-for="lang in languages" :key="lang.language">
            {{ lang.language }} <span class="quick-scan__meta">{{ lang.level }}</span>
          </li>
        </ul>
      </article>
    </div>
  </section>
</template>

<style scoped>
.quick-scan {
  padding: clamp(3rem, 8vw, 5rem) clamp(1rem, 4vw, 3rem);
  max-width: 1100px;
  margin: 0 auto;
}

.quick-scan__title {
  font-size: clamp(1.6rem, 3vw, 2.2rem);
  margin: 0.4rem 0 2rem;
  color: var(--forest, #2f5d4a);
}

.quick-scan__grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 1.25rem;
}

.quick-scan__card {
  background: var(--paper, #fffdf7);
  border: 1px solid rgba(35, 48, 43, 0.08);
  border-radius: var(--radius, 12px);
  padding: 1.25rem 1.4rem;
  box-shadow: var(--shadow-page);
  transition: transform 0.25s ease, box-shadow 0.25s ease;
}

.quick-scan__card:hover {
  transform: translateY(-4px) rotate(-0.4deg);
  box-shadow: 0 14px 28px rgba(35, 48, 43, 0.12);
}

@media (prefers-reduced-motion: reduce) {
  .quick-scan__card,
  .quick-scan__card:hover {
    transition: none;
    transform: none;
  }
}

.quick-scan__card h3 {
  margin: 0 0 0.75rem;
  font-size: 1rem;
  color: var(--teal, #4f8a85);
}

.quick-scan__chips {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  list-style: none;
  margin: 0;
  padding: 0;
}

.quick-scan__list {
  margin: 0;
  padding-left: 1.1rem;
  display: grid;
  gap: 0.6rem;
  font-size: 0.92rem;
  line-height: 1.45;
}

.quick-scan__meta {
  display: block;
  font-family: var(--font-mono);
  font-size: 0.8rem;
  color: var(--ink-soft, #5b6661);
}
</style>
