<template>
  <album-cover v-if="_album" :album="_album" />
  <artist-sheet :artist="_artist" />
  <!-- <pre style="color: antiquewhite;">{{ _player }}</pre> -->
  <pre style="color: antiquewhite;">_artist : {{ _artist }}</pre>
  <pre style="color: antiquewhite;">_album : {{ _album }}</pre>
</template>

<script setup lang="ts">
import { playerStore } from '~/store/playerStore';

const _player = playerStore()
const _album = _player.getCurrentAlbum
const _artist = _player.getCurrentArtist
</script>

<style scoped lang="scss">
.artist-details {
  overflow: hidden;
  
}
</style>