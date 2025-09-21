<template>
  <div class="album-player">
    <h-icon 
      :icon="isPlaying ? PauseCircleIcon : PlayCircleIcon" 
      size="45px" 
      :title="isPlaying ? 'Pause' : 'Lecture'" 
      @click="togglePlay()"
    />
    <h-icon :icon="CircleArrowDown02Icon" size="27px"/>
    <h-icon class='artist-track__duration--icons' :icon="AddCircleIcon" size="27px" />
    <h-icon class='artist-track__duration--icons' :icon="MoreHorizontalIcon" size="27px" />
  </div>
</template>

<script setup lang="ts">
import { AddCircleIcon, CircleArrowDown02Icon, MoreHorizontalIcon, PauseCircleIcon, PlayCircleIcon } from '@hugeicons/core-free-icons';

</script>

<style scoped lang="scss">
.album-player {
  display: flex;
  gap: 15px;
}
</style>