<template>
  <nuxt-link :to="`${sourceRedirect}/${coverCard.id}`" class='cover-card'>
    <div class='cover-card__img-wrapper'>
      <img :class='["cover-card__img-wrapper__img", { circular }]' :src="coverCard.coverMedium" :alt="coverCard.alt">
      <div v-if="trackId" class="cover-card__img-wrapper--show-play" @click.prevent.stop="usePlay().byTrackId(trackId)">
        <h-icon :icon="PlayCircleIcon" size="40px"/>
      </div>
    </div>
    <p class='cover-card__title'>{{ coverCard.title }}</p>
    <p v-if="coverCard.describe" class='cover-card__describe'>{{ coverCard.describe }}</p>
  </nuxt-link>
</template>

<script setup lang='ts'>
import { PlayCircleIcon } from '@hugeicons/core-free-icons';
import type { PropType } from 'vue';

defineProps({
  coverCard: { type: Object as PropType<TCoverCard>, required: true},
  sourceRedirect: { type: String, require: true },
  trackId: { type: Number, default: 0 },
  circular: { type: Boolean, default: false }
})
</script>

<style lang='scss' scoped>
  .cover-card {
    display: flex;
    flex-direction: column;
    gap: 5px;
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
        &.circular{
          border-radius: 50%;
        }
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

    &__title,
    &__describe {
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 2;
      overflow: hidden;
      text-overflow: ellipsis;
      line-height: 1.4em;
      max-height: calc(1.4em * 3);
    }
    &__title {
      color: #fff;
      font-size: 14px;
      font-weight: 700;
    }
    &__describe {
      font-size: 12px;
      color: $light-text-secondary;
      font-weight: 500;

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