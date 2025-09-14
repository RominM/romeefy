<template>
  <div class='player-controler'>
    <h-icon :icon="ArrowDataTransferHorizontalIcon" size="20px"/>
    <h-icon :icon="PreviousIcon" size="20px" title="Précedent"/>
    <h-icon :icon="onPlay ? PauseCircleIcon : PlayCircleIcon" size="40px" :title="onPlay ? 'Pause' : 'Lecture'"/>
    <h-icon :icon="NextIcon" size="20px" title="Suivant"/>
    <h-icon :icon="onLoopSong ? RepeatOne01Icon : RepeatIcon" size="20px" :title="onLoopSong ? 'Désactiver la répétition' : 'Activer la répétition'"/>
  </div>
</template>

<script setup lang='ts'>
import { PauseCircleIcon, PlayCircleIcon, PreviousIcon, NextIcon, RepeatIcon, RepeatOne01Icon, ArrowDataTransferHorizontalIcon } from '@hugeicons/core-free-icons';
import { EGlobalEvent } from '~/types/enum/global/globalEvent';

useGlobalEvents().subscribeTo(EGlobalEvent.TOGGLE_TRACK, (payload)=> {
  console.log(payload);
  
})
const onPlay = ref<boolean>(false)
const onLoopSong = ref<boolean>(false)
</script>

<style lang='scss' scoped>
  .player-controler{
    display: flex;
    justify-content: space-around;
    width: 300px;
}
</style>