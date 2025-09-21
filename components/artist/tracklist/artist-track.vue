<template>
  <div class='artist-track' @click="togglePlay">
    <div class='artist-track__index-icon'>
      <h-icon :icon="!isPlayingThisTrack ? PlayIcon : PauseFreeIcons" class='artist-track__index-icon--icon' size="25px"/>
      <span class='artist-track__index-icon--index'>{{  index  }}</span>
    </div>
    <img v-if="showCover" class='artist-track__album-cover' :src="track.album.cover_small" alt="">
    <p class='artist-track__title'>
      <span> {{ track.title }}</span>
      <span v-if="track.explicit_lyrics" class='artist-track__title--is-explicit'>E</span>
    </p>
    <p class='artist-track__listen'>{{ listenRandom }}</p>
    <div class='artist-track__duration'>
      <h-icon class='artist-track__duration--icons' :icon="AddCircleIcon" size="22px" />
      <p class='artist-track__duration__duration-track'>{{ duration }}</p>
      <h-icon class='artist-track__duration--icons' :icon="MoreHorizontalIcon" size="20px" />
    </div>
  </div>
</template>

<script setup lang='ts'>
import { AddCircleIcon, MoreHorizontalIcon, PauseFreeIcons, PlayIcon } from '@hugeicons/core-free-icons';

const props = defineProps({
  track: { type: Object, required: true },
  index: { type: Number, default: null },
  showCover: { type: Boolean, defautl: false }
})


const listenRandom =  computed(() => {
  const generateNumber = Math.floor(Math.random() * (1_000_000_000 - 100_000 + 1)) + 1_000_000
  return new Intl.NumberFormat().format(generateNumber) 
})

const duration = computed(() => {
  const trackDuration = props.track.duration
  const minutes = Math.floor(trackDuration / 60)
  const remainingSeconds = trackDuration % 60
  return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`
})

const { byPreview, isCurrentTrackPlaying } = usePlay()

const isPlayingThisTrack = computed(() => isCurrentTrackPlaying(undefined, props.track.preview))

function togglePlay() {
  byPreview(props.track.preview)
}
</script>

<style lang='scss' scoped>
.artist-track {
  display: flex;
  align-items: center;
  gap: 16px;
  height: 53px;
  color: $light-text-primary;
  padding: 7px 15px;
  border-radius: 5px;
  transition: 0.3s;
  cursor: pointer;
  &__index-icon {
    position: relative;
    width: 30px;
    height: 20px;

    &--icon,
    &--index {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      transition: opacity 0.3s;
    }

    &--icon {
      opacity: 0;
    }

    &--index {
      opacity: 1;
    }
  }

  &__album-cover {
    width: 45px;
    height: 45px;
    border-radius: 5px;
  }

  &__title {
    display: flex;
    flex-direction: column;
    font-weight: 600;
    color: #fff;
    width: 100%;
    &--is-explicit {
      width: fit-content;
      padding: 5px;
      background-color: #fff;
      color: #000;
      border-radius: 3px;
      font-size: 10px;
      font-weight: 22400;
      line-height: 5px;
    }
  }

  &__listen{
    width: 30%;
  }

  &__duration {
    display: flex;
    align-items: center;
    gap: 20px;
    width: 20%;
    &__duration-track {
      margin-left: 20px;
    }
    &--icons {
      opacity: 0;
      transition: 0.3s;
    }
  }
  &:hover {
    background-color: rgba(66, 66, 66, 0.5);
    .artist-track {
      &__index-icon {
        &--icon {
          opacity: 1;
        }

        &--index {
          opacity: 0;
        }
      }
      &__duration--icons {
        opacity: 1;
      }
    }
  }
}
</style>