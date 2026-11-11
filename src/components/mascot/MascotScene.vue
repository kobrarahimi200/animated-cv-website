<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref, watch } from 'vue';
import { createMascot, type MascotHandle } from '@/components/mascot/createMascot';
import { usePointer } from '@/composables/usePointer';

const props = defineProps<{
  reducedMotion: boolean;
  visible: boolean;
  waveKey: number;
}>();

const emit = defineEmits<{
  fail: [];
}>();

const canvas = ref<HTMLCanvasElement | null>(null);
const pointer = usePointer();
let handle: MascotHandle | null = null;

onMounted(() => {
  if (!canvas.value) return;
  try {
    handle = createMascot(
      { canvas: canvas.value, reducedMotion: props.reducedMotion, onError: () => emit('fail') },
      pointer,
    );
    handle.setVisible(props.visible);
  } catch {
    // WebGL context creation failed; the host switches to the SVG fallback.
    emit('fail');
  }
});

watch(
  () => props.visible,
  (visible) => handle?.setVisible(visible),
);

watch(
  () => props.waveKey,
  () => handle?.wave(),
);

onBeforeUnmount(() => {
  handle?.dispose();
  handle = null;
});
</script>

<template>
  <canvas ref="canvas" class="mascot-scene" aria-hidden="true" />
</template>

<style scoped>
.mascot-scene {
  width: 100%;
  height: 100%;
  display: block;
}
</style>
