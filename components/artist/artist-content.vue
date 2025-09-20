<template>
  <scroll-container class='artist-content' @target="emits('scroll', $event.scrollTop)">
    <artist-header :artist="artist" />
    <artist-main :artist="artist" :color-secondary="colorSecondary" @track-id="emits('track-id', $event)" />
  </scroll-container>
</template>

<script setup lang='ts'>
const emits = defineEmits(['scroll', 'track-id'])

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