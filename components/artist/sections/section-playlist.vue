<template>
  <div class="section-playlist">
    <loader v-if="loading" style="margin: auto;"/>
    <section-cards v-else :title-section="title" :cover-card-list="playlistCards" :source-redirect="`/playlist`"/>
  </div>
</template>

<script setup lang="ts">

import { useAPI } from '~/composables/api/useApi'

const props = defineProps({
  artistId: { type: Number, required: true },
  title: { type: String, default: "" }
})

const playlistCards = ref<TCoverCard[]>([])
const loading = ref<boolean>(false)

onMounted(() => {
  getPlaylistAppearsIn()
})

async function getPlaylistAppearsIn() {
  loading.value = true
  const res = await useAPI().playlist.getByArtistId(props.artistId)
  loading.value = false
  console.log({res});
  
  playlistCards.value = mappingChatAlbums(res.data)
}

function mappingChatAlbums(playlists: IPlaylist[]): TCoverCard[] {  
  return playlists.map((playlist: IPlaylist) => {
    return {   
      id: playlist.id,
      title: playlist.title,
      coverMedium: playlist.picture_medium,
      describe: `${playlist.nb_tracks} titres •  Par ${playlist.user.name}`,
      alt: `playlist ${playlist.title}`,
    }
  })
}
</script>

<style scoped lang="scss">
.section-playlist {
  width: 100%;
}
</style>