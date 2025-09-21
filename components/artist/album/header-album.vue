<template>
  <div class="header-album">
    <img class="header-album__cover" :src="liteAlbum.cover" alt="">
    <div class="header-album__artist">
      <h2 class="header-album__artist__name">{{ liteAlbum.title }}</h2>
      <div class="header-album__artist__describe">
        <span>{{ liteAlbum.type[0].toUpperCase() + liteAlbum.type.slice(1) }}</span>
        &bull;
        <span>{{ useDate().getYearFromStr(liteAlbum.release_date) }}</span>
        &bull;
        <span>{{ nmbTrack }} titres</span>
      </div>
      <div>coucou</div>
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
    border-radius: 8px;
  }
  &__artist {
    color: #ccc;
    font-size: 14px;
    &__name {
      color: #fff;
      font-size: 32px;
    }
  }
}
</style>