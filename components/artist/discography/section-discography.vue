<template>
  <div class="section-discography">
    
  </div>
</template>

<script setup lang="ts">
import { useAPI } from '~/composables/api/useApi'

const props = defineProps({
  artistId: { type: Number, required: true }
})

const discography = ref()
const loading = ref<boolean>(false)

onMounted(() => {
  getDiscography()
})

async function getDiscography() {
  loading.value = true
  const { data, error } = await useAPI().artist.getAlbums(props.artistId, { limit: 999 })
  loading.value = false

  if(!data || error) return

  discography.value = data
  console.log(discography.value);
}
</script>

<style scoped lang="scss">
.section-discography {
  
}
</style>