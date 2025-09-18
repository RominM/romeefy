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

      <section-cards 
        v-if="chartList" 
        title-section="Classement recommandés" 
        source-redirect="chart"
        :cover-card-list="chartList" 
      />
    </div>
  <error-content v-else class='home-content--error' @retry="getAllChart"/>
  </div>
</template>

<script setup lang='ts'>
import { useAPI } from '~/composables/api/useApi'
import { formatChart } from '~/constant/chart'
import type { IPexelsPhoto } from '~/types/interfaces/pexels'

const chartList = ref<TCoverCard[] | null>(null)
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

  loading.value = true
  const pexelsRes = await useAPI().pexels.search("music", 5)
  loading.value = false

  const pexelsPhotos = pexelsRes.photos

  console.log('tracks ', allChart.value.podcasts.data);
  artistsList.value = mappingChatArtist(allChart.value.artists.data)
  chartList.value = mappingChartGlobal(allChart.value, pexelsPhotos)
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
      describe: 'coucou'
    }  
  })
}

function mappingChartGlobal(
  chartData: Record<string, any>,
  pexelsPhotos: IPexelsPhoto[],
): TCoverCard[] {
  return Object.entries(chartData).map(([id, value], index) => {
    const meta = formatChart[id as ChartId]
    return {
      id,
      coverMedium: pexelsPhotos[index]?.src.medium ?? meta.img,
      alt: meta.alt ?? id,
      describe: meta.describe ?? ''
    } satisfies TCoverCard
  })
}

function mappingChatTracks(tracks: ITracks[]): TCoverCard[]  {
  return tracks.map((track: ITracks) => {
    return {
      id: track.id,
      coverMedium: track.album.cover_medium,
      alt: track.title,
      describe: 'coucou'
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
  display: flex;
  flex-direction: column;
  gap: 30px;
  height: 100%;
  width: 100%;
  &--loader,
  &--error {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
}
</style>