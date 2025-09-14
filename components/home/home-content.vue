<template>
  <div class='home-content'>
    <section-cards 
      v-if="recommendationList" 
      title-section="Artistes recomandés pour vous" 
      source-redirect="artist"
      :cover-card-list="recommendationList" 
    />
  </div>
</template>

<script setup lang='ts'>
import { useAPI } from '~/composables/api/useApi'



const recommendationList = ref<TCoverCard[] | null>(null)
const loading = ref<boolean>(false)

onMounted(() => {
  getGlobalChart()
})

async function getGlobalChart() {
  loading.value = true
  const allChart = await useAPI().chart.getGlobal()
  loading.value = false

  if(!allChart || !allChart.artists) return

  recommendationList.value = allChart.artists.data.map((artist: IArtist) => {
    return {   
      id: artist.id,
      coverMedium: artist.picture_medium,
      alt: artist.name,
      describe: 'coucou'
    }  
  }
  )
  console.log(recommendationList.value);
  
}
</script>

<style lang='scss' scoped>
  .home-content{}
</style>