<template>
  <div class="current-track-overlay" :style="{ background: `linear-gradient(to bottom, ${mainColor}, #000)` }" >
    <img :src="track.album.cover_big" alt="">
    <on-listen />
    <player reverse />
    <artist-details :artist="artist" />
      <pre>{{ artist }}</pre> 
  </div>
</template>

<script setup lang="ts">
defineProps({
  mainColor: { type: String, defautl: "#000" },
  track: {type: Object as PropType<ITrack>, required: true},
  artist: {type: Object as PropType<IArtist>, required: true},
})
</script>

<style scoped lang="scss">
.current-track-overlay {
  display: flex;
  flex-direction: column;
  gap: 35px;
  padding: 22px;
  &__img-artist {
    border-radius: 20px;
    overflow: hidden;
  }
}
</style>