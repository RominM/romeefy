<template>
  <div class='artist-page'>
    <loader v-if="loading" class='artist-page--loader' />
    <div v-else-if="artist" class='artist-page--wrapper'>
      <player-top-fixed v-if="trackId" :scroll-top="scrollTop" :color="currentColor" :name="artist.name" :track-id="trackId" />
      <banner :banner="artist.picture_xl" :color="currentColor" :scale="currentScale"/>
      <artist-content :artist="artist" :color-secondary="colorSecondary" @scroll="onScroll" @track-id="trackId = $event"/>
    </div>
    <error-content v-else class='artist-page--error' @retry="getArtist"/>
  </div>
</template>

<script setup lang='ts'>
import { useAPI } from '~/composables/api/useApi'
import { useColors } from '~/composables/colors/useColors'

const props = defineProps({
  artistId: { type: Number, required: true }
})

const loading = ref<boolean>(true)
const artist = ref<IArtist>({} as IArtist)

const currentColor = ref<string>('transparent')
const currentScale = ref<number>(1.2)
const scrollTop = ref<number>(0)
const colorSecondary = ref<string>('')

const trackId = ref<number>()

onMounted(async () => {
  getArtist()
})

async function getArtist() {
  loading.value = true
  const { data, error } = await useAPI().artist.getById(props.artistId)
  loading.value = false
console.log({artist: props.artistId, data, error});

  if(!data || error) return

  artist.value = data

  const colors = await useColors().extractTopColors(artist.value.picture_xl)
  colorSecondary.value = colors[0].rgb
}

function onScroll(top: number) {
  scrollTop.value = top 
  // opacity
  const maxScroll = 200
  const opacity = Math.min(scrollTop.value / maxScroll, 1)

  const baseRgb = useColors().rgbStringToArray(colorSecondary.value) 
  currentColor.value = `rgba(${baseRgb[0]}, ${baseRgb[1]}, ${baseRgb[2]}, ${opacity})`

  // scale
  const minScale = 0.95
  const scale = 1.2 - Math.min(scrollTop.value / maxScroll, 1) * (1 - minScale)
  currentScale.value = scale
}
</script>

<style lang='scss' scoped>
$--navbar: 58px;
$--playbar: 100px;
$--global-padding: 20px;

.artist-page {
  position: relative;
  height: 100%;
  width: 100%;
  &--wrapper {
    position: relative;
    height: 500px;
    overflow: hidden;
    height: calc(100dvh - $--navbar - $--playbar - $--global-padding);
  }
  &--loader,
  &--error {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
}

</style>