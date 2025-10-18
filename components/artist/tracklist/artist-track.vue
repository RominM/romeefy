<template>
  <div :class="['artist-track', { isMobile }]" @click="!variant ? togglePlay() : null">
    <div v-if="!variant" class='artist-track__index-icon'>
      <h-icon :icon="!isPlayingThisTrack ? PlayIcon : PauseFreeIcons" class='artist-track__index-icon--icon' size="25px"/>
      <span class='artist-track__index-icon--index'>{{  index  }}</span>
    </div>

    <img v-if="showCover" class='artist-track__album-cover' :src="track.album.cover_small" alt="" @click="variant ? togglePlay() : null">
    <h-icon v-if="variant" class='artist-track__album-cover--icon' :icon="!isPlayingThisTrack ? PlayIcon : PauseFreeIcons"  size="25px" @click="variant ? togglePlay() : null"/>

    <p class='artist-track__title'>
      <span :class="['artist-track__title__main', { '--mobile-play' : isMobile && isPlayingThisTrack}]"> {{ track.title }}</span>
      <nuxt-link v-if="variant" :to="`/artist/${track.artist.id}`" class='artist-track__title--artist'>{{ track.artist.name }}</nuxt-link>
      <span v-else-if="track.explicit_lyrics" class='artist-track__title--is-explicit'>E</span>
    </p>

    <p v-if="!isMobile" class='artist-track__listen' :hidden="variant">{{ listenRandom }}</p>

    <div v-if="!isMobile" class='artist-track__duration'>
      <h-icon  class='artist-track__duration--icons' :icon="AddCircleIcon" size="22px" />
      <p  class='artist-track__duration__duration-track'>{{ duration }}</p>
      <h-icon class='artist-track__duration--icons' :icon="MoreHorizontalIcon" size="20px" />
    </div>
  </div>
</template>

<script setup lang='ts'>
import { AddCircleIcon, MoreHorizontalIcon, PauseFreeIcons, PlayIcon } from '@hugeicons/core-free-icons';
import { useDevice } from '~/composables/device/useDevice';
import { playerStore } from '~/store/playerStore';

const props = defineProps({
  track: { type: Object, required: true },
  index: { type: Number, default: null },
  showCover: { type: Boolean, defautl: false },
  variant: { type: Boolean, defautl: false }
})

const { isMobile } = useDevice()

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

const { byPreview, isCurrentTrackPlaying, byTrackId } = playerStore()

const isPlayingThisTrack = computed(() => isCurrentTrackPlaying(undefined, props.track.preview))

function togglePlay() {
  byTrackId(props.track.id)
}
</script>

<style lang='scss' scoped>
.artist-track {
  position: relative;
  display: flex;
  align-items: center;
  gap: 16px;
  height: 53px;
  color: $light-text-primary;
  padding: 7px 15px;
  border-radius: 5px;
  transition: 0.3s;
  cursor: pointer;
  &.isMobile {
    gap: 5px;
    padding: 7px 0;
  }
  &__index-icon {
    position: relative;
    width: 15px;
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
    
    &--icon {
      position: absolute;
      top: 13px;
      left: 26px;
      opacity: 0;
    }
  }

  &__title {
    display: flex;
    flex-direction: column;
    font-weight: 600;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    color: #fff;
    width: 100%;
    &__main {
      &.--mobile-play{
        color: green
      }
    }
    &--artist {
      color: #ccc;
      font-size: 12px;
      font-weight: 300;
      width: fit-content;
      text-decoration: underline transparent;
      &:hover{
        text-decoration: underline;
      }
    }
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
      &__album-cover {
        filter: brightness(0.4);
        &--icon {
          opacity: 1;
        }
      }
      &__index-icon {
        &--icon {
          opacity: 1;
        }

        &--index {
          opacity: 0;
        }
      }
      &__title--artist {
        color: #fff;
      }
      &__duration--icons {
        opacity: 1;
      }
    }
  }
}
</style>