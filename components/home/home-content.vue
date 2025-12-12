<template>
  <div class="home-content">
    <filter-home-top v-if="isMobile" class="home-content__filters" @update:selected="filterList"/>
    <loader v-if="loading" class='home-content--loader' />
    <div v-else-if="allChart" class='home-content--all-chart'>
      <section-small-cards v-if="isMobile && artistsList" :cards-list="artistsList" />
      <section-cards
        v-if="trackList" 
        title-section="Morceaux du moment" 
        source-redirect="album"
        :cover-card-list="trackList" 
        circular
      />

      <!-- <section-cards 
        v-if="artistsList" 
        title-section="Artistes recomandés pour vous" 
        source-redirect="artist"
        :cover-card-list="artistsList" 
      /> -->

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
import { useDevice } from '~/composables/device/useDevice'
import { useMapper } from '~/composables/mappers/useMapper'

const { isMobile } = useDevice()

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

  artistsList.value = useMapper().coverCard.fromArtist(allChart.value.artists.data)
  playlistList.value = useMapper().coverCard.fromPlaylist(allChart.value.playlists.data)
  trackList.value = useMapper().coverCard.fromTracks(allChart.value.tracks.data)
  podcastList.value = useMapper().coverCard.fromPodcast(allChart.value.podcasts.data)
}

function filterList(key: string) {
  console.log('this feature must be created', key);
}
</script>

<style lang='scss' scoped>
.home-content {
  position: relative;
  height: 100%;
  width: 100%;
  padding: 20px 0 20px 20px;
  &__filters {
    position: fixed;
    top: 0;
    z-index: 9;
    width: calc(100vw - 20px);
  }
  &--all-chart {
    margin-top: 50px;
    display: flex;
    flex-direction: column;
    gap: 20px;
  }
  &--loader,
  &--error {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
}

@media screen and (max-width: 740px) {
  .home-content {
    margin-bottom: 520px;
    &--all-chart {
      margin-top: 30px;
    }
  }
}
</style>