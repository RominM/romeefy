<template>
  <scroll-container class='artist-content' @target="emits('scroll', $event.scrollTop)">
    <album-cover class='banner-album__cover' :album="album"  />
    <album-main :album="album" :color-secondary="colorSecondary"/>
  </scroll-container>
</template>

<script setup lang='ts'>
const emits = defineEmits(['scroll', 'track-id'])

defineProps({
  album: { type: Object, required: true },
  colorSecondary: { type: String, required: true}
})
</script>

<style lang='scss' scoped>
.artist-content {
  height: calc(100% - 75px);
  box-sizing: border-box;
}
</style>