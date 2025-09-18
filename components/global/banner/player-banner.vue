<template>
  <div class='player-banner' :style="{ '--color': colorSecondary }" >
    <div class="player-banner__content">
      <h-icon 
      :icon="onPlay ? PauseCircleIcon : PlayCircleIcon" 
      size="40px"
      color="#1db954"
      :title="onPlay ? 'Pause' : 'Lecture'" 
      @click="togglePlay()"/>
      <h-icon :icon="ArrowDataTransferHorizontalIcon" size="20px"/>
      <button>S'abonner</button>
      <h-icon :icon="MoreHorizontalIcon" class='icon--action'/>
    </div>
  </div>
</template>

<script setup lang='ts'>
import { ArrowDataTransferHorizontalIcon, MoreHorizontalIcon, PauseCircleIcon, PlayCircleIcon } from '@hugeicons/core-free-icons';

defineProps({
  colorSecondary: { type: String, required: true}
})

const onPlay = ref<boolean>(false)
const onLoopSong = ref<boolean>(false)

function togglePlay() {

}
</script>

<style lang='scss' scoped>
$--color: var(--color);

.player-banner {
  &__content {
    display: flex;
    gap: 20px;
    padding: 20px;
    background-color: $--color;
  }
  &::after {
    content: '';
    display: block;
    background: linear-gradient(180deg, $--color 0%, transparent 100%);
    height: 100px;
  }
}
</style>