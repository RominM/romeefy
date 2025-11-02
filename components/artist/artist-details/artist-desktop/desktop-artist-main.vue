<template>
  <div class="desktop-artist-main">
    <section-track :track-list="topTracks" title="Populaires" @set-artist="setStoredArtist"/>
    <section-discography :artist-id="artist.id" @genre-id="genreIds = $event" />
    <section-realated :artist-id="artist.id" />
    <event-artist :artist-name="artist.name" />
    <more-artist-info :name="artist.name" :picture="artist.picture_big"/>
    <section-playlist :artist-id="artist.id" :title="`Avec ${artist.name}`" />
    <section-genre v-if="genreIds" :genre-ids="genreIds" title="Découvert sur" />
  </div>
</template>

<script setup lang="ts">
import { playerStore } from '~/store/playerStore';

const props = defineProps({
  artist: { type: Object as PropType<IArtist>, required: true },
  topTracks: { type: Array as PropType<ITrack[]>, required: true}
})

const genreIds = ref<number[]>()

// const showRightPanel = useState('showRightPanel', () => false)

function setStoredArtist() {
  
  playerStore().setCurrentArtist(props.artist)
  // showRightPanel.value = true
}
</script>

<style scoped lang="scss">
.desktop-artist-main {
  display: flex;
  flex-direction: column;
  gap: 20px;
}
</style>