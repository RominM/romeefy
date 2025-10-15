<template>
  <div class="display-search-results">
    <tags-list />
    <div class="display-search-results__top-result">
      <best-result v-if="mostFamousArtist" :best-result="mostFamousArtist"/>
      <best-tracks v-if="trackList" :track-list="trackList"/>
    </div>
    <section-cards
      v-if="trackList" 
      title-section="Morceaux du moment" 
      source-redirect="chart"
      :cover-card-list="trackList" 
     />
  </div>
</template>

<script setup lang="ts">
import { useMapper } from '~/composables/mappers/useMapper'

const props = defineProps({
  results: { type:  Object, default: () => {} }
})

const mostFamousArtist = computed<TBestResult | undefined>(() => {
  const artists = props.results.artists as IArtist[] | undefined
  if (!artists || !artists.length) return

  const bestArtist = artists.reduce((max, current) => {
    return current.nb_fan > max.nb_fan ? current : max
  })

  return useMapper().bestResult.fromArtist(bestArtist)
})

const trackList = computed(() => {
  const tracks = props.results.tracks as ITrack[] | undefined
  if (!tracks || !tracks.length) return
  return tracks
})
</script>

<style scoped lang="scss">
.display-search-results {
  &__top-result {
    display: flex;
    gap: 20px;
  }
}
</style>