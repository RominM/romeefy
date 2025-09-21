<template>
  <section class="album-display">
    <header-album :lite-album="liteAlbum" :nmb-track="trackLength"/>
    <album-track-list :album-id="liteAlbum.id" @tracks-length="trackLength = $event"/>
  </section>
</template>

<script setup lang="ts">
defineProps({
  liteAlbum: { type: Object, required: true }
})

const trackLength = ref<number>(0)
</script>

<style scoped lang="scss">
.album-display {
  padding: 20px;
}
</style>