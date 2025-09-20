<template>
  <scroll-container class='artist-content' @target="emit('scroll', $event.scrollTop)">
    <artist-header :artist="artist" />
    <artist-main :artist="artist" :color-secondary="colorSecondary"  />
  </scroll-container>
</template>

<script setup lang='ts'>
const emit = defineEmits(['scroll'])

defineProps({
  artist: { type: Object, required: true },
  colorSecondary: { type: String, required: true}
})

</script>

<style lang='scss' scoped>
.artist-content {
  height: 100%;
}
</style>