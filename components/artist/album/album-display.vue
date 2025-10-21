<template>
  <section class="album-display">
    <header-album v-if="showHeader" :lite-album="liteAlbum" :nmb-track="trackLength"/>
    <album-track-list :album-id="liteAlbum.id" @tracks-length="trackLength = $event"/>
  </section>
</template>

<script setup lang="ts">
defineProps({
  liteAlbum: { type: Object, required: true },
  showHeader: { type: Boolean, default: false }
})

const trackLength = ref<number>(0)
</script>

<style scoped lang="scss">
</style>