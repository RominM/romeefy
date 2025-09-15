<template>
  <div class='home-content'>
    <section-cards 
      v-if="artistsList" 
      title-section="Artistes recomandés pour vous" 
      source-redirect="artist"
      :cover-card-list="artistsList" 
    />

    <section-cards 
      v-if="chartList" 
      title-section="Classement recommandés" 
      source-redirect="chart"
      :cover-card-list="chartList" 
    />
  </div>
</template>

<script setup lang='ts'>
import { useAPI } from '~/composables/api/useApi'

const artistsList = ref<TCoverCard[] | null>(null)
const chartList = ref<TCoverCard[] | null>(null)
const loading = ref<boolean>(false)

type ChartId = keyof typeof formatChart 
const formatChart = {
  tracks: {
    describe: 'blabla',
    img: 'http://myimg.fr',
    alt: 'alt example'
  },
  artists: {
    describe: 'blabla',
    img: 'http://myimg.fr',
    alt: 'alt example'
  },
    albums: {
    describe: 'blabla',
    img: 'http://myimg.fr',
    alt: 'alt example'
  },
    playlists: {
    describe: 'blabla',
    img: 'http://myimg.fr',
    alt: 'alt example'
  },  
  podcasts: {
    describe: 'blabla',
    img: 'http://myimg.fr',
    alt: 'alt example'
  }
}


onMounted(() => {
  getGlobalChart()
})

async function getGlobalChart() {
  loading.value = true
  const allChart = await useAPI().chart.getGlobal()
  loading.value = false

  if(!allChart || !allChart.artists) return
console.log(allChart);

chartList.value = Object.entries(allChart).map(([id, value]) => {
  const meta = formatChart[id as ChartId]
  

  return {
    id,
    coverMedium: meta.img,
    alt: meta.alt ?? id,
    describe: meta.describe ?? '',
  }
})

  console.log(chartList.value);
  artistsList.value = mappingChatArtist(allChart.artists.data)
  
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

function findImgToChartId(id: string) {
  return id
}
</script>

<style lang='scss' scoped>
  .home-content{}
</style>