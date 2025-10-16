<template>
  <div class="section-genre">
    <loader v-if="loading" style="margin: auto;"/>
    <section-cards v-else :title-section="title" :cover-card-list="genres" :source-redirect="`/genre`"/>
  </div>
</template>

<script setup lang="ts">
import type { PropType } from 'vue'
import { useAPI } from '~/composables/api/useApi'
import { useMapper } from '~/composables/mappers/useMapper'

const props = defineProps({
  genreIds: { type: Array as PropType<number[]>, required: true },
  title: { type: String, default: "" },
})

const genres = ref<TCoverCard[]>([])
const loading = ref<boolean>(false)

onMounted(async () => {
  if (!props.genreIds.length) return

 const genreCards = await Promise.all(
    props.genreIds.map((id) => getGenre(id))
  )

  genres.value = genreCards.filter(
    (g): g is TCoverCard => g !== null && g !== undefined
  )
})

async function getGenre(genreId: number) {
  loading.value = true
  const { data, error } = await useAPI().genre.getById(genreId)
  loading.value = false

  if(!data || error) return

  return useMapper().coverCard.fromArtist(data)
}
</script>

<style scoped lang="scss">
.section-genre {
  
}
</style>