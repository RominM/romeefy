<template>
  <nuxt-link :to="redirect"  class="playing-card">
    <slot />
    <div v-if="trackId" class="playing-card--show-play" @click.prevent.stop="usePlay().byTrackId(trackId)">
        <h-icon :icon="PlayCircleIcon" size="40px"/>
    </div>
  </nuxt-link>
</template>

<script setup lang="ts">
import { PlayCircleIcon } from '@hugeicons/core-free-icons';

defineProps({
  redirect: { type: String, require: true },
  trackId: { type: Number, require: true }
})
</script>

<style scoped lang="scss">
.playing-card {
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 5px;
  padding: 10px;
  width: 100%;
  border-radius: 7px;
  background-color: $dark-surface;
  transition: 0.3s;
  cursor: pointer;

  &--show-play {
    position: absolute;
    right: 15px;
    bottom: -15px;
    background-color: $primary;
    opacity: 0;
    border-radius: 50%;
    transition: 0.3s;
  }
  &:hover {
     background-color: $dark-text-primary;
  }
  &:hover .playing-card--show-play {
    bottom: 15px;
    opacity: 1;
  }
}
</style>