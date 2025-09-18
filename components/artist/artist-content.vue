<template>
  <div class='artist-content' @scroll="handleScroll">
    <artist-header :artist="artist" />
    <artist-main :artist="artist" :color-secondary="colorSecondary"  />
  </div>
</template>

<script setup lang='ts'>
const emit = defineEmits(['scroll'])
defineProps({
  artist: { type: Object, required: true },
  colorSecondary: { type: String, required: true}
})

function handleScroll(event: Event) {
  const target = event.target as HTMLElement
  emit('scroll', target.scrollTop)  // on émet scrollTop vers le parent
}
</script>

<style lang='scss' scoped>
.artist-content {
  position: relative;
  height: 100%;
  overflow: auto;
}
</style>