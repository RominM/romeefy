<template>
  <div class='player-controler'>
    <h-icon :icon="ArrowDataTransferHorizontalIcon" size="20px"/>
    <h-icon :icon="PreviousIcon" size="20px" title="Précedent"/>
    <h-icon 
      :icon="isPlaying ? PauseCircleIcon : PlayCircleIcon" 
      size="40px" 
      :title="isPlaying ? 'Pause' : 'Lecture'" 
      @click="togglePlay()"/>
    <h-icon :icon="NextIcon" size="20px" title="Suivant"/>
    <h-icon :icon="onLoopSong ? RepeatOne01Icon : RepeatIcon" size="20px" :title="onLoopSong ? 'Désactiver la répétition' : 'Activer la répétition'"/>
  </div>
</template>

<script setup lang='ts'>
import { ArrowDataTransferHorizontalIcon, NextIcon, PauseCircleIcon, PlayCircleIcon, PreviousIcon, RepeatIcon, RepeatOne01Icon } from '@hugeicons/core-free-icons';

// useGlobalEvents().subscribeTo(EGlobalEvent.PLAYER_STATE, (playing: boolean | undefined) => {  
//   if(!playing) return
//   onPlay.value = playing
// })

// const onPlay = ref<boolean>(false)
const onLoopSong = ref<boolean>(false)

const { togglePlayGlobal, isPlaying } = usePlay()
function togglePlay() {
  togglePlayGlobal()
}


</script>

<style lang='scss' scoped>
  .player-controler{
    display: flex;
    justify-content: space-around;
    width: 300px;
}
</style>