<template>
  <div class="player">
    <player-controller :source-id="source"/>
    <song-timeline v-show="isDesktop" :source="source"/>
  </div>
</template>

<script setup lang='ts'>
import { useDevice } from '~/composables/device/useDevice';
import { EGlobalEvent } from '~/types/enum/global/globalEvent';

useGlobalEvents().subscribeTo(EGlobalEvent.LISTEN_TRACK_PREVIEW, (preview: string | undefined) => {
  if (!preview) return
  source.value = preview
})

const { isDesktop } = useDevice()

const source = ref<string>('')
</script>

<style lang='scss' scoped>
.player {
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>