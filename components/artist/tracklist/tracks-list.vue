<template>
    <ul class='track-list'>
      <li v-for="(track, index) in trackList" :key="`track-${index}`" class='track-list__el'>
        <span>{{  index + 1 }}</span>
        <artist-track :track="track"/>
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
  gap: 20px;
  &__el {
    display: flex;
    align-items: center;
    gap: 16px;
  }
}
</style>