<template>
  <div class="header-album" :class="!isDesktop ? '--small-device' : ''">
    <img class="header-album__cover" :src="liteAlbum.cover" alt="">
    <div class="header-album__artist">
      <div class="header-album__artist__details">
        <h2 class="header-album__artist__details__name">{{ liteAlbum.title }}</h2>
        <div class="header-album__artist__details__describe">
      </div>
        <span>{{ liteAlbum.record_type[0].toUpperCase() + liteAlbum.record_type.slice(1) }}</span>
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
import { useDevice } from '~/composables/device/useDevice';
import { useDate } from '~/composables/formats/useDate';

defineProps({ 
  liteAlbum: { type: Object, required: true },
  nmbTrack: { type: Number, default: 0 }
})

const { isDesktop } = useDevice()
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
    width: 100%;
    color: #ccc;
    &__details {
      font-size: 14px;
      &__name {
        color: #fff;
        font-size: 32px;
      }
    }
  }
  &.--small-device {
    flex-direction: column;
    align-items: center;
    width: 100%;
    padding: 15px;
  }
}
</style>