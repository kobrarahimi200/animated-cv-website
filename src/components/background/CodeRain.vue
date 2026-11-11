<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref, watch } from 'vue';
import { createRainColumns, stepRain, type RainColumn } from '@/background/codeRain';
import { REDUCED_MOTION_QUERY, useMediaQuery } from '@/composables/useMediaQuery';

const MOBILE_BREAKPOINT = 720;
const FONT_DESKTOP = 14;
const FONT_MOBILE = 12;
const LINE_RATIO = 1.4;
const SPACING_RATIO = 1.6;
/** Redraw at ~30 fps to keep mobile CPU and battery use low. */
const FRAME_MS = 1000 / 30;
/** Scroll distance (px) that doubles the fall speed. */
const SCROLL_PER_BOOST = 120;
const MAX_BOOST = 4;
const SCROLL_DECAY_PER_S = 3;
const HEAD_FILL = 'rgba(232, 125, 104, 0.95)';
const TRAIL_RGB = '31, 77, 58';

const root = ref<HTMLCanvasElement | null>(null);
const reducedMotion = useMediaQuery(REDUCED_MOTION_QUERY);

let ctx: CanvasRenderingContext2D | null = null;
let columns: RainColumn[] = [];
let width = 0;
let height = 0;
let fontSize = FONT_DESKTOP;
let lineHeight = FONT_DESKTOP * LINE_RATIO;
let rafId = 0;
let lastDraw = 0;
let visible = true;
let scrollEnergy = 0;
let lastScrollY = 0;
let resizeObserver: ResizeObserver | null = null;
let intersectionObserver: IntersectionObserver | null = null;

function resize() {
  const canvas = root.value;
  const parent = canvas?.parentElement;
  if (!canvas || !ctx || !parent) return;
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  width = parent.clientWidth;
  height = parent.clientHeight;
  canvas.width = Math.round(width * dpr);
  canvas.height = Math.round(height * dpr);
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

  fontSize = width < MOBILE_BREAKPOINT ? FONT_MOBILE : FONT_DESKTOP;
  lineHeight = fontSize * LINE_RATIO;
  columns = createRainColumns(width, height, fontSize * SPACING_RATIO);
  draw();
}

function draw() {
  if (!ctx) return;
  ctx.clearRect(0, 0, width, height);
  ctx.font = `${fontSize}px 'DM Mono', monospace`;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';

  for (const column of columns) {
    for (let j = 0; j < column.length; j++) {
      const y = column.head - j * lineHeight;
      if (y < -lineHeight || y > height + lineHeight) continue;
      ctx.fillStyle = j === 0 ? HEAD_FILL : `rgba(${TRAIL_RGB}, ${(1 - j / column.length) * 0.4})`;
      ctx.fillText(column.glyphs[j] ?? '', column.x, y);
    }
  }
}

function frame(now: number) {
  rafId = requestAnimationFrame(frame);
  const elapsed = now - lastDraw;
  if (elapsed < FRAME_MS) return;
  const dt = Math.min(elapsed / 1000, 0.1);
  lastDraw = now;

  scrollEnergy *= Math.exp(-SCROLL_DECAY_PER_S * dt);
  const boost = 1 + Math.min(scrollEnergy / SCROLL_PER_BOOST, MAX_BOOST);
  stepRain(columns, dt, boost, height, lineHeight);
  draw();
}

function startLoop() {
  if (rafId || reducedMotion.value || !visible) return;
  lastDraw = performance.now() - FRAME_MS;
  rafId = requestAnimationFrame(frame);
}

function stopLoop() {
  cancelAnimationFrame(rafId);
  rafId = 0;
}

function onScroll() {
  const y = window.scrollY;
  scrollEnergy += Math.abs(y - lastScrollY);
  lastScrollY = y;
}

watch(reducedMotion, (reduce) => {
  if (reduce) {
    stopLoop();
    draw();
  } else {
    startLoop();
  }
});

onMounted(() => {
  ctx = root.value?.getContext('2d') ?? null;
  if (!ctx) return;
  lastScrollY = window.scrollY;
  resize();
  resizeObserver = new ResizeObserver(resize);
  if (root.value?.parentElement) resizeObserver.observe(root.value.parentElement);
  intersectionObserver = new IntersectionObserver((entries) => {
    const entry = entries[entries.length - 1];
    if (!entry) return;
    visible = entry.isIntersecting;
    if (visible) startLoop();
    else stopLoop();
  });
  if (root.value) intersectionObserver.observe(root.value);
  window.addEventListener('scroll', onScroll, { passive: true });
  startLoop();
});

onBeforeUnmount(() => {
  stopLoop();
  resizeObserver?.disconnect();
  intersectionObserver?.disconnect();
  window.removeEventListener('scroll', onScroll);
});
</script>

<template>
  <canvas ref="root" class="code-rain" aria-hidden="true" />
</template>

<style scoped>
.code-rain {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  z-index: 0;
  pointer-events: none;
  opacity: 0.45;
  -webkit-mask-image: linear-gradient(to bottom, #000 55%, transparent);
  mask-image: linear-gradient(to bottom, #000 55%, transparent);
}
</style>
