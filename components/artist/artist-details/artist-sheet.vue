<template>
  <scroll-container class="artist-sheet">
    <top-track-artist :cover="topTrack[0].album.cover_medium" :artist-name="artist.name" :title-track="topTrack[0].title"/>
    
  <!-- <pre>{{ artist }}</pre> -->
  <!-- <pre>{{ topTrack[0] }}</pre> -->
  </scroll-container>
</template>

<script setup lang="ts">
import { useAPI } from '~/composables/api/useApi'

const route = useRoute()
const artist = useArtist()

const topTrack = ref<ITrack>()
const loading = ref<boolean>(false)

onMounted(async () => {
  if (!artist.value) {
    getArtist()
  } else {
    getTopTracks(artist.value.id)
  }
})

async function getArtist() {
  loading.value = true  
  const { data, error } = await useAPI().artist.getById(Number(route.params.id))
  loading.value = false

  if(!data || error) return
  artist.value = data

  if(!artist.value) return
  getTopTracks(artist.value.id)
}

async function getTopTracks(artistId: number) {
  
  loading.value = true
  const { data, error } = await useAPI().artist.getTopTracks(artistId, { limit: 1, order: 'RATING_DESC' })
  loading.value = false
  
  if(!data || error) return

  topTrack.value = data
  // trackId.value = topTrack.value[0].id
}
</script>

<style scoped lang="scss">
.artist-sheet {
  padding: 0 20px;
  &__top-album {
    width: 100%;
    border-radius: 5px;
    aspect-ratio: 1;
  }
}
</style>