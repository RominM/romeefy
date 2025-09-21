<template>
  <div class="home-content">
    <loader v-if="loading" class='home-content--loader' />
    <div v-else-if="allChart" class='home-content--all-chart'>
      <section-cards 
        v-if="trackList" 
        title-section="Morceaux du moment" 
        source-redirect="chart"
        :cover-card-list="trackList" 
      />

      <section-cards 
        v-if="artistsList" 
        title-section="Artistes recomandés pour vous" 
        source-redirect="artist"
        :cover-card-list="artistsList" 
      />

      <section-cards 
      v-if="playlistList" 
      title-section="Playlist recommandés" 
      source-redirect="chart"
      :cover-card-list="playlistList" 
      />

      <section-cards 
        v-if="podcastList" 
        title-section="Podcast" 
        source-redirect="chart"
        :cover-card-list="podcastList" 
      />

    </div>
    <error-content v-else class='home-content--error' @retry="getAllChart"/>
  </div>
</template>

<script setup lang='ts'>
import { useAPI } from '~/composables/api/useApi'

const artistsList = ref<TCoverCard[] | null>(null)
const playlistList = ref<TCoverCard[] | null>(null)
const trackList = ref<TCoverCard[] | null>(null)
const podcastList = ref<TCoverCard[] | null>(null)

const loading = ref<boolean>(false)
const allChart = ref()

onMounted(async () => {
  await getAllChart()
  await setupSections()
})


async function getAllChart() {
  loading.value = true
  const { data, error } = await useAPI().chart.getGlobal()
  loading.value = false

  if(!data || error ) return 
  allChart.value = data
}

async function setupSections() {
  if(!allChart.value || !allChart.value.artists) return

  artistsList.value = mappingChatArtist(allChart.value.artists.data)
  playlistList.value = mappingChatArtist(allChart.value.playlists.data)
  trackList.value = mappingChatTracks(allChart.value.tracks.data)
  podcastList.value = mappingChatPodcats(allChart.value.podcasts.data)
}

function mappingChatArtist(artists: IArtist[]): TCoverCard[] {  
  return artists.map((artist: IArtist) => {
    return {   
      id: artist.id,
      coverMedium: artist.picture_medium,
      alt: artist.name,
      describe: 'test'
    }  
  })
}



function mappingChatTracks(tracks: ITracks[]): TCoverCard[]  {
  return tracks.map((track: ITracks) => {
    return {
      id: track.id,
      coverMedium: track.album.cover_medium,
      alt: track.title,
      describe: 'test'
    }
  })
}

function mappingChatPodcats(podcasts: IPodcast[]): TCoverCard[]  {
  return podcasts.map((podcast: IPodcast) => {
    return {
      id: podcast.id,
      coverMedium: podcast.picture_medium,
      alt: podcast.title,
      describe: podcast.description
    }
  })
}
</script>

<style lang='scss' scoped>
.home-content {
  position: relative;
  height: 100%;
  width: 100%;
  padding: 20px;
  &--all-chart {
    display: flex;
    flex-direction: column;
    gap: 45px;
  }
  &--loader,
  &--error {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
}
</style>