<template>
  <div :class="[
    'player-controler',
    {
      '--minimal': variant === EVaraintPlayer.MINIMAL, 
      '--lite': variant === EVaraintPlayer.LITE
    }]"
    >
    <h-icon v-if="variant === EVaraintPlayer.FULL" :icon="ArrowDataTransferHorizontalIcon" size="20px"/>
    <h-icon v-if="variant !== EVaraintPlayer.MINIMAL" :icon="PreviousIcon" size="20px" title="Précedent"/>
    <h-icon 
      :icon="isPlaying ? PauseCircleIcon : PlayCircleIcon" 
      size="40px" 
      :title="isPlaying ? 'Pause' : 'Lecture'" 
      @click="togglePlay"/>
    <h-icon v-if="variant !== EVaraintPlayer.MINIMAL" :icon="NextIcon" size="20px" title="Suivant"/>
    <h-icon v-if="variant === EVaraintPlayer.FULL" :icon="onLoopSong ? RepeatOne01Icon : RepeatIcon" size="20px" :title="onLoopSong ? 'Désactiver la répétition' : 'Activer la répétition'"/>
  </div>
</template>

<script setup lang='ts'>
import { ArrowDataTransferHorizontalIcon, NextIcon, PauseCircleIcon, PlayCircleIcon, PreviousIcon, RepeatIcon, RepeatOne01Icon } from '@hugeicons/core-free-icons';
import { playerStore } from '~/store/playerStore';
import { EVaraintPlayer } from '~/types/enum/global/player';

defineProps({
  variant: { type: String as PropType<EVaraintPlayer>, default: EVaraintPlayer.FULL },
})

const _player = playerStore()
const { isPlaying } = storeToRefs(_player)
const togglePlay = _player.togglePlayGlobal

const onLoopSong = ref<boolean>(false)
</script>

<style lang='scss' scoped>
  .player-controler{
    display: flex;
    justify-content: space-around;
    width: 300px;
    &.--lite { width: 100%; }
    &.--minimal { width: fit-content; }
}
</style>