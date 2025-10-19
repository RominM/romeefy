<template>
  <div class='album-page'>
    <loader v-if="loading" class='album-page--loader' />
    <div v-else-if="album" :class="['album-page--wrapper', { '--small-device': !isDesktop }]">
      <banner-album :album="album" :banner="album.cover_xl" :color="currentColor"/>
      <player-top-fixed v-if="album" :scroll-top="scrollTop" :color="currentColor" :name="album.title" :track-id="album.tracks.data[0].id" />
      <album-content :album="album" :color-secondary="colorSecondary" @scroll="onScroll" @track-id="trackId = $event"/>
    </div>
    <error-content v-else class='album-page--error' @retry="getArtist"/>
  </div>
</template>

<script setup lang='ts'>
import { useAPI } from '~/composables/api/useApi'
import { useColors } from '~/composables/colors/useColors'
import { useDevice } from '~/composables/device/useDevice'

const props = defineProps({
  albumId: { type: Number, required: true }
})

const { isDesktop } = useDevice()
const loading = ref<boolean>(true)
const album = ref<IAlbum>()

const scrollTop = ref<number>(0)
const currentColor = ref<string>('')
const colorSecondary = ref<string>('')

const trackId = ref<number>()

onMounted(async () => {
  getArtist()
})

async function getArtist() {
  loading.value = true
  const { data, error } = await useAPI().album.getById(props.albumId)
  loading.value = false

  if(!data || error) return

  album.value = data

  if (!album.value) return
  const colors = await useColors().extractTopColors(album.value.cover_xl)
  colorSecondary.value = colors[0].rgb
}

function onScroll(top: number) {
  scrollTop.value = top
  const maxScroll = 200
  const scrollRatio = Math.min(scrollTop.value / maxScroll, 1)

  const baseRgb = useColors().rgbStringToArray(colorSecondary.value)

  const alpha = 0.3 + scrollRatio * 0.7
  currentColor.value = `rgba(${baseRgb[0]}, ${baseRgb[1]}, ${baseRgb[2]}, ${alpha})`
}
</script>

<style lang='scss' scoped>
$--navbar: 58px;
$--playbar: 100px;
$--global-padding: 10px;

.album-page {
  position: relative;
  min-height: 100%;
  width: 100%;
  &--wrapper {
    position: relative;
    overflow: hidden;
    height: calc(100dvh - $--navbar - $--playbar - $--global-padding);
    &.--small-device {
      height: 100dvh;
    }
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