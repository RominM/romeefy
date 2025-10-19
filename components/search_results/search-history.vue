<template>
    <ul class="search-history">
      <li
        v-for="(item, index) in formatedResult"
        :key="index"
        @delete="deleteItemHistoy(item)"
      >
        <search-result-item :item="item" />
      </li>
    </ul>
    <button-cta v-if="_searchStore.history.length" label="Effacer les dernières recherches" @click="clearHistory" />
</template>

<script setup lang="ts">
import { useMapper } from '~/composables/mappers/useMapper';
import { useSearchStore } from '~/store/searchStore';

const _searchStore = useSearchStore()

const formatedResult = computed(() => {
  const results = _searchStore.searchResults
  if (!results) return []

  _searchStore.setActive(false)
  
  const mapper = useMapper().searchItem
  const artists = results.artists?.length ? mapper.fromArtists(results.artists as IArtist[]) : []
  const tracks = results.tracks?.length ? mapper.fromTracks(results.tracks as ITrack[]) : []

  return [...artists, ...tracks]
})


function clearHistory() {
  _searchStore.history = []
}

function deleteItemHistoy(item: TSearchItem) {
  console.log({item});
}

watch(
  () => _searchStore.searchResults,
  () => {
    console.log(_searchStore.searchResults);
    
  }
)
</script>

<style scoped lang="scss">
.search-history {
  height: 100dvh;
  overflow: auto;
}
</style>