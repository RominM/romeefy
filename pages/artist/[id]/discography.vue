<template>
  <main-wrapper class='discography'>
    <discography-page :artist-id="artistId" />
  </main-wrapper>
</template>

<script setup lang='ts'>
const route = useRoute()
const artistId = Number(route.params.id) 
</script>

<style scoped lang="scss">
.discography{
  overflow: hidden;
}
</style>