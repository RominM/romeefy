<template>
  <div class='on-listen'>
    <img v-if="track" class='on-listen__cover' :src="track.album.cover_small" alt="">
    <div class='on-listen__artist'>
      <p v-if="track">{{ track.title }}</p>
      <p v-if="track">{{ track.artist.name }}</p>
    </div>
  </div>
</template>

<script setup lang='ts'>
import { EGlobalEvent } from '~/types/enum/global/globalEvent';

useGlobalEvents().subscribeTo(EGlobalEvent.TRACK_DATA, (payload) => {
  console.log({payload});
  track.value = payload
  
})

const track = ref()
</script>

<style lang='scss' scoped>
  .on-listen{
    display: flex;
    gap: 10px;
    color: #fff;
    &__cover {
      width: 72px;
      height: 72px;
      object-fit: cover;
    }
    &__artist {
      display: flex;
      flex-direction: column;
      justify-content: center;
      gap: 5px;
      & > * {
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      :first-child {
        font-size: 14px;
        font-weight: 600;
        color: $light-background;
      }
      :nth-child(2) {
        font-size: 12px;
        color: $light-text-primary;
      }
    }
  }
</style>