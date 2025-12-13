<template>
  <div class="current-track-overlay" :style="{ background: `linear-gradient(to bottom, ${mainColor}, #000)` }" >
      <pre>{{ currentTrack }}</pre>
  </div>
</template>

<script setup lang="ts">
defineProps({
  mainColor: { type: String, defautl: "#000" },
  currentTrack: {type: Object}
})
</script>

<style scoped lang="scss">

.current-track-overlay {
  border: solid #fff;
}
</style>