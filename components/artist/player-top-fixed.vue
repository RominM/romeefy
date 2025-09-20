<template>
  <div class="play_top-fixed" :style="{ backgroundColor: color }">
    <h-icon 
      :icon="onPlay ? PauseCircleIcon : PlayCircleIcon" 
      size="55px"
      color="#1db954"
      :title="onPlay ? 'Pause' : 'Lecture'" 
      @click="togglePlay()"
    />
    <h2>{{ name }}</h2>
  </div>
</template>

<script lang="ts" setup>
import { PauseCircleIcon, PlayCircleIcon } from '@hugeicons/core-free-icons';

defineProps({
    color: { type: String, required: true },
    scrollTop: { type: Number, required: true },
    name: { type: String, required: true },
})

const onPlay = ref<boolean>(false)

</script>

<style lang="scss" scoped>
.play_top-fixed {
  position: fixed;
  width: 100%;
  z-index: 12;
}
</style>