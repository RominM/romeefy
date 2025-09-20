<template>
  <ul class='track-list'>
    <li v-for="(track, index) in trackList" :key="`track-${index}`" class='track-list__el' >
      <artist-track :track="track" :index="index + 1"/>
    </li>
  </ul>
</template>

<script setup lang='ts'>
defineProps({
  trackList: { type: Array, required: true }
})
</script>

<style lang='scss' scoped>
.track-list {
  display: flex;
  flex-direction: column;
  &__el {
    &__bullet {
      color: #fff;
    }
  }
}
</style>