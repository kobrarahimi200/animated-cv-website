<script setup lang="ts">
import SiteHeader from '@/components/nav/SiteHeader.vue';
import BookStage from '@/components/book/BookStage.vue';
import MascotHost from '@/components/mascot/MascotHost.vue';
import QuickScan from '@/components/scan/QuickScan.vue';
import ProjectShowcase from '@/components/showcase/ProjectShowcase.vue';
import ConnectSection from '@/components/connect/ConnectSection.vue';
import PixelField from '@/components/background/PixelField.vue';
import CodeRain from '@/components/background/CodeRain.vue';
import { portfolio } from '@/content/portfolio';

const { profile } = portfolio;
</script>

<template>
  <PixelField />
  <div id="top" class="app">
    <SiteHeader />

    <main>
      <section class="hero">
        <CodeRain />
        <div class="hero__copy">
          <p class="eyebrow">{{ profile.location }}</p>
          <h1 class="hero__name">{{ profile.name }}</h1>
          <p class="hero__title">{{ profile.title }}</p>
          <p class="hero__intro">{{ profile.intro }}</p>
          <div class="hero__actions">
            <a class="btn btn--primary" href="#book">Read the portfolio</a>
          </div>
        </div>
        <div class="hero__mascot">
          <MascotHost />
        </div>
      </section>

      <section id="book" class="book-section" aria-label="Portfolio book">
        <BookStage />
      </section>

      <QuickScan />
    </main>

    <ProjectShowcase />
    <ConnectSection />
  </div>
</template>

<style scoped>
.app {
  position: relative;
  z-index: 1;
}

.hero {
  position: relative;
  isolation: isolate;
  display: grid;
  grid-template-columns: minmax(0, 1.2fr) minmax(200px, 0.8fr);
  align-items: center;
  gap: clamp(1.5rem, 4vw, 3rem);
  max-width: 1100px;
  margin: 0 auto;
  padding: clamp(2.5rem, 7vw, 5rem) clamp(1rem, 4vw, 3rem) 2rem;
}

.hero__copy,
.hero__mascot {
  position: relative;
  z-index: 1;
}

.hero__name {
  font-size: clamp(2.4rem, 6vw, 4.2rem);
  line-height: 1.05;
  margin: 0.5rem 0 0.4rem;
  color: var(--forest, #1f4d3a);
}

.hero__title {
  font-size: 1.15rem;
  color: var(--teal, #5e8f8a);
  margin: 0 0 1rem;
}

.hero__intro {
  max-width: 56ch;
  color: var(--ink-soft, #55645d);
  line-height: 1.6;
}

.hero__actions {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  margin-top: 1.5rem;
}

.book-section {
  scroll-margin-top: 72px;
  padding: clamp(1rem, 3vw, 2rem) 0 clamp(2rem, 5vw, 3.5rem);
}

@media (max-width: 760px) {
  .hero {
    grid-template-columns: 1fr;
  }

  .hero__mascot {
    order: -1;
    width: 160px;
    justify-self: center;
  }
}
</style>
