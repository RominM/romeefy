<template>
  <nuxt-link :to="`${sourceRedirect}/${coverCard.id}`" class='cover-card'>
    <div class='cover-card__img-wrapper'>
      <img class='cover-card__img-wrapper__img' :src="coverCard.coverMedium" :alt="coverCard.alt">
      <div v-if="trackId" class="cover-card__img-wrapper--show-play" @click.prevent.stop="playTrack()">
        <h-icon :icon="PlayCircleIcon" size="40px"/>
      </div>
    </div>
    <p class='cover-card__describe'>{{ coverCard.describe }}</p>
  </nuxt-link>
</template>

<script setup lang='ts'>
import { PlayCircleIcon } from '@hugeicons/core-free-icons';
import type { PropType } from 'vue';
import { EGlobalEvent } from '~/types/enum/global/globalEvent';

const props = defineProps({
  coverCard: { type: Object as PropType<TCoverCard>, required: true},
  sourceRedirect: { type: String, require: true },
  trackId: { type: String, default: '5' }
})

function playTrack() {
  console.log(props.trackId);
  
  useGlobalEvents().emitEvent(EGlobalEvent.TOGGLE_TRACK, props.trackId)
}
</script>

<style lang='scss' scoped>
  .cover-card {
    display: block;
    padding: 10px;
    width: 190px;
    border-radius: 7px;
    transition: 0.3s;
    &__img-wrapper {
      position: relative;
      overflow: hidden;
      &__img {
        object-fit: cover;
        width: 100%;
        aspect-ratio: 1;
        border-radius: 7px;
      }
      &--show-play {
        position: absolute;
        right: 15px;
        bottom: -15px;
        background-color: $primary;
        opacity: 0;
        border-radius: 50%;
        transition: 0.3s;
      }
    }
    &__describe {
      color: $light-background;
    }

    &:hover {
      background-color: $dark-text-primary;
    }
    &:hover .cover-card__img-wrapper--show-play {
      bottom: 15px;
      opacity: 1;
    }
  }
</style>