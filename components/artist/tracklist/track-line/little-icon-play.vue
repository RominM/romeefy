<template>
    <h-icon :icon="!isPlayingThisTrack ? PlayIcon : PauseFreeIcons" class="little-icon-play" size="25px"/>
</template>

<script setup lang="ts">
import { PauseFreeIcons, PlayIcon } from '@hugeicons/core-free-icons';
import { playerStore } from '~/store/playerStore';

const props = defineProps({
  preview: { type: String, required: true },
})

const { isCurrentTrackPlaying } = playerStore()

const isPlayingThisTrack = computed(() => isCurrentTrackPlaying(undefined, props.preview))
</script>

<style scoped lang="scss">
</style>