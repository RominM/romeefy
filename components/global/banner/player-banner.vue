<template>
  <div class='player-banner' :style="{ '--color': colorSecondary }" >
    <div class="player-banner__content">
      <h-icon 
      :icon="onPlay ? PauseCircleIcon : PlayCircleIcon" 
      size="55px"
      color="#1db954"
      :title="onPlay ? 'Pause' : 'Lecture'" 
      @click="togglePlay()"/>
      <h-icon :icon="ArrowDataTransferHorizontalIcon" size="45px" />
      <button class='player-banner__content__follow'>S'abonner</button>
      <h-icon :icon="MoreHorizontalIcon" size="45px" />
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
  position: relative;
  &__content {
    position: relative;
    display: flex;
    align-items: center;
    gap: 20px;
    padding: 10px 20px 10px 20px;
    background-color: $--color;
    filter: brightness(70%);
    z-index: 9;
    &__follow {
      display: flex;
      justify-content: center;
      padding: 3px 12px;
      color: #fff;
      font-weight: 600;
      border: solid 1px #fff;
      border-radius: 20px;
      height: fit-content;
      &:hover {
        transform: scale(1.03)
      }
    }
  }
  &::after {
    content: '';
    position: absolute;
    top: 0;
    display: block;
    background: linear-gradient($--color 15%, transparent 100%);
    filter: brightness(95%);
    height: 180px;
    width: 100%;
    z-index: 8;
  }
}
</style>