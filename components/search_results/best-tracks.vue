<template>
  <div class="best-tracks">
    <h2>Titres</h2>
    <tracks-list v-if="trackList" :track-list="trackList"/>
  </div>
</template>

<script setup lang="ts">
defineProps({
  trackList: { type: Object, required: true }
})
</script>

<style scoped lang="scss">
.best-tracks {
  
}
</style>