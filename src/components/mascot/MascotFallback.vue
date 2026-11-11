<script setup lang="ts">
import { MASCOT_IMAGE_SRC } from '@/components/mascot/mascotImage';
</script>

<template>
  <img class="mascot-fallback" :src="MASCOT_IMAGE_SRC" alt="" width="240" height="240" decoding="async" />
</template>

<style scoped>
/* object-fit: cover on a square box shows the same centred crop the WebGL plane uses. */
.mascot-fallback {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: 50% 50%;
}
</style>
