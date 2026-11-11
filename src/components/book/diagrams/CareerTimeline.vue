<script setup lang="ts">
import { computed } from 'vue';
import { portfolio } from '@/content/portfolio';
import { layoutTimeline } from '@/book/timeline';

const layout = computed(() =>
  layoutTimeline(
    portfolio.experience.map((item) => ({
      id: item.id,
      label: item.company,
      from: item.from,
      to: item.to,
    })),
  ),
);
</script>

<template>
  <figure class="career-timeline">
    <figcaption class="career-timeline__caption">Career timeline</figcaption>
    <div class="career-timeline__rows">
      <div v-for="bar in layout.bars" :key="bar.id" class="career-timeline__row">
        <span class="career-timeline__label">{{ bar.label }}</span>
        <div class="career-timeline__track">
          <span
            class="career-timeline__bar"
            :style="{ left: `${bar.leftPct}%`, width: `${bar.widthPct}%` }"
          />
        </div>
      </div>
    </div>
    <div class="career-timeline__axis" aria-hidden="true">
      <span
        v-for="tick in layout.ticks"
        :key="tick.year"
        class="career-timeline__tick"
        :style="{ left: `${tick.leftPct}%` }"
      >{{ tick.year }}</span>
    </div>
  </figure>
</template>

<style scoped>
.career-timeline {
  margin: 0;
  display: grid;
  gap: 0.5rem;
}

.career-timeline__caption {
  font-family: 'DM Mono', monospace;
  font-size: 0.72rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--ink-soft);
}

.career-timeline__rows {
  display: grid;
  gap: 0.4rem;
}

.career-timeline__row {
  display: grid;
  grid-template-columns: minmax(6.5rem, 9rem) 1fr;
  align-items: center;
  gap: 0.6rem;
}

.career-timeline__label {
  font-size: 0.8rem;
  font-weight: 600;
  color: var(--forest-deep);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.career-timeline__track {
  position: relative;
  height: 0.7rem;
  border-radius: 999px;
  background: var(--paper-edge);
  border: 1px solid var(--line);
}

.career-timeline__bar {
  position: absolute;
  top: 0;
  bottom: 0;
  border-radius: 999px;
  background: linear-gradient(90deg, var(--teal), var(--forest-deep));
}

.career-timeline__axis {
  position: relative;
  height: 1rem;
  margin-left: calc(6.5rem + 0.6rem);
  font-family: 'DM Mono', monospace;
  font-size: 0.66rem;
  color: var(--ink-soft);
}

.career-timeline__tick {
  position: absolute;
  transform: translateX(-50%);
}

@media (max-width: 600px) {
  .career-timeline__row {
    grid-template-columns: 1fr;
    gap: 0.2rem;
  }

  .career-timeline__axis {
    margin-left: 0;
  }
}
</style>
