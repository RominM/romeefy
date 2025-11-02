<template>
  <div class="little-icon-play" @click="togglePlay">
    <h-icon :icon="!isPlaying ? PlayIcon : PauseFreeIcons" size="25px"/>
  </div>
</template>

<script setup lang="ts">
import { PauseFreeIcons, PlayIcon } from '@hugeicons/core-free-icons';
import { playerStore } from '~/store/playerStore';

const props = defineProps({
  preview: { type: String, required: true },
})

const _player = playerStore()
const { isPlaying } = storeToRefs(_player)
const preview = _player.byPreview

function togglePlay() {
  preview(props.preview)
}
</script>

<style scoped lang="scss">
.little-icon-play{
  width: 25px;
  height: 25px;
  cursor: pointer;
  z-index: 999;
}
</style>