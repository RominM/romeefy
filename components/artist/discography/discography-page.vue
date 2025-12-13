<template>
  <div v-if="artist">
    <div v-if="isMobile" style="position: fixed; z-index: 9999; background-color: #232323;padding: 10px 20px;">
      <go-back/>
      <filter-tag class="home-content__filters" :tags="filterTags" @update:selected="filterList"/>
    </div>
    <discography-header v-if="currentAlbum && trackId" :artist-name="artist.name" :target-scroll="target" :track-id="trackId" :current-album="currentAlbum"/>

    <scroll-container @target="target = $event">
      <fetch-wrapper :fetch="(index, limit) => getDiscography(index, limit)" :page-size="25">
        <template #item="{ item }">
          <album-display :lite-album="item" show-header/>
        </template>
      </fetch-wrapper>
    </scroll-container>
  </div>
</template>

<script setup lang="ts">
import { useAPI } from '~/composables/api/useApi'
import { useDevice } from '~/composables/device/useDevice'

const props = defineProps({
  artistId: { type: Number, required: true }
})

const { isMobile } = useDevice()
const route = useRoute()
const artist = useArtist()

const currentAlbum = ref<IAlbum>()
const loading = ref<boolean>(false)
const target = ref<number>(0)
const trackId = ref<number>()

const filterTags = ref([
  { label: 'Album', active: true, key: 'ALL' },
  { label: 'Single et EP', active: false, key: 'MUSIC' },
  { label: 'Compilations', active: false, key: 'PODCAST' },
  { label: 'Collaborations', active: false, key: 'PLAYLIST' },
]);

onMounted(async () => {
  if (!artist.value) {
    getArtist()
  }
  getDiscography(1, 25)
})

async function getArtist() {
  loading.value = true  
  const { data, error } = await useAPI().artist.getById(Number(route.params.id))
  loading.value = false

  if(!data || error) return
  artist.value = data
}

async function getDiscography(index: number, limit: number) {
  loading.value = true
  const res= await useAPI().artist.getAlbums(props.artistId, { index, limit })
  loading.value = false

 if (!res || res.error || !Array.isArray(res.data)) {
    return { data: [], error: res?.error ?? null }
  }

  return {
    data: res.data,
    error: null
  }
}
</script>

<style scoped lang="scss">
.discography-page {}
</style>