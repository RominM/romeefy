<template>
  <div v-if="artist && album" class="artist-panel" @mouseenter="isHovered = true" @mouseleave="isHovered = false">
    <header-panel :title="artist.name" :hovered="isHovered" />
    <artist-sheet :artist="artist" :album="album"/>
  </div>
</template>

<script setup lang="ts">
import { playerStore } from '~/store/playerStore';

const _player = playerStore()
const artist = ref<ILiteArtist>()
const album = ref<ILiteAlbum>()

const isHovered = ref<boolean>(false)

watch(() => _player.currentArtist, (val) => {
  artist.value = val
})

watch(() => _player.currentAlbum, (val) => {
  album.value = val
})

</script>

<style scoped lang="scss">
.artist-panel {
  position: relative;
  overflow: hidden;
  padding: 14px;
}
</style>