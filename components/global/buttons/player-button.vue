<template>
  <button>
    <h-icon 
    class="player-button"
    :icon="isPlayingThisTrack ? PauseCircleIcon : PlayCircleIcon" 
    size="55px"
    color="#1db954"
    :title="isPlayingThisTrack ? 'Pause' : 'Lecture'" 
    @click="togglePlay"
    />
  </button>
</template>

<script setup lang="ts">
import { PauseCircleIcon, PlayCircleIcon } from '@hugeicons/core-free-icons';
import { playerStore } from '~/store/playerStore';

const props = defineProps({
  trackId: { type: Number, required: true}
})

const { byTrackId, isCurrentTrackPlaying } = playerStore()

const isPlayingThisTrack = computed(() => isCurrentTrackPlaying(props.trackId))

function togglePlay() {
  byTrackId(props.trackId)
}
</script>

<style scoped lang="scss">
</style>