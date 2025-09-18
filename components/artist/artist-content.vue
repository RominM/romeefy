<template>
  <loader v-if="loading" />
  <div v-else-if="artist" class='artist-content'>
    <banner :banner="artist.picture_xl || `url(${artist.picture_xl})`"/>
    <div 
      class='artist-content__banner' 
      :style="{ backgroundImage: artist?.picture_xl ? `url(${artist.picture_xl})` : '' }">
    </div>
    <div class='artist-content__banner__artist-name'>
      <p>Artiste vérifié</p>
      <h1 class='artist-content__banner__artist-name__name'>{{ artist?.name }}</h1>
      <p class='artist-content__banner__artist-name__nmb'>{{ artist?.nb_fan }} auditeurs mensuels</p>
    </div>
    <!-- <pre style="color: antiquewhite;">{{ artist }}</pre> -->
  </div>
  <error-content v-else />
</template>

<script setup lang='ts'>
import { useAPI } from '~/composables/api/useApi'

const props = defineProps({
  artistId: { type: Number, required: true }
})

const loading = ref<boolean>(true)
const artist = ref<IArtist>()

onMounted(async () => {
  getArtist()
})

async function getArtist() {
  loading.value = true
  artist.value = await useAPI().artist.getById(props.artistId)
  loading.value = true
}
</script>

<style lang='scss' scoped>
.artist-content {
  position: relative;
  &__banner {
    width: 100%;
    height: 40vh;
    z-index: 999;
    background-position: center;
    background-size: cover;
    background-repeat: no-repeat;
    &__artist-name {
      position: absolute;
      bottom: 0;
      display: flex;
      flex-direction: column;
      gap: 12px;
      color: $light-background;
      padding: 20px;
      &__name {
        font-size: 75px;
        font-weight: 800;
        line-height: 75px;
      }
      &__nmb {

      }
    }
  }
}
</style>