<template>
  <div class="small-devices-artist-main">
    <tab-menu :panels="panels">
      <template #panel-Musique>
        <div class="music-panel">
          <section-track :track-list="topTracks" title="Populaires" />
          <section-discography :artist-id="artist.id" @genre-id="genreIds = $event" />
          <section-realated :artist-id="artist.id" />
          <more-artist-info :name="artist.name" :picture="artist.picture_big" />
          <section-playlist :artist-id="artist.id" :title="`Avec ${artist.name}`" />
          <section-genre v-if="genreIds" :genre-ids="genreIds" title="Découvert sur" />
        </div>
      </template>

      <template #panel-Evenements>
        <event-artist :artist-name="artist.name" />
      </template>
    </tab-menu>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  artist: { type: Object, required: true },
  topTracks: { type: Array as PropType<ITrack[]>, required: true }
})

const genreIds = ref<number[]>()
const panels = ref(['Musique', 'Evenements'])
</script>

<style scoped lang="scss">
.small-devices-artist-main {
  width: 100%;
  .music-panel {
    display: flex;
    flex-direction: column;
    gap: 25px;
  }
}

@media screen and (max-width: 740px) {
  .music-panel {
    padding: 0 20px;
    background-color: $dark-surface;
  }
}
</style>
