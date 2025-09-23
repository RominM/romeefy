<template>
  <div class='banner-album' :style="{backgroundColor: color}" >
    <div class='banner__overlay' :style="{ backgroundColor: album.cover_xl ? color : '#000'  }"></div>
  </div>
</template>

<script setup lang='ts'>
defineProps({
  color: { type: String, required: true },
  album: { type: Object as PropType<IAlbum>, required: true}
})
</script>

<style scoped lang='scss'>
.banner-album {
  position: absolute;
  top: 0;
  width: 100%;
  height: 55vh;
  padding: 20px;
  filter: brightness(70%);
  overflow: hidden;
  z-index: 0;

}

.banner__overlay {
  position: absolute;
  inset: 0;
  z-index: 1;
  transition: background-color 0.2s;
}
</style>
