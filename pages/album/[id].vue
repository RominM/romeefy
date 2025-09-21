<template>
  <resize-wrapper>
    <template #center>
      <album-page :album-id="albumId"/>
    </template>
  </resize-wrapper>
</template>

<script setup lang='ts'>
import { useRoute } from 'vue-router';

const route = useRoute()
const albumId = Number(route.params.id) 
</script>

<style lang='scss' scoped>
</style>