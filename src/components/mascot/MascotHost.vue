<script setup lang="ts">
import { computed, defineAsyncComponent, onBeforeUnmount, onMounted, ref, watch } from 'vue';
import MascotFallback from '@/components/mascot/MascotFallback.vue';
import { isWebGLAvailable } from '@/components/mascot/webgl';
import { useBook } from '@/composables/useBook';
import { useMediaQuery, REDUCED_MOTION_QUERY } from '@/composables/useMediaQuery';
import { mascotLines, pickLine } from '@/content/mascotLines';

/** Three.js is loaded lazily so the page renders before the 3D bundle arrives. */
const MascotScene = defineAsyncComponent(() => import('@/components/mascot/MascotScene.vue'));

const { currentPage } = useBook();
const reducedMotion = useMediaQuery(REDUCED_MOTION_QUERY);

const root = ref<HTMLElement | null>(null);
const inView = ref(true);
const webglFailed = ref(false);
const useFallback = computed(() => webglFailed.value || !isWebGLAvailable());
const waveKey = ref(0);
const bubble = ref<string>(mascotLines.greeting[0]);
const bubbleVisible = ref(true);

let bubbleTimer: number | undefined;
let observer: IntersectionObserver | null = null;

function say(text: string, duration = 4200) {
  bubble.value = text;
  bubbleVisible.value = true;
  window.clearTimeout(bubbleTimer);
  bubbleTimer = window.setTimeout(() => (bubbleVisible.value = false), duration);
}

function onPageChange() {
  waveKey.value++;
  const lines = mascotLines.pages[currentPage.value.layout];
  say(pickLine(lines, bubble.value));
}

function onMascotClick() {
  say(pickLine(mascotLines.click, bubble.value));
}

watch(() => currentPage.value.id, onPageChange);

onMounted(() => {
  observer = new IntersectionObserver(([entry]) => (inView.value = entry?.isIntersecting ?? true));
  if (root.value) observer.observe(root.value);
  window.setTimeout(() => say(pickLine(mascotLines.greeting)), 600);
});

onBeforeUnmount(() => {
  observer?.disconnect();
  window.clearTimeout(bubbleTimer);
});
</script>

<template>
  <div ref="root" class="mascot-host" :class="{ 'mascot-host--still': reducedMotion }">
    <p
      class="mascot-host__bubble"
      :class="{ 'mascot-host__bubble--hidden': !bubbleVisible }"
      role="status"
      aria-live="polite"
    >
      {{ bubble }}
    </p>
    <button type="button" class="mascot-host__figure" aria-label="Say hello to the guide" @click="onMascotClick">
      <MascotFallback v-if="useFallback" class="mascot-host__svg" />
      <MascotScene
        v-else
        :reduced-motion="reducedMotion"
        :visible="inView"
        :wave-key="waveKey"
        class="mascot-host__canvas"
        @fail="webglFailed = true"
      />
    </button>
  </div>
</template>

<style scoped>
.mascot-host {
  position: relative;
  width: 100%;
  max-width: 240px;
  margin-inline: auto;
}

.mascot-host__figure {
  all: unset;
  display: block;
  width: 100%;
  aspect-ratio: 1 / 1;
  cursor: pointer;
  border-radius: 32px;
}

.mascot-host__figure:focus-visible {
  outline: 2px solid var(--teal);
  outline-offset: 4px;
}

.mascot-host__bubble {
  position: absolute;
  top: -8px;
  left: 50%;
  transform: translate(-50%, -100%);
  width: max-content;
  max-width: 230px;
  margin: 0;
  padding: 0.6rem 0.9rem;
  background: var(--paper, #fffdf7);
  color: var(--ink, #23302b);
  border: 1px solid rgba(35, 48, 43, 0.12);
  border-radius: 14px;
  font-size: 0.85rem;
  line-height: 1.4;
  box-shadow: var(--shadow-page);
  transition: opacity 0.3s ease, transform 0.3s ease;
  z-index: 2;
}

.mascot-host__bubble--hidden {
  opacity: 0;
  transform: translate(-50%, -90%);
  pointer-events: none;
}

@media (prefers-reduced-motion: reduce) {
  .mascot-host__bubble {
    transition: none;
  }
}
</style>
