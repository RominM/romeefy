<template>
  <div class="track-name">
    <span class="track-name__name"> {{ trackName }}</span>
    <div class="track-name__artists">
      <span v-if="isExplicit" class='track-name__artists--is-explicit'>E</span>
      <nuxt-link @click.stop class='track-name__artists__name' v-for="(artist, index) in artists" :key="index" :to="`/artist/${artist.id}`">{{ artist.name }}</nuxt-link>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { PropType } from 'vue';

defineProps({
  artists: { type: Array as PropType<IArtist[]>, required: true},
  trackName: { type: String, required: true},
  isExplicit: { type: Boolean, default: false },
  variant: { type: Boolean, default: false },
})
</script>

<style scoped lang="scss">
.track-name {
  display: flex;
  flex-direction: column;
  font-weight: 600;
  width: 100%;
  overflow: hidden;
  &__name {
    font-weight: 500;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    color: #fff;
    cursor: default;
    user-select: none;
  }

  &__artists {
    display: flex;
    align-items: center;
    gap: 5px;
    &--is-explicit {
      width: fit-content;
      height: fit-content;
      padding: 4px;
      background-color: #fff;
      color: #000;
      border-radius: 3px;
      font-size: 10px;
      font-weight: 600;
      line-height: 5px;
      cursor: default;
      user-select: none;
    }
    &__name {
      font-size: 12px;
      font-weight: 300;
      color: #ccc;
      text-decoration: underline transparent;
      transition: 0.2s;
      &:hover{
        text-decoration: underline #ccc;
      }
    }
  }
}
</style>