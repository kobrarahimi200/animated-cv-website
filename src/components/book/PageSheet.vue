<script setup lang="ts">
import { printedPageNumber } from '@/book/bookState';
import { bookPages } from '@/content/bookPages';
import type { BookPageDef } from '@/types/portfolio';
import CoverPage from '@/components/book/pages/CoverPage.vue';
import ContentsPage from '@/components/book/pages/ContentsPage.vue';
import AboutPage from '@/components/book/pages/AboutPage.vue';
import ExperiencePage from '@/components/book/pages/ExperiencePage.vue';
import SkillsPage from '@/components/book/pages/SkillsPage.vue';
import EducationPage from '@/components/book/pages/EducationPage.vue';
import ContactPage from '@/components/book/pages/ContactPage.vue';
import BackCoverPage from '@/components/book/pages/BackCoverPage.vue';

const props = defineProps<{
  /** Index into bookPages */
  face: number;
  /** Side of the book this sheet sits on, used for the page-edge shading */
  side?: 'left' | 'right' | 'single';
}>();

const page = (): BookPageDef => bookPages[props.face] ?? bookPages[0]!;
const number = () => printedPageNumber(props.face, bookPages.length);
</script>

<template>
  <article
    class="sheet"
    :class="[`sheet--${side ?? 'single'}`, `sheet--${page().layout}`]"
    :aria-label="page().label"
    :data-face="face"
  >
    <div class="sheet__content">
      <CoverPage v-if="page().layout === 'cover'" />
      <ContentsPage v-else-if="page().layout === 'contents'" />
      <AboutPage v-else-if="page().layout === 'about'" />
      <ExperiencePage v-else-if="page().layout === 'experience-featured'" variant="featured" />
      <ExperiencePage v-else-if="page().layout === 'experience-more'" variant="more" />
      <ExperiencePage v-else-if="page().layout === 'experience-earlier'" variant="earlier" />
      <SkillsPage v-else-if="page().layout === 'skills'" />
      <EducationPage v-else-if="page().layout === 'education'" />
      <ContactPage v-else-if="page().layout === 'contact'" />
      <BackCoverPage v-else />
    </div>
    <footer v-if="number() !== null" class="sheet__folio" aria-hidden="true">
      {{ number() }}
    </footer>
  </article>
</template>

<style scoped>
.sheet {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
  background: var(--paper);
  color: var(--ink);
}

.sheet--cover,
.sheet--back-cover {
  background: none;
  padding: 0;
}

.sheet__content {
  position: relative;
  height: 100%;
  padding: clamp(1.25rem, 3vw, 2.25rem);
  overflow-y: auto;
  overscroll-behavior: contain;
  scrollbar-width: thin;
}

.sheet--cover .sheet__content,
.sheet--back-cover .sheet__content {
  padding: 0;
  overflow: hidden;
}

.sheet--left::after,
.sheet--right::after {
  content: '';
  position: absolute;
  top: 0;
  bottom: 0;
  width: 36px;
  pointer-events: none;
}

.sheet--left::after {
  right: 0;
  background: linear-gradient(to left, rgba(35, 48, 43, 0.08), transparent);
}

.sheet--right::after {
  left: 0;
  background: linear-gradient(to right, rgba(35, 48, 43, 0.1), transparent);
}

.sheet__folio {
  position: absolute;
  bottom: 0.9rem;
  left: 0;
  right: 0;
  text-align: center;
  font-family: var(--font-mono);
  font-size: 0.72rem;
  color: var(--ink-soft);
  pointer-events: none;
}

.sheet--left .sheet__folio {
  text-align: left;
  padding-left: 1.25rem;
}

.sheet--right .sheet__folio {
  text-align: right;
  padding-right: 1.25rem;
}
</style>
