<template>
  <main-wrapper class='artist-page'>
    <artist :artist-id="artistId"/>
  </main-wrapper>
</template>

<script setup lang='ts'>
const route = useRoute()
const artistId = Number(route.params.id) 
</script>

<style lang='scss' scoped>
</style>