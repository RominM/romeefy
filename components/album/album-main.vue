<template>
  <div class="album-main">
    <player-banner :color-secondary="colorSecondary" :track-id="album.tracks.data[0].id"/>
    <album-display :lite-album="album"/>
    <section-discography style="padding: 20px;" :artist-id="album.artist.id"/>
  </div>
</template>

<script setup lang="ts">
defineProps({
  album: { type: Object, required: true },
  colorSecondary: { type: String, required: true}
})
</script>

<style scoped lang="scss">
.album-main {
  position: relative;
  min-height: 550px;
  background-color: $dark-surface;
  z-index: 99;
}
</style>