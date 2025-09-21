<template>
  <header class="discography-header">
    <pre>{{ currentAlbum }}</pre>
    <player-top-fixed :name="artistName" color="#100f0f" :scroll-top="targetScroll" :track-id="trackId"/>
  </header>
</template>

<script setup lang="ts">
import type { PropType } from 'vue';

defineProps({
  artistName: { type: String, required: true },
  targetScroll: { type: Number, required: true },
  trackId: { type: Number, required: true },
  currentAlbum: { type: Object as PropType<IAlbum>, required: true}
})
</script>

<style scoped lang="scss">
.discography-header {
  
}
</style>