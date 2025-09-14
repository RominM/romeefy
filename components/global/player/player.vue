<template>
  <div class='player'>
    <player-controler />
    <song-timeline :source="source"/>
  </div>
</template>

<script setup lang='ts'>
import { EGlobalEvent } from '~/types/enum/global/globalEvent';

useGlobalEvents().subscribeTo(EGlobalEvent.LISTEN_TRACK_PREVIEW, (preview: string | undefined) => {
  if (!preview) return;
  source.value = preview; // juste pour mettre à jour le timeline
  console.log(source.value);
  
});

const source = ref<string>('')
</script>

<style lang='scss' scoped>
.player {
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>