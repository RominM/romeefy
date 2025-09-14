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

onMounted(() => {
  getGlobalChart()
})

async function getGlobalChart() {
  loading.value = true
  const allChart = await useAPI().chart.getGlobal()
  loading.value = false

  if(!allChart || !allChart.artists) return

  artistsList.value = mappingChatArtist(allChart.artists.data)
  console.log(artistsList.value);
  
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
</script>

<style lang='scss' scoped>
  .home-content{}
</style>