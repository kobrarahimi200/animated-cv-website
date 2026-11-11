<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue';
import { createDotGrid, stepDots, type Dot, type PixelPointer } from '@/background/pixelField';
import { REDUCED_MOTION_QUERY, useMediaQuery } from '@/composables/useMediaQuery';

const SPACING_DESKTOP = 30;
const SPACING_MOBILE = 40;
const BASE_RADIUS = 1.1;
const ACTIVE_DISTANCE = 1.5;
/** How long after the last pointer move the field keeps simulating. */
const POINTER_IDLE_MS = 250;
const BASE_FILL = 'rgba(31, 77, 58, 0.16)';
const ACTIVE_FILL = 'rgba(232, 125, 104, 0.75)';

const canvas = ref<HTMLCanvasElement | null>(null);
const reducedMotion = useMediaQuery(REDUCED_MOTION_QUERY);

let ctx: CanvasRenderingContext2D | null = null;
let dots: Dot[] = [];
let width = 0;
let height = 0;
let dpr = 1;
let rafId = 0;
let lastFrame = 0;
let lastMoveAt = Number.NEGATIVE_INFINITY;
const pointer: PixelPointer = { x: 0, y: 0 };

function resize() {
  if (!canvas.value || !ctx) return;
  dpr = Math.min(window.devicePixelRatio || 1, 2);
  width = window.innerWidth;
  height = window.innerHeight;
  canvas.value.width = Math.round(width * dpr);
  canvas.value.height = Math.round(height * dpr);
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  dots = createDotGrid(width, height, width < 720 ? SPACING_MOBILE : SPACING_DESKTOP);
  draw();
}

function draw() {
  if (!ctx) return;
  ctx.clearRect(0, 0, width, height);

  ctx.fillStyle = BASE_FILL;
  ctx.beginPath();
  for (const dot of dots) {
    if (Math.hypot(dot.x - dot.ox, dot.y - dot.oy) > ACTIVE_DISTANCE) continue;
    ctx.moveTo(dot.x + BASE_RADIUS, dot.y);
    ctx.arc(dot.x, dot.y, BASE_RADIUS, 0, Math.PI * 2);
  }
  ctx.fill();

  ctx.fillStyle = ACTIVE_FILL;
  ctx.beginPath();
  for (const dot of dots) {
    const displacement = Math.hypot(dot.x - dot.ox, dot.y - dot.oy);
    if (displacement <= ACTIVE_DISTANCE) continue;
    const radius = BASE_RADIUS + Math.min(displacement * 0.08, 2.2);
    ctx.moveTo(dot.x + radius, dot.y);
    ctx.arc(dot.x, dot.y, radius, 0, Math.PI * 2);
  }
  ctx.fill();
}

function frame(now: number) {
  const dt = Math.min((now - lastFrame) / 1000, 0.05);
  lastFrame = now;
  const pointerActive = now - lastMoveAt < POINTER_IDLE_MS;
  const moving = stepDots(dots, pointerActive ? pointer : null, dt);
  draw();
  rafId = moving || pointerActive ? requestAnimationFrame(frame) : 0;
}

function wake() {
  lastMoveAt = performance.now();
  if (rafId || reducedMotion.value) return;
  lastFrame = performance.now();
  rafId = requestAnimationFrame(frame);
}

function onPointerMove(event: PointerEvent) {
  pointer.x = event.clientX;
  pointer.y = event.clientY;
  wake();
}

onMounted(() => {
  ctx = canvas.value?.getContext('2d') ?? null;
  if (!ctx) return;
  resize();
  window.addEventListener('resize', resize);
  window.addEventListener('pointermove', onPointerMove, { passive: true });
});

onBeforeUnmount(() => {
  window.removeEventListener('resize', resize);
  window.removeEventListener('pointermove', onPointerMove);
  cancelAnimationFrame(rafId);
  rafId = 0;
});
</script>

<template>
  <canvas ref="canvas" class="pixel-field" aria-hidden="true" />
</template>

<style scoped>
.pixel-field {
  position: fixed;
  inset: 0;
  width: 100vw;
  height: 100vh;
  z-index: 0;
  pointer-events: none;
}
</style>
