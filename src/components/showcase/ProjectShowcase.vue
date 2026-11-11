<script setup lang="ts">
import { portfolio } from '@/content/portfolio';
import BookIcon from '@/components/book/icons/BookIcon.vue';
import ProcessFlowDiagram from './ProcessFlowDiagram.vue';

const { projects } = portfolio;
</script>

<template>
  <section id="projects" class="projects" aria-labelledby="projects-title">
    <div class="projects__inner">
      <header class="projects__header">
        <p class="eyebrow">Selected projects</p>
        <h2 id="projects-title" class="projects__title">Recent work, up close</h2>
      </header>

      <article v-for="project in projects" :key="project.id" class="project">
        <div class="project__copy">
          <p class="project__meta">
            <span class="project__icon" aria-hidden="true"><BookIcon :name="project.icon" /></span>
            <span>{{ project.date }} · {{ project.category }}</span>
          </p>
          <h3 class="project__title">{{ project.title }}</h3>
          <p class="project__subtitle">{{ project.subtitle }}</p>
          <p class="project__description">{{ project.description }}</p>

          <ul class="project__highlights">
            <li v-for="point in project.highlights" :key="point">{{ point }}</li>
          </ul>

          <ul class="project__tags" aria-label="Technologies">
            <li v-for="tag in project.tags" :key="tag" class="project__tag">{{ tag }}</li>
          </ul>

          <a class="btn btn--primary project__link" :href="project.repoUrl" target="_blank" rel="noopener">
            View on GitHub <span aria-hidden="true">→</span>
          </a>
        </div>

        <div class="project__visual">
          <img
            v-if="project.visual.kind === 'image'"
            class="project__image"
            :src="project.visual.src"
            :alt="project.visual.alt"
            :width="project.visual.width"
            :height="project.visual.height"
            loading="lazy"
            decoding="async"
          />
          <ProcessFlowDiagram v-else :steps="project.visual.steps" />
        </div>
      </article>
    </div>
  </section>
</template>

<style scoped>
.projects {
  background: var(--ivory, #fbf6ea);
  color: var(--ink, #1d2a24);
  padding: clamp(2.5rem, 6vw, 4.5rem) clamp(1rem, 4vw, 3rem);
}

.projects__inner {
  max-width: 1100px;
  margin: 0 auto;
  display: grid;
  gap: clamp(2rem, 5vw, 3.5rem);
}

.projects__title {
  font-size: clamp(2rem, 4.4vw, 3rem);
  line-height: 1.1;
  margin: 0.5rem 0 0;
}

.project {
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
  align-items: center;
  gap: clamp(2rem, 5vw, 4rem);
  padding-top: clamp(1.5rem, 3vw, 2.5rem);
  border-top: 1px solid rgba(29, 42, 36, 0.15);
}

.project__meta {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  margin: 0;
  font-family: var(--font-mono, monospace);
  font-size: 0.8rem;
  letter-spacing: 0.04em;
  color: #5b6b63;
}

.project__image {
  display: block;
  width: 100%;
  height: auto;
  border-radius: 14px;
  border: 1px solid rgba(29, 42, 36, 0.15);
  box-shadow: 8px 8px 0 #2b3a33;
}

.project__icon {
  display: grid;
  place-items: center;
  width: 2rem;
  height: 2rem;
  border-radius: 10px;
  background: var(--forest, #1f4d3a);
  color: var(--ivory, #fbf6ea);
}

.project__title {
  font-size: clamp(1.7rem, 3.4vw, 2.4rem);
  line-height: 1.15;
  margin: 0.75rem 0 0.4rem;
}

.project__subtitle {
  margin: 0 0 1rem;
  font-size: 1.05rem;
  color: #3e5148;
}

.project__description {
  line-height: 1.6;
  max-width: 56ch;
}

.project__highlights {
  margin: 1rem 0 1.25rem;
  padding-left: 1.1rem;
  display: grid;
  gap: 0.45rem;
  line-height: 1.5;
  font-size: 0.95rem;
}

.project__highlights li::marker {
  color: var(--coral, #e98b6f);
}

.project__tags {
  list-style: none;
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin: 0 0 1.75rem;
  padding: 0;
}

.project__tag {
  padding: 0.3rem 0.7rem;
  border: 1px solid rgba(29, 42, 36, 0.3);
  border-radius: 999px;
  font-family: var(--font-mono, monospace);
  font-size: 0.78rem;
  background: #fffdf7;
}

.project__link {
  display: inline-flex;
  gap: 0.4rem;
}

@media (max-width: 760px) {
  .project {
    grid-template-columns: minmax(0, 1fr);
  }
}
</style>
