<template>
  <div class="display-search-results">
    <tags-list />
    <div class="display-search-results__top-result">
      <best-result
        v-if="mostFamousArtist" 
        class="display-search-results__top-result__first" 
        :best-result="mostFamousArtist"
        @selected-result="setMappingResult"
      />
      <section-track
        v-if="trackListTitle"
        class="display-search-results__top-result__second"  
        title="Titres" 
        variant 
        :track-list="trackListTitle" 
        @selected-result="setMappingResult"
      />
    </div>

    <cards-list-loader v-if="isLoading" :length="10"/>
    <section-cards
      v-if="famoustrackList.length" 
      source-redirect="/playlist"
      :title-section="`Avec ${mostFamousArtist?.name}`" 
      :cover-card-list="famoustrackList"
      @selected-result="setMappingResult" 
     />

    <section-cards
      v-if="artistsList.length" 
      title-section="Artistes" 
      source-redirect="/artist"
      :cover-card-list="artistsList"
      circular
      @selected-result="setMappingResult"
    />

    <section-cards
      v-if="albumsList.length" 
      title-section="Albums" 
      source-redirect="/album"
      :cover-card-list="albumsList"
      @selected-result="setMappingResult"
    />

    <section-cards
      v-if="playlistList.length" 
      title-section="Playlists" 
      source-redirect="/playlist"
      :cover-card-list="playlistList"
      @selected-result="setMappingResult"
    />
  </div>
</template>

<script setup lang="ts">
import { useAPI } from '~/composables/api/useApi'
import { useMapper } from '~/composables/mappers/useMapper'
import { ELocalStorageKey } from '~/types/enum/global/localStorageKeys'

const props = defineProps({
  results: { type:  Object, default: () => {} }
})

const famoustrackList = ref<TCoverCard[]>([])
const isLoading = ref<boolean>(false)

const mostFamousArtist = computed<TBestResult | undefined>(() => {
  const artists = props.results.artists as IArtist[] | undefined
  if (!artists || !artists.length) return

  const bestArtist = artists.reduce((max, current) => {
    return current.nb_fan > max.nb_fan ? current : max
  })

  return useMapper().bestResult.fromArtist(bestArtist)
})

const trackListTitle = computed(() => {
  const tracks = props.results.tracks as ITrack[] | undefined
  if (!tracks || !tracks.length) return
  return tracks
})

const artistsList = computed(() => {
  return useMapper().coverCard.fromArtist(props.results.artists)
})

const playlistList = computed(() => {
  return useMapper().coverCard.fromPlaylist(props.results.playlists)
})

const albumsList = computed(() => {
  return useMapper().coverCard.fromAlbum(props.results.albums)
})

onMounted(() => {
  getPlaylistWhithFamous()
})

async function getPlaylistWhithFamous() {
  if (!mostFamousArtist.value) return

  isLoading.value = true
  const { data, error } = await useAPI().playlist.getByArtistId(mostFamousArtist.value.id)
  isLoading.value = false

  if (!data || error) return

  famoustrackList.value = useMapper().coverCard.fromPlaylist(data)
}

enum EDataType {
  ARTIST = 'artist',
  ALBUM = 'album',
  TRACK = 'track',
  PLAYLIST = 'playlist'
}

function setMappingResult(result: IArtist | IAlbum | ITrack | IPlaylist, type: EDataType) {
  console.log({result, type});
  
  const mappedSearchResult: TSearchItem | null = null
  // TODO: set mapped data result to TSearchItem by switch case

  if(!mappedSearchResult) return
  setSelectedResultToLocalStorage(mappedSearchResult)
}

function setSelectedResultToLocalStorage(selectedResult: TSearchItem) {
  console.log({selectedResult});
  
  useLocalStorage().set(ELocalStorageKey.SEARCH_RESULT, selectedResult)
}
</script>

<style scoped lang="scss">
.display-search-results {
  padding: 20px;
  &__top-result {
    display: flex;
    gap: 20px;
    width: 100%;
    &__first {
      flex: 4;
    }
    &__second {
      flex: 6;
      gap: 5px;
      &:deep(.track-list) {
        gap: 0;
      }
    }
  }
}
</style>