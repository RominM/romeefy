<template>
  <main-wrapper class='artist-page'>
    <artist-content :artist-id="artistId"/>
  </main-wrapper>
</template>

<script setup lang='ts'>
const route = useRoute()
const artistId = Number(route.params.id) 
console.log({artistId});

</script>

<style lang='scss' scoped>
    .artist-page{}
</style>