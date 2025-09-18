<template>
  <div class='banner' :style="{ transform: `scale(${scale})`, backgroundImage: `url(${banner})` }">
    <div class='banner__overlay' :style="{ backgroundColor: color }"></div>
  </div>
</template>

<script setup lang='ts'>
defineProps({
  banner: { type: String, required: true },
  color: { type: String, required: true },
  scale: { type: Number, required: true }
})
</script>

<style scoped lang='scss'>
.banner {
  position: absolute;
  top: 0;
  width: 100%;
  height: 45vh;
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
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
