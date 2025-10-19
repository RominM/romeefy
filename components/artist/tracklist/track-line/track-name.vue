<template>
  <div class="track-name">
    <span class="track-name__name"> {{ name }}</span>
    <nuxt-link v-if="variant" :to="`/artist/${artistId}`" class='track-name--artist'>{{ artistName }}</nuxt-link>
    <span v-else-if="isExplicit" class='track-name--is-explicit'>E</span>
  </div>
</template>

<script setup lang="ts">
defineProps({
  artistId: { type: Number, required: true },
  name: { type: String, required: true},
  artistName: { type: String, required: true },
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
  }
    &__main {
      &.--mobile-play{
        color: green
      }
    }
    &--artist {
      color: #ccc;
      font-size: 12px;
      font-weight: 600;
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
</style>