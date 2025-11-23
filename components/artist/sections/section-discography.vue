<template>
  <div class="section-discography">
    <loader v-if="loading" style="margin: auto;"/>
    <section-cards v-else title-section="Discographie" :cover-card-list="discography" :source-redirect="`/artist/${artistId}/discography`" redirect-card="/album" :flex="!isDesktop ? true : false"/>
  </div>
</template>

<script setup lang="ts">
import { useAPI } from '~/composables/api/useApi'
import { useDevice } from '~/composables/device/useDevice'
import { useDate } from '~/composables/formats/useDate'

const emit = defineEmits(['genre-id'])
const props = defineProps({
  artistId: { type: Number, required: true }
})

const { isDesktop } = useDevice()
const discography = ref<TCoverCard[]>([])
const loading = ref<boolean>(false)

onMounted(() => {
  getDiscography()
})

async function getDiscography() {
  loading.value = true
  const { data, error } = await useAPI().artist.getAlbums(props.artistId)
  loading.value = false

  if(!data || error) return

  discography.value = mappingChatAlbums(data)
  const genreIds = Array.from(new Set(data.map((album: IAlbum) => album.genre_id).filter(Boolean)))
  console.log(data);
  
  emit('genre-id', genreIds)
}

function mappingChatAlbums(albums: IAlbum[]): TCoverCard[] {  
  return albums.map((album: IAlbum) => {
    return {   
      id: album.id,
      title: album.title,
      describe: `${album.record_type[0].toUpperCase() + album.record_type.slice(1)} • ${useDate().getYearFromStr(album.release_date)}`,
      coverMedium: album.cover_medium,
      alt: `album ${album.title}`,
    }
  })
}
</script>

<style scoped lang="scss">
.section-discography {
  width: 100%;
}
</style>