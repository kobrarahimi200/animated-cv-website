<script setup lang="ts">
import { ref } from 'vue';
import { portfolio } from '@/content/portfolio';
import type { ContactLink } from '@/types/portfolio';

const { profile } = portfolio;

const email = profile.contacts.find((contact) => contact.kind === 'email');
const otherContacts = profile.contacts.filter((contact) => contact.kind !== 'email');
const copied = ref(false);
let copyTimer: number | undefined;

const conversationHref = email
  ? `mailto:${email.value}?subject=${encodeURIComponent('Let’s talk — portfolio enquiry')}&body=${encodeURIComponent('Hi Kobra,\n\nI came across your portfolio and would like to talk.\n\n')}`
  : '';

async function copyEmail() {
  if (!email) return;
  try {
    await navigator.clipboard.writeText(email.value);
    copied.value = true;
    window.clearTimeout(copyTimer);
    copyTimer = window.setTimeout(() => (copied.value = false), 2000);
  } catch {
    window.location.href = email.href;
  }
}

function contactIcon(contact: ContactLink): string {
  return contact.kind === 'linkedin' ? 'in' : contact.kind === 'github' ? '{ }' : '@';
}
</script>

<template>
  <section id="connect" class="connect" aria-labelledby="connect-title">
    <div class="connect__inner">
      <div class="connect__copy">
        <p class="eyebrow">Connect</p>
        <h2 id="connect-title" class="connect__title">Let's build something meaningful together.</h2>
        <p class="connect__text">
          I'm open to frontend, backend and full-stack roles, and to conversations about enterprise applications,
          modern web technologies and agile teams.
        </p>

        <ul class="connect__list">
          <li v-if="email" class="connect__row">
            <span class="connect__badge" aria-hidden="true">@</span>
            <div class="connect__row-body">
              <span class="connect__label">Email</span>
              <a class="connect__value" :href="email.href">{{ email.value }}</a>
            </div>
            <button type="button" class="connect__copy-btn" @click="copyEmail">
              {{ copied ? 'Copied!' : 'Copy' }}
            </button>
          </li>
          <li v-for="contact in otherContacts" :key="contact.kind" class="connect__row">
            <span class="connect__badge" aria-hidden="true">{{ contactIcon(contact) }}</span>
            <div class="connect__row-body">
              <span class="connect__label">{{ contact.label }}</span>
              <a class="connect__value" :href="contact.href" target="_blank" rel="noopener">{{ contact.value }}</a>
            </div>
          </li>
          <li class="connect__row">
            <span class="connect__badge" aria-hidden="true">⌂</span>
            <div class="connect__row-body">
              <span class="connect__label">Based in</span>
              <span class="connect__value">{{ profile.location }}</span>
            </div>
          </li>
        </ul>

        <div class="connect__actions">
          <a v-if="email" class="btn btn--primary" :href="conversationHref">Start a conversation</a>
          <a class="btn btn--ghost" :href="profile.cvHref" :download="profile.cvFilename">Download CV</a>
        </div>
      </div>

      <div class="connect__visual" aria-hidden="true">
        <div class="connect__bubble">Hi, I'm Kobra! Let's talk code.</div>
        <img class="connect__mascot" src="/mascot/kobra-mascot.png" alt="" width="768" height="768" loading="lazy" />
      </div>
    </div>

    <footer class="connect__footer">
      <p>{{ profile.name }} · {{ profile.title }}</p>
      <a href="#top">Back to the top ↑</a>
    </footer>
  </section>
</template>

<style scoped>
.connect {
  background: var(--forest, #1f4d3a);
  color: var(--ivory, #fbf6ea);
  padding: clamp(2.5rem, 6vw, 4.5rem) clamp(1rem, 4vw, 3rem) 1.5rem;
}

.connect__inner {
  display: grid;
  grid-template-columns: minmax(0, 1.25fr) minmax(200px, 0.75fr);
  align-items: center;
  gap: clamp(2rem, 5vw, 4rem);
  max-width: 1100px;
  margin: 0 auto;
}

.connect .eyebrow {
  color: var(--coral, #e98b6f);
}

.connect__title {
  font-size: clamp(2rem, 4.8vw, 3.4rem);
  line-height: 1.1;
  margin: 0.5rem 0 1rem;
  color: var(--ivory, #fbf6ea);
}

.connect__text {
  max-width: 52ch;
  line-height: 1.6;
  opacity: 0.85;
}

.connect__list {
  list-style: none;
  margin: 1.75rem 0;
  padding: 0;
  display: grid;
  gap: 0.6rem;
}

.connect__row {
  display: flex;
  align-items: center;
  gap: 0.9rem;
  padding: 0.75rem 1rem;
  border-radius: 14px;
  background: rgba(251, 246, 234, 0.07);
  border: 1px solid rgba(251, 246, 234, 0.12);
  transition: transform 0.25s ease, background 0.25s ease;
}

.connect__row:hover {
  transform: translateX(6px);
  background: rgba(251, 246, 234, 0.12);
}

.connect__badge {
  flex: none;
  display: grid;
  place-items: center;
  width: 2.25rem;
  height: 2.25rem;
  border-radius: 50%;
  background: var(--teal, #5e8f8a);
  font-family: var(--font-mono, monospace);
  font-size: 0.85rem;
}

.connect__row-body {
  display: grid;
  min-width: 0;
  flex: 1;
}

.connect__label {
  font-family: var(--font-mono, monospace);
  font-size: 0.72rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  opacity: 0.7;
}

.connect__value {
  color: inherit;
  overflow-wrap: anywhere;
  text-decoration: none;
}

a.connect__value:hover {
  text-decoration: underline;
}

.connect__copy-btn {
  flex: none;
  padding: 0.4rem 0.9rem;
  border-radius: 999px;
  border: 1px solid rgba(251, 246, 234, 0.4);
  background: transparent;
  color: inherit;
  font: inherit;
  font-size: 0.85rem;
  cursor: pointer;
  transition: background 0.2s ease;
}

.connect__copy-btn:hover,
.connect__copy-btn:focus-visible {
  background: var(--coral, #e98b6f);
  border-color: var(--coral, #e98b6f);
  color: var(--forest, #1f4d3a);
  outline: none;
}

.connect__actions {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
}

.connect .btn--primary {
  background: var(--coral, #e98b6f);
  color: var(--forest, #1f4d3a);
}

.connect .btn--ghost {
  color: var(--ivory, #fbf6ea);
  border-color: rgba(251, 246, 234, 0.5);
}

.connect__visual {
  position: relative;
  display: grid;
  justify-items: center;
  gap: 1rem;
}

.connect__bubble {
  position: relative;
  padding: 0.7rem 1rem;
  border-radius: 14px;
  background: var(--ivory, #fbf6ea);
  color: var(--forest, #1f4d3a);
  font-size: 0.95rem;
  font-weight: 600;
  max-width: 260px;
  text-align: center;
}

.connect__bubble::after {
  content: '';
  position: absolute;
  left: 50%;
  bottom: -7px;
  width: 14px;
  height: 14px;
  background: inherit;
  transform: translateX(-50%) rotate(45deg);
}

.connect__mascot {
  width: min(260px, 70vw);
  height: auto;
  filter: drop-shadow(0 18px 24px rgba(0, 0, 0, 0.25));
  animation: connect-bob 4s ease-in-out infinite;
}

.connect__footer {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 1rem;
  max-width: 1100px;
  margin: clamp(2rem, 5vw, 3.5rem) auto 0;
  padding-top: 1.25rem;
  border-top: 1px solid rgba(251, 246, 234, 0.15);
  font-size: 0.9rem;
  opacity: 0.8;
}

.connect__footer a {
  color: inherit;
}

@keyframes connect-bob {
  0%,
  100% {
    transform: translateY(0) rotate(-1deg);
  }
  50% {
    transform: translateY(-12px) rotate(1deg);
  }
}

@media (max-width: 760px) {
  .connect__inner {
    grid-template-columns: 1fr;
  }

  .connect__visual {
    order: -1;
  }

  .connect__mascot {
    width: 180px;
  }
}

@media (prefers-reduced-motion: reduce) {
  .connect__mascot,
  .connect__row {
    animation: none;
    transition: none;
  }
}
</style>
