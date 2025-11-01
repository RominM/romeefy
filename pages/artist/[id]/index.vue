<template>
  <resize-wrapper>
    <template #center>
      <artist-page :artist-id="artistId" @artist-name="artistName = $event"/>
    </template>
  </resize-wrapper>
</template>

<script setup lang='ts'>
import { useRoute } from 'vue-router';

const route = useRoute()
const artistId = Number(route.params.id) 

const artistName = ref<string>('')

useHead({
  title: computed(() => artistName.value ? `Artist - ${artistName.value}` : 'Artist')
})
</script>

<style lang='scss' scoped>
</style>