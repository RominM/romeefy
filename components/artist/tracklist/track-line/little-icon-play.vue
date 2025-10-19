<template>
    <h-icon :icon="!isPlayingThisTrack ? PlayIcon : PauseFreeIcons" @click="togglePlay" class="little-icon-play" size="25px"/>
</template>

<script setup lang="ts">
import { PauseFreeIcons, PlayIcon } from '@hugeicons/core-free-icons';
import { playerStore } from '~/store/playerStore';

const props = defineProps({
  preview: { type: String, required: true },
})

const { isCurrentTrackPlaying, byPreview } = playerStore()

const isPlayingThisTrack = computed(() => isCurrentTrackPlaying(undefined, props.preview))

function togglePlay() {
  byPreview(props.preview)
}
</script>

<style scoped lang="scss">
</style>