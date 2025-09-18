<template>
  <div class='artist'>
    <loader v-if="loading" class='artist--loader' />
    <div v-else-if="artist" class='artist--wrapper'>
      <banner :banner="artist.picture_xl" :color="currentColor" :scale="currentScale"/>
      <artist-content :artist="artist" :color-secondary="colorSecondary" @scroll="onScroll"/>
    </div>
    <error-content v-else class='artist--error' @retry="getArtist"/>
  </div>
</template>

<script setup lang='ts'>
import { useAPI } from '~/composables/api/useApi'
import { useColors } from '~/composables/colors/useColors'

const props = defineProps({
  artistId: { type: Number, required: true }
})

const loading = ref<boolean>(true)
const artist = ref<IArtist>()

const currentColor = ref<string>('transparent')
const currentScale = ref<number>(1.2)
const colorSecondary = ref<string>('#0A3C17')

onMounted(async () => {
  getArtist()
})

async function getArtist() {
  loading.value = true
  artist.value = await useAPI().artist.getById(props.artistId)
  loading.value = false
}

function onScroll(scrollTop: number) {
  // opacity
  const maxScroll = 200
  const opacity = Math.min(scrollTop / maxScroll, 1)
  const baseRgb = useColors().hexToRgb(colorSecondary.value)
  currentColor.value = `rgba(${baseRgb[0]}, ${baseRgb[1]}, ${baseRgb[2]}, ${opacity})`

  // scale
  const minScale = 0.95
  const scale = 1.2 - Math.min(scrollTop / maxScroll, 1) * (1 - minScale)
  currentScale.value = scale
}
</script>

<style lang='scss' scoped>
$--navbar: 58px;
$--playbar: 100px;
$--global-padding: 20px;

.artist {
  position: relative;
  height: 100%;
  width: 100%;
  &--loader,
  &--error {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
  &--wrapper {
    position: relative;
    height: 500px;
    overflow: hidden;
    height: calc(100dvh - $--navbar - $--playbar - $--global-padding);
  }
}

</style>