<script setup lang="ts">
import { computed } from 'vue';
import { portfolio } from '@/content/portfolio';
import type { ExperienceItem } from '@/types/portfolio';
import CareerTimeline from '../diagrams/CareerTimeline.vue';

const props = defineProps<{
  variant: 'featured' | 'more' | 'earlier';
}>();

const featured = computed<ExperienceItem[]>(() => portfolio.experience.filter((item) => item.featured));
const others = computed<ExperienceItem[]>(() => portfolio.experience.filter((item) => !item.featured));
</script>

<template>
  <div class="experience">
    <p class="eyebrow">Chapter II · Experience</p>

    <template v-if="props.variant === 'featured'">
      <template v-for="job in featured" :key="job.id">
        <h2 class="experience__title">{{ job.role }}</h2>
        <p class="experience__meta">
          <strong>{{ job.company }}</strong> · {{ job.period }}<span v-if="job.location"> · {{ job.location }}</span>
        </p>
        <p v-if="job.summary" class="experience__summary">{{ job.summary }}</p>
        <ul class="experience__projects">
          <li v-for="project in job.projects" :key="project.name">
            <span class="experience__project-name">{{ project.name }}</span>
            <span class="experience__project-desc">{{ project.description }}</span>
          </li>
        </ul>
        <ul class="experience__stack" aria-label="Practices and tools">
          <li v-for="item in job.stack" :key="item" class="chip">{{ item }}</li>
        </ul>
      </template>
    </template>

    <template v-else-if="props.variant === 'more'">
      <h2 class="experience__title">Earlier engineering roles</h2>
      <article v-for="job in others" :key="job.id" class="experience__job">
        <h3 class="experience__job-title">{{ job.role }}</h3>
        <p class="experience__meta">
          <strong>{{ job.company }}</strong> · {{ job.period }}
        </p>
        <p v-if="job.summary" class="experience__summary">{{ job.summary }}</p>
        <ul v-if="job.stack" class="experience__stack" aria-label="Technologies">
          <li v-for="item in job.stack" :key="item" class="chip">{{ item }}</li>
        </ul>
      </article>
      <CareerTimeline />
    </template>

    <template v-else>
      <h2 class="experience__title">Earlier professional experience</h2>
      <p class="experience__summary">Earlier roles in IT and web work.</p>
      <ul class="experience__roles">
        <li v-for="role in portfolio.earlierRoles" :key="role.role" class="experience__role">
          {{ role.role }}
        </li>
      </ul>
    </template>
  </div>
</template>

<style scoped>
.experience {
  display: flex;
  flex-direction: column;
  gap: 0.85rem;
  height: 100%;
}

.experience__title {
  font-size: clamp(1.4rem, 2.6vw, 1.9rem);
}

.experience__job {
  padding-bottom: 0.9rem;
  border-bottom: 1px dashed var(--line);
}

.experience__job-title {
  font-size: 1.1rem;
}

.experience__meta {
  font-size: 0.88rem;
  color: var(--ink-soft);
}

.experience__summary {
  font-size: 0.95rem;
}

.experience__projects {
  list-style: none;
  margin: 0;
  padding: 0;
  display: grid;
  gap: 0.6rem;
}

.experience__projects li {
  display: grid;
  gap: 0.1rem;
  padding-left: 0.9rem;
  border-left: 3px solid var(--teal);
}

.experience__project-name {
  font-weight: 700;
  color: var(--forest-deep);
}

.experience__project-desc {
  font-size: 0.88rem;
  color: var(--ink-soft);
}

.experience__stack {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
}

.experience__roles {
  list-style: none;
  margin: 0;
  padding: 0;
  display: grid;
  gap: 0.5rem;
}

.experience__role {
  padding: 0.6rem 0.9rem;
  border-radius: var(--radius);
  background: var(--paper-edge);
  font-weight: 600;
}
</style>
