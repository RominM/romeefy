<template>
  <div class="current-track-overlay" :style="{ background: `linear-gradient(to bottom, ${mainColor}, #000)` }" >
    <img :src="track.album.cover_big" alt="">
    <!-- this component must be adapted to mobile -->
    <player-controller />
    <artist-details :artist="artist"/>
      <!-- <pre>{{ track }}</pre> -->
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
  padding: 22px;
  &__img-artist {
    border-radius: 20px;
    overflow: hidden;
  }
}
</style>