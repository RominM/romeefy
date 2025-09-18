<template>
  <div class='artist-track'>
    <img class='artist-track__album-cover' :src="track.album.cover_small" alt="">
      <p class='artist-track__title'>{{ track.title }}</p>

  </div>
</template>

<script setup lang='ts'>
defineProps({
  track: { type: Object, required: true}
})
</script>

<style lang='scss' scoped>
.artist-track {
  display: flex;
  align-items: center;
  gap: 10px;
  color: $light-text-primary;
  &__album-cover {
    width: 45px;
    height: 45px;
    border-radius: 5px;
  }
    &__title {
      font-weight: 700;
  }
}
</style>