<template>
  <div class="top-track-artist">
    <img class="artist-sheet__top-album" :src="topTrack[0].album.cover_medium" alt="">
  </div>
</template>

<script setup lang="ts">
defineProps({
  cover: { type: String, default: '' },
  titleTrack: { type: String, default: '' },
  artistName: { type: String, required: true },
})
</script>

<style scoped lang="scss">
.top-track-artist {
  
}
</style>