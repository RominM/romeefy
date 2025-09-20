<template>
  <!-- <div class='artist-content custom-scrollbar' @scroll="handleScroll"> -->
    <scroll-container class='artist-content'  @target="handleScroll">

      <artist-header :artist="artist" />
      <artist-main :artist="artist" :color-secondary="colorSecondary"  />
    </scroll-container>
  <!-- </div> -->
</template>

<script setup lang='ts'>
const emit = defineEmits(['scroll'])
defineProps({
  artist: { type: Object, required: true },
  colorSecondary: { type: String, required: true}
})

function handleScroll(target: HTMLElement) {
  // const target = event.target as HTMLElement

  emit('scroll', target.scrollTop)
}
</script>

<style lang='scss' scoped>
.artist-content {
  position: relative;
  height: 100%;
  margin-top: 40px;
}
</style>