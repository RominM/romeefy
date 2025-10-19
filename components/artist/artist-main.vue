<template>
  <main class="artist-main">
    <player-banner v-if="trackId" :color-secondary="colorSecondary" :track-id="trackId"/>
    
    <div :class="['artist-main__content', { isMobile }]">
      
      <loader v-if="loading" style="margin: auto;"/>
      
      <div v-else>
        <desktop-artist-main v-if="isDesktop" :artist="artist" :top-tracks="topTracks" />
        <small-devices-artist-main v-else :artist="artist" :top-tracks="topTracks" />
      </div>

      <!-- 
      <section-track v-if="topTracks" :track-list="topTracks" title="Populaires" />
      <section-discography :artist-id="artist.id" @genre-id="genreIds = $event" />
      <section-realated :artist-id="artist.id" /> -->
      <!-- get live & event of this artist -->
       <!-- <event-artist :artist-name="artist.name" /> -->
      <!-- more info of this artist -->
      <!-- <more-artist-info :name="artist.name" :picture="artist.picture_big"/>
      <section-playlist :artist-id="artist.id" :title="`Avec ${artist.name}`" />
      <section-genre v-if="genreIds" :genre-ids="genreIds" title="Découvert sur" /> -->
    </div>
  </main>
</template>

<script setup lang='ts'>
import { useAPI } from '~/composables/api/useApi';
import { useDevice } from '~/composables/device/useDevice';

const emit = defineEmits(['track-id'])
const props = defineProps({
  artist: { type: Object, required: true },
  colorSecondary: { type: String, required: true}
})

const { isMobile, isDesktop } = useDevice()

const topTracks = ref<ITrack[]>([])
const genreIds = ref<number[]>()
const trackId = ref<number>()
const loading = ref<boolean>(false)

onMounted(() => {
  getTopTracks()
})

/* move this call in section tracks */
async function getTopTracks() {
  loading.value = true
  const { data, error } = await useAPI().artist.getTopTracks(props.artist.id, { limit: 10, order: 'RATING_DESC' })
  loading.value = false
  
  if(!data || error) return

  topTracks.value = data
  trackId.value = topTracks.value[0].id

  emit('track-id', trackId.value)
}
</script>

<style lang='scss' scoped>
.artist-main{
  // background: linear-gradient(307deg, rgba(20, 19, 19, 1) 64%, rgba(38, 38, 38, 1) 100%);
  background: $dark-background;
  &__content {
    position: relative;
    display: flex;
    flex-direction: column;
    gap: 30px;
    padding: 10px 20px;
    z-index: 10;
    &.isMobile{
      padding: 10px;
    }
    
  }
}
</style>