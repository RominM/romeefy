<template>
  <div class="section-genre">
    <loader v-if="loading" style="margin: auto;"/>
    <section-cards v-else :title-section="title" :cover-card-list="genres" :source-redirect="`/genre`"/>
  </div>
</template>

<script setup lang="ts">
import { useAPI } from '~/composables/api/useApi'
import { useMapper } from '~/composables/mappers/useMapper'

const props = defineProps({
  genreIds: { type: Array as PropType<number[]>, required: true },
  title: { type: String, default: "" },
})

const genres = ref<TCoverCard[]>([])
const loading = ref<boolean>(false)

onMounted(() => {
  if (!props.genreIds.length) return

  loadGenres()
})

async function loadGenres() {
  const results: TCoverCard[] = []

  for (const id of props.genreIds) {
    const genreCard = await getGenre(id)
    if (genreCard) results.push(genreCard)
  }

  genres.value = results
}

async function getGenre(genreId: number) {
  loading.value = true
  const { data, error } = await useAPI().genre.getById(genreId)
  loading.value = false

  if(!data || error) return

  return useMapper().coverCard.fromGenre(data)
}
</script>

<style scoped lang="scss">
.section-genre {
  
}
</style>