<template>
  <section class="album-display">
    <header-album :lite-album="liteAlbum" />
    <album-track-list :album-id="liteAlbum.id"/>
  </section>
</template>

<script setup lang="ts">
defineProps({
  liteAlbum: { type: Object, required: true }
})
</script>

<style scoped lang="scss">
.album-display {
  
}
</style>