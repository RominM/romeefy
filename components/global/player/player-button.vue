<template>
  <h-icon 
    class="player-button"
    :icon="onPlay ? PauseCircleIcon : PlayCircleIcon" 
    size="55px"
    color="#1db954"
    :title="onPlay ? 'Pause' : 'Lecture'" 
    @click="togglePlay()"
  />
</template>

<script setup lang="ts">
import { PauseCircleIcon, PlayCircleIcon } from '@hugeicons/core-free-icons';

const onPlay = ref<boolean>(false)
</script>

<style scoped lang="scss">
.player-button {
  
}
</style>