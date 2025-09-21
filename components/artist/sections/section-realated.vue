<template>
  <div class="section-realated">
    <loader v-if="loading" style="margin: auto;"/>
    <section-cards v-else title-section="Artistes recommandés" :cover-card-list="related" :source-redirect="`/artist`"/>
  </div>
</template>

<script setup lang="ts">
import { useAPI } from '~/composables/api/useApi'

const props = defineProps({
  artistId: { type: Number, required: true }
})

const related = ref<TCoverCard[]>([])
const loading = ref<boolean>(false)

onMounted(() => {
  getRealatedArtists()
})

async function getRealatedArtists() {
  loading.value = true
  const { data, error } = await useAPI().artist.getRelated(props.artistId)
  loading.value = false

  if(!data || error) return

  related.value = mappingChatArtist(data)
}

function mappingChatArtist(artists: IArtist[]): TCoverCard[] {  
  return artists.map((artist: IArtist) => {
    return {   
      id: artist.id,
      title: artist.name,
      coverMedium: artist.picture_medium,
      alt: `playlist ${artist.name}`,
    }
  })
}
</script>

<style scoped lang="scss">
.section-realated {
  width: 100%;
}
</style>