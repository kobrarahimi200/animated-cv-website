<script setup lang="ts">
import { portfolio } from '@/content/portfolio';
import type { IconName } from '@/types/portfolio';
import BookIcon from '../icons/BookIcon.vue';

const { profile } = portfolio;

const FOCUS_ICONS: IconName[] = ['code', 'briefcase', 'users'];
</script>

<template>
  <div class="about">
    <p class="eyebrow">Chapter I</p>
    <h2 class="about__title">About</h2>
    <p class="about__intro">{{ profile.intro }}</p>
    <ul class="about__focus" aria-label="Focus areas">
      <li v-for="(item, index) in profile.focus" :key="item" class="chip about__chip">
        <BookIcon v-if="FOCUS_ICONS[index]" :name="FOCUS_ICONS[index]" />
        <span>{{ item }}</span>
      </li>
    </ul>
    <dl class="about__facts">
      <div>
        <dt>Based in</dt>
        <dd>{{ profile.location }}</dd>
      </div>
      <div>
        <dt>Latest role</dt>
        <dd>{{ portfolio.experience[0]?.role }} at {{ portfolio.experience[0]?.company }}</dd>
      </div>
      <div>
        <dt>Languages</dt>
        <dd>{{ portfolio.languages.map((l) => `${l.language} (${l.level})`).join(' · ') }}</dd>
      </div>
    </dl>
  </div>
</template>

<style scoped>
.about {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  height: 100%;
}

.about__title {
  font-size: clamp(1.6rem, 3vw, 2.1rem);
}

.about__intro {
  font-size: 1.02rem;
  color: var(--ink);
}

.about__focus {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
}

.about__chip {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  color: var(--forest-deep);
}

.about__facts {
  margin: auto 0 0;
  display: grid;
  gap: 0.75rem;
  padding-top: 1rem;
  border-top: 1px solid var(--line);
}

.about__facts dt {
  font-family: var(--font-mono);
  font-size: 0.7rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--teal);
}

.about__facts dd {
  margin: 0.1rem 0 0;
  font-size: 0.92rem;
}
</style>
