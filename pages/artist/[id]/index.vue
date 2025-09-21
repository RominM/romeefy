<template>
  <!-- <main-wrapper class='artist'> -->
    <artist-page :artist-id="artistId"/>
  <!-- </main-wrapper> -->
</template>

<script setup lang='ts'>
import { useRoute } from 'vue-router';

const route = useRoute()
const artistId = Number(route.params.id) 
</script>

<style lang='scss' scoped>
</style>