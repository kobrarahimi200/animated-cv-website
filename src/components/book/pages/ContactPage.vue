<script setup lang="ts">
import { portfolio } from '@/content/portfolio';
import { useBook } from '@/composables/useBook';
import type { ContactLink, IconName } from '@/types/portfolio';
import BookIcon from '../icons/BookIcon.vue';

const { profile } = portfolio;
const { goToChapter } = useBook();

const CONTACT_ICONS: Record<ContactLink['kind'], IconName> = {
  email: 'mail',
  linkedin: 'linkedin',
  github: 'github',
};
</script>

<template>
  <div class="contact">
    <p class="eyebrow">Chapter V</p>
    <h2 class="contact__title">Let’s talk</h2>
    <p class="contact__text">
      Reach me by email, LinkedIn or GitHub.
    </p>
    <ul class="contact__links">
      <li v-for="link in profile.contacts" :key="link.kind">
        <a :href="link.href" :target="link.kind === 'email' ? undefined : '_blank'" rel="noopener">
          <span class="contact__label">
            <BookIcon :name="CONTACT_ICONS[link.kind]" />
            {{ link.label }}
          </span>
          <span>{{ link.value }}</span>
        </a>
      </li>
    </ul>
    <button type="button" class="contact__back" @click="goToChapter('about')">Back to About</button>
  </div>
</template>

<style scoped>
.contact {
  display: flex;
  flex-direction: column;
  gap: 0.9rem;
  height: 100%;
}

.contact__title {
  font-size: clamp(1.6rem, 3vw, 2.1rem);
}

.contact__links {
  list-style: none;
  margin: 0;
  padding: 0;
  display: grid;
  gap: 0.5rem;
}

.contact__links a {
  display: flex;
  flex-direction: column;
  gap: 0.1rem;
  padding: 0.7rem 0.9rem;
  border-radius: var(--radius);
  background: var(--paper-edge);
  text-decoration: none;
  color: var(--forest-deep);
  font-weight: 600;
  overflow-wrap: anywhere;
  transition: background-color 0.2s ease;
}

.contact__links a:hover {
  background: var(--teal-soft);
}

.contact__label {
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  font-family: var(--font-mono);
  font-size: 0.7rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--teal);
  font-weight: 400;
}

.contact__back {
  align-self: flex-start;
  background: none;
  border: 0;
  padding: 0;
  font: inherit;
  font-size: 0.85rem;
  color: var(--forest);
  text-decoration: underline;
  cursor: pointer;
}
</style>
