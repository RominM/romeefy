<template>
  <div class="album-cover">
    <img class='album-cover__cover' :src="album.cover_big" alt="">
    <div class="album-cover__content">
      <p class="album-cover__content__type" style="text-transform: capitalize;">{{ album.record_type }}</p>
      <h1>{{ album.title }}</h1>
      <div style="display: flex; align-items: center; gap: 5px; color: grey;">
        <img :src="album.artist.picture_small" alt="" style="width: 25px; border-radius: 50%;">
        <h2 style="font-size: 12px; font-weight: 400;">{{ album.artist.name }}</h2>
        <p style="font-size: 12px; font-weight: 400;">{{ album.tracks.data.length }} titres, {{useFormatTime(album.duration, true)}}</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { PropType } from 'vue';
import { useFormatTime } from '~/composables/formats/useFormatTime';

defineProps({
  album: { type: Object as PropType<IAlbum>, required: true}
})
</script>

<style scoped lang="scss">
.album-cover {
  position: relative;
  display: flex;
  align-items: flex-end;
  gap: 20px;
  padding: 20px;
  // z-index: 99;
  &__cover {
    width: 250px;
    height: 250px;
  }
  &__content {
    color: #fff;
    height: fit-content;
  }
}
</style>