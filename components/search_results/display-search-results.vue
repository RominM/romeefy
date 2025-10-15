<template>
  <div class="display-search-results">
    <tags-list />
    <best-result v-if="bestArtistResult" :best-result="bestArtistResult"/>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  results: { type:  Object, default: () => {} }
})

const bestArtistResult = computed<IArtist | undefined>(() => {
  const artists = props.results.artists as IArtist[] | undefined
  if (!artists || !artists.length) return

  const bestArtist = artists.reduce((max, current) => {
    return current.nb_fan > max.nb_fan ? current : max
  })

  return mappedArtistToBestResult(bestArtist)
})

type TBestResult = {
  id: number,
  name: string,
  type: string,
  picture: string,
  trackId: number
}

function mappedArtistToBestResult(artist: IArtist): TBestResult {
  return {
    id: artist.id,
    name: artist.name,
    type: artist.type,
    picture: artist.picture_medium,
    trackId: 1
  }
}

function getTrack() {

}
</script>

<style scoped lang="scss">
.display-search-results {
  
}
</style>