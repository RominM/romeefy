<template>
  <div v-if="artist">
    <discography-header v-if="trackId" :artist-name="artist.name" :target-scroll="target" :track-id="trackId" :current-album="currentAlbum"/>

    <scroll-container @target="target = $event">
      <fetch-wrapper :fetch="(index, limit) => getDiscography(index, limit)" :page-size="25">
        <template #item="{ item }">
          <album-display :lite-album="item"/>
        </template>
      </fetch-wrapper>
    </scroll-container>
  </div>
</template>

<script setup lang="ts">
import { useAPI } from '~/composables/api/useApi'

const props = defineProps({
  artistId: { type: Number, required: true }
})

const route = useRoute()
const artist = useArtist()

const currentAlbum = ref<HTMLElement[]>([])
const loading = ref<boolean>(false)
const target = ref<number>(0)
const trackId = ref<number>()

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