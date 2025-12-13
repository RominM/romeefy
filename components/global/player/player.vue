<template>
  <div :class="['player', { reverse }]">
    <player-controller :source-id="source" :variant="variant" />
    <song-timeline v-show="variant === EVaraintPlayer.FULL" :source="source" :reverse="reverse" />
  </div>
</template>

<script setup lang='ts'>
import { EGlobalEvent } from '~/types/enum/global/globalEvent';
import { EVaraintPlayer } from '~/types/enum/global/player';

defineProps({
  variant: { type: String as PropType<EVaraintPlayer>, default: EVaraintPlayer.FULL },
  reverse: { type: Boolean, default: false }
})

const source = ref<string>('')

useGlobalEvents().subscribeTo(EGlobalEvent.LISTEN_TRACK_PREVIEW, (preview: string | undefined) => {
  if (!preview) return
  source.value = preview
})
</script>

<style lang='scss' scoped>
.player {
  display: flex;
  flex-direction: column;
  align-items: center;

  &.reverse {
    flex-direction: column-reverse;
  }
}
</style>