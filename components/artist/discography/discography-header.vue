<template>
  <header class="discography-header">
    <player-top-fixed :name="artistName" color="#100f0f" :scroll-top="targetScroll" :track-id="trackId"/>
  </header>
</template>

<script setup lang="ts">
defineProps({
  artistName: { type: String, required: true },
  targetScroll: { type: Number, required: true },
  trackId: { type: Number, required: true },
})
</script>

<style scoped lang="scss">
.discography-header {
  
}
</style>