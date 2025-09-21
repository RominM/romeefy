<template>
  <div class="header-album">
    <img class="header-album__cover" :src="liteAlbum.cover" alt="">
    <div class="header-album__artist">
      <div class="header-album__artist__details">
        <h2 class="header-album__artist__details__name">{{ liteAlbum.title }}</h2>
        <div class="header-album__artist__details__describe">
      </div>
        <span>{{ liteAlbum.type[0].toUpperCase() + liteAlbum.type.slice(1) }}</span>
        &bull;
        <span>{{ useDate().getYearFromStr(liteAlbum.release_date) }}</span>
        &bull;
        <span>{{ nmbTrack }} titres</span>
      </div>
      <album-player />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useDate } from '~/composables/formats/useDate';

defineProps({ 
  liteAlbum: { type: Object, required: true },
  nmbTrack: { type: Number, default: 0 }
})
</script>

<style scoped lang="scss">
.header-album {
  display: flex;
  gap: 20px;
  padding-left: 50px;
  &__cover {
    width: 140px;
    height: 140px;
    border-radius: 8px;
    object-fit: cover;
  }
  &__artist {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    color: #ccc;
    &__details {
      font-size: 14px;
      &__name {
        color: #fff;
        font-size: 32px;
      }
    }
  }
}
</style>