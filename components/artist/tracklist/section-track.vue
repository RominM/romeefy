<template>
  <div class='section-track'>
    <h3>{{ title }}</h3>
    <tracks-list :track-list="trackList" />
  </div>
</template>

<script setup lang='ts'>
defineProps({
  title: { type: String, default: ''},
  trackList: { type: Object, required: true }
})
</script>

<style lang='scss' scoped>
    .section-track{}
</style>