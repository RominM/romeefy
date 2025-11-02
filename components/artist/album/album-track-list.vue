<template>
  <div v-if="album" class="album-track-list">
    <header-album-track-list />
    <tracks-list v-if="trackList" :track-list="trackList" view-all @set-artist="setStoredAlbum" />
  </div>
</template>

<script setup lang="ts">
import { useAPI } from '~/composables/api/useApi'
import { playerStore } from '~/store/playerStore'

const emit = defineEmits(['tracks-length'])
const props = defineProps({
  albumId: { type: Number, required: true}
})

const album = ref<IAlbum | null>(null)
const trackList = ref<ITrack[]>([])
const loading = ref<boolean>(false)

onMounted(() => {
  getAlbum()
})

async function getAlbum() {
  loading.value = true
  const { data, error } = await useAPI().album.getById(props.albumId)
  loading.value = false

  if(!data || error) return

  album.value = data
  
  trackList.value = album.value?.tracks.data
  emit('tracks-length', trackList.value.length)
}

function setStoredAlbum() {
  if (!album.value) return
  
  console.log('hy hou', album.value);
  playerStore().setCurrentAlbum(album.value)
}
</script>

<style scoped lang="scss">
.album-track-list {
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 0 20px 20px;
}
</style>