<script setup lang="ts">
import QuickNavMenu from '@/components/nav/QuickNavMenu.vue';
import { portfolio } from '@/content/portfolio';

const { profile } = portfolio;
</script>

<template>
  <header class="site-header">
    <a class="site-header__brand" href="#top">{{ profile.name }}</a>
    <div class="site-header__actions">
      <QuickNavMenu />
    </div>
  </header>
</template>

<style scoped>
.site-header {
  position: sticky;
  top: 0;
  z-index: 10;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  padding: 0.9rem clamp(1rem, 4vw, 3rem);
  background: color-mix(in srgb, var(--ivory, #faf6ec) 88%, transparent);
  backdrop-filter: blur(8px);
  border-bottom: 1px solid rgba(35, 48, 43, 0.08);
}

.site-header__brand {
  font-family: var(--font-serif);
  font-size: 1.45rem;
  font-weight: 400;
  color: var(--forest, #2f5d4a);
  text-decoration: none;
  letter-spacing: 0.005em;
}

.site-header__actions {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

@media (max-width: 520px) {
  .site-header__brand {
    font-size: 0.95rem;
  }
}
</style>
