<template>
  <section class="album-display">
    <header-album v-if="showHeader" :lite-album="liteAlbum" :nmb-track="trackLength"/>
    <div class="sticky" >
      <span>#</span>
      <span class="sticky--title">Titre</span>
      <span class="sticky--playing">Lecture</span>
      <span>Durée</span>
    </div>
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
.album-display {
  padding-top: 50px;
  .sticky {
    position: sticky;
    top: 0;
    display: flex;
    justify-content: space-between;
    color: $border;
    border-bottom: solid 1px #a2a2a274;
    z-index: 9999;
    padding: 0 40px 5px 40px;
    background-color: $dark-surface;
    &--title {
      width: 100%;
      margin-left: 20px;
    }
    &--playing {
      width: 42%;
    }
  }
}
</style>