<template>
  <div class='artist-content'>
    <div 
      class='artist-content__banner' 
      :style="{ backgroundImage: artist?.picture_xl ? `url(${artist.picture_xl})` : '' }">
      <div class='artist-content__banner__artist-name'>
        <p>Artiste vérifié</p>
        <h1 class='artist-content__banner__artist-name__name'>{{ artist?.name }}</h1>
        <p class='artist-content__banner__artist-name__nmb'>{{ artist?.nb_fan }} auditeurs mensuels</p>
      </div>
    </div>
    <!-- <pre style="color: antiquewhite;">{{ artist }}</pre> -->
  </div>
</template>

<script setup lang='ts'>
import { useAPI } from '~/composables/api/useApi'

const props = defineProps({
  artistId: { type: Number, required: true }
})

const artist = ref<IArtist>()
const mainColor = ref<string>()

onMounted(async () => {
  getArtist()
})

async function getArtist() {
  artist.value = await useAPI().artist.getById(props.artistId)

    mainColor.value = await getDominantColor(artist.value?.picture_xl)
console.log(mainColor.value)
}

function getDominantColor(imgUrl: string): Promise<string> {
  return new Promise((resolve, reject) => {
    const img = new Image()
    img.crossOrigin = 'anonymous'  // nécessaire si l'image vient d'un autre domaine
    img.src = imgUrl

    img.onload = () => {
      const canvas = document.createElement('canvas')
      canvas.width = img.width
      canvas.height = img.height
      const ctx = canvas.getContext('2d')
      if (!ctx) return reject('Impossible de récupérer le context')

      ctx.drawImage(img, 0, 0)
      const data = ctx.getImageData(0, 0, canvas.width, canvas.height).data

      const colorCount: Record<string, number> = {}
      for (let i = 0; i < data.length; i += 4) {
        const r = data[i]
        const g = data[i + 1]
        const b = data[i + 2]
        const key = `${r},${g},${b}`
        colorCount[key] = (colorCount[key] || 0) + 1
      }

      // trier et prendre la couleur la plus fréquente
      const dominant = Object.entries(colorCount).sort((a, b) => b[1] - a[1])[0][0]
      resolve(`rgb(${dominant})`)
    }

    img.onerror = reject
  })
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